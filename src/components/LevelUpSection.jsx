import { useState } from 'react';

const features = [
  {
    title: 'Resume + Cover Letter Generation',
    desc: 'With as little as a single resume, cover letter and short list of your skills, we tailor a brand new resume + cover letter pair for any job posting, in just seconds.',
    color: '#7c6cfb',
  },
  {
    title: 'Line-by-Line Smart Edit',
    desc: "Don't quite agree with the resume or cover letter we generated for you? With Smart Edit you can traverse the resume and add, remove, regenerate or edit lines with our copilot.",
    color: '#6c5dd3',
  },
  {
    title: 'Version Control',
    desc: 'We built a comprehensive version control system that organizes your past applications and gives you access to look through them.',
    color: '#9687ff',
  },
  {
    title: 'Template Customization',
    desc: 'Choose between several resume templates with different themes. Users can also customize fonts and other various theme related customisations.',
    color: '#b9aaff',
  },
  {
    title: 'ATS Audits & Keyword Injection',
    desc: 'While you look at a job posting, we extract all the important elements, create a list, and inject them into your resume and cover letters to help pass ATS filters.',
    color: '#5e4b8b',
  },
];

const LevelUpSection = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="w-full max-w-[1100px] mx-auto flex flex-row justify-center items-stretch gap-8 mt-12 px-4">
      {/* Left: Features */}
      <div className="flex-1 w-full flex flex-col justify-start">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight tracking-tight whitespace-nowrap">Level up your Applications</h2>
        <div className="flex flex-col gap-7">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`group cursor-pointer transition-all`}
              onMouseEnter={() => setActiveIdx(i)}
              onClick={() => setActiveIdx(i)}
              tabIndex={0}
              onFocus={() => setActiveIdx(i)}
            >
              <div className="flex items-center mb-1">
                <div className="w-1.5 h-10 rounded bg-[#b9aaff] mr-3" style={{background: activeIdx === i ? f.color : '#b9aaff'}}></div>
                <span className={`text-xl md:text-2xl font-bold ${i === 1 ? 'italic' : ''}`}>{f.title.split(' ')[0]}{i === 1 ? <span className="not-italic"> </span> : ' '}{f.title.split(' ').slice(1).join(' ')}</span>
              </div>
              <div className="text-base md:text-lg text-gray-200 max-w-3xl ml-6">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Right: Demo */}
      <div className="flex-1 flex flex-col items-center justify-start w-full pt-[56px]">
        <div
          className="w-full max-w-2xl aspect-[9/16] rounded-2xl flex items-center justify-center transition-colors duration-300 shadow-2xl border-2 border-[#7c6cfb]/40"
          style={{ background: features[activeIdx].color }}
        >
          {/* Placeholder for video demo */}
        </div>
      </div>
    </section>
  );
};

export default LevelUpSection; 