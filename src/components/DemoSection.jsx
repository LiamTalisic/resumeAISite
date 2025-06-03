const DemoSection = () => (
    <div className="w-full flex justify-center">
        <div className="w-full bg-[#201c33] rounded-2xl shadow-2xl border-2 border-[#7c6cfb]/40 p-0 mb-12 max-w-[1200px] mx-auto">
            {/* Chrome tab bar */}
            <div className="flex items-center h-10 px-6 bg-[#2a2340] rounded-t-2xl border-b border-[#7c6cfb]/30 relative">
                {/* Circles */}
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#b9aaff] opacity-60"></span>
                    <span className="w-3 h-3 rounded-full bg-[#b9aaff] opacity-60"></span>
                    <span className="w-3 h-3 rounded-full bg-[#b9aaff] opacity-60"></span>
                </div>
            </div>
            {/* Divider */}
            <div className="border-t border-[#7c6cfb]/30 w-full" />
            {/* Main UI area: search pill and star icon */}
            <div className="flex items-center justify-center gap-4 h-24 px-6">
                {/* Search pill */}
                <div className="flex items-center bg-[#6c5dd3]/30 rounded-full px-6 py-3 w-3/4 max-w-xl">
                    <svg width="24" height="24" fill="none" stroke="#b9aaff" strokeWidth="2" viewBox="0 0 24 24" className="mr-3">
                        <circle cx="11" cy="11" r="7" />
                        <line x1="16.5" y1="16.5" x2="21" y2="21" />
                    </svg>
                    <div className="flex-1 h-6" />
                </div>
                {/* Star icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-[#b9aaff] bg-[#7c6cfb]/30">
                    <svg width="28" height="28" fill="#b9aaff" viewBox="0 0 24 24">
                        <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
                    </svg>
                </div>
            </div>
            {/* Large purple area (16:9) */}
            <div className="w-full px-6 pb-6">
                <div className="w-full rounded-xl bg-[#6c5dd3]/40 flex items-center justify-center aspect-[16/9]">{/* Placeholder for content */}</div>
            </div>
        </div>
    </div>
);

export default DemoSection;
