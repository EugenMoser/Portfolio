import { LegalPage } from "@/components/legal/LegalPage";

// The links to Impressum and Datenschutz come from the LegalPage footer.
export default function NotFound() {
  return (
    <LegalPage>
      <h1 className="mb-8 text-2xl font-bold text-neutral-100">
        Seite nicht gefunden
      </h1>
      <p className="text-neutral-400">Diese Seite gibt es nicht.</p>
    </LegalPage>
  );
}
