import { createServer } from 'node:http'
import nodemailer from 'nodemailer'
import { ritualOffers } from '../src/data/ritualOffers.js'
import { readings } from '../src/data/readings.js'

const TIMES = ['10:00', '11:30', '13:00', '15:00', '17:00']
const SERVICES = ['Tarot Readings', 'Astrologische Beratung', 'Individuelle Rituale', 'Begleitung auf deinem Weg']
const TOPICS = ['Liebe', 'Karriere', 'Geld', 'Familie', 'Tarot', 'Rituale', 'Talismane', 'Allgemeines']
const emailPattern = /^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/
const berlinDate = date => date.toLocaleDateString('sv-SE', { timeZone: 'Europe/Berlin' })

export function validateBooking(body, now = new Date()) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return 'Ungültige Anfrage.'
  if (typeof body.name !== 'string' || body.name.trim().length < 2 || body.name.length > 100 || /[\r\n]/.test(body.name)) return 'Bitte gib deinen Namen an.'
  if (typeof body.email !== 'string' || body.email.length > 254 || !emailPattern.test(body.email)) return 'Bitte gib eine gültige E-Mail-Adresse an.'
  if (body.kind === 'contact') {
    if (!TOPICS.includes(body.topic)) return 'Bitte wähle ein gültiges Thema.'
    if (body.reading !== undefined && !readings.some(reading => reading.id === body.reading)) return 'Bitte wähle eine gültige Tarot-Legung.'
    if (body.offer !== undefined && !ritualOffers.some(offer => offer.id === body.offer)) return 'Bitte wähle ein gültiges Angebot.'
    if (body.offer !== undefined && body.reading !== undefined) return 'Bitte wähle nur ein Angebot.'
    if (typeof body.message !== 'string' || body.message.trim().length < 3 || body.message.length > 2000) return 'Bitte schreibe eine Nachricht mit 3 bis 2.000 Zeichen.'
    return null
  }
  if (body.kind !== undefined) return 'Ungültige Anfrage.'
  if (!SERVICES.includes(body.service) || !TIMES.includes(body.time)) return 'Bitte wähle Angebot und Uhrzeit aus.'
  if (typeof body.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(body.date)) return 'Bitte wähle ein gültiges Datum.'
  const date = new Date(`${body.date}T12:00:00Z`)
  const limit = new Date(now); limit.setFullYear(limit.getFullYear() + 1)
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== body.date || body.date <= berlinDate(now) || body.date > berlinDate(limit)) return 'Bitte wähle einen zukünftigen Termin innerhalb der nächsten zwölf Monate.'
  if (typeof body.message !== 'string' || body.message.length > 2000) return 'Die Nachricht darf höchstens 2.000 Zeichen enthalten.'
  return null
}

export function createBookingServer({ sendMail, recipient, sender, origins, limit = 5, now = () => new Date() }) {
  const attempts = new Map()
  const reply = (res, status, payload) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(payload)) }
  return createServer(async (req, res) => {
    if (req.url !== '/api/bookings') return reply(res, 404, { error: 'Nicht gefunden.' })
    if (req.method !== 'POST') return reply(res, 405, { error: 'Methode nicht erlaubt.' })
    if (!origins.includes(req.headers.origin)) return reply(res, 403, { error: 'Anfrage nicht erlaubt.' })
    if (!req.headers['content-type']?.startsWith('application/json')) return reply(res, 415, { error: 'JSON erwartet.' })
    const timestamp = now().getTime()
    for (const [key, value] of attempts) if (timestamp - value.start >= 3600000) attempts.delete(key)
    const ip = req.socket.remoteAddress
    const count = attempts.get(ip) || { start: timestamp, count: 0 }
    if (count.count >= limit) return reply(res, 429, { error: 'Zu viele Anfragen. Bitte versuche es in einer Stunde erneut.' })
    attempts.set(ip, { ...count, count: count.count + 1 })
    try {
      const chunks = []
      let bytes = 0
      for await (const chunk of req) {
        bytes += chunk.length
        if (bytes > 10000) return reply(res, 413, { error: 'Die Anfrage ist zu groß.' })
        chunks.push(chunk)
      }
      let body
      try { body = JSON.parse(Buffer.concat(chunks).toString('utf8')) } catch { return reply(res, 400, { error: 'Ungültige Anfrage.' }) }
      const invalid = validateBooking(body, now())
      if (invalid) return reply(res, 400, { error: invalid })
      if (body.website) return reply(res, 400, { error: 'Anfrage konnte nicht verarbeitet werden.' })
      if (!sendMail) return reply(res, 503, { error: 'Der E-Mail-Versand ist noch nicht eingerichtet. Bitte versuche es später erneut.' })
      const reading = body.kind === 'contact' && readings.find(item => item.id === body.reading)
      const readingText = reading ? `\nAngefragte Legung: ${reading.name} – ${reading.minutes} Minuten – ${reading.price} EUR\nUnverbindliche Anfrage, keine bestätigte Buchung.\n` : ''
      const offer = body.kind === 'contact' && ritualOffers.find(item => item.id === body.offer)
      const offerText = offer ? `\nAngefragtes Angebot: ${offer.name} – ${offer.from ? 'ab ' : ''}${offer.price} EUR\n${offer.description}\nUnverbindliche Anfrage, keine bestätigte Buchung.\n` : ''
      const info = await sendMail({
        from: sender,
        to: recipient,
        replyTo: { name: body.name.trim(), address: body.email },
        subject: body.kind === 'contact' ? `Neue Nachricht: ${body.topic}` : `Terminanfrage: ${body.service} – ${body.date}, ${body.time}`,
        text: body.kind === 'contact'
          ? `Neue Kontaktanfrage\n\nThema: ${body.topic}\nName: ${body.name.trim()}\nE-Mail: ${body.email}\n${readingText}${offerText}\nNachricht:\n${body.message.trim()}\n\nAntworte auf diese E-Mail, um direkt mit der anfragenden Person Kontakt aufzunehmen.`
          : `Neue Terminanfrage\n\nName: ${body.name.trim()}\nE-Mail: ${body.email}\nAngebot: ${body.service}\nWunschtermin: ${body.date}, ${body.time} Uhr (Europe/Berlin)\n\nNachricht:\n${body.message.trim() || 'Keine Nachricht'}\n\nDies ist eine Anfrage, keine bestätigte Buchung. Antworte auf diese E-Mail, um den Termin zu bestätigen.`,
        disableFileAccess: true,
        disableUrlAccess: true,
      })
      if (!info.accepted?.length) throw new Error('SMTP rejected recipient')
      return reply(res, 200, { ok: true })
    } catch {
      // Never log personal details, message content or SMTP credentials.
      return reply(res, 502, { error: 'Die Anfrage konnte nicht gesendet werden. Bitte versuche es später erneut.' })
    }
  })
}

export function smtpSender(env) {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS || !env.BOOKING_FROM) return null
  const port = Number(env.SMTP_PORT || 587)
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST, port, secure: port === 465, requireTLS: port !== 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000,
    disableFileAccess: true, disableUrlAccess: true,
  })
  return message => transport.sendMail(message)
}
