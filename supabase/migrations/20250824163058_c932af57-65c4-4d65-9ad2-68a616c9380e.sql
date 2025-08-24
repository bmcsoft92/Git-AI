-- Corriger les fonctions avec SET search_path sécurisé
CREATE OR REPLACE FUNCTION public.calculate_lead_score(
  p_budget_range TEXT DEFAULT NULL,
  p_roi_potential NUMERIC DEFAULT NULL,
  p_annual_savings NUMERIC DEFAULT NULL
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
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

CREATE OR REPLACE FUNCTION public.link_appointment_to_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
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
SET search_path = 'public'
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