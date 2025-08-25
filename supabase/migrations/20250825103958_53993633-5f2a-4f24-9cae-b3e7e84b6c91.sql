-- CRITICAL SECURITY FIX: Block all public access to customer data tables
-- This migration fixes the critical vulnerability where customer data was publicly readable

-- First, ensure RLS is enabled on all sensitive tables
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roi_calculations ENABLE ROW LEVEL SECURITY;

-- Remove existing policies to start fresh
DROP POLICY IF EXISTS "Service role can manage appointments" ON public.appointments;
DROP POLICY IF EXISTS "Service role can manage contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Service role can manage leads" ON public.leads;
DROP POLICY IF EXISTS "Service role can manage roi_calculations" ON public.roi_calculations;

-- APPOINTMENTS TABLE: Secure customer appointment data
-- Block all public access by default (no public policies)
-- Only allow service role access for edge functions
CREATE POLICY "appointments_service_role_access" ON public.appointments
  FOR ALL USING (auth.role() = 'service_role');

-- CONTACT MESSAGES TABLE: Secure customer messages
-- Block all public access by default (no public policies)
-- Only allow service role access for edge functions
CREATE POLICY "contact_messages_service_role_access" ON public.contact_messages
  FOR ALL USING (auth.role() = 'service_role');

-- LEADS TABLE: Secure business lead data
-- Block all public access by default (no public policies)
-- Only allow service role access for edge functions
CREATE POLICY "leads_service_role_access" ON public.leads
  FOR ALL USING (auth.role() = 'service_role');

-- ROI CALCULATIONS TABLE: Secure financial and business data
-- Block all public access by default (no public policies)
-- Only allow service role access for edge functions
CREATE POLICY "roi_calculations_service_role_access" ON public.roi_calculations
  FOR ALL USING (auth.role() = 'service_role');

-- Verify RLS is working by adding explicit DENY policies for anonymous users
-- These policies ensure no public access is possible
CREATE POLICY "appointments_deny_anon" ON public.appointments
  FOR ALL TO anon USING (false);

CREATE POLICY "contact_messages_deny_anon" ON public.contact_messages
  FOR ALL TO anon USING (false);

CREATE POLICY "leads_deny_anon" ON public.leads
  FOR ALL TO anon USING (false);

CREATE POLICY "roi_calculations_deny_anon" ON public.roi_calculations
  FOR ALL TO anon USING (false);