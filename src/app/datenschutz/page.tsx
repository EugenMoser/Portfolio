import Link from "next/link";
import { DatenschutzContent } from "@/components/legal/LegalContent";

export default function Datenschutz() {
  return (
    <main className="mx-auto max-w-2xl px-8 py-12 text-sm">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1 text-neutral-400 transition-colors hover:text-white"
      >
        ← Zurück
      </Link>
      <DatenschutzContent variant="page" />
    </main>
  );
}
