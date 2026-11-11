import Link from "next/link";

const footerLinkClass = "text-neutral-300 transition-colors hover:text-white";

export function LegalPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#1e1e1e]">
      <main className="mx-auto max-w-2xl px-8 py-12 text-sm">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-neutral-400 transition-colors hover:text-white"
        >
          ← Zurück
        </Link>
        {children}
        {/* Every page links both legal texts, including these pages and the 404 page. */}
        <footer className="mt-12">
          <Link href="/impressum" className={footerLinkClass}>
            Impressum
          </Link>
          <span className="mx-2 text-neutral-600">·</span>
          <Link href="/datenschutz" className={footerLinkClass}>
            Datenschutz
          </Link>
        </footer>
      </main>
    </div>
  );
}
