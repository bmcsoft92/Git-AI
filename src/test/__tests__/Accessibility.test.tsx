import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AccessibleButton } from '@/components/AccessibleButton'
import { AccessibleInput } from '@/components/AccessibleInput'
import { SkipNavigation } from '@/components/SkipNavigation'

describe('Accessibilité Components', () => {
  describe('AccessibleButton', () => {
    it('respecte les standards WCAG pour les boutons', () => {
      const { getByRole } = render(
        <AccessibleButton ariaLabel="Bouton d action principale">
          Cliquez ici
        </AccessibleButton>
      )
      
      const button = getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('aria-label', 'Bouton d action principale')
    })

    it('gère la navigation clavier', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      const { getByRole } = render(
        <AccessibleButton onClick={handleClick}>
          Test Button
        </AccessibleButton>
      )
      
      const button = getByRole('button')
      
      // Test de la touche Entrée
      button.focus()
      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalled()
    })

    it('gère l état désactivé correctement', () => {
      const { getByRole } = render(
        <AccessibleButton disabled>
          Bouton désactivé
        </AccessibleButton>
      )
      
      const button = getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('tabIndex', '-1')
    })
  })

  describe('AccessibleInput', () => {
    it('associe correctement le label à l input', () => {
      const { getByLabelText, getByText } = render(
        <AccessibleInput 
          id="test-input"
          label="Nom complet"
          required
        />
      )
      
      const input = getByLabelText(/nom complet/i)
      const label = getByText(/nom complet/i)
      
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('aria-required', 'true')
      expect(label).toHaveAttribute('for', 'test-input')
    })

    it('affiche les messages d erreur avec les bons attributs ARIA', () => {
      const { getByLabelText, getByText } = render(
        <AccessibleInput 
          id="error-input"
          label="Email"
          error="Format d email invalide"
        />
      )
      
      const input = getByLabelText(/email/i)
      const errorMessage = getByText('Format d email invalide')
      
      expect(input).toHaveAttribute('aria-invalid', 'true')
      expect(errorMessage).toHaveAttribute('role', 'alert')
      expect(errorMessage).toHaveAttribute('aria-live', 'polite')
    })
  })

  describe('SkipNavigation', () => {
    it('fournit des liens de navigation rapide', () => {
      const { getByText } = render(<SkipNavigation />)
      
      const mainLink = getByText('Aller au contenu principal')
      const navLink = getByText('Aller à la navigation')
      const contactLink = getByText('Aller au contact')
      
      expect(mainLink).toHaveAttribute('href', '#main-content')
      expect(navLink).toHaveAttribute('href', '#navigation')
      expect(contactLink).toHaveAttribute('href', '#contact')
    })

    it('les liens sont initialement cachés mais visibles au focus', () => {
      render(<SkipNavigation />)
      
      const container = document.querySelector('.sr-only')
      expect(container).toBeInTheDocument()
      expect(container).toHaveClass('focus-within:not-sr-only')
    })
  })

  describe('Contraste et Focus', () => {
    it('les éléments focusables ont des indicateurs de focus visibles', () => {
      const { getByRole } = render(
        <AccessibleButton>
          Test Focus
        </AccessibleButton>
      )
      
      const button = getByRole('button')
      expect(button).toHaveClass('focus-visible:ring-2')
      expect(button).toHaveClass('focus-visible:ring-ring')
      expect(button).toHaveClass('focus-visible:outline-none')
    })
  })
})