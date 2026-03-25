import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Eugen Moser",
  description: "React, Next.js, TypeScript, Tailwind CSS Portfolio von Eugen Moser",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className="overflow-hidden">
        {children}
      </body>
    </html>
  );
}
