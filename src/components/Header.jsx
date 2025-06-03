const Header = () => (
    <header className="sticky top-8 z-999 max-w-[1150px] mx-auto flex items-center justify-between p-2 bg-[#260042]/50 backdrop-blur-md border-1 rounded-2xl border-[#27103F]">
        {/* Logo */}
        <div className="flex items-center">
            <img src="/assets/HeaderLogo.png" alt="Logo" className="h-16 w-auto" />
        </div>

        {/* Navigation (hidden on small screens) */}
        <nav className="hidden gap-8 md:flex mr-6 text-2xl font-bold">
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
