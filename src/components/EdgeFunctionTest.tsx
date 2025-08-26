import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const EdgeFunctionTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>({});

  const testFunctions = async () => {
    setIsLoading(true);
    setResults({});

    try {
      console.log('🧪 Test complet des Edge Functions...');

      // Test 1: send-email
      console.log('📧 Test 1: send-email');
      const { data: emailData, error: emailError } = await supabase.functions.invoke('send-email', {
        body: {
          email: 'test@example.com',
          subject: 'Test Edge Function',
          message: 'Test de validation des Edge Functions Supabase'
        }
      });
      setResults(prev => ({ ...prev, sendEmail: { data: emailData, error: emailError } }));

      // Test 2: analyze-roi-data
      console.log('📊 Test 2: analyze-roi-data');
      const { data: roiData, error: roiError } = await supabase.functions.invoke('analyze-roi-data', {
        body: {
          heures: 5,
          taux: 50,
          employes: 2,
          budget: 10000,
          userEmail: 'test@example.com',
          userName: 'Test User',
          diagnosticData: {
            taille: '2-5',
            secteur: 'Tech',
            processus_prioritaires: ['Administration'],
            tache_frustrante: 'Test task',
            outils: ['Email'],
            delai: 'immediatement',
            budget_annuel: '5k-10k'
          }
        }
      });
      setResults(prev => ({ ...prev, analyzeRoi: { data: roiData, error: roiError } }));

      // Test 3: send-contact-message
      console.log('💬 Test 3: send-contact-message');
      const { data: contactData, error: contactError } = await supabase.functions.invoke('send-contact-message', {
        body: {
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message de contact',
          source: 'edge_function_test'
        }
      });
      setResults(prev => ({ ...prev, sendContact: { data: contactData, error: contactError } }));

      // Test 4: book-appointment
      console.log('📅 Test 4: book-appointment');
      const { data: appointmentData, error: appointmentError } = await supabase.functions.invoke('book-appointment', {
        body: {
          userEmail: 'test@example.com',
          userName: 'Test User',
          appointmentDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          appointmentType: 'Test Meeting',
          notes: 'Test de validation'
        }
      });
      setResults(prev => ({ ...prev, bookAppointment: { data: appointmentData, error: appointmentError } }));

      toast({
        title: "✅ Tests terminés",
        description: "Vérifiez les résultats ci-dessous",
      });

    } catch (error: any) {
      console.error('❌ Erreur test Edge Functions:', error);
      toast({
        title: "❌ Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (result: any) => {
    if (!result) return 'text-gray-500';
    return result.error ? 'text-red-500' : 'text-green-500';
  };

  const getStatusIcon = (result: any) => {
    if (!result) return '⏳';
    return result.error ? '❌' : '✅';
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>🔧 Test Configuration Edge Functions</CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={testFunctions}
          disabled={isLoading}
          className="w-full mb-6"
        >
          {isLoading ? '⏳ Tests en cours...' : '🚀 Tester toutes les fonctions'}
        </Button>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className={`font-semibold ${getStatusColor(results.sendEmail)}`}>
                {getStatusIcon(results.sendEmail)} send-email
              </div>
              {results.sendEmail && (
                <div className="text-xs mt-2">
                  {results.sendEmail.error ? 
                    `Erreur: ${results.sendEmail.error.message}` : 
                    'Fonction OK'
                  }
                </div>
              )}
            </div>

            <div className="p-4 border rounded-lg">
              <div className={`font-semibold ${getStatusColor(results.analyzeRoi)}`}>
                {getStatusIcon(results.analyzeRoi)} analyze-roi-data
              </div>
              {results.analyzeRoi && (
                <div className="text-xs mt-2">
                  {results.analyzeRoi.error ? 
                    `Erreur: ${results.analyzeRoi.error.message}` : 
                    'Fonction OK'
                  }
                </div>
              )}
            </div>

            <div className="p-4 border rounded-lg">
              <div className={`font-semibold ${getStatusColor(results.sendContact)}`}>
                {getStatusIcon(results.sendContact)} send-contact-message
              </div>
              {results.sendContact && (
                <div className="text-xs mt-2">
                  {results.sendContact.error ? 
                    `Erreur: ${results.sendContact.error.message}` : 
                    'Fonction OK'
                  }
                </div>
              )}
            </div>

            <div className="p-4 border rounded-lg">
              <div className={`font-semibold ${getStatusColor(results.bookAppointment)}`}>
                {getStatusIcon(results.bookAppointment)} book-appointment
              </div>
              {results.bookAppointment && (
                <div className="text-xs mt-2">
                  {results.bookAppointment.error ? 
                    `Erreur: ${results.bookAppointment.error.message}` : 
                    'Fonction OK'
                  }
                </div>
              )}
            </div>
          </div>

          {Object.keys(results).length > 0 && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Résultats détaillés :</h3>
              <pre className="text-xs whitespace-pre-wrap">
                {JSON.stringify(results, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Variables d'environnement requises :</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>✅ RESEND_API_KEY - pour send-email</li>
            <li>✅ SUPABASE_URL - pour analyze-roi-data</li>
            <li>✅ SUPABASE_SERVICE_ROLE_KEY - pour toutes les fonctions DB</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};