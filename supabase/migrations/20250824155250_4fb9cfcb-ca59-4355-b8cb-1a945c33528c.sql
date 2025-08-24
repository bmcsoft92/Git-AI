-- Ajouter le nouveau statut 'rdv_en_attente_confirmation' au type lead_status
ALTER TYPE lead_status ADD VALUE IF NOT EXISTS 'rdv_en_attente_confirmation';