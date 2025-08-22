import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Brain, 
  Workflow, 
  Bot, 
  TrendingUp, 
  Users, 
  BarChart3 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Brain,
      title: "IA Décisionnelle",
      description: "Systèmes d'aide à la décision basés sur l'intelligence artificielle pour optimiser vos choix stratégiques.",
      features: ["Machine Learning avancé", "Analyse prédictive", "Recommandations intelligentes"]
    },
    {
      icon: Workflow,
      title: "Automatisation des Workflows",
      description: "Orchestration intelligente de vos processus métier avec des workflows adaptatifs et auto-optimisés.",
      features: ["Processus automatisés", "Gestion des exceptions", "Optimisation continue"]
    },
    {
      icon: Bot,
      title: "Agents IA Conversationnels",
      description: "Assistants virtuels intelligents pour automatiser les interactions client et les tâches répétitives.",
      features: ["Chatbots avancés", "Traitement du langage naturel", "Apprentissage continu"]
    },
    {
      icon: TrendingUp,
      title: "Optimisation IA des Opérations",
      description: "Algorithmes d'intelligence artificielle pour maximiser l'efficacité opérationnelle de votre organisation.",
      features: ["Optimisation en temps réel", "Allocation intelligente des ressources", "Prévision de charge"]
    },
    {
      icon: Users,
      title: "IA Collaborative",
      description: "Solutions d'intelligence collective pour améliorer la collaboration et la productivité des équipes.",
      features: ["Matching intelligent", "Planification automatisée", "Coordination d'équipes"]
    },
    {
      icon: BarChart3,
      title: "Analytics IA Avancés",
      description: "Tableaux de bord intelligents avec insights automatiques et recommandations basées sur l'IA.",
      features: ["Insights automatiques", "Détection d'anomalies", "Prédictions métier"]
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-4">
            Solutions IA pour Organisations
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Intelligence artificielle appliquée à l'automatisation de vos processus 
            organisationnels pour une efficacité et une performance maximales.
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
            Explorer toutes nos solutions IA
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;