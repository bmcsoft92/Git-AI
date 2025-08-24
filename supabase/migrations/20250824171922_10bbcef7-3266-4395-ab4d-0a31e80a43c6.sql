-- CORRECTION CRITIQUE DE SÉCURITÉ
-- Suppression des politiques RLS trop permissives et ajout de politiques sécurisées

-- Supprimer les politiques existantes trop permissives
DROP POLICY IF EXISTS "Anyone can view appointments" ON public.appointments;
DROP POLICY IF EXISTS "Anyone can create appointments" ON public.appointments;
DROP POLICY IF EXISTS "Anyone can view leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can create leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can update leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can view ROI calculations" ON public.roi_calculations;
DROP POLICY IF EXISTS "Anyone can create ROI calculations" ON public.roi_calculations;

-- NOUVELLES POLITIQUES SÉCURISÉES

-- Appointments : Accès restreint aux functions edge seulement
CREATE POLICY "Service role can manage appointments" 
ON public.appointments 
FOR ALL
USING (auth.role() = 'service_role');

-- Leads : Accès restreint aux functions edge seulement  
CREATE POLICY "Service role can manage leads"
ON public.leads 
FOR ALL 
USING (auth.role() = 'service_role');

-- ROI calculations : Accès restreint aux functions edge seulement
CREATE POLICY "Service role can manage roi_calculations"
ON public.roi_calculations 
FOR ALL
USING (auth.role() = 'service_role');

-- Contact messages : Déjà sécurisé correctement