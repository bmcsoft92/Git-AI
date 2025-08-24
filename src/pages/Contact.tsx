import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Clock, Phone, ArrowRight, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    entreprise: "",
    message: ""
  });

  useEffect(() => {
    document.title = "Contact | Maia Elange";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contactez Maia Elange pour discuter de vos besoins en automatisation IA. Planifiez un échange direct ou demandez un plan d\'action personnalisé.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', 'Contactez Maia Elange pour discuter de vos besoins en automatisation IA. Planifiez un échange direct ou demandez un plan d\'action personnalisé.');
      document.head.appendChild(metaDescription);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.nom || !formData.email || !formData.message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    // Simulation d'envoi
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les 24h. Merci pour votre intérêt.",
    });

    // Reset du formulaire
    setFormData({
      nom: "",
      email: "",
      entreprise: "",
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 text-primary">
                CONTACT
              </Badge>
            </div>

            {/* Titre principal H1 */}
            <div className="text-center mb-16">
              <h1 className="text-3xl lg:text-5xl font-bold text-heading mb-6">
                Contactez{" "}
                <span className="text-primary">Maia Elange</span>
              </h1>
              <p className="text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed">
                Discutons de vos besoins en automatisation. Notre équipe d'experts 
                vous accompagne de l'analyse à la mise en œuvre.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Formulaire de contact */}
              <Card className="bg-card/80 backdrop-blur-sm border border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold text-heading">
                    <Send className="h-6 w-6 text-primary" />
                    Envoyez-nous un message
                  </CardTitle>
                  <p className="text-text-secondary">
                    Décrivez votre projet et nous vous recontacterons rapidement.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nom">Nom complet *</Label>
                        <Input
                          id="nom"
                          value={formData.nom}
                          onChange={(e) => handleInputChange("nom", e.target.value)}
                          placeholder="Votre nom"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="votre@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="entreprise">Entreprise / Organisation</Label>
                      <Input
                        id="entreprise"
                        value={formData.entreprise}
                        onChange={(e) => handleInputChange("entreprise", e.target.value)}
                        placeholder="Nom de votre organisation"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Décrivez votre projet, vos besoins en automatisation, vos objectifs..."
                        rows={6}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      variant="cta"
                      size="lg"
                      className="w-full group/cta"
                    >
                      Envoyer le message
                      <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover/cta:translate-x-1" />
                    </Button>
                    
                    <p className="text-sm text-text-secondary text-center">
                      En soumettant ce formulaire, vous acceptez d'être recontacté par Maia Elange 
                      concernant votre demande. Vos données sont traitées selon notre politique de confidentialité.
                    </p>
                  </form>
                </CardContent>
              </Card>

              {/* Informations de contact */}
              <div className="space-y-8">
                <Card className="bg-card/80 backdrop-blur-sm border border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl font-bold text-heading">
                      <MapPin className="h-6 w-6 text-primary" />
                      Nos coordonnées
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/20 rounded-lg flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-heading mb-1">Adresse</h3>
                        <p className="text-text-secondary">
                          60 rue François Ier<br />
                          75008 Paris, France
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/20 rounded-lg flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-heading mb-1">Email</h3>
                        <a 
                          href="mailto:contact@maiaelange.fr" 
                          className="text-primary hover:text-cta-primary transition-colors"
                        >
                          contact@maiaelange.fr
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/20 rounded-lg flex-shrink-0">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-heading mb-1">Horaires</h3>
                        <p className="text-text-secondary">
                          Lun-Ven : 9h-18h<br />
                          Sam : 9h-12h<br />
                          Dim : Fermé
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-cta-primary/10 to-primary/10 backdrop-blur-sm border border-primary/30">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-heading mb-4">
                      Pourquoi nous choisir ?
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-text-secondary">Réponse sous 24h garantie</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-text-secondary">Accompagnement personnalisé</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-text-secondary">Conformité RGPD garantie</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;