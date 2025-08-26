// Utilitaires SEO pour Maïa Élange

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  structuredData?: object;
}

/**
 * Met à jour les meta tags SEO de la page
 */
export const updateSEO = (config: SEOConfig) => {
  // Titre de la page
  document.title = config.title;

  // Meta description
  updateMetaTag('name', 'description', config.description);

  // Meta keywords
  if (config.keywords) {
    updateMetaTag('name', 'keywords', config.keywords);
  }

  // Canonical URL
  if (config.canonicalUrl) {
    updateLinkTag('rel', 'canonical', 'href', config.canonicalUrl);
  }

  // Open Graph
  updateMetaTag('property', 'og:title', config.title);
  updateMetaTag('property', 'og:description', config.description);
  updateMetaTag('property', 'og:type', config.ogType || 'website');
  
  if (config.canonicalUrl) {
    updateMetaTag('property', 'og:url', config.canonicalUrl);
  }
  
  if (config.ogImage) {
    updateMetaTag('property', 'og:image', config.ogImage);
    updateMetaTag('property', 'og:image:alt', config.title);
  }

  // Twitter Cards
  updateMetaTag('name', 'twitter:card', 'summary_large_image');
  updateMetaTag('name', 'twitter:title', config.title);
  updateMetaTag('name', 'twitter:description', config.description);
  
  if (config.ogImage) {
    updateMetaTag('name', 'twitter:image', config.ogImage);
  }

  // Structured Data
  if (config.structuredData) {
    updateStructuredData(config.structuredData);
  }
};

/**
 * Met à jour ou crée un meta tag
 */
const updateMetaTag = (attribute: string, value: string, content: string) => {
  let element = document.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement;
  
  if (element) {
    element.content = content;
  } else {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    element.content = content;
    document.head.appendChild(element);
  }
};

/**
 * Met à jour ou crée un link tag
 */
const updateLinkTag = (attribute: string, value: string, targetAttr: string, targetValue: string) => {
  let element = document.querySelector(`link[${attribute}="${value}"]`) as HTMLLinkElement;
  
  if (element) {
    element.setAttribute(targetAttr, targetValue);
  } else {
    element = document.createElement('link');
    element.setAttribute(attribute, value);
    element.setAttribute(targetAttr, targetValue);
    document.head.appendChild(element);
  }
};

/**
 * Met à jour les données structurées JSON-LD
 */
const updateStructuredData = (data: object) => {
  // Supprimer l'ancien script si existe
  const existingScript = document.querySelector('script[type="application/ld+json"][data-dynamic="true"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Créer nouveau script
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-dynamic', 'true');
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

/**
 * Configurations SEO prédéfinies pour les pages principales
 */
export const SEO_CONFIGS = {
  home: {
    title: 'Maïa Élange - L\'IA + l\'Humain au service des organisations',
    description: 'Maïa Élange – L\'IA + l\'humain au service des organisations. Systèmes d\'automatisation simples, mesurables et conformes RGPD. Spécialistes IA France.',
    keywords: 'IA, automatisation, TPE, PME, France, transformation numérique, intelligence artificielle, RGPD, conformité, agents IA',
    canonicalUrl: 'https://maiaelange.fr/',
    ogImage: 'https://maiaelange.fr/assets/hero-ai-automation.jpg',
  },
  
  solutions: {
    title: 'Solutions d\'Automatisation IA | Maïa Élange',
    description: 'Découvrez nos solutions d\'automatisation par IA pour TPE/PME. Agents intelligents, processus optimisés, ROI mesurable. Conformité RGPD garantie.',
    keywords: 'solutions IA, automatisation, agents intelligents, processus, ROI, TPE, PME',
    canonicalUrl: 'https://maiaelange.fr/solutions',
  },
  
  methode: {
    title: 'Notre Méthode d\'Implémentation IA | Maïa Élange',
    description: 'Méthodologie éprouvée pour l\'implémentation d\'IA en entreprise. Audit, conception, déploiement et accompagnement personnalisé.',
    keywords: 'méthode IA, implémentation, audit, conception, déploiement, accompagnement',
    canonicalUrl: 'https://maiaelange.fr/methode',
  },
  
  contact: {
    title: 'Nous Contacter | Maïa Élange',
    description: 'Contactez Maïa Élange pour vos projets d\'automatisation IA. Formulaire sécurisé, réponse sous 48h ouvrées. Paris 75008.',
    keywords: 'contact, Paris, automatisation IA, conseil, rendez-vous',
    canonicalUrl: 'https://maiaelange.fr/contact',
  },
  
  calculateur: {
    title: 'Calculateur ROI Automatisation IA | Maïa Élange',
    description: 'Calculez le ROI de vos projets d\'automatisation IA. Outil gratuit et confidentiel. Résultats instantanés et plan d\'action personnalisé.',
    keywords: 'ROI, calculateur, automatisation IA, économies, investissement, rentabilité',
    canonicalUrl: 'https://maiaelange.fr/calculateur-roi',
  },
} as const;

/**
 * Génère les données structurées pour une organisation
 */
export const generateOrganizationStructuredData = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Maïa Élange',
  alternateName: 'Maia Elange',
  description: 'L\'IA + l\'humain au service des organisations. Systèmes d\'automatisation simples, mesurables et conformes.',
  url: 'https://maiaelange.fr',
  logo: 'https://maiaelange.fr/lovable-uploads/6464ae76-963f-4a08-96fb-19127780a208.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '60 rue François Ier',
    addressLocality: 'Paris',
    postalCode: '75008',
    addressCountry: 'FR'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+33-1-XX-XX-XX-XX',
    contactType: 'customer service',
    availableLanguage: 'French'
  },
  sameAs: [
    'https://www.linkedin.com/company/maia-elange'
  ],
  foundingDate: '2024',
  areaServed: 'FR',
  serviceType: 'Automatisation IA',
  keywords: 'IA, automatisation, TPE, PME, transformation numérique'
});

/**
 * Génère les données structurées pour un service
 */
export const generateServiceStructuredData = (serviceName: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: serviceName,
  description: description,
  provider: {
    '@type': 'Organization',
    name: 'Maïa Élange',
    url: 'https://maiaelange.fr'
  },
  areaServed: 'FR',
  serviceType: 'Automatisation IA',
  category: 'Intelligence Artificielle',
});

/**
 * Génère les données structurées pour une FAQ
 */
export const generateFAQStructuredData = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});