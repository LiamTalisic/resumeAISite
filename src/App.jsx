import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import DemoSection from "./components/DemoSection";
import LevelUpSection from "./components/LevelUpSection";
import PricingSection from "./components/PricingSection";
import LandInterviewsSection from "./components/LandInterviewsSection";
import BetaTesterSection from "./components/BetaTesterSection";
import TierComparison from "./components/TierComparison";
import ResumeEditor from "./components/ResumeEditor";

function HomePage() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#181425] to-[#2a2340] text-white font-sans">
            {/* ───────── Grid overlay ───────── */}
            <div className="pointer-events-none absolute inset-0 z-0">
                {/* Animated gradient background */}
                <div className="animated-gradient"></div>
                {/* New div for CSS grid overlay */}
                <div className="grid-overlay"></div>
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
                    {/* Tier Comparison */}
                    <TierComparison />
                    <LandInterviewsSection />
                    <BetaTesterSection />
                </section>
            </main>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/editor/:resumeId" element={<ResumeEditor />} />
            </Routes>
        </Router>
    );
}

export default App;
