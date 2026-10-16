import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";

const linkClass = "text-neutral-300 transition-colors hover:text-white";

export default function NotFound() {
  return (
    <LegalPage>
      <h1 className="mb-8 text-2xl font-bold text-neutral-100">
        Seite nicht gefunden
      </h1>
      <p className="mb-6 text-neutral-400">Diese Seite gibt es nicht.</p>
      <p>
        <Link href="/impressum" className={linkClass}>
          Impressum
        </Link>
        <span className="mx-2 text-neutral-600">·</span>
        <Link href="/datenschutz" className={linkClass}>
          Datenschutz
        </Link>
      </p>
    </LegalPage>
  );
}
