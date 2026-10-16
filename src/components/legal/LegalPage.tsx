import Link from "next/link";

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
      </main>
    </div>
  );
}
