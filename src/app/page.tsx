import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-neutral-950 p-4 md:p-24">
      <div className="z-10 mb-8 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="mb-4 text-4xl font-bold text-neutral-100 lg:mb-0">
          Portfolio
        </h1>
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-neutral-800 bg-zinc-800/30 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4">
          Build with Next.js 16 & Tailwind
        </p>
      </div>

      <div className="w-full">
        <PortfolioGrid />
      </div>
    </main>
  );
}
