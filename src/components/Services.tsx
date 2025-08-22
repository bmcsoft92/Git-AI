import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Mail, 
  Users, 
  FolderKanban,
  Target,
  BarChart3,
  UserCheck,
  Share2,
  FileText,
  Link,
  Calendar
} from "lucide-react";

const Services = () => {
  const automationServices = [
    {
      icon: MessageCircle,
      title: "Chatbots IA",
      description: "Répondez à vos clients 24/7 avec une IA conversationnelle à vos clients 24/7. Augmentez votre satisfaction tout en économisant du temps."
    },
    {
      icon: Mail,
      title: "Gestion des Emails",
      description: "Tri intelligent et réponses automatiques. Répartez le contenu de vos boîte mail et gagnez des heures."
    },
    {
      icon: Users,
      title: "CRM & Suivi des Clients",
      description: "Optimisez la gestion de vos contacts et transformez vos prospects en clients fidèles grâce à des workflows automatisés."
    },
    {
      icon: FolderKanban,
      title: "Gestion de Projet",
      description: "Mettez à jour automatiquement dans vos outils (Trello, Asana...). Équipe alignée et productive."
    },
    {
      icon: Target,
      title: "Génération de Leads",
      description: "Automatisez vos campagnes et multipliez vos prospects qualifiés sans effort."
    },
    {
      icon: BarChart3,
      title: "Analyse & Reporting Automatisé",
      description: "Recevez des rapports clairs sur vos performances sans passer des heures à analyser vos données."
    },
    {
      icon: UserCheck,
      title: "Recrutement & Onboarding",
      description: "Pré-sélection des candidats et navigation automatisée. Gagnez du temps sur chaque nouvelle embauche."
    },
    {
      icon: Share2,
      title: "Gestion des Réseaux Sociaux",
      description: "Planifiez et publiez automatiquement. Augmentez visibilité et engagement."
    },
    {
      icon: FileText,
      title: "Comptabilité & Facturation",
      description: "Envoyez vous et relances automatiques des factures, réduisez les impayés, suivez le RGPD."
    },
    {
      icon: Link,
      title: "Synchronisation d'Outils",
      description: "Reliez CRM, emailing, outils... Pour éviter les logiciels et ressources plus efficacement."
    },
    {
      icon: Calendar,
      title: "Planification & Prise de Rendez-vous",
      description: "Evitez les blocages d'agenda : prise de RDV 100 % automatisée."
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Badge SOLUTIONS */}
        <div className="flex justify-center mb-8">
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 text-primary">
            SOLUTIONS
          </Badge>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-heading mb-6">
            Découvrez tout ce que nous pouvons{" "}
            <span className="text-primary">automatiser</span> pour vous.
          </h2>
          <p className="text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Chaque organisation est unique. Voici comment nous aidons nos clients à gagner du 
            temps et à se concentrer sur ce qui compte :
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {automationServices.map((service, index) => (
            <Card 
              key={index} 
              className="group bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-lg font-semibold text-heading mb-3">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                  {service.description}
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-primary hover:text-primary/80 text-sm font-medium"
                >
                  Voir le workflow
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Badge COMPATIBILITÉ */}
        <div className="flex justify-center mb-12">
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 text-primary">
            COMPATIBILITÉ
          </Badge>
        </div>

        <div className="text-center">
          <Button variant="cta" size="lg" className="btn-cta-hover">
            Parler à un expert
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;