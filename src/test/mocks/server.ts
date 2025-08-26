import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

// Serveur de mocks pour les tests
export const server = setupServer(
  // Mock des appels à Supabase
  http.post('*/rest/v1/rpc/send_contact_message', () => {
    return HttpResponse.json({ success: true })
  }),

  http.post('*/functions/v1/send-contact-message', () => {
    return HttpResponse.json({ success: true })
  }),

  http.post('*/functions/v1/book-appointment', () => {
    return HttpResponse.json({ success: true })
  }),

  http.post('*/functions/v1/analyze-roi-data', () => {
    return HttpResponse.json({ 
      roi_percentage: 250,
      annual_savings: 50000
    })
  }),
)