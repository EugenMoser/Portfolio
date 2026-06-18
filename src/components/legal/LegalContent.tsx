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
          <p className="text-neutral-300">Felderhalde 5</p>
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

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Haftung für Inhalte</h2>
          <p className="leading-relaxed text-neutral-500">
            Als Diensteanbieter bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte
            auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
            §§ 8 bis 10 DDG bin ich als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
            überwachen. Bei bekannt werden von Rechtsverletzungen werde ich diese
            Inhalte umgehend entfernen.
          </p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Haftung für Links</h2>
          <p className="leading-relaxed text-neutral-500">
            Mein Angebot enthält Links zu externen Websites Dritter, auf deren
            Inhalte ich keinen Einfluss habe. Für die Inhalte der verlinkten
            Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
            verantwortlich. Bei bekannt werden von Rechtsverletzungen werde ich
            derartige Links umgehend entfernen.
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
            Eugen Moser, Felderhalde 5, 88316 Isny im Allgäu, Deutschland
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
            und wenn Sie das Kontaktformular nutzen oder mir eine E-Mail
            schreiben. Näheres dazu in den folgenden Abschnitten.
          </p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Hosting</h2>
          <p className="leading-relaxed text-neutral-500">
            Diese Website wird bei der Vercel Inc., 340 S Lemon Ave #4133,
            Walnut, CA 91789, USA, gehostet. Beim Aufruf der Website werden
            technisch notwendige Daten (siehe Server-Log-Dateien) auf Servern von
            Vercel verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an einem sicheren und effizienten
            Bereitstellen der Website). Mit Vercel besteht ein Vertrag zur
            Auftragsverarbeitung (Art. 28 DSGVO). Da Vercel Daten auch in den USA
            verarbeitet, erfolgt die Übermittlung auf Grundlage des EU-US Data
            Privacy Framework bzw. der EU-Standardvertragsklauseln (Art. 44 ff.
            DSGVO).
          </p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Server-Log-Dateien</h2>
          <p className="leading-relaxed text-neutral-500">
            Der Hosting-Anbieter dieser Website erhebt und speichert automatisch
            Informationen in sogenannten Server-Log-Dateien, die Ihr Browser
            automatisch übermittelt. Dies sind: Browsertyp und -version,
            verwendetes Betriebssystem, Referrer-URL, IP-Adresse, Hostname des
            zugreifenden Rechners sowie Uhrzeit der Serveranfrage. Eine
            Zusammenführung dieser Daten mit anderen Datenquellen findet nicht
            statt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
            Interesse am technisch fehlerfreien und sicheren Betrieb der
            Website).
          </p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Kontaktformular</h2>
          <p className="leading-relaxed text-neutral-500">
            Über das Kontaktformular können Sie mir eine Nachricht senden. Dabei
            werden die von Ihnen angegebene E-Mail-Adresse und der Inhalt Ihrer
            Nachricht verarbeitet und an mich per E-Mail übermittelt. Zur Abwehr
            von Missbrauch (Spam) wird Ihre IP-Adresse für eine kurze Zeit
            verarbeitet (Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO). Den Versand
            der E-Mails wickle ich über den Dienstleister Resend (Resend, Inc.,
            2261 Market Street #5039, San Francisco, CA 94114, USA) als
            Auftragsverarbeiter ab; dabei können Daten in die USA übermittelt
            werden (Grundlage: EU-US Data Privacy Framework bzw.
            EU-Standardvertragsklauseln). Rechtsgrundlage für die Verarbeitung
            Ihrer Angaben ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw.
            Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
            Beantwortung von Anfragen).
          </p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Kontaktaufnahme per E-Mail</h2>
          <p className="leading-relaxed text-neutral-500">
            Wenn Sie mir per E-Mail Kontakt aufnehmen, werden Ihre Angaben
            inklusive der von Ihnen angegebenen Kontaktdaten zwecks Bearbeitung
            der Anfrage bei mir gespeichert. Diese Daten gebe ich nicht ohne Ihre
            Einwilligung weiter. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
            (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
            Interesse an der Beantwortung von Anfragen).
          </p>
        </section>

        <section>
          <h2 className={`${s.h2} ${h2Base}`}>Ihre Rechte</h2>
          <p className="leading-relaxed text-neutral-500">
            Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung
            und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten, das
            Recht auf Datenübertragbarkeit sowie das Recht, einer auf Art. 6 Abs.
            1 lit. f DSGVO gestützten Verarbeitung zu widersprechen (Art. 21
            DSGVO). Außerdem steht Ihnen ein Beschwerderecht bei einer
            Datenschutz-Aufsichtsbehörde zu (Art. 77 DSGVO). Bei Fragen wenden
            Sie sich bitte an: <MailLink />
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
      </div>
    </>
  );
}
