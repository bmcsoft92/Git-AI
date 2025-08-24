import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Calendar, Target, TrendingUp, Clock, DollarSign, HelpCircle } from "lucide-react";
import { AppointmentBooking } from "./AppointmentBooking";
import { ContactForm } from "./ContactForm";

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
  userInfo: {
    name: string;
    email: string;
    company: string;
  };
}

export const ROIResults = ({ calculationId, recommendations, roiData, userInfo }: ROIResultsProps) => {
  const [showBooking, setShowBooking] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const priorityColors = {
    1: "bg-gradient-to-r from-primary to-primary/80",
    2: "bg-gradient-to-r from-primary/80 to-primary/60", 
    3: "bg-gradient-to-r from-primary/60 to-primary/40"
  };

  const priorityLabels = {
    1: "PRIORITÉ MAXIMALE",
    2: "PRIORITÉ ÉLEVÉE",
    3: "PRIORITÉ STANDARD"
  };

  const getRecommendationIcon = (title: string) => {
    if (title.toLowerCase().includes('email') || title.toLowerCase().includes('communication')) return '📧';
    if (title.toLowerCase().includes('crm') || title.toLowerCase().includes('client')) return '👥';
    if (title.toLowerCase().includes('reporting') || title.toLowerCase().includes('tableau')) return '📊';
    if (title.toLowerCase().includes('comptab') || title.toLowerCase().includes('finance')) return '💰';
    if (title.toLowerCase().includes('stock') || title.toLowerCase().includes('inventaire')) return '📦';
    if (title.toLowerCase().includes('marketing') || title.toLowerCase().includes('lead')) return '🎯';
    return '⚡';
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
        
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-3 bg-primary/10 px-6 py-4 rounded-xl border border-primary/20 cursor-help hover:bg-primary/15 transition-colors">
                  <DollarSign className="h-6 w-6 text-primary" />
                  <div className="text-left">
                    <div className="font-bold text-2xl text-primary">{roiData.annual_savings.toLocaleString('fr-FR')}€</div>
                    <div className="text-sm text-primary/80">d'économies annuelles</div>
                  </div>
                  <HelpCircle className="h-4 w-4 text-primary/60" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-4">
                <div className="text-sm">
                  <div className="font-semibold mb-2">Économies Directes Annuelles :</div>
                  <div className="text-xs space-y-1">
                    <div>Formule : <strong>Heures automatisées × 46 semaines × Employés × Taux horaire</strong></div>
                    <div>Ces économies représentent la valeur du temps libéré grâce à l'automatisation de vos tâches répétitives.</div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-3 bg-primary/10 px-6 py-4 rounded-xl border border-primary/20 cursor-help hover:bg-primary/15 transition-colors">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <div className="text-left">
                    <div className="font-bold text-2xl text-primary">{roiData.roi_percentage}%</div>
                    <div className="text-sm text-primary/80">de ROI</div>
                  </div>
                  <HelpCircle className="h-4 w-4 text-primary/60" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-4">
                <div className="text-sm">
                  <div className="font-semibold mb-2">ROI Stratégique :</div>
                  <div className="text-xs space-y-1">
                    <div>Formule : <strong>((Gains totaux - Investissement) / Investissement) × 100</strong></div>
                    <div>Inclut les économies directes + 25% du temps réinvesti dans des activités à plus forte valeur ajoutée (×1.5 le taux horaire).</div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Recommandations */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center mb-8">
          Vos 3 Chantiers Prioritaires Recommandés
        </h2>
        
        {recommendations.map((rec, index) => (
          <Card key={index} className="overflow-hidden border-l-4 border-l-primary hover:shadow-xl transition-all duration-300 card-hover">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge 
                      className={`${priorityColors[rec.priority as keyof typeof priorityColors]} text-white font-semibold px-4 py-2 shadow-lg`}
                    >
                      {priorityLabels[rec.priority as keyof typeof priorityLabels]}
                    </Badge>
                    <span className="text-3xl font-bold text-primary">#{rec.priority}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{getRecommendationIcon(rec.title)}</div>
                    <CardTitle className="text-xl text-primary leading-tight">
                      {rec.title}
                    </CardTitle>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <p className="text-foreground leading-relaxed text-base">
                {rec.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-primary/5 rounded-xl border border-primary/10">
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary">ROI Estimé</p>
                    <p className="font-bold text-primary text-lg">{rec.estimatedROI}</p>
                  </div>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary">Délai</p>
                    <p className="font-bold text-primary text-lg">{rec.timeline}</p>
                  </div>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary">Impact</p>
                    <p className="font-bold text-primary text-lg">Élevé</p>
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
          Planifiez un entretien avec nos experts pour discuter de la mise en œuvre de ces recommandations
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => setShowBooking(true)}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Réserver un Entretien
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => setShowContact(true)}
          >
            Nous Contacter Directement
          </Button>
        </div>
      </div>

      {/* Modals */}
      {showBooking && (
        <AppointmentBooking 
          calculationId={calculationId}
          onClose={() => setShowBooking(false)}
          userInfo={{ name: userInfo.name, email: userInfo.email }}
        />
      )}
      
      {showContact && (
        <ContactForm 
          onClose={() => setShowContact(false)}
          userInfo={userInfo}
        />
      )}
    </div>
  );
};