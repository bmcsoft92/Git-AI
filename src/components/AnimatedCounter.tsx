import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  target: string;
  duration?: number;
}

const AnimatedCounter = ({ target, duration = 2000 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  
  // Extraire le nombre de la chaîne (ex: "500+" -> 500, "98%" -> 98)
  const numericValue = parseInt(target.replace(/[^\d]/g, ''));
  const suffix = target.replace(/[\d]/g, '');
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Utiliser une fonction d'easing pour un effet plus naturel
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * numericValue);
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    // Démarrer l'animation après un court délai pour l'effet d'entrée
    const timeoutId = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 400);
    
    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrame);
    };
  }, [numericValue, duration]);
  
  return (
    <span className="animate-counter">
      {count}{suffix}
    </span>
  );
};

export default AnimatedCounter;