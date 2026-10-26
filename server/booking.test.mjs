import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createBookingServer, validateBooking } from './booking.mjs'

const origin = 'http://localhost:5173'
const now = () => new Date('2026-09-15T10:00:00Z')
const valid = { name: 'Test Person', email: 'test@example.com', date: '2026-09-16', time: '11:30', service: 'Tarot Readings', message: 'Testanfrage mit Umlauten: schön', website: '' }
async function api(t, options = {}) {
  const sent = []
  const server = createBookingServer({ now, origins: [origin], recipient: 'stina.steves@gmx.de', sender: 'sender@example.com', sendMail: async mail => { sent.push(mail); return { accepted: ['stina.steves@gmx.de'] } }, ...options })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  t.after(() => new Promise(resolve => { server.close(resolve); server.closeAllConnections() }))
  const post = (body, headers = {}) => fetch(`http://127.0.0.1:${server.address().port}/api/bookings`, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) })
  return { post, sent }
}

test('valid request sends only to configured recipient, reply-to is visitor', async t => {
  const { post, sent } = await api(t)
  const response = await post({ ...valid, to: 'attacker@example.com' })
  assert.equal(response.status, 200)
  assert.equal(sent.length, 1)
  assert.equal(sent[0].to, 'stina.steves@gmx.de')
  assert.equal(sent[0].replyTo.address, valid.email)
  assert(sent[0].text.includes('schön'))
})
test('invalid dates, past dates, times, address injection and oversized messages rejected', () => {
  for (const patch of [{ date: '2026-02-30' }, { date: '2026-09-14' }, { date: '2028-01-01' }, { time: '03:00' }, { email: 'x@example.com\r\nBcc: y@example.com' }, { service: 'Other' }, { message: 'x'.repeat(2001) }]) assert(validateBooking({ ...valid, ...patch }, now()))
})
test('untrusted origins and invalid forms never send email', async t => {
  const { post, sent } = await api(t)
  assert.equal((await post(valid, { Origin: 'https://other.example' })).status, 403)
  assert.equal((await post({ ...valid, name: '' })).status, 400)
  assert.equal((await post({ ...valid, website: 'spam.example' })).status, 400)
  assert.equal(sent.length, 0)
})
test('missing SMTP settings do not report success', async t => {
  const { post } = await api(t, { sendMail: null })
  assert.equal((await post(valid)).status, 503)
})
test('SMTP failures do not report success or expose credentials', async t => {
  const { post } = await api(t, { sendMail: async () => { throw new Error('private-password') } })
  const response = await post(valid)
  assert.equal(response.status, 502)
  assert(!(await response.text()).includes('private-password'))
})
test('rate limit stops repeated submissions', async t => {
  const { post, sent } = await api(t, { limit: 1 })
  assert.equal((await post(valid)).status, 200)
  assert.equal((await post(valid)).status, 429)
  assert.equal(sent.length, 1)
})

test('contact messages use topic and message without a fictitious appointment', async t => {
  const { post, sent } = await api(t)
  const contact = { kind: 'contact', name: valid.name, email: valid.email, topic: 'Liebe', message: 'Ich wünsche mir eine Legung.', website: '' }
  assert.equal((await post(contact)).status, 200)
  assert.equal(sent[0].subject, 'Neue Nachricht: Liebe')
  assert(sent[0].text.includes(contact.message))
  assert(!sent[0].text.includes('Wunschtermin'))
  assert.equal(sent[0].to, 'stina.steves@gmx.de')
  assert.equal(sent[0].replyTo.address, valid.email)
})
test('all five topics and general enquiries validate; invalid or empty requests fail', () => {
  const contact = { kind: 'contact', name: valid.name, email: valid.email, message: 'Eine freie Nachricht.' }
  for (const topic of ['Liebe', 'Karriere', 'Geld', 'Familie', 'Tarot', 'Allgemeines']) assert.equal(validateBooking({ ...contact, topic }), null)
  for (const patch of [{ topic: 'Invalid' }, { message: '   ' }, { message: 'x'.repeat(2001) }, { email: 'invalid' }, { kind: 'unknown' }]) assert(validateBooking({ ...contact, topic: 'Tarot', ...patch }))
})

test('selected readings reach email with canonical duration and price and preserve a full message', async t => {
  const { post, sent } = await api(t)
  for (const [reading, expected] of [['impuls', 'Impuls – 30 Minuten – 39 EUR'], ['klarheit', 'Klarheit – 60 Minuten – 69 EUR'], ['tiefgang', 'Tiefgang – 90 Minuten – 99 EUR']]) {
    const message = 'a'.repeat(2000)
    const response = await post({ kind: 'contact', name: valid.name, email: valid.email, topic: 'Tarot', reading, price: 1, minutes: 1, message })
    assert.equal(response.status, 200)
    assert(sent.at(-1).text.includes(expected))
    assert(sent.at(-1).text.includes(message))
    assert(sent.at(-1).text.includes('Unverbindliche Anfrage'))
  }
})

test('unknown or malformed reading choices never send email', async t => {
  const { post, sent } = await api(t)
  for (const reading of ['unknown', null, { id: 'impuls' }]) {
    const response = await post({ kind: 'contact', name: valid.name, email: valid.email, topic: 'Tarot', reading, message: 'Eine Anfrage.' })
    assert.equal(response.status, 400)
  }
  assert.equal(sent.length, 0)
})


test('ritual and talisman inquiries preserve canonical prices and the starting-price qualifier', async t => {
  const { post, sent } = await api(t)
  for (const [offer, expected] of [['ritual-anleitung', 'Dein eigenes Ritual – 49 EUR'], ['ritual-auftrag', 'Ein Ritual für dich – 79 EUR'], ['talisman', 'Dein Talisman – ab 39 EUR']]) {
    const response = await post({ kind: 'contact', name: valid.name, email: valid.email, topic: offer === 'talisman' ? 'Talismane' : 'Rituale', offer, price: 1, from: false, message: 'Meine persönliche Anfrage.' })
    assert.equal(response.status, 200)
    assert(sent.at(-1).text.includes(expected))
    assert(sent.at(-1).text.includes('Unverbindliche Anfrage'))
    assert(!sent.at(-1).text.includes('Minuten'))
  }
})

test('invalid or ambiguous offer selections are rejected without sending email', async t => {
  const { post, sent } = await api(t)
  for (const patch of [{ offer: 'unknown' }, { offer: null }, { offer: { id: 'talisman' } }, { offer: 'talisman', reading: 'impuls' }]) {
    const response = await post({ kind: 'contact', name: valid.name, email: valid.email, topic: 'Talismane', message: 'Eine Anfrage.', ...patch })
    assert.equal(response.status, 400)
  }
  assert.equal(sent.length, 0)
})
