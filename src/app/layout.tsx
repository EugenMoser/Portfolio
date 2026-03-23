import "@/styles/globals.css";

import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Navigation from "@/components/navigation/Navigation";

//mono font einbinden los
export const metadata: Metadata = {
  title: "Portfolio",
  description: "React, Next.js, TypeScript, Tailwind CSS Portfolio von Eugen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="relative flex bg-[var(--color-background)] text-[var(--color-text-primary)] antialiased">
        <Navigation />
        <div className="flex-1">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
