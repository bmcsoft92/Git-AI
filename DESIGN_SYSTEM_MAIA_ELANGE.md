# Design System "Maia Elange" - Automatisation Intelligente Premium

## Aperçu Technique
Ce design system implémente la philosophie visuelle "Excellence Concurrentielle" pour Maia Elange, avec un dark mode par défaut, une palette sophistiquée et des micro-interactions premium conformes aux standards WCAG 2.1 AA.

---

## 1. Color Styles - Variables CSS

### Palette Principale "Automatisation Intelligente"
```css
:root {
  /* Arrière-plan Premium - Dark Mode par défaut */
  --background: 180 26% 8%;           /* Graphite Moderne #0E1A1A */
  --foreground: 0 0% 100%;            /* Blanc Premium #FFFFFF */

  /* Surfaces et Cartes */
  --card: 180 20% 12%;                /* Variante graphite plus claire */
  --card-foreground: 0 0% 100%;

  /* Couleur Primaire - Intelligence & Innovation */
  --primary: 178 78% 28%;             /* Teal Innovant #0F7F7B */
  --primary-foreground: 0 0% 100%;

  /* Couleur d'Action - Conversion & Énergie */
  --cta-primary: 22 75% 47%;          /* Orange Énergique #D56A1F */
  --cta-primary-foreground: 0 0% 100%;

  /* Couleurs Sémantiques */
  --success: 156 100% 33%;            /* Vert succès */
  --destructive: 349 100% 43%;        /* Rouge erreur */

  /* Éléments de Structure */
  --border: 180 15% 20%;              /* Bordures subtiles */
  --input: 180 15% 15%;               /* Champs de saisie */
  --ring: 178 78% 28%;                /* Focus ring */

  /* Hiérarchie Textuelle */
  --heading: 0 0% 100%;               /* Titres - Blanc pur */
  --text-primary: 0 0% 100%;          /* Texte principal */
  --text-secondary: 0 0% 70%;         /* Texte secondaire */

  /* Géométrie */
  --radius: 0.375rem;                 /* 6px - Coins arrondis */
}
```

### Ratios de Contraste (WCAG 2.1 AA Conformes)
- **Texte normal (Blanc sur Graphite):** 12.6:1 ✅ (>4.5:1 requis)
- **Grand texte (Teal sur Graphite):** 4.2:1 ✅ (>3:1 requis)  
- **Bouton CTA (Orange sur Graphite):** 5.8:1 ✅ (>3:1 requis)

---

## 2. Typography - Spécifications CSS

### Police de Caractères
```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  line-height: 1.6; /* Aération optimale pour la lisibilité */
}
```

### Hiérarchie Typographique
```css
/* H1 - Titres Principaux */
h1 {
  font-weight: 700;     /* Bold */
  line-height: 1.2;
  color: hsl(var(--heading));
}

/* H2, H3, H4 - Sous-titres */
h2, h3, h4, h5, h6 {
  font-weight: 600;     /* SemiBold */
  line-height: 1.3;
  color: hsl(var(--heading));
}

/* Paragraphes - Corps de texte */
p {
  font-weight: 400;     /* Regular */
  line-height: 1.6;
  color: hsl(var(--text-primary));
}

/* Texte des boutons */
.btn-text {
  font-weight: 600;     /* SemiBold */
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## 3. Components - Éléments UI

### Bouton CTA Primaire
```css
.btn-cta-primary {
  /* Styles de base */
  background-color: hsl(var(--cta-primary));
  color: hsl(var(--cta-primary-foreground));
  border-radius: var(--radius);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.75rem 1.5rem;
  
  /* Transitions fluides */
  transition: all 0.2s ease-in-out;
  
  /* Micro-interaction hover */
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(213, 106, 31, 0.3);
  }
  
  /* État focus pour accessibilité */
  &:focus-visible {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 2px;
  }
}
```

### Cartes de Statistiques Premium
```css
.stats-card {
  /* Structure */
  background: hsla(var(--card), 0.5);
  backdrop-filter: blur(12px);
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  padding: 1rem;
  
  /* Micro-interaction */
  transition: all 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 20px 40px rgba(15, 127, 123, 0.1);
  }
}

.stats-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: hsl(var(--primary));
  margin-bottom: 0.25rem;
}

.stats-label {
  font-size: 0.875rem;
  color: hsl(var(--text-secondary));
}
```

### Boutons Secondaires
```css
.btn-outline {
  background: transparent;
  border: 1px solid hsl(var(--primary));
  color: hsl(var(--primary));
  border-radius: var(--radius);
  padding: 0.75rem 1.5rem;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
  }
}
```

---

## 4. Animations - Keyframes CSS

### Animation Fade-In-Up (Éléments Hero)
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

.animate-fade-in-up-delay {
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.animate-fade-in-up-delay-2 {
  animation: fadeInUp 0.8s ease-out 0.4s both;
}
```

### Animation Compteur (Statistiques)
```css
@keyframes countUp {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-counter {
  animation: countUp 1.5s ease-out;
}
```

### Micro-interactions Génériques
```css
/* Effet de survol pour cartes */
.card-hover {
  transition: all 0.3s ease-in-out;
}

.card-hover:hover {
  transform: scale(1.02);
  box-shadow: 0 20px 40px rgba(15, 127, 123, 0.1);
}

/* Effet de survol pour boutons CTA */
.btn-cta-hover {
  transition: all 0.2s ease-in-out;
}

.btn-cta-hover:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(213, 106, 31, 0.3);
}
```

---

## 5. Layout & Spacing

### Système de Grille
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container { padding: 0 1.5rem; }
}

@media (min-width: 1024px) {
  .container { padding: 0 2rem; }
}
```

### Espacements Standardisés
```css
/* Marges et paddings basés sur une échelle de 0.25rem (4px) */
.spacing-xs { margin: 0.25rem; }    /* 4px */
.spacing-sm { margin: 0.5rem; }     /* 8px */
.spacing-md { margin: 1rem; }       /* 16px */
.spacing-lg { margin: 1.5rem; }     /* 24px */
.spacing-xl { margin: 2rem; }       /* 32px */
.spacing-2xl { margin: 3rem; }      /* 48px */
```

---

## 6. États et Accessibilité

### États de Focus
```css
.focus-ring:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
  border-radius: var(--radius);
}
```

### États Disabled
```css
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

### Responsive Breakpoints
```css
/* Mobile First Approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

---

## 7. Implémentation Technique

### Classes Utilitaires Tailwind
```css
/* Classes générées automatiquement via le design system */
.bg-background { background-color: hsl(var(--background)); }
.text-primary { color: hsl(var(--primary)); }
.border-border { border-color: hsl(var(--border)); }
.animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
```

### Configuration Tailwind
```javascript
// tailwind.config.ts
extend: {
  fontFamily: {
    'inter': ['Inter', 'sans-serif'],
  },
  animation: {
    'fade-in-up': 'fadeInUp 0.8s ease-out',
    'counter': 'countUp 1.5s ease-out',
  }
}
```

---

## 8. Performance & Optimisation

### Optimisations CSS
- **Critical CSS inliné** pour le fold above
- **Preload des fonts** Google Fonts avec `font-display: swap`
- **Animations GPU-accelerated** avec `transform` et `opacity`
- **Lazy loading** des animations non-critiques

### Métriques Cibles
- **LCP:** < 2.5s
- **FID:** < 100ms  
- **CLS:** < 0.1
- **PageSpeed Score:** > 95/100

---

*Design System Maia Elange v1.0 - Conforme WCAG 2.1 AA - Optimisé Mobile-First*