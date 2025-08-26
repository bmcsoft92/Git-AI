import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Cookie, Settings, Check, X, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const COOKIE_CONSENT_KEY = 'maia-elange-cookie-consent';
const COOKIE_PREFERENCES_KEY = 'maia-elange-cookie-preferences';

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Toujours activé
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    
    if (!consent) {
      setShowBanner(true);
    }
    
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    
    setPreferences(allAccepted);
    saveCookieSettings(allAccepted, 'accepted_all');
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    
    setPreferences(onlyNecessary);
    saveCookieSettings(onlyNecessary, 'rejected_all');
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSaveCustom = () => {
    saveCookieSettings(preferences, 'custom');
    setShowBanner(false);
    setShowSettings(false);
  };

  const saveCookieSettings = (prefs: CookiePreferences, consentType: string) => {
    const consentData = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      type: consentType,
      preferences: prefs,
    };
    
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    
    // Ici, vous pourriez déclencher l'activation/désactivation des cookies tiers
    // selon les préférences de l'utilisateur
    applyPreferences(prefs);
  };

  const applyPreferences = (prefs: CookiePreferences) => {
    // Exemple d'application des préférences
    if (prefs.analytics) {
      // Activer Google Analytics ou autres outils d'analyse
      console.log('Analytics cookies enabled');
    } else {
      // Désactiver les cookies d'analyse
      console.log('Analytics cookies disabled');
    }
    
    if (prefs.marketing) {
      // Activer les cookies marketing/publicitaires
      console.log('Marketing cookies enabled');
    } else {
      console.log('Marketing cookies disabled');
    }
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Les cookies nécessaires ne peuvent pas être désactivés
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!showBanner && !showSettings) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={() => setShowSettings(false)}
      />

      {/* Bandeau principal */}
      {showBanner && !showSettings && (
        <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-card/95 backdrop-blur-md border border-primary/30 shadow-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-bold text-heading">
              <Cookie className="h-5 w-5 text-primary" />
              Gestion des cookies
              <Badge variant="outline" className="text-xs border-primary/30 text-primary">RGPD</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm text-text-secondary leading-relaxed">
                Nous utilisons des cookies pour améliorer votre expérience, analyser notre trafic et personnaliser le contenu.
              </p>
              
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-xs text-text-secondary">
                  Conformité RGPD • Données chiffrées
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <Button 
                  onClick={handleAcceptAll}
                  variant="cta" 
                  size="sm"
                  className="flex-1 text-xs"
                >
                  <Check className="h-3 w-3 mr-1" />
                  Accepter tout
                </Button>
                <Button 
                  onClick={handleRejectAll}
                  variant="outline" 
                  size="sm"
                  className="flex-1 text-xs border-primary/30"
                >
                  <X className="h-3 w-3 mr-1" />
                  Refuser
                </Button>
              </div>
              
              <Button 
                onClick={() => setShowSettings(true)}
                variant="ghost" 
                size="sm"
                className="text-xs text-primary hover:text-cta-primary"
              >
                <Settings className="h-3 w-3 mr-1" />
                Paramètres des cookies
              </Button>
            </div>

            <div className="pt-2 border-t border-border/50">
              <Link 
                to="/politique-confidentialite" 
                className="text-xs text-primary hover:text-cta-primary transition-colors inline-flex items-center gap-1"
              >
                Politique de confidentialité
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Paramètres détaillés */}
      {showSettings && (
        <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl max-h-[80vh] overflow-y-auto z-50 bg-card/95 backdrop-blur-md border border-primary/30 shadow-2xl">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-heading">
              <Settings className="h-5 w-5 text-primary" />
              Paramètres des cookies
              <Badge variant="outline" className="text-xs border-primary/30 text-primary">RGPD</Badge>
            </CardTitle>
            <p className="text-sm text-text-secondary">
              Personnalisez vos préférences de cookies. Les cookies nécessaires sont toujours activés pour le bon fonctionnement du site.
            </p>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            {/* Cookies nécessaires */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-heading text-sm">Cookies nécessaires</h4>
                  <p className="text-xs text-text-secondary mt-1">
                    Essentiels au fonctionnement du site (navigation, sécurité, formulaires)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-primary font-medium">Toujours activé</span>
                  <div className="w-10 h-5 bg-primary rounded-full flex items-center justify-end px-1">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cookies d'analyse */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-heading text-sm">Cookies d'analyse</h4>
                  <p className="text-xs text-text-secondary mt-1">
                    Nous aident à comprendre comment vous utilisez le site (Google Analytics)
                  </p>
                </div>
                <button
                  onClick={() => togglePreference('analytics')}
                  className={`w-10 h-5 rounded-full flex items-center px-1 transition-colors ${
                    preferences.analytics ? 'bg-primary justify-end' : 'bg-muted justify-start'
                  }`}
                >
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </button>
              </div>
            </div>

            {/* Cookies marketing */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-heading text-sm">Cookies marketing</h4>
                  <p className="text-xs text-text-secondary mt-1">
                    Personnalisent les publicités et mesurent l'efficacité des campagnes
                  </p>
                </div>
                <button
                  onClick={() => togglePreference('marketing')}
                  className={`w-10 h-5 rounded-full flex items-center px-1 transition-colors ${
                    preferences.marketing ? 'bg-primary justify-end' : 'bg-muted justify-start'
                  }`}
                >
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </button>
              </div>
            </div>

            {/* Cookies de préférences */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-heading text-sm">Cookies de préférences</h4>
                  <p className="text-xs text-text-secondary mt-1">
                    Mémorisent vos choix (langue, région, préférences d'affichage)
                  </p>
                </div>
                <button
                  onClick={() => togglePreference('preferences')}
                  className={`w-10 h-5 rounded-full flex items-center px-1 transition-colors ${
                    preferences.preferences ? 'bg-primary justify-end' : 'bg-muted justify-start'
                  }`}
                >
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/50">
              <Button 
                onClick={handleSaveCustom}
                variant="cta" 
                className="flex-1"
              >
                <Check className="h-4 w-4 mr-2" />
                Enregistrer mes préférences
              </Button>
              <Button 
                onClick={handleAcceptAll}
                variant="outline" 
                className="flex-1 border-primary/30"
              >
                Accepter tout
              </Button>
              <Button 
                onClick={handleRejectAll}
                variant="outline" 
                className="flex-1 border-destructive/30 text-destructive hover:bg-destructive/10"
              >
                Refuser tout
              </Button>
            </div>

            <div className="text-center pt-2">
              <Link 
                to="/politique-confidentialite" 
                className="text-xs text-primary hover:text-cta-primary transition-colors inline-flex items-center gap-1"
              >
                Consulter notre politique de confidentialité
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

// Hook pour utiliser les préférences cookies dans d'autres composants
export const useCookiePreferences = () => {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  return preferences;
};