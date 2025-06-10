import { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

// import index.css for styling
import "../index.css";

const Features = [
    {
        name: "Limited Line-by-Line SmartEdit™",
        plan: "Plus Plan",
        highlight: false,
        features: [
            {
                label: "Line-By-Line prompted-editing with Co-pilot",
                available: true,
                description:
                    "When you've generated a resume, you can navigate to the editor via the 'Edit' button on the extension. Here, you can edit each line of your resume. Hit tab to accept a generated line, or click on the line and to refuse a line, simply type in a prompt for how you want to change it. The AI will generate a new line based on your prompt and all the context we have about you as a user.",
            },
            {
                label: "ATS warnings when editing a line containing keywords",
                available: true,
                description:
                    "Receive warnings when altering lines with Critical* ATS keywords. This is unlimited per resume. You will receive a warning saying that editing this line may cause you to lose ATS compatibility. You can choose to ignore this warning and edit the line anyway.",
            },
            {
                label: "Limited ATS score checks",
                available: true,
                description: "We can check your resume for ATS compatibility, but this is limited to 3 checks per month.",
            },
            {
                label: "AI Model Selection",
                available: true,
                description: "Choose from different AI models, for generating suggestions. Token usage per model varies.",
            },
            {
                label: "Limited Usage",
                available: true,
                description:
                    "The plus plan is capped at a monthly usage of {{Undecided}} tokens total input and output combined. This is enough for the average user to edit every single resume the plus plan user has.",
            },
        ],
    },
    {
        name: "Advanced SmartEdit™",
        plan: "Pro Plan",
        highlight: true,
        features: [
            {
                label: "Everything in Plus",
                available: true,
                description: "Includes all features from the Plus Plan",
            },
            {
                label: "ATS Keyword Highlighting in-line",
                available: true,
                description: "ATS-relevant keywords are highlighted as you write, helping you optimize content in real time.",
            },
            {
                label: "ATS Warnings",
                available: true,
                description:
                    "Receive warnings when altering lines with any* ATS keywords. This is unlimited per resume. You will receive a warning saying that editing this line may cause you to lose ATS compatibility. You can choose to ignore this warning and edit the line anyway.",
            },
            {
                label: "Smarter Co-pilot Editing",
                available: true,
                description:
                    "We will always maintain ATS compatibility when editing lines with the co-pilot. This means that if you edit a line that contains ATS keywords, the AI will generate a new line that is still ATS compatible, If it can't do that while adhering to your prompt... we will regenerate the entire section on the house, with your approval in order to guarantee ATS compatibility.",
            },
            {
                label: "Live ATS Score Checks: Sectional and Overall",
                available: true,
                description:
                    "We will check your resume for ATS compatibility as you edit it, and give you a live score based on the current state of your resume. Pro users have access to sectional scoring. This is unlimited per resume.",
            },
            {
                label: "Color Coded Impact Analyzer™",
                available: true,
                description: 'Weak Phrases are highlighted, power verbs are suggested as edits. Each bullet point is scored for "impact", "clarity", & "specificity" using a color-coded system.',
            },
            {
                label: "Sectional Keyword Density Meter",
                available: true,
                description:
                    "Shows users which sections of their resume are missing keywords, and which sections are overstuffed, compared to the job description and also our own dataset of keywords.",
            },
            {
                label: "Context Aware Rewriting (Cross-line/ Cross-section intelligence)",
                available: true,
                description:
                    "Instead of editing in isolation, each line is rewritten with the full section context (optionally if you want to spend more of your tokens you can choose full resume context). This improves flow and avoids repetition and redundancy.",
            },
            {
                label: "Smart Rejection Reasoning",
                available: true,
                description:
                    "If the user rejects a line, + stays idle for 3-5s, auto-GPT suggests, 'Too vague, lacks metric. Try adding a result'. From here the user can choose to accept the suggestion and regenerate the line, or reject it and type in their own prompt.",
            },
            {
                label: "Turbo Mode",
                available: true,
                description: "Select Multiple lines and regenerate them in bulk",
            },
            {
                label: "Turbo Mode Quality of Life Improvements",
                available: true,
                description:
                    "Inline Feedback tags (like google docs comments): Each rewritten line shows why/ how it changed, Safe Mode Toggle: Keeps core structure intact, only improves wording, clarity, and impact. One-click Undo for specific lines, or the entire batch of lines you just regenerated.",
            },
        ],
    },
];

function HorizontalDivider({ className = "" }) {
    return <div className={`w-full h-[2px] bg-gradient-to-r from-transparent via-[#D7D7D7] to-transparent ${className}`} />;
}

const FeatureCards = ({ plan }) => {
    const features = plan.features;
    const planName = plan.plan;

    return (
        <div className="relative flex-1 rounded-2xl border-1 border-[rgba(189,160,212,0.5)] pt-2 pb-4 px-4 flex flex-col items-center min-w-[260px]  bg-gradient-to-br from-[rgba(40,0,86,0.85)] to-[rgba(24,11,39,0.85)]">
            {/* Most popular tag */}
            {plan.highlight && (
                <span className="absolute right-4 top-3 italic font-[roboto] text-[#f5ecff] text-xs py-1 px-1.5 rounded-full border border-[#83679E] bg-[rgba(131,103,158,0.15)]">
                    Most&nbsp;Popular
                </span>
            )}

            {/* Plan Name and Price */}
            <h3 className="text-3xl  font-normal font-titillium-web-semibold text-white w-full text-left">{plan.name}</h3>

            <div className="flex items-baseline justify-start w-full">
                <span className="text-lg noto-sans-normal text-white italic">Included in {planName}</span>
            </div>

            <HorizontalDivider className="mb-7 mt-1" />

            <ul className="text-white space-y-3 w-full mb-8 flex-grow">
                {features.map(({ label, available, description }) => (
                    <li key={label}>
                        <div className="flex items-start gap-2 group ">
                            {/* Div to contain icon */}
                            <div className="flex items-center justify-center w-6 h-6 ">
                                {available ? <FiCheck className="mt-[2px] h-6 w-6 text-[#8871DB]" /> : <FiX className="mt-[2px] h-6 w-6 text-red-400" />}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-medium cursor-pointer">{label}</span>
                                {description && (
                                    <div className="max-h-40 overflow-hidden text-sm text-white/70 transition-[max-height] duration-300 ease-in-out group-hover:max-h-40">
                                        <p className="mt-1 leading-snug">{description}</p>
                                    </div>
                                )}
                            </div>
                        </div>
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

const TierComparison = () => {
    return (
        <section className="w-full max-w-[1100px] mx-auto flex flex-col items-center mt-48 mb-24">
            <div className="flex flex-col items-start w-full px-0.5">
                {/* Header */}
                <h2 className=" text-6xl leading-[1.1] pb-1 text-[#F1E6FE] font-titillium-web-bold tracking-[0.025em]"> Pricing&nbsp;with&nbsp;you&nbsp;in&nbsp;mind</h2>

                {/* Subheader */}
                <p className="text-3xl  text-[#d5ccff] noto-sans-medium tracking-[0.025em]">It&rsquo;s hard to put a price on landing that dream job</p>
            </div>

            <div className="flex flex-row gap-8 w-full justify-between mt-4 ">
                {Features.map((feature) => (
                    <FeatureCards key={feature.label} plan={feature} />
                ))}
            </div>
        </section>
    );
};

export default TierComparison;
