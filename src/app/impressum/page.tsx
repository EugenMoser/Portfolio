export default function Impressum() {
  return (
    <div className="mx-auto max-w-2xl px-8 py-12">
      <h1 className="mb-8 text-2xl font-bold text-neutral-100">Impressum</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Angaben gemäß § 5 TMG
        </h2>
        <p className="text-sm text-neutral-300">Eugen Moser</p>
        <p className="text-sm text-neutral-300">Isny im Allgäu</p>
        <p className="text-sm text-neutral-300">Deutschland</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Kontakt
        </h2>
        <p className="text-sm text-neutral-400">
          E-Mail:{" "}
          <a
            href="mailto:job@eugen-moser.com"
            className="text-neutral-300 transition-colors hover:text-white"
          >
            job@eugen-moser.com
          </a>
        </p>
        <p className="text-sm text-neutral-400">
          Telefon:{" "}
          <a
            href="tel:+4915679693084"
            className="text-neutral-300 transition-colors hover:text-white"
          >
            +49 156 796 930 84
          </a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Haftung für Inhalte
        </h2>
        <p className="text-sm leading-relaxed text-neutral-500">
          Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte
          auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
          §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet,
          übermittelte oder gespeicherte fremde Informationen zu überwachen. Bei
          bekannt werden von Rechtsverletzungen werde ich diese Inhalte umgehend
          entfernen.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Haftung für Links
        </h2>
        <p className="text-sm leading-relaxed text-neutral-500">
          Mein Angebot enthält Links zu externen Websites Dritter, auf deren
          Inhalte ich keinen Einfluss habe. Für die Inhalte der verlinkten
          Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
          verantwortlich. Bei bekannt werden von Rechtsverletzungen werde ich
          derartige Links umgehend entfernen.
        </p>
      </section>
    </div>
  );
}
