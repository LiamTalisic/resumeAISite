import Header from './components/Header';
import Hero from './components/Hero';
import DemoSection from './components/DemoSection';
import LevelUpSection from './components/LevelUpSection';
import PricingSection from './components/PricingSection';
import LandInterviewsSection from './components/LandInterviewsSection';
import BetaTesterSection from './components/BetaTesterSection';

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#181425] to-[#2a2340] text-white font-sans">
      {/* ───────── Grid overlay ───────── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Animated gradient background */}
        <div className="animated-gradient"></div>
        <svg width="100%" height="100%" className="h-full w-full">
          <defs>
            {/* Subtle 32px grid */}
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#332c49" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* ───────── Top bar ───────── */}
      <Header />

      {/* ───────── Hero ───────── */}
      <main className="relative z-10 flex w-full flex-col items-center">
        <section className="flex w-full flex-col items-center gap-4 px-4 pt-8 lg:pt-12">
          <Hero />
          <DemoSection />
          <LevelUpSection />
          <PricingSection />
          <LandInterviewsSection />
          <BetaTesterSection />
        </section>
      </main>
    </div>
  );
}

export default App;
