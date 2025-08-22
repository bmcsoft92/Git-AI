import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Integrations = () => {
  const integrations = [
    {
      id: "google-workspace",
      name: "Google Workspace",
      description: "Docs / Sheets / Gmail",
      logo: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3e%3cpath fill='%23ffc107' d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'/%3e%3cpath fill='%23ff3d00' d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'/%3e%3cpath fill='%234caf50' d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'/%3e%3cpath fill='%231976d2' d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'/%3e%3c/svg%3e"
    },
    {
      id: "outlook",
      name: "Outlook", 
      description: "Mail & Calendrier",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg"
    },
    {
      id: "salesforce",
      name: "Salesforce",
      description: "CRM & Ventes", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg"
    },
    {
      id: "slack",
      name: "Slack",
      description: "Communication & Support",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg"
    },
    {
      id: "teams",
      name: "Teams",
      description: "Opérations & Collaboration",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg"
    },
    {
      id: "linkedin", 
      name: "LinkedIn",
      description: "Prospection & Recrutement",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
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
                  <div className="w-16 h-16 rounded-lg bg-background/80 flex items-center justify-center
                                transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 border border-border/20
                                group-hover:border-primary/40">
                    <img 
                      src={integration.logo} 
                      alt={`${integration.name} logo`}
                      className="w-10 h-10 transition-transform duration-300 group-hover:scale-110 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
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