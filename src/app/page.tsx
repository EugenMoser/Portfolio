import Footer from "@/components/Footer";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <PortfolioGrid />
      <Footer />
    </main>
  );
}
