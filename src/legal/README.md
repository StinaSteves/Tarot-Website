# Rechtliche Seiten

Die drei Seiten sind eigenständige Vite-Einstiegspunkte: `/impressum/`, `/datenschutz/` und `/agb/`. Der Build erzeugt jeweils eine `index.html` im entsprechenden Unterordner. Ein statischer Host mit Unterstützung für Verzeichnis-Indexdateien braucht dafür keine SPA-Umschreibung. Die Kontakt-API benötigt weiterhin ein separates Backend.

Texte stehen zentral in `content.js`; Layout und Gestaltung in `LegalPage.jsx` und `LegalPage.css`. Die Homepage verlinkt alle Seiten im Footer und die Datenschutzhinweise zusätzlich am Kontaktformular.

## Bestätigte Angaben

- Anbieterin: Stina Steves, Deutschland, Kleingewerbe.
- Leistung: Tarot-Kartenlegungen.
- Das Formular stellt nur Anfragen; keine verbindliche Buchung oder Zahlung.
- Gewünschte Beispiel-E-Mail: `kontakt@example.com`; vor Veröffentlichung ersetzen.
- Bestätigte Sitzungspreise: Impuls 30 Minuten / 39 €, Klarheit 60 Minuten / 69 €, Tiefgang 90 Minuten / 99 €. Gemeinsame Datenquelle für Preissektion, AGB-Entwurf und E-Mail ist `src/data/readings.js`.

Aus „Kleingewerbe“ wird keine bestimmte steuerliche Behandlung abgeleitet.

## Noch offen

Die Seiten sind inhaltliche Entwürfe und keine fertig geprüften Rechtstexte. Die `pending`-Felder und der Hinweis am Seitenanfang kennzeichnen fehlende Angaben. Auch ein ausgefüllter Entwurf muss mit dem tatsächlichen Angebot und Betrieb abgeglichen werden.

Es fehlen insbesondere Geschäftsanschrift, echte Kontaktadresse, gegebenenfalls weitere Pflichtangaben, Hosting- und E-Mail-Anbieter, konkrete Speicherfristen sowie der spätere Vertragsablauf. Zielgruppe, online/vor Ort, steuerliche Behandlung, Zahlung, Absagen und Widerruf sind nicht festgelegt. Keine Stornogebühren oder Ausschlüsse von Verbraucherrechten wurden erfunden.

Die Datenschutzabschnitte zu Cookies, Newsletter, Bildern und Schriftdateien beschreiben den aktuellen Anwendungscode. Dienste und Protokollierung des späteren Hosts sind zusätzlich zu prüfen. Mit neuen Diensten müssen die Texte aktualisiert werden.

Alle drei HTML-Dateien enthalten während des Entwurfs `noindex, nofollow`. Nach inhaltlicher Fertigstellung die Entwurfshinweise, offenen Felder und die Suchmaschinen-Metadaten bewusst aktualisieren. `noindex` ist kein Zugriffsschutz.

## Offizielle Grundlagen für die spätere Prüfung

- Anbieterangaben: [§ 5 DDG](https://www.gesetze-im-internet.de/ddg/__5.html)
- Datenschutzinformation, Rechtsgrundlagen und Betroffenenrechte: [DSGVO, insbesondere Art. 6, 13 und 15–21](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32016R0679)
- Einbeziehung von Bedingungen: [§ 305 BGB](https://www.gesetze-im-internet.de/bgb/__305.html)
- Fernabsatz/Widerruf: [§ 312g BGB](https://www.gesetze-im-internet.de/bgb/__312g.html), [§ 355 BGB](https://www.gesetze-im-internet.de/bgb/__355.html)

Diese Quellen ersetzen keine Prüfung des konkreten Geschäftsmodells.
