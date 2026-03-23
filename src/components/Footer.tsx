import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-3xl flex-row items-center justify-between border-t border-neutral-800 px-8 py-8">
      <p className="text-xs text-neutral-700">
        © {new Date().getFullYear()} Eugen Moser
      </p>
      <div className="flex gap-4 text-xs text-neutral-600">
        <Link
          href="/impressum"
          className="transition-colors hover:text-neutral-300"
        >
          Impressum
        </Link>
        <Link
          href="/datenschutz"
          className="transition-colors hover:text-neutral-300"
        >
          Datenschutz
        </Link>
      </div>
    </footer>
  );
}
