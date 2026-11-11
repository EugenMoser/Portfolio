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

// Hostinger's Data Processing Addendum (lists its sub-processors) and the EU Standard
// Contractual Clauses it refers to for transfers outside the EEA.
const HOSTINGER_DPA_URL = "https://www.hostinger.com/legal/dpa";
const SCC_URL = "https://eur-lex.europa.eu/eli/dec_impl/2021/914/oj";

function MailLink({ className = linkClass }: { className?: string }) {
  return (
    <a href={`mailto:${EMAIL}`} className={className}>
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
          <h2 className={`${s.h2} ${h2Base}`}>Überblick</h2>
          <p className="leading-relaxed text-neutral-500">
            Diese Website setzt keine Cookies, nutzt keinen lokalen
            Browserspeicher und keine Tracking- oder Analyse-Dienste.
            Personenbezogene Daten verarbeite ich, wenn Sie die Website aufrufen
            oder mir eine Anfrage schicken.
          </p>
          <p className="mt-3 leading-relaxed text-neutral-500">
            Sie können die Website ohne Anmeldung nutzen.
          </p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Hosting</h2>
          <p className="leading-relaxed text-neutral-500">
            Die Website läuft auf einem Server der Hostinger International Ltd.,
            61 Lordou Vironos str., 6023 Larnaca, Zypern. Der Server steht in
            Frankfurt am Main. Auch meine E-Mails liegen bei Hostinger. Hostinger
            verarbeitet die Daten, die beim Aufruf der Website und bei Anfragen
            anfallen, in meinem Auftrag. Mit Hostinger besteht ein Vertrag zur
            Auftragsverarbeitung nach Art. 28 DSGVO.
          </p>
          {/* break-words: the long URLs must not widen the window or the page on phones. */}
          <p className="mt-3 break-words leading-relaxed text-neutral-500">
            Hostinger setzt weitere Dienstleister ein, auch in den USA und Kanada.
            Die Liste steht im Vertrag zur Auftragsverarbeitung (
            <a href={HOSTINGER_DPA_URL} className={linkClass}>
              {HOSTINGER_DPA_URL}
            </a>
            ). Für Kanada besteht ein Angemessenheitsbeschluss der EU-Kommission
            (Art. 45 DSGVO), für die USA nur bei Unternehmen, die nach dem EU-US
            Data Privacy Framework zertifiziert sind. Im Übrigen sieht der Vertrag
            die EU-Standardvertragsklauseln vor (Art. 46 Abs. 2 lit. c DSGVO,{" "}
            <a href={SCC_URL} className={linkClass}>
              {SCC_URL}
            </a>
            ).
          </p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Aufruf der Website</h2>
          <p className="leading-relaxed text-neutral-500">
            Wenn Sie die Website aufrufen, verarbeitet der Server Ihre IP-Adresse
            und technische Verbindungsdaten, um Ihnen die Seite auszuliefern. Ohne
            IP-Adresse kann die Seite nicht ausgeliefert werden. Ich führe kein
            Zugriffsprotokoll. Fehlermeldungen des Servers können Ihre IP-Adresse
            enthalten. Sie werden spätestens nach 30 Tagen gelöscht, auch in den
            Sicherungen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Mein
            berechtigtes Interesse liegt in der sicheren und fehlerfreien
            Bereitstellung der Website.
          </p>
        </section>

        {/* Link target of the privacy note on the contact form. */}
        <section id="kontaktformular">
          <h2 className={`${s.h2} ${h2Base}`}>
            Anfragen per Formular, E-Mail oder Telefon
          </h2>
          <p className="leading-relaxed text-neutral-500">
            Wenn Sie mir über das Kontaktformular, per E-Mail oder telefonisch
            eine Anfrage schicken, verarbeite ich Ihre Angaben (etwa Name,
            E-Mail-Adresse oder Telefonnummer und Ihr Anliegen), um die Anfrage zu
            beantworten und gegebenenfalls einen Auftrag oder eine Anstellung
            anzubahnen. Das Formular schickt Ihre Angaben per E-Mail an mein
            Postfach bei Hostinger, wo auch Ihre E-Mails an mich liegen.
          </p>
          <p className="mt-3 leading-relaxed text-neutral-500">
            Ihre Angaben sind freiwillig. Das Formular lässt sich aber nur mit
            E-Mail-Adresse und Nachricht absenden. Ohne Kontaktdaten kann ich
            Ihnen nicht antworten.
          </p>
          <p className="mt-3 leading-relaxed text-neutral-500">
            Zum Schutz vor Missbrauch speichert der Server beim Absenden des
            Formulars Ihre IP-Adresse und löscht sie spätestens 11 Minuten nach
            dem letzten Absenden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
            Mein berechtigtes Interesse liegt im Schutz vor Missbrauch wie Spam.
          </p>
          <p className="mt-3 leading-relaxed text-neutral-500">
            Zielt Ihre Anfrage auf einen Vertrag mit Ihnen selbst (Auftrag oder
            Anstellung), ist Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO, sonst
            (etwa bei Anfragen für ein Unternehmen oder über eine
            Personalvermittlung) Art. 6 Abs. 1 lit. f DSGVO. Mein berechtigtes
            Interesse liegt darin, Anfragen zu beantworten und Aufträge oder eine
            Anstellung anzubahnen.
          </p>
          <p className="mt-3 leading-relaxed text-neutral-500">
            Anfragen, aus denen kein Auftrag entsteht, lösche ich sechs Monate
            nach der letzten Nachricht. Das gilt auch, wenn aus der Anfrage eine
            Anstellung wird. Kommt ein Auftrag zustande, bewahre ich Rechnungen und steuerlich
            relevante Unterlagen auf, solange das Steuerrecht es verlangt, in der
            Regel bis zu zehn Jahre ab Ende des Kalenderjahres (§ 147 AO, § 14b
            UStG). Rechtsgrundlage ist Art. 6 Abs. 1 lit. c DSGVO. Die übrige
            Korrespondenz bewahre ich bis zum Ende des dritten Kalenderjahres nach
            Abschluss des Auftrags auf. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
            DSGVO. Mein berechtigtes Interesse liegt darin, Ansprüche nachweisen
            oder abwehren zu können.
          </p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Ihre Rechte</h2>
          <p className="leading-relaxed text-neutral-500">
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung und Datenübertragbarkeit (Art. 15 bis
            18 und 20 DSGVO). Eine formlose Nachricht an <MailLink /> genügt.
          </p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>
            Widerspruchsrecht (Art. 21 DSGVO)
          </h2>
          {/* Full contrast (text-neutral-300): Art. 21(4) GDPR requires this notice to stand out.
              The mail link is underlined because it shares the paragraph's colour. */}
          <p className="leading-relaxed text-neutral-300">
            Soweit ich Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
            verarbeite, können Sie aus Gründen, die sich aus Ihrer besonderen
            Situation ergeben, jederzeit widersprechen. Ich verarbeite die Daten
            dann nicht mehr, es sei denn, ich kann zwingende schutzwürdige Gründe
            nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen,
            oder die Verarbeitung dient der Geltendmachung, Ausübung oder
            Verteidigung von Rechtsansprüchen. Auch hier genügt eine formlose
            E-Mail an <MailLink className="underline" />.
          </p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Beschwerderecht</h2>
          <p className="leading-relaxed text-neutral-500">
            Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren
            (Art. 77 DSGVO). Für mich zuständig ist der Landesbeauftragte für den
            Datenschutz und die Informationsfreiheit Baden-Württemberg.
          </p>
        </section>

        <p className="text-xs text-neutral-500">Stand: November 2026</p>
      </div>
    </>
  );
}
