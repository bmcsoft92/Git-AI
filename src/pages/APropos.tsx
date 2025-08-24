import { useEffect } from "react";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Target, Eye, Award, Users, Zap, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const APropos = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "À propos de Maïa Elange | Automatisation Intelligente & Transformation Digitale";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Découvrez Maïa Elange : notre mission, vision et valeurs pour l\'automatisation intelligente et la transformation digitale des organisations.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', 'Découvrez Maïa Elange : notre mission, vision et valeurs pour l\'automatisation intelligente et la transformation digitale des organisations.');
      document.head.appendChild(metaDescription);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 border-primary/30 text-primary hover:bg-primary/10"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 border-primary/30 text-primary hover:bg-primary/10"
              >
                <Home className="h-4 w-4" />
                Accueil
              </Button>
            </div>

            {/* Badge */}
            <div className="flex justify-center mb-8">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 text-primary">
                À PROPOS
              </Badge>
            </div>

            {/* Titre principal H1 */}
            <div className="text-center mb-16">
              <h1 className="text-3xl lg:text-5xl font-bold text-heading mb-6">
                À propos de{" "}
                <span className="text-primary">Maïa Elange</span>
              </h1>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="bg-card/80 backdrop-blur-sm border border-primary/20">
                <CardContent className="p-8 lg:p-12">
                  <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
                    <p>
                      Maïa Elange accompagne les entreprises à libérer du temps et à sécuriser leur croissance grâce à l'automatisation intelligente.
                    </p>
                    
                    <p>
                      <span className="font-semibold text-heading">Notre mission :</span> transformer vos processus répétitifs en leviers de performance mesurable.
                    </p>
                    
                    <p>
                      <span className="font-semibold text-heading">Notre approche :</span> pragmatique, sobre et premium – chaque projet est conçu sur-mesure et validé par un diagnostic ROI clair.
                    </p>
                    
                    <p>
                      Nous croyons en une transformation digitale alignée sur vos objectifs, vos équipes et vos résultats.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default APropos;