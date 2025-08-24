import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOutilsOpen, setIsOutilsOpen] = useState(false);
  const location = useLocation();

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleIntegrationsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = '/#integrations';
      return;
    }
    const integrationsSection = document.getElementById('integrations');
    if (integrationsSection) {
      integrationsSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleFAQClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = '/#faq';
      return;
    }
    const faqSection = document.getElementById('faq');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo et Nom */}
          <Link to="/" onClick={handleHomeClick} className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center glow-hover">
                <img 
                  src="/lovable-uploads/6464ae76-963f-4a08-96fb-19127780a208.png" 
                  alt="Maia Elange Logo" 
                  className="w-full h-full rounded-lg transition-transform duration-300 hover:scale-110" 
                />
              </div>
              <h1 className="text-2xl font-bold text-heading">Maia Elange</h1>
            </div>
          </Link>
          
          {/* Navigation Desktop - Hiérarchie claire */}
          <div className="hidden lg:flex items-center space-x-8">
            
            {/* 1. Navigation Principale */}
            <div className="flex items-center space-x-6">
              <Link 
                to="/" 
                className={`nav-link transition-colors font-medium ${
                  isActive('/') 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-text-secondary hover:text-primary'
                }`}
                onClick={() => setIsOutilsOpen(false)}
              >
                Accueil
              </Link>
              
              <Link 
                to="/solutions" 
                className={`nav-link transition-colors font-medium ${
                  isActive('/solutions') 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-text-secondary hover:text-primary'
                }`}
                onClick={() => setIsOutilsOpen(false)}
              >
                Solutions
              </Link>
              
              <Link 
                to="/methode" 
                className={`nav-link transition-colors font-medium ${
                  isActive('/methode') 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-text-secondary hover:text-primary'
                }`}
                onClick={() => setIsOutilsOpen(false)}
              >
                Méthode
              </Link>
            </div>

            {/* Séparateur visuel */}
            <div className="w-px h-6 bg-border"></div>

            {/* 2. Outils & Ressources */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <button 
                  onClick={() => setIsOutilsOpen(!isOutilsOpen)}
                  className="nav-link text-text-secondary hover:text-primary transition-colors font-medium flex items-center space-x-1"
                >
                  <span>Ressources</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isOutilsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isOutilsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
                    <Link 
                      to="/cas-usage" 
                      className="block px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-muted transition-colors"
                      onClick={() => setIsOutilsOpen(false)}
                    >
                      Cas d'usage par secteur
                    </Link>
                    <Link 
                      to="/calculateur-roi" 
                      className="block px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-muted transition-colors"
                      onClick={() => setIsOutilsOpen(false)}
                    >
                      Calculateur ROI
                    </Link>
                    <Link 
                      to="/blog" 
                      className="block px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-muted transition-colors"
                      onClick={() => setIsOutilsOpen(false)}
                    >
                      Blog & Guides
                    </Link>
                  </div>
                )}
              </div>
              
              <Link 
                to="/faq" 
                className={`nav-link transition-colors ${
                  isActive('/faq') 
                    ? 'text-primary font-medium' 
                    : 'text-text-secondary hover:text-primary'
                }`}
                onClick={() => setIsOutilsOpen(false)}
              >
                FAQ
              </Link>
            </div>

            {/* Séparateur visuel */}
            <div className="w-px h-6 bg-border"></div>

            {/* 3. Contact & CTA */}
            <div className="flex items-center space-x-4">
              <Link 
                to="/contact" 
                className={`nav-link transition-colors ${
                  isActive('/contact') 
                    ? 'text-primary font-medium' 
                    : 'text-text-secondary hover:text-primary'
                }`}
                onClick={() => setIsOutilsOpen(false)}
              >
                Contact
              </Link>
              
              <Button
                onClick={() => window.location.href = '/contact'}
                className="inline-flex items-center justify-center btn-cta-hover bg-cta-primary hover:bg-cta-primary/90 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Obtenir un plan d'action personnalisé
              </Button>
            </div>
          </div>

          {/* Menu Mobile */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Navigation Mobile */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border mobile-menu-enter">
            <div className="flex flex-col space-y-6">
              
              {/* Groupe 1: Navigation Principale */}
              <div className="space-y-4">
                <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                  Navigation Principale
                </div>
                <Link 
                  to="/" 
                  className={`block nav-link transition-colors pl-4 ${
                    isActive('/') 
                      ? 'text-primary font-medium border-l-2 border-primary' 
                      : 'text-text-secondary hover:text-primary'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accueil
                </Link>
                <Link 
                  to="/solutions" 
                  className={`block nav-link transition-colors pl-4 ${
                    isActive('/solutions') 
                      ? 'text-primary font-medium border-l-2 border-primary' 
                      : 'text-text-secondary hover:text-primary'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Solutions
                </Link>
                <Link 
                  to="/methode" 
                  className={`block nav-link transition-colors pl-4 ${
                    isActive('/methode') 
                      ? 'text-primary font-medium border-l-2 border-primary' 
                      : 'text-text-secondary hover:text-primary'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Méthode
                </Link>
              </div>

              {/* Séparateur */}
              <div className="h-px bg-border"></div>

              {/* Groupe 2: Outils & Ressources */}
              <div className="space-y-4">
                <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                  Ressources & Outils
                </div>
                <Link 
                  to="/cas-usage" 
                  className="block nav-link text-text-secondary hover:text-primary transition-colors pl-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cas d'usage par secteur
                </Link>
                <Link 
                  to="/calculateur-roi" 
                  className="block nav-link text-text-secondary hover:text-primary transition-colors pl-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Calculateur ROI
                </Link>
                <Link 
                  to="/blog" 
                  className="block nav-link text-text-secondary hover:text-primary transition-colors pl-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog & Guides
                </Link>
                <Link 
                  to="/faq" 
                  className="block nav-link text-text-secondary hover:text-primary transition-colors pl-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
                <a 
                  href="#integrations" 
                  onClick={handleIntegrationsClick} 
                  className="block nav-link text-text-secondary hover:text-primary transition-colors pl-4"
                >
                  Intégrations
                </a>
              </div>

              {/* Séparateur */}
              <div className="h-px bg-border"></div>

              {/* Groupe 3: Contact & CTA */}
              <div className="space-y-4">
                <Link 
                  to="/contact" 
                  className={`block nav-link transition-colors pl-4 ${
                    isActive('/contact') 
                      ? 'text-primary font-medium border-l-2 border-primary' 
                      : 'text-text-secondary hover:text-primary'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="px-4">
                  <Button
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.location.href = '/contact';
                    }}
                    className="inline-flex items-center justify-center btn-cta-hover bg-cta-primary hover:bg-cta-primary/90 text-white w-full px-6 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Obtenir un plan d'action personnalisé
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Overlay pour fermer le dropdown Outils */}
        {isOutilsOpen && (
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setIsOutilsOpen(false)}
          />
        )}
      </nav>
    </header>
  );
};

export default Header;