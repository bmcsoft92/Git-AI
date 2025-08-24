import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Clock, Phone, ArrowRight, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/Footer";

const Contact = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    document.title = "Nous Contacter Directement | Maia Elange";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contactez directement Maia Elange pour vos projets d\'automatisation IA. Formulaire simple et sécurisé. Réponse sous 48h ouvrées garantie.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', 'Contactez directement Maia Elange pour vos projets d\'automatisation IA. Formulaire simple et sécurisé. Réponse sous 48h ouvrées garantie.');
      document.head.appendChild(metaDescription);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-message', {
        body: {
          name: formData.nom,
          email: formData.email,
          company: "",
          message: formData.message,
          source: 'contact_page'
        }
      });

      if (error) throw error;

      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons sous 48h ouvrées. Merci pour votre intérêt.",
      });

      // Reset du formulaire
      setFormData({
        nom: "",
        email: "",
        message: ""
      });
    } catch (error) {
      console.error('Error sending contact message:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive"
      });
    }
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
            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 border-primary/30 text-primary hover:bg-primary/10"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 border-primary/30 text-primary hover:bg-primary/10"
              >
                <Home className="h-4 w-4" />
                Accueil
              </Button>
            </div>

            {/* Badge */}
            <div className="flex justify-center mb-8">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 text-primary">
                CONTACT
              </Badge>
            </div>

            {/* Titre principal H1 */}
            <div className="text-center mb-16">
              <h1 className="text-3xl lg:text-5xl font-bold text-heading mb-6">
                Nous Contacter{" "}
                <span className="text-primary">Directement</span>
              </h1>
              <p className="text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed">
                Un projet d'automatisation en tête ? Contactez-nous directement via ce formulaire simple et sécurisé.
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
                    <div className="space-y-4">
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
                    </div>
                    
                    <Button 
                      type="submit"
                      variant="cta"
                      size="lg"
                      className="w-full group/cta"
                    >
                      Envoyer mon message
                      <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover/cta:translate-x-1" />
                    </Button>
                    
                    <div className="space-y-3 text-center">
                      <p className="text-sm text-primary font-medium">
                        📞 Réponse sous 48h ouvrées
                      </p>
                      
                      <p className="text-xs text-text-secondary">
                        Vos données sont utilisées uniquement pour répondre à votre message.<br />
                        Elles ne seront jamais partagées.
                      </p>
                    </div>
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
                        <span className="text-sm text-text-secondary">Réponse sous 48h ouvrées</span>
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