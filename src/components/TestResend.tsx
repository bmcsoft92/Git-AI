import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const TestResend = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleTest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      console.log('🧪 Test Resend avec email:', email);
      
      const { data, error } = await supabase.functions.invoke('test-resend', {
        body: { email }
      });

      console.log('📨 Réponse test-resend:', { data, error });

      if (error) {
        throw error;
      }

      setResult(data);
      toast({
        title: "✅ Test réussi !",
        description: `Email envoyé à ${email}`,
      });

    } catch (error: any) {
      console.error('❌ Erreur test Resend:', error);
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
        <CardTitle>🧪 Test Resend</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleTest} className="space-y-4">
          <Input
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button 
            type="submit" 
            disabled={isLoading || !email}
            className="w-full"
          >
            {isLoading ? '📧 Envoi...' : '🚀 Tester Resend'}
          </Button>
        </form>

        {result && (
          <div className="mt-4 p-3 rounded-lg bg-muted">
            <pre className="text-xs">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};