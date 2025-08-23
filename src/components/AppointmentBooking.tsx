import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, User, Mail, Phone, MessageSquare, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AppointmentBookingProps {
  calculationId: string;
  onClose: () => void;
  userInfo?: {
    name: string;
    email: string;
  };
}

export const AppointmentBooking = ({ calculationId, onClose, userInfo }: AppointmentBookingProps) => {
  const [formData, setFormData] = useState({
    userName: userInfo?.name || "",
    userEmail: userInfo?.email || "",
    userPhone: "",
    appointmentDate: "",
    appointmentTime: "",
    appointmentType: "consultation",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Combine date and time
      const appointmentDateTime = `${formData.appointmentDate}T${formData.appointmentTime}:00`;
      
      const { data, error } = await supabase.functions.invoke('book-appointment', {
        body: {
          calculationId,
          userEmail: formData.userEmail,
          userName: formData.userName,
          userPhone: formData.userPhone,
          appointmentDate: appointmentDateTime,
          appointmentType: formData.appointmentType,
          notes: formData.notes
        }
      });

      if (error) throw error;

      toast.success("Rendez-vous demandé avec succès ! Nous vous recontacterons rapidement pour confirmation.");
      onClose();
    } catch (error: any) {
      console.error("Error booking appointment:", error);
      toast.error("Erreur lors de la réservation. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate time slots (9h-17h, every 30 minutes)
  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    for (let minute of [0, 30]) {
      if (hour === 17 && minute === 30) break; // Stop at 17:00
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push(timeString);
    }
  }

  // Get next 30 days (excluding weekends)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 45; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split('T')[0]);
      }
      
      if (dates.length >= 30) break;
    }
    
    return dates;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              Réserver un Entretien
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <h3 className="font-semibold text-primary mb-2">Entretien Personnalisé - 30 minutes</h3>
            <p className="text-sm text-muted-foreground">
              Discutons de vos recommandations d'automatisation et de la stratégie de mise en œuvre. Devis personnalisé selon vos besoins.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations personnelles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Vos Informations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="userName">Nom complet *</Label>
                    <Input
                      id="userName"
                      value={formData.userName}
                      onChange={(e) => handleInputChange("userName", e.target.value)}
                      placeholder="Votre nom et prénom"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="userEmail">Email *</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      value={formData.userEmail}
                      onChange={(e) => handleInputChange("userEmail", e.target.value)}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>
                
                  <div>
                    <Label htmlFor="userPhone">Téléphone</Label>
                    <Input
                      id="userPhone"
                      type="tel"
                      value={formData.userPhone}
                      onChange={(e) => handleInputChange("userPhone", e.target.value)}
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
              </CardContent>
            </Card>

            {/* Date et heure */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Créneau Souhaité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="appointmentDate">Date *</Label>
                    <Select 
                      value={formData.appointmentDate} 
                      onValueChange={(value) => handleInputChange("appointmentDate", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une date" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableDates().map(date => {
                          const dateObj = new Date(date);
                          const formattedDate = dateObj.toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long'
                          });
                          return (
                            <SelectItem key={date} value={date}>
                              {formattedDate}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="appointmentTime">Heure *</Label>
                    <Select 
                      value={formData.appointmentTime} 
                      onValueChange={(value) => handleInputChange("appointmentTime", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un créneau" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(time => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="appointmentType">Type d'entretien</Label>
                  <Select 
                    value={formData.appointmentType} 
                    onValueChange={(value) => handleInputChange("appointmentType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Consultation Stratégique (30 min)</SelectItem>
                      <SelectItem value="diagnostic">Diagnostic Approfondi (45 min)</SelectItem>
                      <SelectItem value="demo">Démonstration Solution (30 min)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Message (optionnel)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Questions spécifiques ou détails sur votre projet..."
                  rows={3}
                />
              </CardContent>
            </Card>

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting || !formData.userName || !formData.userEmail || !formData.appointmentDate || !formData.appointmentTime}
                className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                {isSubmitting ? "Envoi en cours..." : "Confirmer la Demande"}
              </Button>
              
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
            </div>
          </form>

          <div className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
            <p><strong>📅 Prochaines étapes :</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Confirmation de votre créneau sous 24h</li>
              <li>Envoi du lien de visioconférence</li>
              <li>Préparation personnalisée de votre entretien</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};