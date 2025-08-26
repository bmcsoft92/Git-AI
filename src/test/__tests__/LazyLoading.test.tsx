import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { LazyImage, LazySection } from '@/hooks/useLazyLoading'

// Mock de IntersectionObserver
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver

describe('LazyLoading Components', () => {
  describe('LazyImage', () => {
    it('affiche un placeholder de chargement initialement', () => {
      render(
        <LazyImage 
          src="https://example.com/image.jpg" 
          alt="Test image" 
        />
      )
      
      // Doit afficher le spinner de chargement
      expect(document.querySelector('.animate-spin')).toBeInTheDocument()
    })

    it('respecte l attribut alt pour l accessibilité', () => {
      const { getByAltText } = render(
        <LazyImage 
          src="https://example.com/image.jpg" 
          alt="Image de test pour l accessibilite" 
        />
      )
      
      const img = getByAltText('Image de test pour l accessibilite')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('loading', 'lazy')
      expect(img).toHaveAttribute('decoding', 'async')
    })
  })

  describe('LazySection', () => {
    it('affiche un fallback par défaut', () => {
      render(
        <LazySection>
          <div>Contenu lazy</div>
        </LazySection>
      )
      
      // Doit afficher le spinner par défaut
      expect(document.querySelector('.animate-pulse')).toBeInTheDocument()
    })

    it('affiche un fallback personnalisé', () => {
      const { getByText } = render(
        <LazySection fallback={<div>Chargement personnalisé...</div>}>
          <div>Contenu lazy</div>
        </LazySection>
      )
      
      expect(getByText('Chargement personnalisé...')).toBeInTheDocument()
    })
  })

  describe('Accessibilité', () => {
    it('fournit des indicateurs de chargement accessibles', () => {
      render(
        <LazyImage 
          src="https://example.com/image.jpg" 
          alt="Test image" 
        />
      )
      
      // Le spinner doit être présent pour les lecteurs d'écran
      const spinner = document.querySelector('.animate-spin')
      expect(spinner).toBeInTheDocument()
    })
  })
})