// Draft content: confirm the marked details before publishing these pages.
import { ritualOffers } from '../data/ritualOffers.js'
import { readings } from '../data/readings.js'
export const legalPages = [
  {
    slug: 'impressum',
    label: 'Impressum',
    number: '01',
    intro: 'Die Person hinter NYX. Angaben zur Anbieterin und zur Kontaktaufnahme.',
    notice: 'Die Geschäftsanschrift und die echte Kontaktadresse fehlen noch. Diese Seite ist ein Entwurf.',
    sections: [
      {
        id: 'anbieterin', title: 'Anbieterin',
        paragraphs: ['Stina Steves', 'Tarot-Kartenlegungen, Rituale und Talismane · Gewerbliche Anbieterin in Deutschland'],
        pending: 'Geschäftsanschrift ergänzen: Straße, Hausnummer, Postleitzahl und Ort. Eine ladungsfähige Anschrift ist erforderlich.',
      },
      {
        id: 'kontakt', title: 'Kontakt',
        paragraphs: ['E-Mail: kontakt@example.com'],
        pending: 'Beispieladresse – bitte durch die öffentliche Kontakt-E-Mail ersetzen und einen geeigneten Weg für unmittelbare Kommunikation ergänzen.',
      },
      {
        id: 'weitere-angaben', title: 'Weitere Angaben',
        paragraphs: ['Das Angebot umfasst Tarot-Kartenlegungen, persönlich durchgeführte Rituale, individuell abgestimmte Rituale mit Anleitung sowie Talismane. Über das Kontaktformular können unverbindliche Anfragen gestellt werden.'],
        pending: 'Registerangaben und Umsatzsteuer- oder Wirtschafts-Identifikationsnummer ergänzen, soweit vorhanden und anzugeben. Eine private Steuernummer gehört nicht hierher. Angaben zur Verbraucherschlichtung und gegebenenfalls weitere Informationspflichten prüfen.',
      },
    ],
  },
  {
    slug: 'datenschutz',
    label: 'Datenschutz',
    number: '02',
    intro: 'Was mit deinen Daten geschieht, wenn du diese Website besuchst oder eine Nachricht schreibst.',
    notice: 'Vorläufige Datenschutzhinweise. Anschrift, Kontaktadresse, Hosting, E-Mail-Dienst und Löschfristen müssen vor Veröffentlichung ergänzt und geprüft werden.',
    sections: [
      {
        id: 'verantwortliche', title: 'Verantwortliche',
        paragraphs: ['Verantwortlich für die Verarbeitung personenbezogener Daten ist Stina Steves, Deutschland.', 'Kontakt: kontakt@example.com (Beispieladresse).'],
        pending: 'Vollständige Geschäftsanschrift und erreichbare Kontaktadresse ergänzen.',
      },
      {
        id: 'website', title: 'Besuch der Website',
        paragraphs: ['Beim Aufrufen einer Website wird deine IP-Adresse an den bereitstellenden Server übermittelt. Welche weiteren Verbindungsdaten protokolliert werden und wie lange diese gespeichert bleiben, hängt vom eingesetzten Hosting ab.'],
        pending: 'Hosting-Anbieter und Anschrift, verarbeitete Daten, Zwecke, Rechtsgrundlagen, Empfänger, Speicherfristen und gegebenenfalls Übermittlungen außerhalb des Europäischen Wirtschaftsraums ergänzen.',
      },
      {
        id: 'anfragen', title: 'Kontakt und Anfragen',
        paragraphs: [
          'Wenn du das Kontaktformular verwendest, werden dein Name, deine E-Mail-Adresse und deine Nachricht übermittelt. Wenn du ein Angebot ausgewählt hast, wird dieses mit Preis beziehungsweise Einstiegspreis und bei Tarot-Legungen mit der Dauer in der Anfrage ergänzt. Diese Angaben werden zur Bearbeitung deiner Anfrage und für die Antwort verwendet. Das Formular dient der Kontaktaufnahme; es bestätigt keinen Termin und schließt keine Buchung ab.',
          'Bei Anfragen zu einer gewünschten Leistung kommt Art. 6 Abs. 1 lit. b DSGVO als Rechtsgrundlage in Betracht. Sonstige Anfragen können auf Grundlage des berechtigten Interesses an ihrer Bearbeitung nach Art. 6 Abs. 1 lit. f DSGVO verarbeitet werden.',
          'Nachrichten werden per E-Mail weitergeleitet. Zum Schutz vor wiederholten automatisierten Anfragen führt die Anwendung außerdem einen zeitlich begrenzten Zähler je Verbindungs-IP. Bitte teile in deiner ersten Nachricht nur die Informationen mit, die für deine Anfrage erforderlich sind.',
        ],
        pending: 'Tatsächlich verwendeten E-Mail-Anbieter, Empfänger, Löschfristen sowie die konkrete Rechtsgrundlage und Speicherdauer des Missbrauchsschutzes festlegen. Mögliche gesetzliche Aufbewahrungspflichten berücksichtigen.',
      },
      {
        id: 'dienste', title: 'Cookies und weitere Dienste',
        paragraphs: [
          'Im derzeitigen Stand der Website sind keine Analyse- oder Werbedienste eingebunden. Bilder und Schriftdateien werden mit der Website bereitgestellt. Die Anwendung selbst setzt keine Cookies und speichert keine Angaben im lokalen Browserspeicher.',
          'Die Social-Media-Symbole enthalten derzeit keine eingebetteten Feeds.',
        ],
        pending: 'Vor Veröffentlichung auch das tatsächliche Hosting auf zusätzliche Dienste und Cookies prüfen. Diese Hinweise bei Einbindung weiterer Dienste aktualisieren.',
      },
      {
        id: 'rechte', title: 'Deine Rechte',
        paragraphs: [
          'Nach Maßgabe der DSGVO hast du Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit. Soweit die Verarbeitung auf berechtigten Interessen beruht, kannst du unter den gesetzlichen Voraussetzungen widersprechen. Eine erteilte Einwilligung kannst du für die Zukunft widerrufen.',
          'Du kannst dich bei einer Datenschutzaufsichtsbehörde beschweren, insbesondere an deinem gewöhnlichen Aufenthaltsort, deinem Arbeitsplatz oder am Ort eines vermuteten Verstoßes.',
        ],
        pending: 'Die für den Unternehmenssitz zuständige Datenschutzaufsichtsbehörde und deren Kontakt ergänzen.',
      },
    ],
  },
  {
    slug: 'agb',
    label: 'AGB',
    number: '03',
    intro: 'Der Rahmen für Tarot, Rituale und Talismane – von deiner ersten Anfrage bis zu einer möglichen Vereinbarung.',
    notice: 'AGB-Entwurf, noch keine fertigen Vertragsbedingungen. Die offenen Punkte müssen an den tatsächlichen Buchungsablauf angepasst werden.',
    sections: [
      {
        id: 'angebot', title: 'Anbieterin und Angebot',
        paragraphs: ['Stina Steves bietet Tarot-Kartenlegungen, persönlich durchgeführte Rituale, individuell abgestimmte Rituale mit Anleitung sowie Talismane an. Die Website stellt das Angebot vor und ermöglicht eine erste Kontaktaufnahme.'],
        pending: 'Geschäftsanschrift, Zielgruppe und Leistungsform (online oder vor Ort) ergänzen.',
      },
      {
        id: 'anfrage', title: 'Unverbindliche Anfragen',
        paragraphs: ['Das Absenden des Kontaktformulars ist eine unverbindliche Anfrage. Es löst weder eine Zahlung aus noch reserviert es automatisch einen Termin. Die Bestätigung des Nachrichtenversands ist keine Buchungsbestätigung.'],
      },
      {
        id: 'vereinbarung', title: 'Buchung und Vergütung',
        paragraphs: ['Ein verbindlicher Auftrag wird nicht über das Kontaktformular abgeschlossen. Die Einzelheiten des gewünschten Angebots werden im anschließenden Austausch geklärt.', `Die angebotenen Sitzungen: ${readings.map(reading => `${reading.name} (${reading.minutes} Minuten) für ${reading.price} €`).join(', ')}. Die Preise gelten pro Sitzung.`, `Rituale und Talismane: ${ritualOffers.map(offer => `${offer.name} ${offer.from ? 'ab ' : ''}${offer.price} €`).join(', ')}. Bei Talismanen werden Gestaltung, Material, Gesamtpreis und mögliche Versandkosten vor der Beauftragung vereinbart.`],
        pending: 'Festlegen, wie ein Vertrag zustande kommt und wie die Bedingungen vor Vertragsschluss bereitgestellt werden. Anwendbare Steuerangaben, Zahlungsarten, Fälligkeit und Terminbestätigung ergänzen.',
      },
      {
        id: 'termine', title: 'Terminänderungen und Absagen',
        pending: 'Faire Regeln für Verschiebungen, Absagen durch beide Seiten und gegebenenfalls Nichterscheinen festlegen. Es wurden noch keine Stornofristen oder Gebühren vereinbart.',
      },
      {
        id: 'widerruf', title: 'Widerruf und weitere Bedingungen',
        paragraphs: ['Gesetzliche Verbraucherrechte werden durch diesen Entwurf nicht ausgeschlossen.'],
        pending: 'Je nach Zielgruppe und Vertragsschluss Widerrufsbelehrung und Muster-Widerrufsformular ergänzen. Einen gewünschten Leistungsbeginn vor Ablauf der Widerrufsfrist gesondert rechtlich prüfen. Leistungsbeschreibung, Haftung und Verbraucherschlichtung passend zum Angebot ausarbeiten. Bereitstellung der individuellen Anleitungen sowie Herstellung, Lieferung und Versandkosten der Talismane konkretisieren.',
      },
    ],
  },
]
