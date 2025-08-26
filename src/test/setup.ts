import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { server } from './mocks/server'

// Établir les mocks API avant tous les tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Nettoyer après chaque test
afterEach(() => {
  cleanup()
  server.resetHandlers()
})

// Nettoyer après tous les tests
afterAll(() => server.close())

// Mock du localStorage pour les tests
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
})

// Mock de l'IntersectionObserver pour les tests de lazy loading
global.IntersectionObserver = vi.fn().mockImplementation((callback, options) => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock du ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))