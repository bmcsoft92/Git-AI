import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Target, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeaseGuideIATPE = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-br from-success/5 via-background to-success/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-card/80 to-success/5 backdrop-blur-sm border border-success/20 hover:shadow-xl hover:shadow-success/10 transition-all duration-300">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <Badge className="mb-4 bg-success/10 text-success border-success/30">
                <BookOpen className="w-4 h-4 mr-2" />
                GUIDE PRATIQUE
              </Badge>
              <h2 className="text-2xl lg:text-3xl font-bold text-heading mb-4">
                📖 Découvrez notre guide pratique
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                <strong>L'IA pour les TPE :</strong> 4 étapes simples pour identifier vos premières automatisations et gagner du temps.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-semibold text-heading mb-2">Méthode Simple</h3>
                <p className="text-sm text-text-secondary">4 étapes claires avec des exemples concrets</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-semibold text-heading mb-2">Gains Immédiats</h3>
                <p className="text-sm text-text-secondary">Libérez 5 à 15h par semaine dès la première automatisation</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-semibold text-heading mb-2">Checklist Pratique</h3>
                <p className="text-sm text-text-secondary">Outils et étapes à suivre pour votre première automation</p>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={() => navigate('/guide-ia-tpe')}
                variant="secondary"
                size="lg"
                className="px-8 py-4 text-lg bg-success/10 text-success border-success/30 hover:bg-success/20 group/guide"
              >
                Lire le guide complet
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover/guide:translate-x-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TeaseGuideIATPE;