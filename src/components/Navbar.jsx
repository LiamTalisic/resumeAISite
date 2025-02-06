import { useState, useEffect } from 'react';

function Navbar() {
    const [isDesktop, setDesktop] = useState(true);


    useEffect(() => {
        function checkMobile() {
            setDesktop(window.innerWidth > 768);
        }

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);


    function desktopNavbar() {
        return (
            <>
                <div className="w-full fixed flex justify-center top-5 ">
                    <div className="w-3/5 h-16 flex justify-between items-center bg-[rgba(120,120,120,0)] backdrop-blur-lg rounded-xl border-solid border-1 border-[#AAAAAA]/50 px-10">
                    
                        {/* Left side div */}
                        <div className="flex items-center">
                            <img src="/assets/ResumaiLogo.png" alt="logo" className="w-12 h-12" />
                            <p className="text-black text-xl md:text-2xl font-bold tracking-wide sm:hidden md:hidden lg:flex">ResumeAI</p>
                        </div>

                        {/* right side */}
                        <div className='flex flex-row '>
                            {/* divs for buttons */}

                            <div className="flex flex-row items-center px-2 md:px-1 sm:hidden md:flex">
                                <a
                                    className="text-black rounded-xl font-semibold cursor-pointer hover:text-purple-400 transition duration-250"
                                    href="https://discord.gg/bpj6je5dnY"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Contact
                                </a>
                            </div>

                            <div className="flex flex-row items-center px-2 md:px-1 sm:hidden md:flex">
                                <a
                                    className="text-black rounded-xl font-semibold cursor-pointer hover:text-purple-400 transition duration-250"
                                    href="https://discord.gg/bpj6je5dnY"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Pricing
                                </a>
                            </div>

                            <a href="https://discord.gg/bpj6je5dnY" target="_blank" rel="noopener noreferrer" >
                                <div className=" flex flex-row bg-[#32302f] w-[131px] py-2 px-5 ml-[10%] mr-[10%] gap-2 rounded-xl hover:bg-purple-400 transition duration-200">
                                    <img src="/assets/discord_white.svg" className="h-6 w-6" />
                                    <a className="text-white rounded-xl font-semibold cursor-pointer ">
                                        Discord
                                    </a>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    function mobileNavbar() {
        return (
            <>
                <div className="w-full fixed flex justify-center top-5 ">

                    <div className="w-4/5 h-16 flex justify-between items-center bg-[rgba(120,120,120,0)] backdrop-blur-lg rounded-xl border-solid border-1 border-[#AAAAAA]/50 px-4">
                        {/* Left side */}
                        <img src="/assets/ResumaiLogo.png" alt="logo" className="w-12 h-12" />
                       

                        {/* right side */}
                        <div className='flex flex-row'>

                            <a href="https://discord.gg/bpj6je5dnY" target="_blank" rel="noopener noreferrer" >
                                <div className=" flex flex-row bg-[#32302f]  px-3 py-2 gap-2 rounded-xl hover:bg-purple-400 transition duration-200">
                                    <img src="/assets/discord_white.svg" className="h-6 w-6" />
                                    <a className="text-white rounded-xl font-semibold cursor-pointer ">
                                        Discord
                                    </a>
                                </div>
                            </a>

                        </div>

                    </div>

                </div>
            </>
        );
    }

    return isDesktop ? desktopNavbar() : mobileNavbar();
}

export default Navbar;