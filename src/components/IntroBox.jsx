
function IntroBox() {
  {/* Header and some text that describes the Product */ }

  return (

    <div className="flex items-center justify-center flex-col align-middle text-center gap-5">
      <h1 className="text-5xl md:text-7xl font-bold w-5/4 stroke-white ">Supercharge your job hunt</h1>
      <p className="text-xl md:text-2xl text-center md:w-2/3">We built a secure chrome extension that optimizes your jobhunt by taking your resume, skills and cover letter and generating a unique, custom catered resume for each job</p>

        <div className="flex w-full justify-center">
            <a className="bg-[#32302f] text-white text-2xl px-5 py-3 rounded-xl font-semibold
                        cursor-pointer hover:bg-purple-400 transition duration-350"
            href="https://discord.gg/bpj6je5dnY"
            target="_blank"
            rel="noopener noreferrer"> Get Started
            </a>
        </div>

    </div>
  );
}

export default IntroBox;