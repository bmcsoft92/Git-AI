-- Corriger la sécurité des fonctions existantes en définissant le search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Corriger la fonction upsert_lead également
CREATE OR REPLACE FUNCTION public.upsert_lead(p_email text, p_name text DEFAULT NULL::text, p_phone text DEFAULT NULL::text, p_company text DEFAULT NULL::text, p_team_size text DEFAULT NULL::text, p_business_type text DEFAULT NULL::text, p_roi_potential numeric DEFAULT NULL::numeric, p_annual_savings numeric DEFAULT NULL::numeric, p_status lead_status DEFAULT 'nouveau_lead'::lead_status)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_lead_id UUID;
BEGIN
  -- Essayer d'insérer, sinon mettre à jour
  INSERT INTO public.leads (
    email, name, phone, company, team_size, business_type,
    roi_potential, annual_savings, status, last_contact_date
  ) 
  VALUES (
    p_email, p_name, p_phone, p_company, p_team_size, p_business_type,
    p_roi_potential, p_annual_savings, p_status, now()
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
    last_contact_date = now(),
    updated_at = now()
  RETURNING id INTO v_lead_id;
  
  IF v_lead_id IS NULL THEN
    SELECT id INTO v_lead_id FROM public.leads WHERE email = p_email;
  END IF;
  
  RETURN v_lead_id;
END;
$function$;