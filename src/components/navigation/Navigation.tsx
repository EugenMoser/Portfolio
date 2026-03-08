"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { id: "about-me", label: "Über mich" },
  { id: "skills", label: "Tech Stack" },
{ id: "projects", label: "Projekte" },
  { id: "certifications", label: "Zertifikate" },
  { id: "contact", label: "Kontakt" },
];

export default function Navigation(): React.JSX.Element {
  const pathname = usePathname();
  const router = useRouter();

  function handleNavClick(id: string) {
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  }

  return (
    <nav className="min-h-screen border-r border-neutral-800 bg-neutral-900/40">
      <div className="fixed left-0 top-0 flex h-full w-[200px] flex-col gap-8 border-r border-neutral-800 p-6">
        <Link href="/" className="block group">
          <div className="text-sm font-bold leading-snug text-neutral-100 group-hover:text-white transition-colors">
            Eugen Moser
          </div>
          <p className="mt-1 text-xs text-neutral-600">React · Next.js · TS</p>
        </Link>
        <ul className="flex flex-col gap-0.5">
          {navLinks.map((link) => (
            <li
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="cursor-pointer rounded px-2 py-1.5 text-sm text-neutral-500 transition-colors hover:bg-neutral-800/60 hover:text-neutral-200"
            >
              {link.label}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
