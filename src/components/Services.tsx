import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Cog, 
  Zap, 
  Shield, 
  TrendingUp, 
  Wrench, 
  BarChart3 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Cog,
      title: "Automatisation des Processus",
      description: "Robotisation complète de vos chaînes de production avec des systèmes adaptatifs et intelligents.",
      features: ["Robots collaboratifs", "Vision industrielle", "Contrôle qualité automatisé"]
    },
    {
      icon: Zap,
      title: "Optimisation Énergétique",
      description: "Réduction de 40% de votre consommation énergétique grâce à nos algorithmes d'optimisation.",
      features: ["Smart grids", "Monitoring temps réel", "Prédiction énergétique"]
    },
    {
      icon: Shield,
      title: "Cybersécurité Industrielle",
      description: "Protection complète de vos systèmes industriels contre les cybermenaces avec notre approche OT/IT.",
      features: ["Audit sécurité", "Monitoring 24/7", "Réponse aux incidents"]
    },
    {
      icon: TrendingUp,
      title: "Industrie 4.0",
      description: "Transformation digitale complète avec IoT, IA et analytics avancés pour une usine connectée.",
      features: ["Capteurs IoT", "Intelligence artificielle", "Jumeaux numériques"]
    },
    {
      icon: Wrench,
      title: "Maintenance Prédictive",
      description: "Anticipez les pannes et optimisez la maintenance grâce à l'analyse prédictive avancée.",
      features: ["Analyse vibratoire", "Thermographie", "Algorithmes ML"]
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Tableaux de bord temps réel et analyses approfondies pour piloter votre performance industrielle.",
      features: ["KPIs temps réel", "Rapports automatisés", "Aide à la décision"]
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-4">
            Nos Solutions d'Automatisation
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Des technologies de pointe pour transformer votre industrie et maximiser 
            votre performance opérationnelle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl text-heading">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-text-secondary">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">
                  En savoir plus
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button variant="cta" size="lg">
            Consulter toutes nos solutions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;