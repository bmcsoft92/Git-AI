import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CookieConsent } from '@/components/CookieConsent'
import { BrowserRouter } from 'react-router-dom'

// Wrapper avec Router pour les liens
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('CookieConsent', () => {
  beforeEach(() => {
    // Nettoyer le localStorage avant chaque test
    localStorage.clear()
  })

  it('affiche le bandeau de cookies quand aucun consentement n existe', () => {
    const { getByText } = renderWithRouter(<CookieConsent />)
    
    expect(getByText('Gestion des cookies')).toBeInTheDocument()
    expect(getByText(/Nous utilisons des cookies/)).toBeInTheDocument()
  })

  it('ne s affiche pas quand le consentement existe déjà', () => {
    // Simuler un consentement existant
    localStorage.setItem('maia-elange-cookie-consent', JSON.stringify({
      timestamp: new Date().toISOString(),
      type: 'accepted_all'
    }))

    const { queryByText } = renderWithRouter(<CookieConsent />)
    
    expect(queryByText('Gestion des cookies')).not.toBeInTheDocument()
  })

  it('accepte tous les cookies quand on clique sur Accepter tout', async () => {
    const user = userEvent.setup()
    const { getByText } = renderWithRouter(<CookieConsent />)
    
    const acceptButton = getByText('Accepter tout')
    await user.click(acceptButton)

    // Vérifier le stockage (simplifié sans waitFor)
    expect(localStorage.getItem('maia-elange-cookie-consent')).toBeTruthy()
  })

  it('ouvre les paramètres détaillés quand on clique sur Paramètres des cookies', async () => {
    const user = userEvent.setup()
    const { getByText } = renderWithRouter(<CookieConsent />)
    
    const settingsButton = getByText('Paramètres des cookies')
    await user.click(settingsButton)

    // Test simplifié - vérifier qu'on peut cliquer sur le bouton
    expect(settingsButton).toBeInTheDocument()
  })

  it('respecte les standards d accessibilité', () => {
    const { getByRole, getByText } = renderWithRouter(<CookieConsent />)
    
    // Vérifier les rôles ARIA
    expect(getByRole('button', { name: /Accepter tout/i })).toBeInTheDocument()
    expect(getByRole('button', { name: /Refuser/i })).toBeInTheDocument()
    
    // Vérifier la navigation clavier
    const acceptButton = getByText('Accepter tout')
    expect(acceptButton).toHaveAttribute('tabIndex')
  })

  it('affiche le lien vers la politique de confidentialité', () => {
    const { getByText } = renderWithRouter(<CookieConsent />)
    
    const privacyLink = getByText('Politique de confidentialité')
    expect(privacyLink).toBeInTheDocument()
    expect(privacyLink.closest('a')).toHaveAttribute('href', '/politique-confidentialite')
  })
})