import { setupServer } from 'msw/node'
import { rest } from 'msw'

// Serveur de mocks pour les tests
export const server = setupServer(
  // Mock des appels à Supabase
  rest.post('*/rest/v1/rpc/send_contact_message', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ success: true })
    )
  }),

  rest.post('*/functions/v1/send-contact-message', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ success: true })
    )
  }),

  rest.post('*/functions/v1/book-appointment', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ success: true })
    )
  }),

  rest.post('*/functions/v1/analyze-roi-data', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ 
        roi_percentage: 250,
        annual_savings: 50000
      })
    )
  }),
)