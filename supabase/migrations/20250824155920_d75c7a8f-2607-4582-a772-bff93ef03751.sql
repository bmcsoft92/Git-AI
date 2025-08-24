-- Corriger la fonction update_contact_messages_updated_at
CREATE OR REPLACE FUNCTION public.update_contact_messages_updated_at()
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