import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const TestFonction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [emailTest, setEmailTest] = useState<any>(null);

  const testFunction = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      console.log('🧪 Test de la fonction analyze-roi-data...');
      
      const { data, error } = await supabase.functions.invoke('analyze-roi-data', {
        body: {
          heures: 5,
          taux: 50,
          employes: 1,
          budget: 10000,
          userEmail: 'test@example.com',
          userName: 'Test User',
          diagnosticData: {
            taille: '1',
            secteur: 'Tech',
            processus_prioritaires: ['Administration'],
            delai: 'immediatement',
            budget_annuel: '5k-10k'
          }
        }
      });

      console.log('📨 Résultat:', { data, error });
      setResult({ data, error });

      if (error) {
        toast.error(`Erreur: ${error.message}`);
      } else {
        toast.success('Test réussi !');
      }

    } catch (err: any) {
      console.error('❌ Erreur:', err);
      setResult({ error: err.message });
      toast.error(`Erreur: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testEmail = async () => {
    setEmailTest({ loading: true });
    
    try {
      console.log('📧 Test envoi email avec vraies données...');
      
      const { data, error } = await supabase.functions.invoke('analyze-roi-data', {
        body: {
          heures: 10,
          taux: 75,
          employes: 2,
          budget: 15000,
          userEmail: 'maia.elange@gmail.com', // Email réel pour test
          userName: 'Test Maia',
          diagnosticData: {
            taille: '2-5',
            secteur: 'Services B2B',
            processus_prioritaires: ['Gestion des emails et communication', 'Administration et paperasse'],
            delai: 'immediatement',
            budget_annuel: '10k-15k',
            organisation: 'Test Company'
          }
        }
      });

      console.log('📨 Résultat test email:', { data, error });
      setEmailTest({ data, error, success: !error });

      if (error) {
        toast.error(`Erreur email: ${error.message}`);
      } else {
        toast.success('Email envoyé ! Vérifiez votre boîte de réception.');
      }

    } catch (err: any) {
      console.error('❌ Erreur email:', err);
      setEmailTest({ error: err.message, success: false });
      toast.error(`Erreur email: ${err.message}`);
    }
  };

  return (
    <Card className="w-full max-w-md mb-8">
      <CardHeader>
        <CardTitle>🔧 Test Edge Function</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button 
            onClick={testFunction}
            disabled={isLoading}
            className="w-full"
            variant="outline"
          >
            {isLoading ? '⏳ Test...' : '🚀 Test Calcul ROI'}
          </Button>

          <Button 
            onClick={testEmail}
            disabled={emailTest?.loading}
            className="w-full"
          >
            {emailTest?.loading ? '📧 Envoi...' : '📧 Test Envoi Email'}
          </Button>
        </div>

        {result && (
          <div className="p-4 bg-muted rounded-lg mt-4">
            <h3 className="font-semibold mb-2">Résultat Calcul :</h3>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        {emailTest && (
          <div className={`p-4 rounded-lg mt-4 ${emailTest.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <h3 className={`font-semibold mb-2 ${emailTest.success ? 'text-green-800' : 'text-red-800'}`}>
              {emailTest.success ? '✅ Test Email Réussi' : '❌ Test Email Échoué'}
            </h3>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(emailTest, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};