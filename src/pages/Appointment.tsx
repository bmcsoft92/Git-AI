import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useUserData } from "@/hooks/useUserData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Clock, User, Mail, Phone, Building, ArrowLeft, Home, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

const Appointment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get('email'); // Pour récupérer l'email depuis l'URL si fourni
  
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [emailInput, setEmailInput] = useState(emailParam || ""); // Champ email pour la recherche
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: emailParam || "",
    phone: "",
    company: "",
    message: ""
  });

  // Utiliser le hook pour récupérer les données utilisateur
  const { userData, isLoading: isLoadingUserData, fetchUserData } = useUserData();

  // Auto-remplir les champs quand les données utilisateur sont récupérées
  useEffect(() => {
    if (userData) {
      console.log("🔄 Auto-filling form with user data:", userData);
      
      // Extraire prénom et nom du nom complet
      const nameParts = userData.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      setFormData(prev => ({
        ...prev,
        firstName: firstName,
        lastName: lastName,
        email: userData.email,
        phone: userData.phone,
        company: userData.company
      }));
    }
  }, [userData]);

  useEffect(() => {
    document.title = "Prendre Rendez-vous | Maïa Elange";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Planifiez votre rendez-vous avec nos experts en automatisation IA. Consultation pour évaluer vos besoins et créer votre plan d\'action personnalisé.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', 'Planifiez votre rendez-vous avec nos experts en automatisation IA. Consultation pour évaluer vos besoins et créer votre plan d\'action personnalisé.');
      document.head.appendChild(metaDescription);
    }

    // Si un email est fourni dans l'URL, le récupérer automatiquement
    if (emailParam) {
      setEmailInput(emailParam);
      fetchUserData(emailParam);
    }
  }, [emailParam, fetchUserData]);

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !formData.firstName || !formData.lastName || !formData.email) {
      return;
    }

    try {
      console.log("📅 Submitting appointment...");
      
      // Créer la date complète
      const dateStr = selectedDate.toISOString().split('T')[0]; // Format YYYY-MM-DD
      const appointmentDateTime = new Date(`${dateStr}T${selectedTime}:00`);
      
      const appointmentData = {
        userEmail: formData.email,
        userName: `${formData.firstName} ${formData.lastName}`,
        userPhone: formData.phone,
        appointmentDate: appointmentDateTime.toISOString(),
        appointmentType: "Consultation personnalisée",
        notes: formData.message || undefined
      };

      console.log("📋 Sending appointment data:", appointmentData);

      // Appel à la fonction edge
      const { data, error } = await supabase.functions.invoke('book-appointment', {
        body: appointmentData
      });

      if (error) {
        console.error("❌ Error booking appointment:", error);
        throw error;
      }

      console.log("✅ Appointment booked successfully:", data);
      
      // Rediriger vers une page de confirmation ou afficher un message
      alert("✅ Rendez-vous confirmé ! Vous allez recevoir un email de confirmation.");
      
      // Réinitialiser le formulaire
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        message: ""
      });

    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ Erreur lors de la prise de rendez-vous. Veuillez réessayer.");
    }
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
                PRISE DE RENDEZ-VOUS
              </Badge>
            </div>

            {/* Titre principal H1 */}
            <div className="text-center mb-16">
              <h1 className="text-3xl lg:text-5xl font-bold text-heading mb-6">
                Planifiez votre{" "}
                <span className="text-primary">Consultation</span>
              </h1>
              <p className="text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed">
                Discutons de vos besoins et créons ensemble un plan d'action personnalisé 
                pour maximiser votre ROI avec l'automatisation IA.
              </p>
            </div>

            {/* Formulaire de rendez-vous */}
            <div className="max-w-4xl mx-auto">
              
              {/* Section de récupération automatique des données */}
              {!userData && !isLoadingUserData && (
                <Card className="mb-8 bg-gradient-to-br from-primary/5 to-cta-primary/5 border border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-heading">
                      <Mail className="h-5 w-5 text-primary" />
                      Avez-vous déjà fait un diagnostic avec nous ?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-text-secondary mb-4">
                      Si vous avez déjà utilisé notre calculateur ROI, nous pouvons pré-remplir vos informations automatiquement.
                    </p>
                    <div className="flex gap-3">
                      <Input
                        type="email"
                        placeholder="Saisissez votre email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fetchUserData(emailInput)}
                        disabled={!emailInput.includes('@') || isLoadingUserData}
                        className="whitespace-nowrap"
                      >
                        {isLoadingUserData ? "Recherche..." : "Récupérer mes infos"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Affichage des données récupérées */}
              {userData && (
                <Card className="mb-8 bg-gradient-to-br from-success/5 to-success/10 border border-success/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-success">
                      <CheckCircle className="h-5 w-5" />
                      Informations récupérées automatiquement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-heading">Nom :</span> {userData.name}
                      </div>
                      <div>
                        <span className="font-semibold text-heading">Email :</span> {userData.email}
                      </div>
                      {userData.phone && (
                        <div>
                          <span className="font-semibold text-heading">Téléphone :</span> {userData.phone}
                        </div>
                      )}
                      {userData.company && (
                        <div>
                          <span className="font-semibold text-heading">Entreprise :</span> {userData.company}
                        </div>
                      )}
                    </div>
                    {userData.lastROICalculation && (
                      <div className="mt-4 pt-4 border-t border-success/20">
                        <p className="text-xs text-text-secondary">
                          💡 Basé sur votre diagnostic ROI du {new Date(userData.lastROICalculation.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
                
                {/* Colonne gauche - Sélection date et heure */}
                <Card className="bg-card/80 backdrop-blur-sm border border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-heading">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                      Choisissez votre créneau
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    
                    {/* Sélection de la date */}
                    <div>
                      <Label className="text-heading font-semibold mb-3 block">
                        Date souhaitée
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !selectedDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? (
                              format(selectedDate, "PPP", { locale: fr })
                            ) : (
                              <span>Sélectionner une date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) =>
                              date < new Date() || date.getDay() === 0 || date.getDay() === 6
                            }
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Sélection de l'heure */}
                    <div>
                      <Label className="text-heading font-semibold mb-3 block">
                        Heure souhaitée
                      </Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choisir un créneau" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {time}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Durée estimée */}
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-primary">Consultation</span>
                      </div>
                      <p className="text-sm text-text-secondary">
                        Durée : 30-45 minutes • Visioconférence ou téléphone
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Colonne droite - Informations de contact */}
                <Card className="bg-card/80 backdrop-blur-sm border border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-heading">
                      <User className="h-5 w-5 text-primary" />
                      Vos informations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-heading font-semibold">
                          Prénom *
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-heading font-semibold">
                          Nom *
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-heading font-semibold">
                        Email *
                      </Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="pl-10"
                          placeholder="votre@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-heading font-semibold">
                        Téléphone
                      </Label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="pl-10"
                          placeholder="+33 6 12 34 56 78"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company" className="text-heading font-semibold">
                        Entreprise / Organisation
                      </Label>
                      <div className="relative mt-1">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="pl-10"
                          placeholder="Nom de votre organisation"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-heading font-semibold">
                        Objectifs / Besoins (optionnel)
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="mt-1"
                        rows={4}
                        placeholder="Décrivez brièvement vos objectifs ou les processus que vous aimeriez automatiser..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-cta-primary hover:bg-cta-primary/90 text-cta-primary-foreground btn-cta-hover"
                      disabled={!selectedDate || !selectedTime || !formData.firstName || !formData.lastName || !formData.email}
                    >
                      Confirmer le rendez-vous
                    </Button>

                    <p className="text-xs text-text-secondary text-center">
                      En cliquant sur "Confirmer", vous acceptez nos conditions générales et notre politique de confidentialité.
                    </p>
                  </CardContent>
                </Card>
              </form>
            </div>

            {/* Section avantages */}
            <div className="mt-16 text-center">
              <Card className="bg-gradient-to-br from-primary/10 to-cta-primary/10 backdrop-blur-sm border border-primary/30 p-8 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-heading mb-6">
                  Pourquoi planifier cette consultation ?
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="p-3 bg-primary/20 rounded-lg w-fit mx-auto mb-3">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-heading mb-2">Analyse personnalisée</h3>
                    <p className="text-sm text-text-secondary">Évaluation de vos processus actuels</p>
                  </div>
                  <div className="text-center">
                    <div className="p-3 bg-primary/20 rounded-lg w-fit mx-auto mb-3">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-heading mb-2">Plan sur-mesure</h3>
                    <p className="text-sm text-text-secondary">Recommandations adaptées à vos besoins</p>
                  </div>
                  <div className="text-center">
                    <div className="p-3 bg-primary/20 rounded-lg w-fit mx-auto mb-3">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-heading mb-2">ROI estimé</h3>
                    <p className="text-sm text-text-secondary">Calcul des gains potentiels</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Appointment;