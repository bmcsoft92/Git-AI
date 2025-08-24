import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Mail, Users, MessageSquare, Video, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Integrations = () => {
  const navigate = useNavigate();

  const integrations = [
    {
      id: "google-workspace",
      name: "Google Workspace",
      description: "Docs / Sheets / Gmail",
      icon: Globe,
      color: "text-red-500"
    },
    {
      id: "outlook",
      name: "Outlook", 
      description: "Mail & Calendrier",
      icon: Mail,
      color: "text-blue-600"
    },
    {
      id: "salesforce",
      name: "Salesforce",
      description: "CRM & Ventes", 
      icon: Briefcase,
      color: "text-blue-400"
    },
    {
      id: "slack",
      name: "Slack",
      description: "Communication & Support",
      icon: MessageSquare,
      color: "text-purple-500"
    },
    {
      id: "teams",
      name: "Teams",
      description: "Opérations & Collaboration",
      icon: Video,
      color: "text-purple-600"
    },
    {
      id: "linkedin", 
      name: "LinkedIn",
      description: "Prospection & Recrutement",
      icon: Users,
      color: "text-blue-700"
    }
  ];

  return (
    <section id="integrations" className="py-20 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Badge COMPATIBILITÉ */}
        <div className="flex justify-center mb-8">
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 text-primary">
            COMPATIBILITÉ
          </Badge>
        </div>

        {/* Title and Description */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-heading mb-6">
            S'intègre parfaitement avec{" "}
            <span className="text-primary">vos outils actuels</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Nous connectons vos outils existants à nos systèmes d'automatisation pour plus de fluidité et d'efficacité, sans refonte technique inutile.
          </p>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {integrations.map((integration, index) => {
            const IconComponent = integration.icon;
            return (
              <Card 
                key={integration.id}
                className="group cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform 
                           hover:scale-[1.05] hover:-translate-y-3 hover:shadow-2xl
                           bg-card/80 backdrop-blur-sm border border-border/30 
                           hover:border-primary hover:shadow-primary/40 hover:bg-card/90
                           animate-fade-in
                           relative overflow-hidden
                           before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent 
                           before:opacity-0 before:transition-opacity before:duration-700 hover:before:opacity-100"
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  animationFillMode: 'both'
                }}
              >
                <CardHeader className="text-center pb-3 pt-6 relative">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-xl bg-background/80 flex items-center justify-center
                                  transition-all duration-700 ease-out group-hover:bg-primary/15 group-hover:scale-125 
                                  border border-border/20 group-hover:border-primary/60
                                  relative overflow-hidden
                                  before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/20 before:to-transparent 
                                  before:opacity-0 before:transition-all before:duration-700 group-hover:before:opacity-100
                                  after:absolute after:inset-0 after:rounded-xl after:border after:border-primary/30 
                                  after:opacity-0 after:transition-all after:duration-700 after:animate-pulse 
                                  group-hover:after:opacity-100 group-hover:after:shadow-[0_0_20px_rgba(var(--primary),0.4)]">
                      <IconComponent 
                        className={`w-8 h-8 ${integration.color} transition-all duration-700 ease-out 
                                   group-hover:scale-125 group-hover:rotate-12 group-hover:drop-shadow-lg
                                   relative z-10`}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                  <CardTitle className="text-base font-semibold text-heading group-hover:text-primary 
                                     transition-all duration-500 ease-out transform group-hover:scale-105
                                     group-hover:drop-shadow-sm">
                    {integration.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0 pb-6 relative">
                  <p className="text-xs text-text-secondary group-hover:text-primary/90 
                               transition-all duration-500 ease-out transform group-hover:scale-102
                               group-hover:font-medium group-hover:drop-shadow-sm">
                    {integration.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional tools mention */}
        <div className="text-center mt-8 mb-16">
          <p className="text-sm text-text-secondary/70">
            Et bien d'autres via API (Notion, Trello, CRM internes…).
          </p>
        </div>

        {/* Custom Integration Text and CTA */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '1.5s', animationFillMode: 'both' }}>
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-lg text-text-secondary leading-relaxed">
              Si votre outil n'apparaît pas, nous développons un connecteur API spécifique pour qu'il s'intègre à votre écosystème.
            </p>
          </div>
          <Button 
            onClick={() => navigate('/calculateur-roi')}
            variant="cta"
            size="lg"
            className="px-8 py-4 text-lg font-semibold group/cta transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
          >
            Vérifier la compatibilité de vos outils
          </Button>
          <p className="text-xs text-text-secondary/70 mt-2 italic">
            Vérification simple basée sur vos outils actuels.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Integrations;