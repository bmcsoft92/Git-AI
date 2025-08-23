import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, TrendingUp, Clock, DollarSign } from "lucide-react";
import { AppointmentBooking } from "./AppointmentBooking";

interface ROIResultsProps {
  calculationId: string;
  recommendations: Array<{
    title: string;
    description: string;
    estimatedROI: string;
    timeline: string;
    impact: string;
    priority: number;
  }>;
  roiData: {
    annual_savings: number;
    roi_percentage: number;
    investment: number;
  };
}

export const ROIResults = ({ calculationId, recommendations, roiData }: ROIResultsProps) => {
  const [showBooking, setShowBooking] = useState(false);

  const priorityColors = {
    1: "bg-gradient-to-r from-green-500 to-emerald-600",
    2: "bg-gradient-to-r from-blue-500 to-blue-600", 
    3: "bg-gradient-to-r from-purple-500 to-purple-600"
  };

  const priorityLabels = {
    1: "PRIORITÉ HAUTE",
    2: "PRIORITÉ MOYENNE",
    3: "PRIORITÉ STANDARD"
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
      {/* Header avec résultats ROI */}
      <div className="text-center space-y-4 p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl border border-primary/20">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Vos Résultats d'Analyse ROI
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Basé sur vos données, voici vos 3 chantiers d'automatisation prioritaires pour maximiser votre ROI
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-lg border">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span className="font-semibold">{roiData.annual_savings.toLocaleString('fr-FR')}€ d'économies/an</span>
          </div>
          <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-lg border">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="font-semibold">{roiData.roi_percentage}% de ROI</span>
          </div>
        </div>
      </div>

      {/* Recommandations */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center mb-8">
          Vos 3 Chantiers Prioritaires Recommandés
        </h2>
        
        {recommendations.map((rec, index) => (
          <Card key={index} className="overflow-hidden border-l-4 border-l-primary hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Badge 
                      className={`${priorityColors[rec.priority as keyof typeof priorityColors]} text-white font-medium px-3 py-1`}
                    >
                      {priorityLabels[rec.priority as keyof typeof priorityLabels]}
                    </Badge>
                    <span className="text-2xl font-bold text-primary">#{rec.priority}</span>
                  </div>
                  <CardTitle className="text-xl text-primary">
                    {rec.title}
                  </CardTitle>
                </div>
                <Target className="h-8 w-8 text-primary/40" />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">
                {rec.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">ROI Estimé</p>
                    <p className="font-semibold text-green-600">{rec.estimatedROI}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Délai</p>
                    <p className="font-semibold text-blue-600">{rec.timeline}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Impact</p>
                    <p className="font-semibold text-purple-600">{rec.impact}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-6 p-8 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20">
        <h3 className="text-2xl font-bold">
          Prêt à passer à l'action ?
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Planifiez un entretien gratuit avec nos experts pour discuter de la mise en œuvre de ces recommandations
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => setShowBooking(true)}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Réserver un Entretien Gratuit
          </Button>
          
          <Button variant="outline" size="lg" asChild>
            <a href="mailto:contact@maiaelange.fr">
              Nous Contacter Directement
            </a>
          </Button>
        </div>
      </div>

      {/* Modal de réservation */}
      {showBooking && (
        <AppointmentBooking 
          calculationId={calculationId}
          onClose={() => setShowBooking(false)}
        />
      )}
    </div>
  );
};