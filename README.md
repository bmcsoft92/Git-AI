# 🚀 Maïa Élange - L'IA + l'Humain au service des organisations

## 📋 Vue d'ensemble

Site web moderne et sécurisé pour Maïa Élange, spécialisée dans l'automatisation IA pour TPE/PME.

**Stack technique :**
- ⚡ **Vite** + **React 18** + **TypeScript**
- 🎨 **Tailwind CSS** + **ShadCN/UI**
- 🔒 **Supabase** (Backend sécurisé)
- ✅ **Conformité RGPD**
- 🌐 **SEO optimisé**
- ♿ **Accessibilité WCAG 2.1 AA**

---

## 🛠️ Installation & Développement

### Prérequis
```bash
Node.js >= 18
npm ou yarn
```

### Installation
```bash
# Cloner le projet
git clone [repository-url]
cd trust-innovate-hub

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

### Scripts disponibles
```bash
npm run dev          # Serveur de développement (http://localhost:8080)
npm run build        # Build de production
npm run preview      # Preview du build
npm run lint         # Linter ESLint
npm test            # Tests unitaires
npm run test:ui     # Interface graphique des tests
npm run test:coverage # Coverage des tests
```

---

## 🔒 Sécurité & Conformité

### ✅ RGPD
- **Bandeau cookies** conforme avec gestion granulaire
- **Consentement explicite** et révocable
- **Politique de confidentialité** complète
- **Données chiffrées** et sécurisées

### 🛡️ Sécurité
- **Headers HTTP** sécurisés (CSP, X-Frame-Options, etc.)
- **Validation** côté client ET serveur (Zod)
- **RLS Policies** Supabase actives
- **Tokens** sécurisés avec rotation automatique

### ♿ Accessibilité (WCAG 2.1 AA)
- **Navigation clavier** complète
- **Lecteurs d'écran** compatibles
- **Contraste** AA respecté
- **Aria-labels** sur tous les éléments interactifs
- **Skip navigation** pour l'accessibilité

---

## 🌐 SEO & Performance

### 📈 SEO Optimisé
- **Sitemap.xml** généré automatiquement
- **Robots.txt** configuré
- **Meta tags** optimisés (Open Graph, Twitter Cards)
- **Structured data** Schema.org
- **URLs** canoniques

### ⚡ Performance
- **Lazy loading** des composants et images
- **PurgeCSS** activé en production
- **Chunks** optimisés
- **Compression** des assets
- **Bundle analysis** disponible

---

## 📊 Tests & Qualité

### 🧪 Tests
```bash
# Tests unitaires
npm test

# Tests avec interface
npm run test:ui

# Coverage
npm run test:coverage
```

**Couverture incluse :**
- ✅ **Boîte noire :** Navigation, formulaires, cookies
- ✅ **Boîte blanche :** Fonctions critiques
- ✅ **Accessibilité :** ARIA, navigation clavier
- ✅ **RGPD :** Consentement, cookies

### 📋 Checklist qualité
- [x] Sécurité (Headers, RLS, validation)
- [x] RGPD (Cookies, consentement, politique)
- [x] Accessibilité (WCAG 2.1 AA)
- [x] SEO (Meta, sitemap, structured data)
- [x] Performance (Lazy loading, purge CSS)
- [x] Tests (Unitaires, accessibilité, RGPD)

---

## 🚀 Déploiement

### Production (Hostinger/Netlify/Vercel)
```bash
# Build de production
npm run build

# Le dossier 'dist' contient les fichiers à déployer
```

### Variables d'environnement
```bash
# .env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Headers de sécurité (Netlify)
```toml
# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'"
```

---

## 🔧 Maintenance

### 🔄 Mises à jour de sécurité
```bash
# Vérifier les vulnérabilités
npm audit

# Corriger automatiquement
npm audit fix

# Mise à jour des dépendances
npm update
```

### 📈 Monitoring
- **Supabase Dashboard :** Monitoring base de données
- **Logs d'erreur :** Console navigateur
- **Performance :** Lighthouse CI

### 🆘 Support
- **Documentation :** Voir `/docs`
- **Issues :** GitHub Issues
- **Contact :** contact@maiaelange.fr

---

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants UI (ShadCN)
│   ├── CookieConsent.tsx    # Gestion RGPD
│   ├── AccessibleButton.tsx # Composants accessibles
│   └── ...
├── pages/              # Pages de l'application
├── hooks/              # Hooks personnalisés
├── test/               # Tests et mocks
│   ├── __tests__/      # Tests unitaires
│   └── mocks/          # Mocks MSW
├── assets/             # Images et ressources
└── lib/                # Utilitaires

public/
├── sitemap.xml         # Sitemap SEO
├── robots.txt          # Instructions robots
└── ...
```

---

## 📞 Contact & Support

**Maïa Élange**  
📧 contact@maiaelange.fr  
🌐 https://maiaelange.fr  
📍 60 rue François Ier, 75008 Paris

---

*Dernière mise à jour : 26 janvier 2025*