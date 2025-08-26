import { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

// Composant Input accessible avec améliorations WCAG 2.1 AA
interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string; // ID obligatoire pour l'accessibilité
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  showRequiredIndicator?: boolean;
}

export const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({ 
    id,
    label,
    description,
    error,
    required,
    showRequiredIndicator = true,
    className,
    ...props 
  }, ref) => {
    
    const descriptionId = description ? `${id}-description` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const ariaDescribedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <div className="space-y-2">
        {/* Label avec indicateur requis */}
        <Label 
          htmlFor={id}
          className={cn(
            "text-sm font-medium",
            error && "text-destructive",
            required && "after:content-['*'] after:ml-1 after:text-destructive"
          )}
        >
          {label}
          {required && showRequiredIndicator && (
            <span className="text-destructive ml-1" aria-hidden="true">*</span>
          )}
        </Label>

        {/* Description */}
        {description && (
          <p 
            id={descriptionId}
            className="text-xs text-text-secondary"
          >
            {description}
          </p>
        )}

        {/* Input */}
        <Input
          ref={ref}
          id={id}
          className={cn(
            // États d'erreur
            error && "border-destructive focus-visible:ring-destructive/20",
            // Focus amélioré pour l'accessibilité
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
          )}
          aria-describedby={ariaDescribedBy}
          aria-required={required}
          aria-invalid={!!error}
          required={required}
          {...props}
        />

        {/* Message d'erreur */}
        {error && (
          <p 
            id={errorId}
            className="text-xs text-destructive"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

AccessibleInput.displayName = "AccessibleInput";