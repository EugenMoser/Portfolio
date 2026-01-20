import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";

export default function Home() {
  return (
    <main className="min-h-screen items-center justify-between bg-[var(--color-background)] p-8">
      {/* <div className="z-10 mb-8 flex w-full max-w-full items-center justify-center">
        <h1 className="fixed left-0 top-0 flex w-full justify-center border-b border-neutral-800 bg-zinc-800/30 pb-6 pt-8 text-sm backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4">
          Portfolio from Eugen
        </h1>
      </div> */}

      <PortfolioGrid />
    </main>
  );
}
