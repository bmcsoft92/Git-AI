import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-4">
            Parlons de Votre Projet
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Nos experts vous accompagnent dans la transformation de votre industrie. 
            Contactez-nous pour une consultation personnalisée.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12 max-w-6xl mx-auto">
          {/* Formulaire de contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-heading">
                Demande de consultation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom *</Label>
                  <Input id="firstName" placeholder="Votre prénom" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input id="lastName" placeholder="Votre nom" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email professionnel *</Label>
                <Input id="email" type="email" placeholder="votre.email@entreprise.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Entreprise *</Label>
                <Input id="company" placeholder="Nom de votre entreprise" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sector">Secteur d'activité</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre secteur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automotive">Automobile</SelectItem>
                    <SelectItem value="aerospace">Aérospatiale</SelectItem>
                    <SelectItem value="food">Agroalimentaire</SelectItem>
                    <SelectItem value="pharma">Pharmaceutique</SelectItem>
                    <SelectItem value="energy">Énergie</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project">Décrivez votre projet</Label>
                <Textarea 
                  id="project" 
                  placeholder="Parlez-nous de vos besoins en automatisation..."
                  rows={4}
                />
              </div>

              <Button variant="cta" className="w-full" size="lg">
                Envoyer ma demande
              </Button>

              <p className="text-sm text-text-secondary">
                * Champs obligatoires. Nous nous engageons à protéger vos données 
                et à vous contacter dans les 24h ouvrées.
              </p>
            </CardContent>
          </Card>

          {/* Informations de contact */}
          <div className="mt-8 lg:mt-0 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-heading">
                  Nos Coordonnées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-text-primary">Email</p>
                    <p className="text-text-secondary">contact@automatech.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-text-primary">Téléphone</p>
                    <p className="text-text-secondary">+33 1 23 45 67 89</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-text-primary">Adresse</p>
                    <p className="text-text-secondary">
                      123 Avenue de l'Innovation<br />
                      69000 Lyon, France
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-text-primary">Horaires</p>
                    <p className="text-text-secondary">
                      Lun - Ven : 8h00 - 18h00<br />
                      Support 24/7 disponible
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">
                  Audit Gratuit de vos Processus
                </h3>
                <p className="mb-4 opacity-90">
                  Bénéficiez d'un audit complet de vos processus industriels 
                  et recevez nos recommandations d'optimisation.
                </p>
                <Button variant="secondary" className="w-full">
                  Planifier un audit
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;