export function ImpressumContent() {
  return (
    <div className="px-8 py-6 text-sm">
      <h1 className="mb-6 text-xl font-bold text-neutral-100">Impressum</h1>

      <section className="mb-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Angaben gemäß § 5 TMG
        </h2>
        <p className="text-neutral-300">Eugen Moser</p>
        <p className="text-neutral-300">Isny im Allgäu</p>
        <p className="text-neutral-300">Deutschland</p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Kontakt
        </h2>
        <p className="text-neutral-400">
          E-Mail:{" "}
          <a href="mailto:job@eugen-moser.com" className="text-neutral-300 transition-colors hover:text-white">
            job@eugen-moser.com
          </a>
        </p>
        <p className="text-neutral-400">
          Telefon:{" "}
          <a href="tel:+4915679693084" className="text-neutral-300 transition-colors hover:text-white">
            +49 156 796 930 84
          </a>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Haftung für Inhalte
        </h2>
        <p className="leading-relaxed text-neutral-500">
          Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach
          den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter
          jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
          überwachen. Bei bekannt werden von Rechtsverletzungen werde ich diese Inhalte umgehend
          entfernen.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Haftung für Links
        </h2>
        <p className="leading-relaxed text-neutral-500">
          Mein Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen
          Einfluss habe. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
          Betreiber der Seiten verantwortlich. Bei bekannt werden von Rechtsverletzungen werde ich
          derartige Links umgehend entfernen.
        </p>
      </section>
    </div>
  );
}

export function DatenschutzContent() {
  return (
    <div className="px-8 py-6 text-sm">
      <h1 className="mb-6 text-xl font-bold text-neutral-100">Datenschutzerklärung</h1>

      <section className="mb-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Verantwortlicher
        </h2>
        <p className="leading-relaxed text-neutral-400">
          Eugen Moser, Isny im Allgäu, Deutschland
          <br />
          E-Mail:{" "}
          <a href="mailto:job@eugen-moser.com" className="text-neutral-300 transition-colors hover:text-white">
            job@eugen-moser.com
          </a>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Datenerhebung auf dieser Website
        </h2>
        <p className="leading-relaxed text-neutral-500">
          Diese Website erhebt und speichert keine personenbezogenen Daten. Es werden keine Cookies
          gesetzt, keine Tracking-Tools verwendet und keine Analyse-Dienste (z. B. Google Analytics)
          eingesetzt.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Server-Log-Dateien
        </h2>
        <p className="leading-relaxed text-neutral-500">
          Der Hosting-Anbieter dieser Website erhebt und speichert automatisch Informationen in
          sogenannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dies sind:
          Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Hostname des
          zugreifenden Rechners sowie Uhrzeit der Serveranfrage. Diese Daten sind nicht bestimmten
          Personen zuordenbar und werden nicht mit anderen Datenquellen zusammengeführt.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Kontaktaufnahme per E-Mail
        </h2>
        <p className="leading-relaxed text-neutral-500">
          Wenn Sie mir per E-Mail Kontakt aufnehmen, werden Ihre Angaben inklusive der von Ihnen
          angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage bei mir gespeichert. Diese Daten
          gebe ich nicht ohne Ihre Einwilligung weiter. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
          DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
          Beantwortung von Anfragen).
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Ihre Rechte
        </h2>
        <p className="leading-relaxed text-neutral-500">
          Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der
          Verarbeitung Ihrer personenbezogenen Daten sowie das Recht auf Datenübertragbarkeit. Bei
          Fragen wenden Sie sich bitte an:{" "}
          <a href="mailto:job@eugen-moser.com" className="text-neutral-300 transition-colors hover:text-white">
            job@eugen-moser.com
          </a>
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Externe Links
        </h2>
        <p className="leading-relaxed text-neutral-500">
          Diese Website enthält Links zu externen Diensten (GitHub, LinkedIn). Beim Klick auf diese
          Links gelten die jeweiligen Datenschutzerklärungen der Drittanbieter. Ich habe keinen
          Einfluss auf deren Datenverarbeitung.
        </p>
      </section>
    </div>
  );
}
