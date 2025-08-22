import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false); // Fermer le menu mobile si ouvert
  };

  const handleSolutionsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const solutionsSection = document.getElementById('solutions');
    if (solutionsSection) {
      solutionsSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Fermer le menu mobile si ouvert
  };

  const handleIntegrationsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const integrationsSection = document.getElementById('integrations');
    if (integrationsSection) {
      integrationsSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Fermer le menu mobile si ouvert
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center glow-hover">
                <img 
                  src="/lovable-uploads/8d8704c1-3e0c-4716-b520-20779aef37e0.png" 
                  alt="Maia Elange Logo" 
                  className="w-full h-full rounded-lg transition-transform duration-300 hover:scale-110" 
                />
              </div>
              <h1 className="text-2xl font-bold text-heading">Maia Elange</h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" onClick={handleHomeClick} className="nav-link text-text-secondary hover:text-primary transition-colors">
              Accueil
            </Link>
            <a href="#solutions" onClick={handleSolutionsClick} className="nav-link text-text-secondary hover:text-primary transition-colors">
              Solutions
            </a>
            <a href="#integrations" onClick={handleIntegrationsClick} className="nav-link text-text-secondary hover:text-primary transition-colors">
              Intégrations
            </a>
            <a href="#processus" className="nav-link text-text-secondary hover:text-primary transition-colors">
              Méthode
            </a>
            <a href="#simulateur" className="nav-link text-text-secondary hover:text-primary transition-colors">
              Simulateur ROI
            </a>
            <a href="#faq" className="nav-link text-text-secondary hover:text-primary transition-colors">
              FAQ
            </a>
            <a href="#contact" className="nav-link text-text-secondary hover:text-primary transition-colors">
              Contact
            </a>
            <Button className="btn-cta-hover bg-cta-primary hover:bg-cta-primary/90 text-white">
              Parler à un expert
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border mobile-menu-enter">
            <div className="flex flex-col space-y-4">
              <Link to="/" onClick={handleHomeClick} className="nav-link text-text-secondary hover:text-primary transition-colors">
                Accueil
              </Link>
              <a href="#solutions" onClick={handleSolutionsClick} className="nav-link text-text-secondary hover:text-primary transition-colors">
                Solutions
              </a>
              <a href="#integrations" onClick={handleIntegrationsClick} className="nav-link text-text-secondary hover:text-primary transition-colors">
                Intégrations
              </a>
              <a href="#processus" className="nav-link text-text-secondary hover:text-primary transition-colors">
                Méthode
              </a>
              <a href="#simulateur" className="nav-link text-text-secondary hover:text-primary transition-colors">
                Simulateur ROI
              </a>
              <a href="#faq" className="nav-link text-text-secondary hover:text-primary transition-colors">
                FAQ
              </a>
              <a href="#contact" className="nav-link text-text-secondary hover:text-primary transition-colors">
                Contact
              </a>
              <div className="flex flex-col gap-2 pt-2">
                <Button className="btn-cta-hover bg-cta-primary hover:bg-cta-primary/90 text-white">
                  Parler à un expert
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;