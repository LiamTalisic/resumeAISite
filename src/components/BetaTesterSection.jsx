const features = [
  {
    icon: (
      <svg width="40" height="40" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>
    ),
    title: 'One-Click Apply',
    desc: 'Submit the tailored resume + cover letter directly from the extension—no copy-paste, no form-filling. It pre-populates company sites in a single tap.'
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4"/><circle cx="12" cy="14" r="3"/></svg>
    ),
    title: 'Interview Prep Copilot',
    desc: 'Generates likely interview questions from the job posting and crafts sample answers using your experience, ready for flash-card practice.'
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 19V5M5 12h14"/></svg>
    ),
    title: 'Multi-Language & Localization',
    desc: 'Instantly translates and formats resumes for global applications while preserving template integrity and ATS compliance.'
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 17v-2a4 4 0 014-4h10a4 4 0 014 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    ),
    title: 'Application Tracker & Analytics',
    desc: 'A kanban-style dashboard that tracks every application, shows status and visualizes response rates to help you refine strategy.'
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 17l4-4 4 4"/></svg>
    ),
    title: 'Achievements Library',
    desc: 'Stores quantified accomplishments (e.g., "Cut deployment time by 35%") so the AI can auto-inject results-oriented bullets into any new resume.'
  },
];

const BetaTesterSection = () => (
  <section className="w-full max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-10 mt-20 mb-20 px-4">
    {/* Left: Features */}
    <div className="flex-1 flex flex-col gap-4">
      <div className="text-[#b86cff] font-bold text-lg mb-1">COMING SOON</div>
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Next-Gen Application Suite</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-4 bg-[#7c6cfb]/10 border border-[#7c6cfb]/30 rounded-xl p-4">
            <div className="flex-shrink-0">{f.icon}</div>
            <div>
              <div className="text-lg font-bold text-white mb-1">{f.title}</div>
              <div className="text-sm text-[#e0d6ff]">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* Right: Beta Tester Signup */}
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="w-full max-w-sm bg-[#2a2340] border-2 border-[#b9aaff] rounded-2xl shadow-2xl p-8 flex flex-col items-center relative" style={{boxShadow: '0 0 24px 2px #b9aaff55'}}>
        <div className="text-2xl font-bold text-white mb-1 text-center">Become a <span className="italic font-extrabold">Beta Tester</span></div>
        <div className="text-sm text-[#b9aaff] mb-4 text-center">Beta Testers will be entitled to free, unlimited early access to new features, and the opportunity to provide direct feedback.</div>
        <input
          type="email"
          placeholder="you@company.com"
          className="w-full mb-4 px-4 py-2 rounded-lg border border-[#b9aaff] bg-transparent text-white placeholder-[#b9aaff] focus:outline-none focus:ring-2 focus:ring-[#7c6cfb]"
        />
        <button className="w-full bg-[#7c6cfb] hover:bg-[#9687ff] text-white font-bold py-3 rounded-xl text-lg transition shadow-lg border border-[#b9aaff]">Sign Up</button>
      </div>
    </div>
  </section>
);

export default BetaTesterSection; 