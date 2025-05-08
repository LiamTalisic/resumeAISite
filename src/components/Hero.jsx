const Hero = () => (
  <>
    <h1 className="text-center font-extrabold leading-tight tracking-tight text-5xl md:text-6xl lg:text-7xl mb-2" style={{fontFamily: 'sans-serif'}}>
      RapidResume
    </h1>
    <p className="text-center text-lg font-bold md:text-2xl lg:text-3xl mb-4" style={{fontFamily: 'sans-serif'}}>
      Supercharge your <br className="hidden sm:block" />
      job hunt
    </p>
    <button className="rounded bg-[#7c6cfb] px-8 py-3 text-lg font-extrabold shadow-xl transition hover:bg-[#9687ff] mb-2" style={{fontFamily: 'sans-serif'}}>
      Get Started for Free
    </button>
    <span className="text-sm text-[#b9aaff]">7‑day free trial, cancel anytime</span>
    {/*<img
      src="/assets/Hook.png"
      alt="Resume upload illustration"
      className="w-[320px] h-auto md:w-[500px] md:h-auto object-contain mb-2 box-border"
    />*/}
    {/* Feature chips */}
    <div className="flex flex-wrap justify-center gap-3 pt-20 mb-4">
      {["One-Click Generation", "Line-by-Line Smart Edit", "Version Control", "Template Switcher"].map((chip) => (
        <span
          key={chip}
          className="rounded border-2 border-[#7c6cfb] px-4 py-2 text-sm font-semibold text-[#b9aaff] bg-transparent font-mono"
          style={{fontFamily: 'monospace'}}
        >
          {chip}
        </span>
      ))}
    </div>
  </>
);

export default Hero; 