import { forwardRef } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Composant Button accessible avec améliorations WCAG 2.1 AA
interface AccessibleButtonProps extends ButtonProps {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
  role?: string;
  tabIndex?: number;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ 
    children, 
    className, 
    ariaLabel, 
    ariaDescribedBy,
    ariaExpanded,
    ariaControls,
    role,
    tabIndex,
    onKeyDown,
    onClick,
    disabled,
    ...props 
  }, ref) => {
    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      // Support clavier amélioré
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (onClick && !disabled) {
          onClick(event as any);
        }
      }
      onKeyDown?.(event);
    };

    return (
      <Button
        ref={ref}
        className={cn(
          // Classes de base pour l'accessibilité
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
          // Amélioration du contraste au focus
          "focus-visible:ring-primary/70 focus-visible:ring-offset-background",
          // Transition smooth pour les interactions
          "transition-all duration-200 ease-in-out",
          // États disabled améliorés
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        role={role}
        tabIndex={disabled ? -1 : tabIndex}
        onKeyDown={handleKeyDown}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

AccessibleButton.displayName = "AccessibleButton";