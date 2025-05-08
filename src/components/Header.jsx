const Header = () => (
  <header className="relative z-10 w-full flex items-center justify-between px-6 py-3 lg:px-12 bg-[#181425]/80 backdrop-blur-sm border-b border-[#332c49]">
    {/* Logo */}
    <div className="flex items-center">
      <img src="/assets/HeaderLogo.png" alt="Logo" className="h-10 w-auto" />
    </div>
    {/* Navigation (hidden on small screens) */}
    <nav className="hidden gap-10 font-semibold md:flex">
      <a href="#contact" className="transition hover:text-[#b9aaff]">
        Contact
      </a>
      <a href="#pricing" className="transition hover:text-[#b9aaff]">
        Pricing
      </a>
      <a href="#login" className="transition hover:text-[#b9aaff]">
        Login
      </a>
    </nav>
  </header>
);

export default Header; 