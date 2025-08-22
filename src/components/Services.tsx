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
      title: "Prenez des Décisions Plus Intelligentes",
      description: "Votre IA personnelle vous aide à faire les meilleurs choix pour votre entreprise, basés sur vos données réelles.",
      features: ["Conseils automatiques sur mesure", "Prédictions fiables", "Recommandations claires"]
    },
    {
      icon: Workflow,
      title: "Automatisez Vos Tâches Répétitives",
      description: "Libérez-vous des corvées administratives. Votre IA s'occupe de tout pendant que vous vous concentrez sur l'essentiel.",
      features: ["Processus automatiques", "Moins d'erreurs humaines", "Gain de temps immédiat"]
    },
    {
      icon: Bot,
      title: "Un Assistant qui Répond à Vos Clients 24h/24",
      description: "Votre IA répond instantanément à vos clients, même la nuit et le week-end, pour ne jamais manquer une vente.",
      features: ["Réponses instantanées", "Disponible en permanence", "S'améliore avec l'expérience"]
    },
    {
      icon: TrendingUp,
      title: "Boostez Votre Efficacité Opérationnelle",
      description: "Optimisez automatiquement votre organisation pour économiser du temps et de l'argent chaque jour.",
      features: ["Optimisation continue", "Allocation intelligente", "Prévisions précises"]
    },
    {
      icon: Users,
      title: "Coordonnez Vos Équipes Sans Effort",
      description: "Votre IA organise parfaitement le travail d'équipe, améliore la collaboration et booste la productivité.",
      features: ["Organisation automatique", "Planification optimale", "Coordination fluide"]
    },
    {
      icon: BarChart3,
      title: "Comprenez Votre Business en Temps Réel",
      description: "Des tableaux de bord qui vous révèlent instantanément ce qui marche, ce qui cloche et quoi faire ensuite.",
      features: ["Analyses automatiques", "Alertes intelligentes", "Actions recommandées"]
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-4">
            Solutions IA sans code
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            <strong className="text-heading">Automatisez vos processus en 2 semaines</strong> sans compétences techniques. 
            Notre intelligence artificielle identifie et optimise vos tâches répétitives pour un ROI immédiat.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl hover:scale-105 transition-all duration-300 hover:-translate-y-2 cursor-pointer border-l-4 border-l-transparent hover:border-l-primary"
            >
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <service.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <CardTitle className="text-xl text-heading group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary mb-4 group-hover:text-heading transition-colors duration-300">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-text-secondary group-hover:text-heading transition-colors duration-300">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  En savoir plus
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button variant="cta" size="lg">
            Réserver mon diagnostic gratuit
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;