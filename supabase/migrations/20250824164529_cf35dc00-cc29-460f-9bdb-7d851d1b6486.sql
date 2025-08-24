-- Ajouter les nouveaux statuts à l'enum lead_status
ALTER TYPE lead_status ADD VALUE IF NOT EXISTS 'nouveau';
ALTER TYPE lead_status ADD VALUE IF NOT EXISTS 'rdv_en_attente_confirmation';
ALTER TYPE lead_status ADD VALUE IF NOT EXISTS 'rdv_confirme';
ALTER TYPE lead_status ADD VALUE IF NOT EXISTS 'contact_recu';
ALTER TYPE lead_status ADD VALUE IF NOT EXISTS 'client_signe';
ALTER TYPE lead_status ADD VALUE IF NOT EXISTS 'perdu';