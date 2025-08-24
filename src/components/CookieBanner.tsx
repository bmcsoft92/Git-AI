import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cookie, X, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    // Debug: forcer l'affichage si on est en mode debug
    if (debugMode) {
      setIsVisible(true);
      return;
    }

    // Vérifier si l'utilisateur a déjà accepté les cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    const cookieDeferred = localStorage.getItem('cookieConsentDeferred');
    
    console.log('CookieBanner Debug:', { cookieConsent, cookieDeferred, isVisible });
    
    if (!cookieConsent) {
      // Si pas de report ou si le délai est écoulé
      let shouldShow = true;
      
      if (cookieDeferred) {
        const deferredUntil = new Date(cookieDeferred);
        const now = new Date();
        console.log('Deferred check:', { deferredUntil, now, shouldShow: now >= deferredUntil });
        if (now < deferredUntil) {
          shouldShow = false;
        } else {
          // Le délai est écoulé, supprimer l'entrée
          localStorage.removeItem('cookieConsentDeferred');
        }
      }
      
      if (shouldShow) {
        console.log('Showing cookie banner in 2 seconds...');
        // Afficher le bandeau après un délai pour une meilleure UX
        const timer = setTimeout(() => {
          console.log('Cookie banner should be visible now');
          setIsVisible(true);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [debugMode]);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    localStorage.removeItem('cookieConsentDeferred'); // Nettoyer le report
    console.log('Cookies accepted');
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
    // Marquer comme "refusé temporairement" pour 24h
    const tomorrow = new Date();
    tomorrow.setHours(tomorrow.getHours() + 24);
    localStorage.setItem('cookieConsentDeferred', tomorrow.toISOString());
    console.log('Cookies deferred until:', tomorrow);
  };

  const resetCookieConsent = () => {
    localStorage.removeItem('cookieConsent');
    localStorage.removeItem('cookieConsentDate');
    localStorage.removeItem('cookieConsentDeferred');
    console.log('Cookie consent reset');
    setIsVisible(true);
  };

  // Mode debug accessible via console: window.toggleCookieDebug()
  useEffect(() => {
    (window as any).toggleCookieDebug = () => {
      setDebugMode(prev => !prev);
      console.log('Cookie debug mode:', !debugMode);
    };
    (window as any).resetCookies = resetCookieConsent;
  }, [debugMode]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto lg:max-w-lg lg:left-auto lg:right-8">
      <Card className="bg-card/95 backdrop-blur-md border border-primary/20 shadow-2xl">
        <CardContent className="p-4">
          {debugMode && (
            <div className="mb-4 p-2 bg-yellow-100 border border-yellow-400 rounded text-xs">
              🐛 DEBUG MODE - localStorage: {JSON.stringify({
                cookieConsent: localStorage.getItem('cookieConsent'),
                cookieDeferred: localStorage.getItem('cookieConsentDeferred')
              })}
            </div>
          )}
          
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-primary/20 rounded-lg flex-shrink-0">
              <Cookie className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-heading text-sm mb-1">
                Cookies et Confidentialité
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Nous utilisons des cookies essentiels pour améliorer votre expérience de navigation. 
                Aucun cookie de suivi ou publicitaire n'est utilisé.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-6 w-6 p-0 text-text-secondary hover:text-heading flex-shrink-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleAccept}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
            >
              Accepter
            </Button>
            <Link to="/politique-confidentialite">
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto text-xs border-primary/30 text-primary hover:bg-primary/10"
              >
                En savoir plus
              </Button>
            </Link>
            {debugMode && (
              <Button
                onClick={resetCookieConsent}
                size="sm"
                variant="outline"
                className="w-full sm:w-auto text-xs"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Reset
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieBanner;