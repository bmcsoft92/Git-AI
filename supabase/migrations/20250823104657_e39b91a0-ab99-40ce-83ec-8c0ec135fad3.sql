-- Créer un enum pour les statuts du pipeline CRM
CREATE TYPE public.lead_status AS ENUM (
  'nouveau_lead',
  'diagnostic_envoye', 
  'rdv_demande',
  'rdv_confirme',
  'proposition_envoyee',
  'client_signe',
  'perdu'
);

-- Créer la table leads pour le CRM
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  phone TEXT,
  company TEXT,
  team_size TEXT,
  business_type TEXT,
  status lead_status NOT NULL DEFAULT 'nouveau_lead',
  roi_potential NUMERIC,
  annual_savings NUMERIC,
  last_contact_date TIMESTAMPTZ,
  next_followup_date TIMESTAMPTZ,
  notes TEXT,
  source TEXT DEFAULT 'roi_calculator',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ajouter une colonne lead_id aux tables existantes pour les lier au CRM
ALTER TABLE public.roi_calculations 
ADD COLUMN lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL;

ALTER TABLE public.appointments 
ADD COLUMN lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL;

-- Enable RLS sur la table leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour la table leads
CREATE POLICY "Anyone can create leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view leads" 
ON public.leads 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update leads" 
ON public.leads 
FOR UPDATE 
USING (true);

-- Créer un trigger pour mettre à jour updated_at
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Index pour améliorer les performances
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_created_at ON public.leads(created_at);

-- Fonction pour créer ou mettre à jour un lead
CREATE OR REPLACE FUNCTION public.upsert_lead(
  p_email TEXT,
  p_name TEXT DEFAULT NULL,
  p_phone TEXT DEFAULT NULL,
  p_company TEXT DEFAULT NULL,
  p_team_size TEXT DEFAULT NULL,
  p_business_type TEXT DEFAULT NULL,
  p_roi_potential NUMERIC DEFAULT NULL,
  p_annual_savings NUMERIC DEFAULT NULL,
  p_status lead_status DEFAULT 'nouveau_lead'
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;