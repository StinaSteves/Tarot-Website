import { createBookingServer, smtpSender } from './booking.mjs'

const sendMail = smtpSender(process.env)
const port = Number(process.env.API_PORT || 3001)
const origins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173').split(',').map(value => value.trim())
const server = createBookingServer({
  sendMail,
  sender: process.env.BOOKING_FROM,
  recipient: process.env.BOOKING_TO || 'stina.steves@gmx.de',
  origins,
})
server.requestTimeout = 30000
server.headersTimeout = 15000
server.listen(port, process.env.API_HOST || '127.0.0.1', () => {
  console.log(`Buchungs-API auf Port ${port}. E-Mail-Versand ${sendMail ? 'konfiguriert' : 'noch nicht konfiguriert'}.`)
})
