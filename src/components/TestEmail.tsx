import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const TestEmail = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Test depuis Maia Elange');
  const [message, setMessage] = useState('Ceci est un test d\'envoi d\'email depuis votre nouvelle fonction !');
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
      console.log('📧 Test envoi email:', { email, subject, message });
      
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: { email, subject, message }
      });

      console.log('📨 Réponse send-email:', { data, error });

      if (error) {
        throw error;
      }

      setResult(data);
      toast({
        title: "✅ Email envoyé !",
        description: `Email de test envoyé à ${email}`,
      });

    } catch (error: any) {
      console.error('❌ Erreur envoi email:', error);
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
        <CardTitle>📧 Test Envoi Email</CardTitle>
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
          <Input
            type="text"
            placeholder="Sujet de l'email"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <Textarea
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !email}
            className="w-full"
          >
            {isLoading ? '📧 Envoi...' : '🚀 Envoyer Email'}
          </Button>
        </form>

        {result && (
          <div className="mt-4 p-3 rounded-lg bg-muted">
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};