import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Integrations = () => {
  const integrations = [
    {
      id: "google-workspace",
      name: "Google Workspace",
      description: "Docs / Sheets / Gmail",
      bgColor: "from-red-500/10 to-yellow-500/10",
      iconColor: "text-yellow-500"
    },
    {
      id: "outlook",
      name: "Outlook", 
      description: "Mail & Calendrier",
      bgColor: "from-blue-600/10 to-blue-500/10",
      iconColor: "text-blue-600"
    },
    {
      id: "salesforce",
      name: "Salesforce",
      description: "CRM & Ventes", 
      bgColor: "from-blue-400/10 to-cyan-400/10",
      iconColor: "text-blue-400"
    },
    {
      id: "slack",
      name: "Slack",
      description: "Communication & Support",
      bgColor: "from-green-500/10 to-purple-500/10", 
      iconColor: "text-green-500"
    },
    {
      id: "teams",
      name: "Teams",
      description: "Opérations & Collaboration",
      bgColor: "from-purple-600/10 to-blue-600/10",
      iconColor: "text-purple-600"
    },
    {
      id: "linkedin", 
      name: "LinkedIn",
      description: "Prospection & Recrutement",
      bgColor: "from-blue-700/10 to-blue-600/10",
      iconColor: "text-blue-700"
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
            Nous branchons l'IA à vos plateformes existantes pour des flux plus fluides et efficaces — sans refonte lourde.
          </p>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {integrations.map((integration, index) => (
            <Card 
              key={integration.id}
              className="group cursor-pointer transition-all duration-300 ease-out transform hover:scale-[1.02] hover:-translate-y-2
                         bg-card/80 border-border/30 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/20
                         animate-fade-in"
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              <CardHeader className="text-center pb-3 pt-6">
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${integration.bgColor} flex items-center justify-center
                                transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 border border-border/20
                                group-hover:border-primary/40`}>
                    <div className={`w-8 h-8 rounded-md ${integration.iconColor} bg-current/20 
                                   transition-transform duration-300 group-hover:scale-110 relative`}>
                      <div className={`absolute inset-1 rounded ${integration.iconColor} bg-current opacity-80`}></div>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-base font-semibold text-heading group-hover:text-primary transition-colors duration-300">
                  {integration.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0 pb-6">
                <p className="text-xs text-text-secondary group-hover:text-text-secondary/90 transition-colors duration-300">
                  {integration.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-block">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-xl font-semibold text-heading mb-4">
                Plus de 100+ intégrations disponibles
              </h3>
              <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                Votre outil n'est pas dans la liste ? Nous créons des connecteurs sur-mesure 
                pour s'adapter parfaitement à votre écosystème technologique.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integrations;