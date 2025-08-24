import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { CheckCircle, AlertCircle, Mail, Clock } from 'lucide-react';

interface TestResult {
  success: boolean;
  message: string;
  data?: any;
  timing?: number;
}

export const AdminTestPanel = () => {
  const [isTestingROI, setIsTestingROI] = useState(false);
  const [isTestingAppointment, setIsTestingAppointment] = useState(false);
  const [isTestingContact, setIsTestingContact] = useState(false);
  const [testResults, setTestResults] = useState<{
    roi?: TestResult;
    appointment?: TestResult;
    contact?: TestResult;
  }>({});

  const testROIFunnel = async () => {
    setIsTestingROI(true);
    const startTime = Date.now();
    
    try {
      const testData = {
        roiData: {
          hours_per_week: 10,
          hourly_rate: 50,
          employees: 3,
          investment: 8000,
          annual_savings: 78000,
          roi_percentage: 975
        },
        diagnosticData: {
          team_size: "3-10 employés",
          business_type: "Services professionnels",
          main_activities: ["Gestion administrative", "Communication client"],
          repetitive_tasks: ["Saisie de données", "Reporting"],
          current_tools: ["Excel", "Email"],
          pain_points: ["Trop de tâches manuelles"],
          automation_goals: ["Automatiser la saisie", "Optimiser les rapports"],
          timeline: "3-6 mois",
          budget_range: "5000-15000€",
          technical_level: "intermediate",
          priority_processes: ["Gestion administrative"],
          success_metrics: ["ROI", "time_savings"]
        },
        userEmail: "test.roi@example.com",
        userName: "Test ROI User",
        userPhone: "+33123456789"
      };

      const { data, error } = await supabase.functions.invoke('analyze-roi-data', {
        body: testData
      });

      if (error) throw error;

      const timing = Date.now() - startTime;
      setTestResults(prev => ({
        ...prev,
        roi: {
          success: true,
          message: "✅ ROI calculé, email envoyé, CRM mis à jour",
          data: data,
          timing
        }
      }));

      toast.success("Test ROI réussi !");

    } catch (error: any) {
      const timing = Date.now() - startTime;
      setTestResults(prev => ({
        ...prev,
        roi: {
          success: false,
          message: `❌ Erreur: ${error.message}`,
          timing
        }
      }));
      toast.error("Échec test ROI");
    } finally {
      setIsTestingROI(false);
    }
  };

  const testAppointmentFunnel = async () => {
    setIsTestingAppointment(true);
    const startTime = Date.now();
    
    try {
      const testData = {
        userEmail: "test.rdv@example.com",
        userName: "Test RDV User",
        userPhone: "+33987654321",
        appointmentDate: "2024-02-15T14:00:00",
        appointmentType: "Consultation stratégique",
        notes: "Test de réservation automatique"
      };

      const { data, error } = await supabase.functions.invoke('book-appointment', {
        body: testData
      });

      if (error) throw error;

      const timing = Date.now() - startTime;
      setTestResults(prev => ({
        ...prev,
        appointment: {
          success: true,
          message: "✅ RDV réservé, emails envoyés, CRM mis à jour",
          data: data,
          timing
        }
      }));

      toast.success("Test RDV réussi !");

    } catch (error: any) {
      const timing = Date.now() - startTime;
      setTestResults(prev => ({
        ...prev,
        appointment: {
          success: false,
          message: `❌ Erreur: ${error.message}`,
          timing
        }
      }));
      toast.error("Échec test RDV");
    } finally {
      setIsTestingAppointment(false);
    }
  };

  const testContactFunnel = async () => {
    setIsTestingContact(true);
    const startTime = Date.now();
    
    try {
      const testData = {
        name: "Test Contact User",
        email: "test.contact@example.com",
        phone: "+33456789123",
        company: "Test Company",
        message: "Message de test pour vérifier le funnel de contact",
        source: "admin_test"
      };

      const { data, error } = await supabase.functions.invoke('send-contact-message', {
        body: testData
      });

      if (error) throw error;

      const timing = Date.now() - startTime;
      setTestResults(prev => ({
        ...prev,
        contact: {
          success: true,
          message: "✅ Message envoyé, accusé réception client, CRM mis à jour",
          data: data,
          timing
        }
      }));

      toast.success("Test Contact réussi !");

    } catch (error: any) {
      const timing = Date.now() - startTime;
      setTestResults(prev => ({
        ...prev,
        contact: {
          success: false,
          message: `❌ Erreur: ${error.message}`,
          timing
        }
      }));
      toast.error("Échec test Contact");
    } finally {
      setIsTestingContact(false);
    }
  };

  const testAllFunnels = async () => {
    await testROIFunnel();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s
    await testAppointmentFunnel();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s
    await testContactFunnel();
    toast.success("Tests complets terminés !");
  };

  const formatTiming = (ms?: number) => {
    if (!ms) return '';
    return `${ms}ms`;
  };

  const isAllTesting = isTestingROI || isTestingAppointment || isTestingContact;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Panel Test Funnel Utilisateur - Maia Elange
          </CardTitle>
          <Badge variant="outline">Admin Only</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Bouton de test global */}
        <div className="text-center">
          <Button
            onClick={testAllFunnels}
            disabled={isAllTesting}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 font-semibold px-8 py-3"
          >
            {isAllTesting ? "Tests en cours..." : "🚀 Tester tout le Funnel"}
          </Button>
        </div>

        {/* Tests individuels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Test ROI */}
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                📊 Test Calculateur ROI
                {testResults.roi && (
                  testResults.roi.success ? 
                    <CheckCircle className="h-4 w-4 text-green-500" /> :
                    <AlertCircle className="h-4 w-4 text-red-500" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={testROIFunnel}
                disabled={isTestingROI}
                variant="outline"
                className="w-full"
              >
                {isTestingROI ? (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 animate-spin" />
                    Analyse...
                  </div>
                ) : "Tester ROI"}
              </Button>
              
              {testResults.roi && (
                <div className="space-y-2">
                  <div className="text-xs p-2 rounded bg-muted">
                    {testResults.roi.message}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ⏱️ {formatTiming(testResults.roi.timing)}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Test Appointment */}
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                📅 Test Prise RDV
                {testResults.appointment && (
                  testResults.appointment.success ? 
                    <CheckCircle className="h-4 w-4 text-green-500" /> :
                    <AlertCircle className="h-4 w-4 text-red-500" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={testAppointmentFunnel}
                disabled={isTestingAppointment}
                variant="outline"
                className="w-full"
              >
                {isTestingAppointment ? (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 animate-spin" />
                    Réservation...
                  </div>
                ) : "Tester RDV"}
              </Button>
              
              {testResults.appointment && (
                <div className="space-y-2">
                  <div className="text-xs p-2 rounded bg-muted">
                    {testResults.appointment.message}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ⏱️ {formatTiming(testResults.appointment.timing)}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Test Contact */}
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                💬 Test Contact Direct
                {testResults.contact && (
                  testResults.contact.success ? 
                    <CheckCircle className="h-4 w-4 text-green-500" /> :
                    <AlertCircle className="h-4 w-4 text-red-500" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={testContactFunnel}
                disabled={isTestingContact}
                variant="outline"
                className="w-full"
              >
                {isTestingContact ? (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 animate-spin" />
                    Envoi...
                  </div>
                ) : "Tester Contact"}
              </Button>
              
              {testResults.contact && (
                <div className="space-y-2">
                  <div className="text-xs p-2 rounded bg-muted">
                    {testResults.contact.message}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ⏱️ {formatTiming(testResults.contact.timing)}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Résumé des tests */}
        {Object.keys(testResults).length > 0 && (
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-sm">📋 Résumé des Tests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {testResults.roi && (
                <div className="flex items-center justify-between text-sm">
                  <span>Calculateur ROI</span>
                  <Badge variant={testResults.roi.success ? "default" : "destructive"}>
                    {testResults.roi.success ? "✅ OK" : "❌ Échec"}
                  </Badge>
                </div>
              )}
              {testResults.appointment && (
                <div className="flex items-center justify-between text-sm">
                  <span>Prise de RDV</span>
                  <Badge variant={testResults.appointment.success ? "default" : "destructive"}>
                    {testResults.appointment.success ? "✅ OK" : "❌ Échec"}
                  </Badge>
                </div>
              )}
              {testResults.contact && (
                <div className="flex items-center justify-between text-sm">
                  <span>Contact Direct</span>
                  <Badge variant={testResults.contact.success ? "default" : "destructive"}>
                    {testResults.contact.success ? "✅ OK" : "❌ Échec"}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="text-xs text-muted-foreground text-center">
          ⚠️ Les emails de test sont envoyés aux adresses test@example.com • contact@maiaelange.fr reçoit les emails internes
        </div>
      </CardContent>
    </Card>
  );
};