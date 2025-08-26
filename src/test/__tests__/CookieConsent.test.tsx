import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
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

  it('affiche le bandeau de cookies quand aucun consentement n\'existe', () => {
    renderWithRouter(<CookieConsent />)
    
    expect(screen.getByText('Gestion des cookies')).toBeInTheDocument()
    expect(screen.getByText(/Nous utilisons des cookies/)).toBeInTheDocument()
  })

  it('ne s\'affiche pas quand le consentement existe déjà', () => {
    // Simuler un consentement existant
    localStorage.setItem('maia-elange-cookie-consent', JSON.stringify({
      timestamp: new Date().toISOString(),
      type: 'accepted_all'
    }))

    renderWithRouter(<CookieConsent />)
    
    expect(screen.queryByText('Gestion des cookies')).not.toBeInTheDocument()
  })

  it('accepte tous les cookies quand on clique sur "Accepter tout"', async () => {
    const user = userEvent.setup()
    renderWithRouter(<CookieConsent />)
    
    const acceptButton = screen.getByText('Accepter tout')
    await user.click(acceptButton)

    await waitFor(() => {
      expect(localStorage.getItem('maia-elange-cookie-consent')).toBeTruthy()
      expect(localStorage.getItem('maia-elange-cookie-preferences')).toBeTruthy()
    })

    // Vérifier que les préférences incluent tous les cookies
    const preferences = JSON.parse(localStorage.getItem('maia-elange-cookie-preferences') || '{}')
    expect(preferences.necessary).toBe(true)
    expect(preferences.analytics).toBe(true)
    expect(preferences.marketing).toBe(true)
  })

  it('refuse tous les cookies sauf les nécessaires quand on clique sur "Refuser"', async () => {
    const user = userEvent.setup()
    renderWithRouter(<CookieConsent />)
    
    const rejectButton = screen.getByText('Refuser')
    await user.click(rejectButton)

    await waitFor(() => {
      const preferences = JSON.parse(localStorage.getItem('maia-elange-cookie-preferences') || '{}')
      expect(preferences.necessary).toBe(true)
      expect(preferences.analytics).toBe(false)
      expect(preferences.marketing).toBe(false)
    })
  })

  it('ouvre les paramètres détaillés quand on clique sur "Paramètres des cookies"', async () => {
    const user = userEvent.setup()
    renderWithRouter(<CookieConsent />)
    
    const settingsButton = screen.getByText('Paramètres des cookies')
    await user.click(settingsButton)

    await waitFor(() => {
      expect(screen.getByText('Cookies nécessaires')).toBeInTheDocument()
      expect(screen.getByText('Cookies d\'analyse')).toBeInTheDocument()
      expect(screen.getByText('Cookies marketing')).toBeInTheDocument()
    })
  })

  it('permet de personnaliser les préférences de cookies', async () => {
    const user = userEvent.setup()
    renderWithRouter(<CookieConsent />)
    
    // Ouvrir les paramètres
    await user.click(screen.getByText('Paramètres des cookies'))
    
    // Les cookies nécessaires doivent être désactivés par défaut (sauf necessary)
    await waitFor(() => {
      expect(screen.getByText('Toujours activé')).toBeInTheDocument()
    })

    // Sauvegarder les préférences personnalisées
    await user.click(screen.getByText('Enregistrer mes préférences'))

    await waitFor(() => {
      const preferences = JSON.parse(localStorage.getItem('maia-elange-cookie-preferences') || '{}')
      expect(preferences.necessary).toBe(true)
    })
  })

  it('respecte les standards d\'accessibilité', () => {
    renderWithRouter(<CookieConsent />)
    
    // Vérifier les rôles ARIA
    expect(screen.getByRole('button', { name: /Accepter tout/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Refuser/i })).toBeInTheDocument()
    
    // Vérifier la navigation clavier
    const acceptButton = screen.getByText('Accepter tout')
    expect(acceptButton).toHaveAttribute('tabIndex')
  })

  it('affiche le lien vers la politique de confidentialité', () => {
    renderWithRouter(<CookieConsent />)
    
    const privacyLink = screen.getByText('Politique de confidentialité')
    expect(privacyLink).toBeInTheDocument()
    expect(privacyLink.closest('a')).toHaveAttribute('href', '/politique-confidentialite')
  })
})