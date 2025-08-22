import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

const FinalCTA = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Appelez-nous",
      info: "+33 1 23 45 67 89",
      subtitle: "Disponible 9h-18h",
      action: "tel:+33123456789"
    },
    {
      icon: Mail,
      title: "Écrivez-nous",
      info: "contact@maia-elange.com",
      subtitle: "Réponse sous 2h",
      action: "mailto:contact@maia-elange.com"
    },
    {
      icon: MapPin,
      title: "Visitez-nous",
      info: "Paris, Lyon, Marseille",
      subtitle: "Bureaux & partenaires",
      action: "#"
    }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Principal */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-4">
            Prêt à Automatiser?
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Rejoignez les <strong className="text-primary">300+ entreprises</strong> qui ont déjà transformé 
            leur organisation avec nos solutions d'automatisation IA.
          </p>
          
          {/* Double CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="group font-semibold btn-cta-hover bg-cta-primary hover:bg-cta-primary/90 text-cta-primary-foreground px-8 py-4 text-lg"
            >
              Diagnostic Gratuit (2h sur site)
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg"
            >
              Calculer mon ROI
            </Button>
          </div>

          {/* Garanties */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="outline" className="text-success border-success/30 bg-success/10 px-4 py-2">
              ✓ Sans engagement
            </Badge>
            <Badge variant="outline" className="text-success border-success/30 bg-success/10 px-4 py-2">
              ✓ Facturation au temps passé
            </Badge>
            <Badge variant="outline" className="text-success border-success/30 bg-success/10 px-4 py-2">
              ✓ Sur devis personnalisé
            </Badge>
          </div>
        </div>

        {/* Méthodes de Contact */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-heading text-center mb-8">
            Comment nous contacter
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer card-hover border-l-4 border-l-transparent hover:border-l-primary"
                onClick={() => {
                  if (method.action.startsWith('tel:') || method.action.startsWith('mailto:')) {
                    window.location.href = method.action;
                  }
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <method.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-heading mb-2 group-hover:text-primary transition-colors duration-300">
                    {method.title}
                  </h4>
                  
                  <div className="text-primary font-semibold mb-1">
                    {method.info}
                  </div>
                  
                  <div className="text-sm text-text-secondary group-hover:text-heading transition-colors duration-300">
                    {method.subtitle}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Message de confiance final */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/5 to-cta-primary/5 rounded-lg border border-primary/20">
          <p className="text-lg text-text-secondary mb-4">
            <strong className="text-primary">15 ans d'expertise</strong> • <strong className="text-primary">300+ clients satisfaits</strong> • <strong className="text-primary">95% de taux de succès</strong>
          </p>
          <p className="text-text-secondary">
            Votre succès est notre priorité. Nous nous engageons sur vos résultats.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;