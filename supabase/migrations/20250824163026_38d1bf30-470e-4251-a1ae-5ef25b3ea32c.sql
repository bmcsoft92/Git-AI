-- 1. Ajouter le champ score à la table leads
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS score TEXT CHECK (score IN ('CHAUD', 'TIEDE', 'FROID'));

-- 2. Créer une fonction pour calculer automatiquement le score
CREATE OR REPLACE FUNCTION public.calculate_lead_score(
  p_budget_range TEXT DEFAULT NULL,
  p_roi_potential NUMERIC DEFAULT NULL,
  p_annual_savings NUMERIC DEFAULT NULL
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Logique de scoring basée sur le budget et le ROI
  -- Score CHAUD si budget > 5000€ ou ROI estimé > 50 000€
  IF (p_budget_range ILIKE '%10000%' OR p_budget_range ILIKE '%15000%' OR p_budget_range ILIKE '%20000%' OR 
      p_roi_potential > 50000 OR p_annual_savings > 50000) THEN
    RETURN 'CHAUD';
  END IF;
  
  -- Score TIEDE si budget entre 1000€ et 5000€
  IF (p_budget_range ILIKE '%1000%' OR p_budget_range ILIKE '%2000%' OR p_budget_range ILIKE '%5000%' OR
      (p_roi_potential >= 10000 AND p_roi_potential <= 50000) OR
      (p_annual_savings >= 10000 AND p_annual_savings <= 50000)) THEN
    RETURN 'TIEDE';
  END IF;
  
  -- Score FROID par défaut ou si budget = 0 ou ROI < 10 000€
  RETURN 'FROID';
END;
$$;

-- 3. Mettre à jour la fonction upsert_lead pour inclure le scoring automatique
CREATE OR REPLACE FUNCTION public.upsert_lead(
  p_email text, 
  p_name text DEFAULT NULL::text, 
  p_phone text DEFAULT NULL::text, 
  p_company text DEFAULT NULL::text, 
  p_team_size text DEFAULT NULL::text, 
  p_business_type text DEFAULT NULL::text, 
  p_roi_potential numeric DEFAULT NULL::numeric, 
  p_annual_savings numeric DEFAULT NULL::numeric, 
  p_status lead_status DEFAULT 'nouveau_lead'::lead_status,
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
    last_contact_date = now(),
    updated_at = now()
  RETURNING id INTO v_lead_id;
  
  IF v_lead_id IS NULL THEN
    SELECT id INTO v_lead_id FROM public.leads WHERE email = p_email;
  END IF;
  
  RETURN v_lead_id;
END;
$$;

-- 4. Créer des triggers pour maintenir les relations automatiquement
CREATE OR REPLACE FUNCTION public.link_appointment_to_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_lead_id UUID;
BEGIN
  -- Trouver ou créer le lead correspondant
  v_lead_id := upsert_lead(
    NEW.user_email,
    NEW.user_name,
    NEW.user_phone,
    NULL, -- company
    NULL, -- team_size
    NULL, -- business_type
    NULL, -- roi_potential
    NULL, -- annual_savings
    'rdv_demande'::lead_status
  );
  
  -- Lier l'appointment au lead
  NEW.lead_id := v_lead_id;
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.link_contact_to_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_lead_id UUID;
BEGIN
  -- Trouver ou créer le lead correspondant
  v_lead_id := upsert_lead(
    NEW.email,
    NEW.name,
    NEW.phone,
    NEW.company,
    NULL, -- team_size
    NULL, -- business_type
    NULL, -- roi_potential
    NULL, -- annual_savings
    'nouveau_lead'::lead_status
  );
  
  -- Lier le message de contact au lead
  NEW.lead_id := v_lead_id;
  
  RETURN NEW;
END;
$$;

-- 5. Créer les triggers
DROP TRIGGER IF EXISTS trigger_link_appointment_to_lead ON public.appointments;
CREATE TRIGGER trigger_link_appointment_to_lead
  BEFORE INSERT ON public.appointments
  FOR EACH ROW
  WHEN (NEW.lead_id IS NULL)
  EXECUTE FUNCTION public.link_appointment_to_lead();

DROP TRIGGER IF EXISTS trigger_link_contact_to_lead ON public.contact_messages;
CREATE TRIGGER trigger_link_contact_to_lead
  BEFORE INSERT ON public.contact_messages
  FOR EACH ROW
  WHEN (NEW.lead_id IS NULL)
  EXECUTE FUNCTION public.link_contact_to_lead();

-- 6. Mettre à jour les leads existants avec un score
UPDATE public.leads 
SET score = calculate_lead_score(team_size, roi_potential, annual_savings)
WHERE score IS NULL;