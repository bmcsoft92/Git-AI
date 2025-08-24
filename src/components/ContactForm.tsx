import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ContactFormProps {
  onClose: () => void;
  userInfo?: {
    name: string;
    email: string;
  };
}

export const ContactForm = ({ onClose, userInfo }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    phone: "",
    company: "",
    message: "",
    consent: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast.error("Vous devez accepter le traitement de vos données pour envoyer ce message.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-message', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          source: 'contact_modal'
        }
      });

      if (error) throw error;
      
      toast.success("Votre message a été envoyé avec succès ! Nous vous répondrons sous 24h.");
      onClose();
      
      // Reset form
      setFormData({
        name: userInfo?.name || "",
        email: userInfo?.email || "",
        phone: "",
        company: "",
        message: "",
        consent: false
      });
    } catch (error) {
      console.error('Error sending contact message:', error);
      toast.error("Erreur lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl font-bold">Nous Contacter</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  disabled={!!userInfo?.name}
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  disabled={!!userInfo?.email}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+33 6 12 34 56 78"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="company">Entreprise</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="👉 Décrivez brièvement votre projet ou vos besoins (ex : automatiser vos emails, optimiser votre facturation, gagner du temps sur vos tâches répétitives)."
                required
                rows={4}
              />
            </div>
            
            {/* Consentement RGPD obligatoire */}
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-primary/20">
              <div className="flex items-start space-x-3">
                <input
                  id="consent"
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                  className="w-5 h-5 rounded border-2 border-primary text-primary focus:ring-primary cursor-pointer mt-0.5"
                  required
                />
                <label 
                  htmlFor="consent"
                  className="text-sm cursor-pointer leading-relaxed font-medium text-text"
                >
                  J'accepte que mes données soient traitées pour répondre à ma demande de contact. *
                </label>
              </div>
              <p className="text-xs text-text-secondary/70 ml-8">
                Vos données sont utilisées uniquement pour répondre à votre demande. Elles ne seront jamais partagées. 
                Conservation max 3 ans.
              </p>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? "Envoi..." : "Envoyer"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Annuler
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};