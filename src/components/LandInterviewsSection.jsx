const metrics = [
  { label: 'Resumes Generated', value: '250k+' },
  { label: 'Hours saved per user', value: '130' },
  { label: 'Scheduled Interviews', value: '10k+' },
];

const tableRows = [
  ['Keyword Extraction', '20-30 min', '2-5 m', '~5 s'],
  ['Bullet Rewriting', '30-45 min', '6-8 m', '~5 s'],
  ['Cover-letter drafting', '30-45 min', '7-10 m', '~5 s'],
  ['Proofing / ATS tweaks', '30 min', '3-5 m', '~5 s'],
  ['Total per Application', '≈ 2h 10m', '≈ 23 m', '≈ 20 s'],
];

const infoCards = [
  {
    title: 'ATS Audits',
    desc: '90% of companies screen résumés with ATS software and 75% are rejected before a human looks at them. Our ATS Audit auto-adds the right keywords for each job, pushing your application into the top 25%.',
    icon: (
      <svg width="28" height="28" fill="none" stroke="#b9aaff" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>
    ),
  },
  {
    title: 'Fair use',
    desc: 'Unlimited for 99% of users; heavy use (>300 pairs/mo) billed at CA $0.25 per extra pair',
    icon: (
      <svg width="28" height="28" fill="none" stroke="#b9aaff" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/></svg>
    ),
  },
  {
    title: 'Security',
    desc: 'Your personal history, achievements, and private job searches stay yours—secured, encrypted, and erasable on demand.',
    icon: (
      <svg width="28" height="28" fill="none" stroke="#b9aaff" strokeWidth="2" viewBox="0 0 24 24"><rect x="6" y="10" width="12" height="8" rx="2"/><path d="M12 14v2"/></svg>
    ),
  },
];

const LandInterviewsSection = () => (
  <section className="w-full max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-10 mt-20 mb-20 px-4">
    {/* Left: Main content */}
    <div className="flex-1 flex flex-col gap-6">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2">Land Interviews Fast</h2>
      <div className="text-lg text-[#b9aaff] mb-2">Our AI-driven extension works hard in the background as users browse through job board sites, to generate tailored high quality Resume + Cover Letter pairs for each and every job posting individually.</div>
      {/* Card with table and metrics */}
      <div className="bg-gradient-to-br from-[#28223d] to-[#201c33] border-2 border-[#7c6cfb]/40 rounded-2xl shadow-xl p-6 flex flex-col gap-4">
        <div className="font-bold text-white mb-2 flex items-center gap-2">
          <svg width="20" height="20" fill="none" stroke="#b9aaff" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>
          Get months back from your job hunt
        </div>
        <div className="text-sm text-[#b9aaff] mb-2">In 2025, the average job hunt lasts 5-6 months, with 2-3 submitted job applications each day. Our extension enables users to produce higher-quality applications significantly faster.</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white border-separate border-spacing-y-1">
            <thead>
              <tr className="text-[#b9aaff]">
                <th className="pr-4">Activity</th>
                <th className="pr-4">Manual</th>
                <th className="pr-4">LLM</th>
                <th>Rapid Resume</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className="bg-[#332c49]/40 rounded">
                  {row.map((cell, j) => (
                    <td key={j} className="pr-4 py-1">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-[#b9aaff] mt-2">Time Savings<br/><span className="font-bold text-white">~390×</span> faster than doing it all by hand, <span className="font-bold text-white">~70×</span> faster than prompting an LLM yourself.</div>
        {/* Metrics */}
        <div className="flex gap-8 mt-4">
          {metrics.map((m, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-2xl font-extrabold text-white mb-1">{m.value}</div>
              <div className="text-xs text-[#b9aaff] text-center">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* Right: Info cards */}
    <div className="flex-1 flex flex-col gap-6">
      {infoCards.map((card, i) => (
        <div key={i} className="bg-gradient-to-br from-[#28223d] to-[#201c33] border-2 border-[#7c6cfb]/40 rounded-2xl shadow-xl p-6 flex gap-4 items-start">
          <div className="flex-shrink-0 mt-1">{card.icon}</div>
          <div>
            <div className="font-bold text-white mb-1">{card.title}</div>
            <div className="text-sm text-[#b9aaff]">{card.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default LandInterviewsSection; 