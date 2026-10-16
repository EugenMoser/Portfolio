// Einzige Quelle für Impressum & Datenschutz.
// Gerendert sowohl von den Routen (/impressum, /datenschutz, variant="page")
// als auch vom Desktop-Fenster (LegalWindow, variant="window").
// Inhalt hier ändern => beide Stellen sind automatisch aktuell.

type Variant = "page" | "window";

const variants: Record<Variant, { h1: string; sections: string; h2: string }> = {
  page: { h1: "mb-8 text-2xl", sections: "space-y-8", h2: "mb-4" },
  window: { h1: "mb-6 text-xl", sections: "space-y-6", h2: "mb-3" },
};

const h2Base = "text-xs font-semibold uppercase tracking-widest text-neutral-500";
const linkClass = "text-neutral-300 transition-colors hover:text-white";
const EMAIL = "job@eugen-moser.com";
const PHONE_DISPLAY = "+49 156 796 930 84";
const PHONE_HREF = "+4915679693084";

function MailLink() {
  return (
    <a href={`mailto:${EMAIL}`} className={linkClass}>
      {EMAIL}
    </a>
  );
}

export function ImpressumContent({ variant = "window" }: { variant?: Variant }) {
  const s = variants[variant];
  return (
    <>
      <h1 className={`${s.h1} font-bold text-neutral-100`}>Impressum</h1>
      <div className={s.sections}>
        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Angaben gemäß § 5 DDG</h2>
          <p className="text-neutral-300">Eugen Moser</p>
          <p className="text-neutral-300">An der Felderhalde 5</p>
          <p className="text-neutral-300">88316 Isny im Allgäu</p>
          <p className="text-neutral-300">Deutschland</p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Kontakt</h2>
          <p className="text-neutral-400">
            E-Mail: <MailLink />
          </p>
          <p className="text-neutral-400">
            Telefon:{" "}
            <a href={`tel:${PHONE_HREF}`} className={linkClass}>
              {PHONE_DISPLAY}
            </a>
          </p>
        </section>
      </div>
    </>
  );
}

export function DatenschutzContent({ variant = "window" }: { variant?: Variant }) {
  const s = variants[variant];
  return (
    <>
      <h1 className={`${s.h1} font-bold text-neutral-100`}>
        Datenschutzerklärung
      </h1>
      <div className={s.sections}>
        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Verantwortlicher</h2>
          <p className="leading-relaxed text-neutral-400">
            Eugen Moser, An der Felderhalde 5, 88316 Isny im Allgäu, Deutschland
            <br />
            E-Mail: <MailLink />
          </p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Allgemeines zur Datenverarbeitung</h2>
          <p className="leading-relaxed text-neutral-500">
            Diese Website setzt keine Cookies, verwendet keine Tracking-Tools und
            bindet keine Analyse-Dienste (z. B. Google Analytics) ein. Eine
            Verarbeitung personenbezogener Daten findet nur in dem technisch
            erforderlichen Umfang statt – beim Aufruf der Seiten (Server-Logs)
            und wenn Sie das Kontaktformular nutzen, mir eine E-Mail schreiben
            oder mich anrufen. Näheres dazu in den folgenden Abschnitten. Eine automatisierte
            Entscheidungsfindung einschließlich Profiling (Art. 22 DSGVO) findet
            nicht statt. Soweit unten keine speziellere Speicherdauer genannt ist,
            speichere ich Ihre Daten nur so lange, wie es für den jeweiligen Zweck
            erforderlich ist; gesetzliche Aufbewahrungsfristen bleiben unberührt.
          </p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Hosting</h2>
          <p className="leading-relaxed text-neutral-500">
            Diese Website läuft auf einem gemieteten Server (VPS) der Hostinger
            International Ltd., 61 Lordou Vironos str., 6023 Larnaca, Zypern. Der
            Server steht in Frankfurt am Main, Deutschland. Hostinger verarbeitet
            die Daten in meinem Auftrag; ein Vertrag zur Auftragsverarbeitung nach
            Art. 28 DSGVO besteht. Setzt Hostinger Unterauftragnehmer außerhalb
            der EU ein, geschieht das auf Grundlage der EU-Standardvertragsklauseln
            (Art. 46 DSGVO). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an einer sicheren und zuverlässigen
            Bereitstellung der Website).
          </p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>SSL- bzw. TLS-Verschlüsselung</h2>
          <p className="leading-relaxed text-neutral-500">
            Diese Website nutzt aus Sicherheitsgründen und zum Schutz der
            Übertragung vertraulicher Inhalte, etwa Ihrer Nachricht über das
            Kontaktformular, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte
            Verbindung erkennen Sie an „https://“ in der Adresszeile Ihres Browsers
            und am Schloss-Symbol. Ist die Verschlüsselung aktiv, können die Daten,
            die Sie an mich übermitteln, nicht von Dritten mitgelesen werden. Die
            Datenübertragung im Internet, etwa bei der Kommunikation per E-Mail,
            kann dennoch Sicherheitslücken aufweisen; ein lückenloser Schutz vor dem
            Zugriff durch Dritte ist nicht möglich.
          </p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Server-Log-Dateien</h2>
          <p className="leading-relaxed text-neutral-500">
            Beim Aufruf der Website verarbeitet mein Server Ihre IP-Adresse, den
            Zeitpunkt der Anfrage, die aufgerufene Adresse und die Kennung Ihres
            Browsers, um Ihnen die Seite auszuliefern. Ohne Ihre IP-Adresse kann die
            Website nicht ausgeliefert werden. Ein Zugriffsprotokoll wird nicht
            geführt. Fehlermeldungen des Servers können Ihre IP-Adresse
            enthalten; sie werden spätestens nach 8 Tagen gelöscht. Rechtsgrundlage
            ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am technisch
            fehlerfreien und sicheren Betrieb der Website).
          </p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Kontaktformular</h2>
          <p className="leading-relaxed text-neutral-500">
            Über das Kontaktformular können Sie mir eine Nachricht senden. Dabei
            werden die von Ihnen angegebene E-Mail-Adresse und der Inhalt Ihrer
            Nachricht verarbeitet und an mich per E-Mail übermittelt. Zur Abwehr
            von Missbrauch (Spam) hält der Server Ihre IP-Adresse bis höchstens 11
            Minuten nach Ihrer letzten Anfrage im Arbeitsspeicher und speichert sie nicht dauerhaft
            (Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO, berechtigtes Interesse
            am Schutz vor Missbrauch). Die E-Mails
            werden über meinen E-Mail-Anbieter ALL-INKL.COM – Neue Medien
            Münnich, Inhaber René Münnich, Hauptstraße 68, 02742 Friedersdorf,
            Deutschland, versendet und dort gespeichert. Mit ALL-INKL besteht ein
            Vertrag zur Auftragsverarbeitung (Art. 28 DSGVO); die Verarbeitung
            erfolgt in Deutschland. Rechtsgrundlage für die Verarbeitung Ihrer
            Angaben ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6
            Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von
            Anfragen). Sie sind nicht verpflichtet, mir Daten bereitzustellen; ohne
            E-Mail-Adresse kann ich Ihnen aber nicht antworten. Ich lösche Ihre
            Nachricht sechs Monate nach Abschluss der Anfrage, sofern keine
            gesetzliche Aufbewahrungspflicht besteht.
          </p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Kontaktaufnahme per E-Mail oder Telefon</h2>
          <p className="leading-relaxed text-neutral-500">
            Wenn Sie per E-Mail oder Telefon mit mir Kontakt aufnehmen, werden Ihre Angaben
            inklusive der von Ihnen angegebenen Kontaktdaten zwecks Bearbeitung
            der Anfrage bei mir gespeichert. Diese Daten gebe ich nicht ohne Ihre
            Einwilligung weiter. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
            (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
            Interesse an der Beantwortung von Anfragen). Ich lösche Ihre Angaben
            sechs Monate nach Abschluss der Anfrage, sofern keine gesetzliche
            Aufbewahrungspflicht besteht.
          </p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Ihre Rechte</h2>
          <p className="leading-relaxed text-neutral-500">
            Sie haben jederzeit das Recht auf Auskunft (Art. 15 DSGVO),
            Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO) und
            Einschränkung der Verarbeitung (Art. 18 DSGVO) Ihrer
            personenbezogenen Daten sowie das Recht auf Datenübertragbarkeit
            (Art. 20 DSGVO). Bei Fragen wenden Sie sich bitte an: <MailLink />
          </p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>
            Widerspruchsrecht (Art. 21 DSGVO)
          </h2>
          <p className="leading-relaxed text-neutral-300">
            Soweit ich Ihre Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
            verarbeite, können Sie dieser Verarbeitung aus Gründen, die sich aus
            Ihrer besonderen Situation ergeben, jederzeit widersprechen. Ich
            verarbeite die Daten dann nicht mehr, es sei denn, ich kann
            zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die
            Ihre Interessen, Rechte und Freiheiten überwiegen, oder die
            Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung
            von Rechtsansprüchen.
          </p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Beschwerderecht</h2>
          <p className="leading-relaxed text-neutral-500">
            Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren
            (Art. 77 DSGVO). Die für mich zuständige Aufsichtsbehörde ist der
            Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg,
            Heilbronner Straße 35, 70191 Stuttgart.
          </p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Externe Links</h2>
          <p className="leading-relaxed text-neutral-500">
            Diese Website enthält Links zu externen Diensten (GitHub, LinkedIn).
            Beim Klick auf diese Links gelten die jeweiligen
            Datenschutzerklärungen der Drittanbieter. Ich habe keinen Einfluss
            auf deren Datenverarbeitung.
          </p>
        </section>

        <p className="text-xs text-neutral-500">Stand: Oktober 2026</p>
      </div>
    </>
  );
}
