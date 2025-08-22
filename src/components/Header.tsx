import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-heading">AutomaTech</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#solutions" className="text-text-secondary hover:text-primary transition-colors">
              Solutions
            </a>
            <a href="#expertise" className="text-text-secondary hover:text-primary transition-colors">
              Expertise
            </a>
            <a href="#contact" className="text-text-secondary hover:text-primary transition-colors">
              Contact
            </a>
            <Button variant="outline" size="sm">
              En savoir plus
            </Button>
            <Button variant="cta" size="sm">
              Demander une démo
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
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <a href="#solutions" className="text-text-secondary hover:text-primary transition-colors">
                Solutions
              </a>
              <a href="#expertise" className="text-text-secondary hover:text-primary transition-colors">
                Expertise
              </a>
              <a href="#contact" className="text-text-secondary hover:text-primary transition-colors">
                Contact
              </a>
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="outline" size="sm">
                  En savoir plus
                </Button>
                <Button variant="cta" size="sm">
                  Demander une démo
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