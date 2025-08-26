import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Phone, Building2, MessageSquare, Rocket, Shield } from "lucide-react";

interface ContactFormData {
  nom: string;
  email: string;
  organisation: string;
  typeOrganisation: string;
  message: string;
  consentement: boolean;
}

interface ContactFormOptimizedProps {
  onClose?: () => void;
}

export const ContactFormOptimized = ({ onClose }: ContactFormOptimizedProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    nom: '',
    email: '',
    organisation: '',
    typeOrganisation: '',
    message: '',
    consentement: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consentement) {
      toast.error('Veuillez accepter la politique de confidentialité');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-message', {
        body: {
          name: formData.nom,
          email: formData.email,
          company: formData.organisation,
          message: `Type d'organisation: ${formData.typeOrganisation}\n\nMessage: ${formData.message}`,
        },
      });

      if (error) throw error;

      toast.success('🚀 Message envoyé ! Nous vous recontactons sous 24h pour votre diagnostic gratuit.');
      
      // Reset form
      setFormData({
        nom: '',
        email: '',
        organisation: '',
        typeOrganisation: '',
        message: '',
        consentement: false,
      });
      
      onClose?.();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/95 backdrop-blur-sm border border-primary/20">
      <CardHeader className="text-center">
        <Badge className="mx-auto mb-4 bg-cta-primary/10 text-cta-primary border-cta-primary/30">
          <Rocket className="w-4 h-4 mr-2" />
          DIAGNOSTIC GRATUIT
        </Badge>
        <CardTitle className="text-2xl font-bold text-heading">
          Demandez votre diagnostic gratuit
        </CardTitle>
        <p className="text-text-secondary">
          Découvrez comment l'IA peut transformer votre organisation en moins de 30 minutes
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom */}
          <div className="space-y-2">
            <label htmlFor="nom" className="text-sm font-medium text-heading flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Nom complet *
            </label>
            <Input
              id="nom"
              type="text"
              value={formData.nom}
              onChange={(e) => handleInputChange('nom', e.target.value)}
              placeholder="Votre nom et prénom"
              required
              aria-describedby="nom-help"
              className="border-primary/20 focus:border-primary"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-heading flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Email professionnel *
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="votre@email.fr"
              required
              aria-describedby="email-help"
              className="border-primary/20 focus:border-primary"
            />
          </div>

          {/* Organisation */}
          <div className="space-y-2">
            <label htmlFor="organisation" className="text-sm font-medium text-heading flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              Organisation
            </label>
            <Input
              id="organisation"
              type="text"
              value={formData.organisation}
              onChange={(e) => handleInputChange('organisation', e.target.value)}
              placeholder="Nom de votre entreprise/organisation"
              className="border-primary/20 focus:border-primary"
            />
          </div>

          {/* Type d'organisation */}
          <div className="space-y-2">
            <label htmlFor="typeOrganisation" className="text-sm font-medium text-heading">
              Type d'organisation
            </label>
            <Select value={formData.typeOrganisation} onValueChange={(value) => handleInputChange('typeOrganisation', value)}>
              <SelectTrigger className="border-primary/20 focus:border-primary">
                <SelectValue placeholder="Sélectionnez votre secteur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entreprise">Entreprise privée</SelectItem>
                <SelectItem value="partenaire">Partenaire/Consultant</SelectItem>
                <SelectItem value="institution">Institution publique</SelectItem>
                <SelectItem value="association">Association/ONG</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-heading flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Votre projet *
            </label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Décrivez brièvement vos enjeux d'automatisation..."
              className="min-h-[120px] border-primary/20 focus:border-primary"
              required
            />
          </div>

          {/* Consentement RGPD */}
          <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <Checkbox
              id="consentement"
              checked={formData.consentement}
              onCheckedChange={(checked) => handleInputChange('consentement', checked as boolean)}
              className="mt-1"
            />
            <div className="space-y-1">
              <label htmlFor="consentement" className="text-sm font-medium text-heading flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Consentement RGPD *
              </label>
              <p className="text-xs text-text-secondary">
                J'accepte que mes données soient utilisées pour me recontacter concernant ma demande de diagnostic.{' '}
                <a href="/politique-confidentialite" className="text-primary hover:underline" target="_blank">
                  Politique de confidentialité
                </a>
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !formData.consentement}
            className="w-full bg-cta-primary hover:bg-cta-primary/90 text-cta-primary-foreground font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-[1.02] btn-cta-hover"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Rocket className="w-5 h-5 mr-2" />
                🚀 Demander mon diagnostic gratuit
              </>
            )}
          </Button>

          <p className="text-xs text-center text-text-secondary">
            Réponse garantie sous 24h • Diagnostic personnalisé • Sans engagement
          </p>
        </form>
      </CardContent>
    </Card>
  );
};