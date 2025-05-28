import { useState } from 'react';

const plans = [
  {
    name: 'Starter',
    weekly: 4.99,
    monthly: 14.99,
    savings: 25,
    features: [
      '3 Resume & CV Pairs',
      '1 Regeneration',
      'Limited Customization',
    ],
  },
  {
    name: 'Plus',
    weekly: 7.99,
    monthly: 23.99,
    savings: 25,
    features: [
      'Strong Models',
      '15 Resume & CV Pairs',
      '2 Regenerations',
      'Limited Line-by-Line Review',
      'Limited Customization',
      'Limited Version Control',
    ],
  },
  {
    name: 'Pro',
    weekly: 11.99,
    monthly: 31.99,
    savings: 33,
    features: [
      'Strongest Models',
      '75 Resume & CV Pairs',
      'Unlimited Regenerations',
      'Line-by-Line Review',
      'Full Customization',
      'Version Control',
    ],
    highlight: true,
  },
];

const PricingSection = () => {
  const [billing, setBilling] = useState('weekly'); // 'weekly' | 'monthly'
  const isMonthly = billing === 'monthly';

  return (
    <section className="w-full max-w-[1100px] mx-auto flex flex-col items-center mt-24 mb-24 px-4">
      {/* Heading */}
      <h2
        className="text-center text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] pb-1
                  bg-gradient-to-r from-[#c6b6ff] via-white/90 to-[#c6b6ff]
                  text-transparent bg-clip-text"
      >
        Pricing&nbsp;with&nbsp;you&nbsp;in&nbsp;mind
      </h2>

      {/* Sub-heading */}
      <p className="mt-4 text-center text-xl md:text-2xl text-[#d5ccff] max-w-3xl">
        It&rsquo;s hard to put a price on landing that dream job
      </p>


      {/* Weekly ⇆ Monthly toggle */}
      <div className="flex items-center gap-4 mt-10 mb-12">
        <span
          className={`font-mono font-bold transition ${!isMonthly ? 'text-white' : 'text-[#b9aaff]'}`}
        >
          Weekly
        </span>

        {/* clickable pill */}
        <button
          type="button"
          role="switch"
          aria-checked={isMonthly}
          onClick={() => setBilling(isMonthly ? 'weekly' : 'monthly')}
          className="relative w-16 h-9 rounded-full bg-[#482A77]/80 outline-none focus:ring-4 focus:ring-[#7c6cfb]/50 transition-all"
        >
          <span
            className={`absolute top-1 left-1 h-7 w-7 rounded-full bg-[#FFFFFF] transition-transform 
                        ${isMonthly ? 'translate-x-7' : ''}`}
          />
        </button>

        <span
          className={`font-mono font-bold transition ${isMonthly ? 'text-white' : 'text-[#E4D1FF]'}`}
        >
          Monthly
        </span>

        <span className="text-white text-xs font-bold rounded-full px-3 py-1">
          Save up&nbsp;to&nbsp;33%
        </span>
      </div>

      {/* Price cards */}
      <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="relative flex-1 bg-[#2D124F]/60 rounded-2xl border-2 border-[#9747FF]/40
                       shadow-xl p-8 flex flex-col items-center min-w-[260px] max-w-[320px] backdrop-filter backdrop-blur-lg">
            {plan.highlight && (
              <span className="absolute right-4 top-4 text-[#D5B3FF] text-xs font-semibold px-2 py-1 rounded-full">
                Most&nbsp;Popular
              </span>
            )}

            {isMonthly && plan.savings > 0 && (
              <span className="absolute left-1/2 transform -translate-x-1/2 -top-3 bg-[#7c6cfb] text-white text-xs font-semibold px-2 py-1 rounded-full border-2 border-[#1a1129]">
                Save {plan.savings}%
              </span>
            )}

            <h3 className="text-3xl font-extrabold text-white mb-2 text-left w-full">
              {plan.name}
            </h3>

            {/* price + /week or /month */}
            <div className="flex items-baseline justify-start mb-2 w-full">
              <span className="text-4xl md:text-5xl font-extrabold text-white">
                ${ (isMonthly ? plan.monthly : plan.weekly).toFixed(2) }
              </span>
              <span className="text-lg md:text-xl text-white ml-1">
                /{isMonthly ? 'month' : 'week'}
              </span>
            </div>

            {/* Billed amount */}
            <p className="text-sm text-white text-left w-full mb-6">
              {isMonthly ? `Billed $${plan.monthly.toFixed(2)}/month` : `Billed $${plan.weekly.toFixed(2)}/week`}
            </p>

            <div className="border-b border-[#b9aaff]/30 w-full mb-6" />

            <ul className="text-white text-base space-y-3 w-full mb-8 flex-grow">
              {plan.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2">
                  <span className="text-white text-lg leading-none mt-[2px]">✔</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <button
              className="w-full bg-[#B89BFF] hover:bg-[#9687ff] transition text-[#2D124F] font-bold py-3 rounded-xl mt-auto"
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
