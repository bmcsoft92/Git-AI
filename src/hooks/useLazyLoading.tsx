import { useState, useEffect, useRef } from 'react';

interface LazyComponentProps {
  threshold?: number;
  rootMargin?: string;
}

// Hook pour le lazy loading des composants
export const useLazyLoading = ({ threshold = 0.1, rootMargin = '50px' }: LazyComponentProps = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsIntersecting(true);
          setHasLoaded(true);
          // Une fois chargé, on peut arrêter d'observer
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, hasLoaded]);

  return { ref: elementRef, isIntersecting, hasLoaded };
};

// Hook pour le lazy loading des images
export const useLazyImage = (src: string, placeholder?: string) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const { ref, isIntersecting } = useLazyLoading();

  useEffect(() => {
    if (isIntersecting && src) {
      const img = new Image();
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      
      img.onerror = () => {
        setIsError(true);
      };
      
      img.src = src;
    }
  }, [isIntersecting, src]);

  return {
    ref,
    src: imageSrc,
    isLoaded,
    isError,
    isIntersecting,
  };
};

// Composant LazyImage optimisé
interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder,
  className = '',
  onLoad,
  onError,
  ...props
}) => {
  const { ref, src: imageSrc, isLoaded, isError } = useLazyImage(src, placeholder);

  const handleLoad = () => {
    onLoad?.();
  };

  const handleError = () => {
    onError?.();
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {isError && (
        <div className="absolute inset-0 bg-muted/50 rounded-lg flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Erreur de chargement</span>
        </div>
      )}
      
      <img
        src={imageSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </div>
  );
};

// Composant LazySection pour le chargement différé des sections
interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback,
  className = '',
  threshold = 0.1,
  rootMargin = '100px',
}) => {
  const { ref, isIntersecting, hasLoaded } = useLazyLoading({ threshold, rootMargin });

  return (
    <div ref={ref} className={className}>
      {hasLoaded || isIntersecting ? children : (
        fallback || (
          <div className="h-64 bg-muted/20 animate-pulse rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )
      )}
    </div>
  );
};