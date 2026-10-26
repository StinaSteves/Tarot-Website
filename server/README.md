# Terminanfragen per E-Mail

`POST /api/bookings` versendet eine Anfrage an den serverseitig konfigurierten Empfänger. Keine automatische Terminreservierung, kein Verfügbarkeitskalender, keine Datenbank. Die Antwortadresse der Nachricht gehört dem Besucher; der Absender ist immer das konfigurierte SMTP-Konto. Die Oberfläche zeigt erst nach Annahme durch den SMTP-Server Erfolg an. Die endgültige Zustellung kann nur im Empfängerpostfach geprüft werden.

## Lokal starten

1. `.env.example` nach `.env` kopieren, falls noch nicht vorhanden. `.env` ist von Git ausgeschlossen.
2. `SMTP_PASS` ausschließlich in `.env` eintragen. Für GMX gegebenenfalls ein anwendungsspezifisches Passwort verwenden und den Zugriff für externe Programme in den GMX-Einstellungen aktivieren. Keine Zugangsdaten als `VITE_…` speichern.
3. `npm run dev:api` startet das Backend auf `127.0.0.1:3001`.
4. `npm run dev` startet die Website. Vite leitet `/api` an das Backend weiter.

GMX-Vorgabe: `mail.gmx.net`, Port `587`, STARTTLS, SMTP_USER und BOOKING_FROM entsprechend dem GMX-Konto. Testempfänger: `stina.steves@gmx.de`.

Quellen: [GMX SMTP-Serverdaten](https://hilfe.gmx.net/pop-imap/imap/imap-serverdaten.html), [Nodemailer SMTP](https://nodemailer.com/smtp).

## Hosting

Die gebauten Dateien `dist/` statisch ausliefern und `/api/bookings` über denselben HTTPS-Host an den laufenden Node-Prozess (`npm run start:api`) weiterleiten. `ALLOWED_ORIGINS` auf die echte Website-Adresse setzen. SMTP-Zugangsdaten ausschließlich auf dem Server hinterlegen. Ein reines statisches Hosting reicht für den E-Mail-Versand nicht aus.

Rate-Limit: fünf Versuche je Stunde und Socket-IP, im Speicher eines einzelnen Prozesses. Für öffentliches Hosting hinter einem Reverse Proxy dort zusätzlich ein clientbezogenes Rate-Limit konfigurieren; weitergeleitete IP-Header werden bewusst nicht ungeprüft vertraut. Neustarts setzen den lokalen Zähler zurück.

## Tests

`npm test` testet Validierung, festen Empfänger, Antwortadresse, Versandfehler, fehlende Konfiguration, Herkunftsprüfung und Rate-Limit. Alle Tests verwenden einen Test-Transport, keine echten E-Mails.

## Freies Kontaktformular

Die neue Oberfläche sendet `{ kind: 'contact', topic, name, email, message, website }` an denselben Endpunkt. Zulässige Themen: Liebe, Karriere, Geld, Familie, Tarot und Allgemeines. Ein Datum oder eine Uhrzeit ist für diese Nachrichten nicht erforderlich. Der bisherige Terminanfrage-Payload wird weiterhin validiert unterstützt; die neue Oberfläche übermittelt keine erfundenen Termine. Versandkonfiguration, fester Empfänger, Reply-To und Missbrauchsschutz bleiben gleich.

Die Preissektion kann zusätzlich `reading` (`impuls`, `klarheit` oder `tiefgang`) übergeben. Das Backend ergänzt Dauer und Preis aus `src/data/readings.js` in der E-Mail. Vom Client mitgeschickte Preis- oder Dauerangaben werden nicht verwendet. Anfragen ohne Auswahl funktionieren weiterhin. Beim Bereitstellen des Backends muss diese gemeinsame Datendatei neben `server/` mitkopiert werden.
