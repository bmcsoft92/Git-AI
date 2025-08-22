import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const AutomationCTA = () => {
  return (
    <section id="simulateur" className="py-20 relative overflow-hidden" style={{ backgroundColor: '#0E1A1A' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card 
            className="border-0 shadow-2xl overflow-hidden"
            style={{ 
              backgroundColor: 'rgba(31, 41, 55, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(15, 127, 123, 0.2)'
            }}
          >
            <CardContent className="p-12">
              {/* Titre principal */}
              <h2 
                className="text-4xl lg:text-5xl font-bold mb-8"
                style={{ color: '#F5F5F5' }}
              >
                Prêt à{' '}
                <span 
                  className="relative inline-block"
                  style={{ color: '#FF8C42' }}
                >
                  automatiser
                </span>
                {' '}?
              </h2>

              {/* Description */}
              <div className="space-y-4 mb-10">
                <p 
                  className="text-lg lg:text-xl"
                  style={{ color: '#F5F5F5' }}
                >
                  10 questions pour évaluer rapidement votre potentiel d'automatisation.
                </p>
                <p 
                  className="text-base lg:text-lg"
                  style={{ color: '#F5F5F5' }}
                >
                  Recevez un récapitulatif par e-mail et une proposition d'actions prioritaires.
                </p>
              </div>

              {/* Bouton CTA */}
              <Link to="/calculateur-roi">
                <Button
                  size="lg"
                  className="group px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{
                    backgroundColor: '#FF8C42',
                    color: '#F5F5F5',
                    borderRadius: '8px',
                    boxShadow: '0 8px 25px rgba(255, 140, 66, 0.3)'
                  }}
                >
                  Calculer votre ROI
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>

              {/* Message de confiance */}
              <div className="mt-8 pt-6 border-t border-gray-600">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Shield className="h-4 w-4" style={{ color: '#0F7F7B' }} />
                  <span 
                    className="text-sm font-medium"
                    style={{ color: '#0F7F7B' }}
                  >
                    100% Confidentiel
                  </span>
                </div>
                <p 
                  className="text-sm opacity-80"
                  style={{ color: '#F5F5F5' }}
                >
                  Des réponses claires pour décider sereinement. L'IA vous assiste, elle ne remplace pas votre expertise.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AutomationCTA;