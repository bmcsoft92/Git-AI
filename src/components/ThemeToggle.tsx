import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Récupérer le thème sauvegardé ou utiliser le thème clair par défaut
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || 'light';
    
    setIsDark(initialTheme === 'dark');
    
    // Appliquer le thème au body
    document.body.className = initialTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    
    // Appliquer la classe au body
    document.body.className = newTheme;
    
    // Sauvegarder dans localStorage
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full hover:bg-muted/80 transition-colors"
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
    >
      <span className="text-xl">
        {isDark ? '🌞' : '🌙'}
      </span>
    </Button>
  );
};

export default ThemeToggle;