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
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <h1 className="text-2xl font-bold text-heading">Maia Elange</h1>
            </div>
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
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              diagnostic gratuit
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
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  diagnostic gratuit
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