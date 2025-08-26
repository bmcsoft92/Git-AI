import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const TestFonction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

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

  return (
    <Card className="w-full max-w-md mb-8">
      <CardHeader>
        <CardTitle>🔧 Test Edge Function</CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={testFunction}
          disabled={isLoading}
          className="w-full mb-4"
        >
          {isLoading ? '⏳ Test...' : '🚀 Tester analyze-roi-data'}
        </Button>

        {result && (
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Résultat :</h3>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};