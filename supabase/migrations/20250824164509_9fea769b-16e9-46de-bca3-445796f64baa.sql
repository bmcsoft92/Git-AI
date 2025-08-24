-- Mettre à jour l'enum lead_status avec les nouveaux statuts
ALTER TYPE lead_status ADD VALUE IF NOT EXISTS 'nouveau';
ALTER TYPE lead_status ADD VALUE IF NOT EXISTS 'rdv_en_attente_confirmation';
ALTER TYPE lead_status ADD VALUE IF NOT EXISTS 'rdv_confirme';
ALTER TYPE lead_status ADD VALUE IF NOT EXISTS 'contact_recu';
ALTER TYPE lead_status ADD VALUE IF NOT EXISTS 'client_signe';
ALTER TYPE lead_status ADD VALUE IF NOT EXISTS 'perdu';

-- Mettre à jour la fonction upsert_lead pour gérer les nouveaux statuts
CREATE OR REPLACE FUNCTION public.upsert_lead(
  p_email text, 
  p_name text DEFAULT NULL::text, 
  p_phone text DEFAULT NULL::text, 
  p_company text DEFAULT NULL::text, 
  p_team_size text DEFAULT NULL::text, 
  p_business_type text DEFAULT NULL::text, 
  p_roi_potential numeric DEFAULT NULL::numeric, 
  p_annual_savings numeric DEFAULT NULL::numeric, 
  p_status lead_status DEFAULT 'nouveau'::lead_status,
  p_budget_range text DEFAULT NULL::text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_lead_id UUID;
  v_score TEXT;
BEGIN
  -- Calculer le score automatiquement
  v_score := calculate_lead_score(p_budget_range, p_roi_potential, p_annual_savings);
  
  -- Essayer d'insérer, sinon mettre à jour
  INSERT INTO public.leads (
    email, name, phone, company, team_size, business_type,
    roi_potential, annual_savings, status, last_contact_date, score
  ) 
  VALUES (
    p_email, p_name, p_phone, p_company, p_team_size, p_business_type,
    p_roi_potential, p_annual_savings, p_status, now(), v_score
  )
  ON CONFLICT (email) 
  DO UPDATE SET
    name = COALESCE(EXCLUDED.name, leads.name),
    phone = COALESCE(EXCLUDED.phone, leads.phone),
    company = COALESCE(EXCLUDED.company, leads.company),
    team_size = COALESCE(EXCLUDED.team_size, leads.team_size),
    business_type = COALESCE(EXCLUDED.business_type, leads.business_type),
    roi_potential = COALESCE(EXCLUDED.roi_potential, leads.roi_potential),
    annual_savings = COALESCE(EXCLUDED.annual_savings, leads.annual_savings),
    score = calculate_lead_score(
      COALESCE(EXCLUDED.team_size, leads.team_size),
      COALESCE(EXCLUDED.roi_potential, leads.roi_potential),
      COALESCE(EXCLUDED.annual_savings, leads.annual_savings)
    ),
    status = EXCLUDED.status,
    last_contact_date = now(),
    updated_at = now()
  RETURNING id INTO v_lead_id;
  
  IF v_lead_id IS NULL THEN
    SELECT id INTO v_lead_id FROM public.leads WHERE email = p_email;
  END IF;
  
  RETURN v_lead_id;
END;
$$;

-- Mettre à jour la fonction link_appointment_to_lead pour le statut RDV
CREATE OR REPLACE FUNCTION public.link_appointment_to_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  v_lead_id UUID;
BEGIN
  -- Trouver ou créer le lead correspondant avec statut RDV en attente
  v_lead_id := upsert_lead(
    NEW.user_email,
    NEW.user_name,
    NEW.user_phone,
    NULL, -- company
    NULL, -- team_size
    NULL, -- business_type
    NULL, -- roi_potential
    NULL, -- annual_savings
    'rdv_en_attente_confirmation'::lead_status,
    NULL  -- budget_range
  );
  
  -- Lier l'appointment au lead
  NEW.lead_id := v_lead_id;
  
  RETURN NEW;
END;
$$;

-- Mettre à jour la fonction link_contact_to_lead pour le statut contact
CREATE OR REPLACE FUNCTION public.link_contact_to_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  v_lead_id UUID;
BEGIN
  -- Trouver ou créer le lead correspondant avec statut contact reçu
  v_lead_id := upsert_lead(
    NEW.email,
    NEW.name,
    NEW.phone,
    NEW.company,
    NULL, -- team_size
    NULL, -- business_type
    NULL, -- roi_potential
    NULL, -- annual_savings
    'contact_recu'::lead_status,
    NULL  -- budget_range
  );
  
  -- Lier le message de contact au lead
  NEW.lead_id := v_lead_id;
  
  RETURN NEW;
END;
$$;

-- Créer une fonction pour confirmer un rendez-vous (pour usage manuel)
CREATE OR REPLACE FUNCTION public.confirm_appointment(
  p_appointment_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  v_user_email TEXT;
BEGIN
  -- Récupérer l'email de l'appointment
  SELECT user_email INTO v_user_email 
  FROM public.appointments 
  WHERE id = p_appointment_id;
  
  IF v_user_email IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Mettre à jour le statut de l'appointment
  UPDATE public.appointments 
  SET status = 'confirmed', updated_at = now()
  WHERE id = p_appointment_id;
  
  -- Mettre à jour le statut du lead
  UPDATE public.leads 
  SET status = 'rdv_confirme'::lead_status, updated_at = now()
  WHERE email = v_user_email;
  
  RETURN TRUE;
END;
$$;

-- Créer une fonction pour mettre à jour manuellement le statut d'un lead
CREATE OR REPLACE FUNCTION public.update_lead_status(
  p_lead_email TEXT,
  p_new_status lead_status
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  UPDATE public.leads 
  SET status = p_new_status, updated_at = now()
  WHERE email = p_lead_email;
  
  RETURN FOUND;
END;
$$;