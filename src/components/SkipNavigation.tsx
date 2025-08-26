// Composant de navigation rapide pour l'accessibilité
export const SkipNavigation = () => {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a
        href="#main-content"
        className="
          absolute top-4 left-4 z-50
          bg-primary text-primary-foreground
          px-4 py-2 rounded-md
          focus:outline-none focus-visible:ring-2 focus-visible:ring-ring
          transform -translate-y-full focus:translate-y-0
          transition-transform duration-200
          text-sm font-medium
        "
      >
        Aller au contenu principal
      </a>
      <a
        href="#navigation"
        className="
          absolute top-4 left-32 z-50
          bg-primary text-primary-foreground
          px-4 py-2 rounded-md
          focus:outline-none focus-visible:ring-2 focus-visible:ring-ring
          transform -translate-y-full focus:translate-y-0
          transition-transform duration-200
          text-sm font-medium
        "
      >
        Aller à la navigation
      </a>
      <a
        href="#contact"
        className="
          absolute top-4 left-64 z-50
          bg-primary text-primary-foreground
          px-4 py-2 rounded-md
          focus:outline-none focus-visible:ring-2 focus-visible:ring-ring
          transform -translate-y-full focus:translate-y-0
          transition-transform duration-200
          text-sm font-medium
        "
      >
        Aller au contact
      </a>
    </div>
  );
};