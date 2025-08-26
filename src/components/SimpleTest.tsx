import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const SimpleTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleTest = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      console.log('🧪 Test simple fonction edge...');
      
      const { data, error } = await supabase.functions.invoke('simple-test', {
        body: {}
      });

      console.log('📨 Réponse simple-test:', { data, error });

      if (error) {
        throw error;
      }

      setResult(data);
      toast({
        title: "✅ Test réussi !",
        description: "La fonction edge fonctionne",
      });

    } catch (error: any) {
      console.error('❌ Erreur test simple:', error);
      setResult({ error: error.message, success: false });
      toast({
        title: "❌ Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>🧪 Test Simple Edge Function</CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={handleTest}
          disabled={isLoading}
          className="w-full mb-4"
        >
          {isLoading ? '⏳ Test...' : '🚀 Tester fonction edge'}
        </Button>

        {result && (
          <div className="p-3 rounded-lg bg-muted">
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};