import Link from "next/link";

export default function Footer() {
  return (
    <footer className="max-w-3xl mx-auto px-8 py-8 border-t border-neutral-800 flex items-center justify-between">
      <p className="text-xs text-neutral-700">
        © {new Date().getFullYear()} Eugen Moser
      </p>
      <div className="flex gap-4 text-xs text-neutral-600">
        <Link href="/impressum" className="hover:text-neutral-300 transition-colors">
          Impressum
        </Link>
        <Link href="/datenschutz" className="hover:text-neutral-300 transition-colors">
          Datenschutz
        </Link>
      </div>
    </footer>
  );
}
