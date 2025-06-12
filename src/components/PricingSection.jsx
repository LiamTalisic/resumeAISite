import { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

// import index.css for styling
import "../index.css";

const plans = [
    {
        name: "Starter",
        weeklyRate: "free",
        monthlyWeeklyRate: "free",
        billedMonthly: 16,
        savings: 20,
        highlight: false,
        weeklyFeatures: [
            { label: "4 Résumé + Cover-Letter Pairs", available: true },
            { label: "1 Free Regeneration per pair*", available: true }, //

            { label: "Basic AI Models", available: true },
            { label: "ATS Audits", available: false },
            { label: "Strong AI Models", available: false },
            { label: "Version Control", available: false },
            { label: "Line-by-Line SmartEdit™", available: false },
        ],
        monthlyFeatures: [
            { label: "16 Résumé + Cover-Letter Pairs", available: true },
            { label: "1 Free Regeneration per pair*", available: true },

            { label: "Basic AI Models", available: true },
            { label: "ATS Audits", available: false },
            { label: "Strong AI Models", available: false },
            { label: "Version Control", available: false },
            { label: "Line-by-Line SmartEdit™", available: false },
            { label: "Theme & Template Customization*", available: false },
        ],
    },
    {
        name: "Plus",
        weeklyRate: 8,
        monthlyWeeklyRate: 6,
        billedMonthly: 24,
        savings: 25,
        highlight: false,
        weeklyFeatures: [
            { label: "Everything in Starter", available: true },
            { label: "15 Résumé + Cover-Letter Pairs", available: true },
            { label: "2x more Free regenerations", available: true }, // This needs clarification (e.g., there are 8 free regenerations per week)
            { label: "Limited Line-by-Line SmartEdit™", available: true },
            { label: "ATS Audits", available: true },

            { label: "Limited Version Control", available: true },
            { label: "Strongest AI Models", available: false },
            { label: "Theme & Template Customization*", available: false },
        ],
        monthlyFeatures: [
            { label: "Everything in Starter", available: true },
            { label: "60 Résumé + Cover-Letter Pairs", available: true },
            { label: "2x more Free regenerations", available: true }, // This needs clarification (e.g., there are 8 free regenerations per week)
            { label: "Limited Line-by-Line SmartEdit™", available: true },
            { label: "ATS Audits", available: true },
            { label: "Limited Version Control", available: true },

            { label: "Strongest AI Models", available: false },
            { label: "Theme & Template Customization*", available: false },
        ],
    },
    {
        name: "Pro",
        weeklyRate: 15,
        monthlyWeeklyRate: 10,
        billedMonthly: 40,
        savings: 33,
        highlight: true,
        weeklyFeatures: [
            { label: "Everything in Plus", available: true },
            { label: "75 Résumé + Cover-Letter Pairs", available: true },
            { label: "4x more Free Regenerations", available: true }, // This needs clarification, For the pro plan we'll let them regenerate as many times as they want but we will limit the number of regenerations they can do per week to xx
            { label: "Advanced SmartEdit™", available: true },
            { label: "ATS Audits", available: true },
            { label: "Strongest AI Models", available: true },

            { label: "Version Control", available: true },
            { label: "Theme & Template Customization*", available: true }, // can add so many features, need at least 4 templates/ themes for launch. Draggable sections/ section selector feature
        ],
        monthlyFeatures: [
            { label: "Everything in Plus", available: true },
            { label: "~300* Résumé + Cover-Letter Pairs", available: true }, // Fair use policy applies here so we should explain it somewhere else
            { label: "4x more Free Regenerations", available: true }, // This needs clarification, For the pro plan we'll let them regenerate as many times as they want but we will limit the number of regenerations they can do per week to xx
            { label: "Advanced SmartEdit™", available: true },
            { label: "ATS Audits", available: true },
            { label: "ATS Scoring", available: true },
            { label: "Strongest AI Models", available: true },
            { label: "Version Control", available: true },
            { label: "Theme & Template Customization*", available: true },
            { label: "Job Application Tracker", available: true },
            { label: "1 on 1 interview coaching from Experts", available: true },
            { label: "Linkedin Profile Imports", available: true },
        ],
    },
];

function HorizontalDivider({ className = "" }) {
    return <div className={`w-full h-[2px] bg-gradient-to-r from-transparent via-[#D7D7D7] to-transparent ${className}`} />;
}

// There is a lot of really scuffed alignment in this component, but it works for now
const ToggleSwitch = ({ isMonthly, onToggle }) => (
    <div className="flex items-center caret-transparent ">
        <button
            type="button"
            role="switch"
            aria-checked={isMonthly}
            onClick={onToggle}
            className="relative w-37 h-10 bg-[rgba(137,113,220,0.5)] rounded-l-4xl rounded-r-[100px] border-2 border-[#8971DC] cursor-pointer mx-2 shadow-xl shadow-black"
        >
            {/* inner bar with its own border */}
            <div
                className={`absolute -top-[2px] -left-[2px] h-10 bg-[rgba(137,113,220,0.5)] rounded-l-4xl rounded-r-[100px] border-2 border-[#8971DC] flex items-center text-center duration-200  ${
                    isMonthly ? "w-78" : "w-37"
                }`}
            >
                <span className={`absolute left-11.5 font-[Roboto] text-xl text-white transition-opacity duration-150 ease-out ${!isMonthly ? "delay-300 opacity-100" : "delay-50 opacity-0"}`}>
                    {isMonthly ? "" : "Weekly"}
                </span>
                <span className={`absolute left-4.5 font-[Roboto] text-xl text-white transition-opacity duration-150 ease-out ${isMonthly ? "delay-300 opacity-100" : "delay-50 opacity-0"}`}>
                    {isMonthly ? "Monthly" : ""}
                </span>
            </div>

            {/* white circle */}
            <span
                className={` absolute -inset-1.5 h-12 w-12 -left-3 rounded-full bg-[#D9D9D9] border-4 border-[#8971DC] hover:bg-[#c5c4c4] hover:border-[#7664b8] shadow-xl shadow-black transition duration-200 ease-in-out  ${
                    isMonthly ? "translate-x-29" : "translate-x-0"
                }`}
            />

            <span className={`absolute w-full left-30 top-0.75 text-xl text-white font-thin transition-opacity duration-150 ease-out ${!isMonthly ? "delay-300 opacity-100" : "delay-50 opacity-0"}`}>
                {isMonthly ? "" : ""}
            </span>
            <span className={`absolute w-full left-39 top-0.75 text-xl text-white font-thin transition-opacity duration-150 ease-out ${isMonthly ? "delay-300 opacity-100" : "delay-50 opacity-0"}`}>
                {isMonthly ? "Save up to 33%" : ""}
            </span>
        </button>
    </div>
);

const PricingCard = ({ plan, isMonthly }) => {
    const pricePerWeek = isMonthly ? plan.monthlyWeeklyRate : plan.weeklyRate;
    const features = isMonthly ? plan.monthlyFeatures : plan.weeklyFeatures;

    return (
        <div className="relative flex-1 rounded-2xl border-1 border-[rgba(189,160,212,0.5)] pt-2 pb-4 px-4 flex flex-col items-center min-w-[260px]  bg-gradient-to-br from-[rgba(40,0,86,0.85)] to-[rgba(24,11,39,0.85)]">
            {/* Most popular tag */}
            {plan.highlight && (
                <span className="absolute right-4 top-3 italic font-[roboto] text-[#f5ecff] text-xs py-1 px-1.5 rounded-full border border-[#83679E] bg-[rgba(131,103,158,0.15)]">
                    Most&nbsp;Popular
                </span>
            )}

            {isMonthly && plan.savings > 0 && (
                // SAVE %%% Tag
                <span className="absolute -top-3 bg-[#83679E] text-white text-md font-medium px-1.5 rounded-md">Save {plan.savings}%</span>
            )}

            {/* Plan Name and Price */}
            <h3 className="text-3xl font-normal font-titillium-web-semibold text-white mb-2 w-full text-left">{plan.name}</h3>

            <div className="flex items-baseline justify-start w-full">
                <span className="text-4xl md:text-5xl noto-sans-bold text-white">${pricePerWeek}</span>
                <span className="text-sm text-white font-light pl-0.5">/week</span>
            </div>

            <p className="text-sm text-white/70 font-extralight text-left w-full mb-1">{isMonthly ? `Billed monthly` : "Billed weekly"}</p>

            <HorizontalDivider className="mb-7 mt-1" />

            <ul className="text-white text-base space-y-3 w-full mb-8 flex-grow">
                {features.map(({ label, available }) => (
                    <li key={label} className="flex items-start gap-2">
                        {available ? <FiCheck className="mt-[2px] h-6 w-auto text-[#8871DB] " /> : <FiX className="mt-[2px] h-6 w-auto text-red-400" />}
                        <span>{label}</span>
                    </li>
                ))}
            </ul>

            {/* Get Started */}
            <button className="w-full bg-[rgba(137,113,220,0.75)] border-[rgb(137,113,220)] border-3 hover:bg-[#9687ff] text-xl transition duration-200 text-[#FFFFFF] font-thin p-2 rounded-xl ">
                {plan.name === "Pro" ? "Get Started" : "Start Free Trial"}
            </button>
        </div>
    );
};

const PricingSection = () => {
    const [billing, setBilling] = useState("monthly");
    const isMonthly = billing === "monthly";

    return (
        <section className="w-full max-w-[1100px] mx-auto flex flex-col items-center mt-48 mb-24">
            <div className="flex flex-col items-start w-full px-0.5">
                {/* Header */}
                <h2 className=" text-6xl leading-[1.1] pb-1 text-[#F1E6FE] font-titillium-web-bold tracking-[0.025em]"> Pricing&nbsp;with&nbsp;you&nbsp;in&nbsp;mind</h2>

                {/* Subheader */}
                <p className="text-3xl  text-[#d5ccff] noto-sans-medium tracking-[0.025em]">It&rsquo;s hard to put a price on landing that dream job</p>

                <div className="mt-8 mb-6">
                    <ToggleSwitch isMonthly={isMonthly} onToggle={() => setBilling(isMonthly ? "weekly" : "monthly")} />
                </div>
            </div>

            {/* Pricing Cards */}

            <div className="flex flex-row gap-4 w-full justify-between ">
                {plans.map((plan) => (
                    <PricingCard key={plan.name} plan={plan} isMonthly={isMonthly} />
                ))}
            </div>
        </section>
    );
};

export default PricingSection;
