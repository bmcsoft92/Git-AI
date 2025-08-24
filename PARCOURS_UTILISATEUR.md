# Parcours Utilisateur Optimisé - Maia Elange

## Vue d'ensemble du parcours pour novices

### 1. Page d'accueil (/)
**Choix principal pour l'utilisateur :**
- 🎯 **"Calculer mon ROI"** → Parcours guidé complet
- 📅 **"Prendre rendez-vous directement"** → Prise de RDV sans étapes
- ✉️ **"Ou nous envoyer un message"** → Contact simple

---

## Parcours A : Guidé complet (Recommandé pour novices)

### Étape 1 : ROI Rapide (/calculateur-roi)
- **Durée :** 30 secondes
- **Objectif :** Donner une première estimation concrete
- **Données :** 
  - Heures/semaine à automatiser
  - Taux horaire 
  - Nombre d'employés
  - Budget estimé
- **Résultat :** Économies annuelles, ROI%, multiplicateur
- **Actions :**
  - ✅ Continuer vers diagnostic (recommandé)
  - 📅 Prendre RDV directement 
  - ✉️ Nous écrire

### Étape 2 : Diagnostic Personnalisé (Optionnel)
- **Durée :** 3 minutes
- **Objectif :** Identifier les 3 chantiers prioritaires
- **6 sous-étapes :**
  1. Informations personnelles
  2. Secteur & CA
  3. Processus prioritaires
  4. Heures répétitives (pré-rempli)
  5. Outils actuels
  6. Timeline & budget
- **Résultat :** 3 recommandations IA personnalisées

### Étape 3 : Résultats & Action
- **Affichage :** ROIResults avec recommandations détaillées
- **Actions :**
  - 🎯 **"Réserver un Entretien"** (email pré-rempli)
  - 💬 **"Nous Contacter Directement"**

---

## Parcours B : Direct (/appointment)

### Prise de RDV Simple
- **Objectif :** Rendez-vous immédiat sans calculs
- **Fonctionnalités :**
  - Auto-remplissage si email fourni
  - Données utilisateur récupérées automatiquement
  - Confirmation par email (client + admin)

---

## Parcours C : Contact Simple (/contact)

### Message Direct
- **Objectif :** Envoi de message sans engagement
- **Données :** Nom, Email, Message
- **Confirmation :** Toast + email de réponse sous 48h

---

## Logique de Cohérence

### Auto-remplissage intelligent
- **useUserData hook** récupère automatiquement les données utilisateur
- **Sources :** roi_calculations + leads tables
- **Propagation :** Toutes les données se synchronisent entre les formulaires

### Emails automatiques
- **Admin :** Notification de nouveaux leads/RDV
- **Client :** Confirmation et accusé de réception
- **Fonction :** book-appointment, send-contact-message, analyze-roi-data

### Progression claire
- **Étape 1 :** ROI simple (accroche)
- **Étape 2 :** Diagnostic (qualification)
- **Étape 3 :** Action (conversion)
- **Alternatives :** Sorties directes à chaque étape

---

## Points Clés pour Novices

✅ **Parcours progressif :** Chaque étape apporte de la valeur  
✅ **Options de sortie :** Pas de tunnel forcé  
✅ **Données préservées :** Pas de ressaisie  
✅ **Feedback immédiat :** Résultats instantanés  
✅ **Choix libre :** Diagnostic optionnel mais recommandé