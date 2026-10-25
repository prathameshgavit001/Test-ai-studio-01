import React, { useState } from 'react';
import { PageId, BillingCycle, EstimatorOptions } from '../types';
import { PRICING_PLANS, FAQ_ITEMS } from '../data/mockData';
import { calculateAnnualDiscount, calculateCustomQuote } from '../utils/pricing';
import { Check, ChevronDown, ChevronUp, Calculator, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface PricingPageProps {
  onSelectPlan: (planName: string, calculatedPrice: number) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Estimator state
  const [estimator, setEstimator] = useState<EstimatorOptions>({
    tierBase: 6800,
    includeDesignSystem: true,
    include3DRendering: false,
    includeRapidPrototyping: true,
    turnaroundRush: false,
  });

  const estimatedTotal = calculateCustomQuote(estimator);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      {/* 1. Header & Billing Switcher */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="text-xs font-semibold uppercase tracking-widest text-stone-500">
          Transparent Practice Retainers
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight text-balance">
          Predictable creative investment. Uncompromising execution.
        </h1>
        <p className="text-base text-stone-600 leading-relaxed">
          Choose a focused sprint or ongoing studio partnership. Pause or adjust your engagement model as milestones evolve.
        </p>

        {/* Billing Switcher (In-page control, NOT in top bar per contract!) */}
        <div className="inline-flex items-center gap-1 p-1 bg-stone-200/80 rounded-lg shadow-inner">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              billingCycle === 'monthly'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
              billingCycle === 'annual'
                ? 'bg-stone-900 text-white shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>Annual Retainer</span>
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* 2. Tier Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const displayPrice =
            billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
          const isFeatured = plan.highlighted;

          return (
            <div
              key={plan.id}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 relative ${
                isFeatured
                  ? 'bg-stone-900 text-white shadow-xl ring-2 ring-stone-900'
                  : 'bg-white text-stone-900 border border-stone-200 shadow-xs hover:border-stone-400'
              }`}
            >
              {isFeatured && (
                <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-300 mb-2">
                  Most Popular Partnership
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3
                    className={`text-2xl font-serif font-bold ${
                      isFeatured ? 'text-white' : 'text-stone-900'
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-xs mt-1 leading-relaxed ${
                      isFeatured ? 'text-stone-300' : 'text-stone-600'
                    }`}
                  >
                    {plan.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-serif font-bold tabular-nums">
                      ${displayPrice.toLocaleString()}
                    </span>
                    <span
                      className={`text-xs ${
                        isFeatured ? 'text-stone-400' : 'text-stone-500'
                      }`}
                    >
                      / month
                    </span>
                  </div>
                  <div
                    className={`text-[11px] ${
                      isFeatured ? 'text-stone-400' : 'text-stone-500'
                    }`}
                  >
                    {billingCycle === 'annual'
                      ? 'Billed annually ($' +
                        (displayPrice * 12).toLocaleString() +
                        '/yr)'
                      : 'Billed monthly · 30-day notice to pause'}
                  </div>
                </div>

                {/* Turnaround & Deliverables */}
                <div
                  className={`p-3 rounded-lg text-xs space-y-1 ${
                    isFeatured
                      ? 'bg-stone-800/80 border border-stone-700'
                      : 'bg-stone-50 border border-stone-200'
                  }`}
                >
                  <div className="font-semibold">{plan.turnaround}</div>
                  <div
                    className={isFeatured ? 'text-stone-400' : 'text-stone-500'}
                  >
                    {plan.deliverables}
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 pt-2 text-xs">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isFeatured ? 'text-amber-300' : 'text-stone-900'
                        }`}
                      />
                      <span
                        className={
                          isFeatured ? 'text-stone-200' : 'text-stone-700'
                        }
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button
                  onClick={() => onSelectPlan(plan.name, displayPrice)}
                  className={`w-full py-3.5 px-4 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center gap-2 ${
                    isFeatured
                      ? 'bg-white text-stone-950 hover:bg-stone-100'
                      : 'bg-stone-900 text-white hover:bg-stone-800'
                  }`}
                >
                  <span>Select {plan.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Interactive Custom Quote & Addon Estimator */}
      <section className="bg-stone-100/80 border border-stone-200 rounded-2xl p-6 sm:p-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-stone-800" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                Interactive Project Estimator
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600">
              Customize deliverables and add-on specializations for a real-time advisory quote.
            </p>
          </div>
          <div className="text-right sm:text-right">
            <div className="text-xs text-stone-500 uppercase tracking-wider">
              Estimated Monthly Retainer
            </div>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tabular-nums">
              ${estimatedTotal.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Base Tier Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
              1. Base Engagement Model
            </label>
            <div className="space-y-2">
              {[
                { label: 'Concept Sprint Foundation', base: 3200 },
                { label: 'Studio Multidisciplinary Retainer', base: 6800 },
                { label: 'Bespoke Enterprise Advisory', base: 14500 },
              ].map((item) => (
                <label
                  key={item.base}
                  className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition-colors ${
                    estimator.tierBase === item.base
                      ? 'bg-white border-stone-900 ring-1 ring-stone-900'
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="tierBase"
                      checked={estimator.tierBase === item.base}
                      onChange={() =>
                        setEstimator({ ...estimator, tierBase: item.base })
                      }
                      className="text-stone-900 focus:ring-stone-900"
                    />
                    <span className="text-xs font-medium text-stone-900">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-xs font-mono tabular-nums text-stone-600">
                    ${item.base.toLocaleString()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Add-ons & Modifiers */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
              2. Add-on Disciplines & Accelerators
            </label>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={estimator.includeDesignSystem}
                    onChange={(e) =>
                      setEstimator({
                        ...estimator,
                        includeDesignSystem: e.target.checked,
                      })
                    }
                    className="rounded text-stone-900 focus:ring-stone-900"
                  />
                  <span className="text-xs font-medium text-stone-800">
                    Comprehensive Design Token System
                  </span>
                </div>
                <span className="text-xs font-mono tabular-nums text-stone-600">
                  +$2,400
                </span>
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={estimator.include3DRendering}
                    onChange={(e) =>
                      setEstimator({
                        ...estimator,
                        include3DRendering: e.target.checked,
                      })
                    }
                    className="rounded text-stone-900 focus:ring-stone-900"
                  />
                  <span className="text-xs font-medium text-stone-800">
                    High-End 3D Spatial Visualizations
                  </span>
                </div>
                <span className="text-xs font-mono tabular-nums text-stone-600">
                  +$3,200
                </span>
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={estimator.includeRapidPrototyping}
                    onChange={(e) =>
                      setEstimator({
                        ...estimator,
                        includeRapidPrototyping: e.target.checked,
                      })
                    }
                    className="rounded text-stone-900 focus:ring-stone-900"
                  />
                  <span className="text-xs font-medium text-stone-800">
                    Interactive Tactile Clickable Prototype
                  </span>
                </div>
                <span className="text-xs font-mono tabular-nums text-stone-600">
                  +$1,800
                </span>
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={estimator.turnaroundRush}
                    onChange={(e) =>
                      setEstimator({
                        ...estimator,
                        turnaroundRush: e.target.checked,
                      })
                    }
                    className="rounded text-stone-900 focus:ring-stone-900"
                  />
                  <span className="text-xs font-medium text-stone-800">
                    Rush Delivery Acceleration (2x Velocity)
                  </span>
                </div>
                <span className="text-xs font-mono tabular-nums text-stone-600">
                  +25% Total
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200">
          <span className="text-xs text-stone-500">
            *Estimator provides ballpark advisory scopes. Final specifications locked during initial briefing.
          </span>
          <button
            onClick={() =>
              onSelectPlan(
                `Custom Scope (${estimator.tierBase === 3200 ? 'Concept' : estimator.tierBase === 6800 ? 'Studio' : 'Enterprise'})`,
                estimatedTotal
              )
            }
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 rounded-md hover:bg-stone-800 transition-colors shadow-xs shrink-0"
          >
            <span>Inquire With This Estimate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 4. Feature Comparison Matrix */}
      <section className="space-y-6 pt-4">
        <div className="space-y-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Side-by-Side Comparison
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Plan capability matrix.
          </h2>
        </div>

        <div className="overflow-x-auto border border-stone-200 rounded-xl bg-white shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-100/70">
                <th className="py-4 px-5 font-bold text-stone-900">Capability Area</th>
                <th className="py-4 px-5 font-bold text-stone-900">Concept Sprint</th>
                <th className="py-4 px-5 font-bold text-stone-900 bg-stone-200/50">Studio Retainer</th>
                <th className="py-4 px-5 font-bold text-stone-900">Bespoke Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              <tr>
                <td className="py-3.5 px-5 font-medium text-stone-900">Strategic Brand Audit</td>
                <td className="py-3.5 px-5 text-stone-600">Included</td>
                <td className="py-3.5 px-5 text-stone-900 font-semibold bg-stone-50/50">Included</td>
                <td className="py-3.5 px-5 text-stone-600">Included</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-medium text-stone-900">Variable Typeface Engineering</td>
                <td className="py-3.5 px-5 text-stone-400">—</td>
                <td className="py-3.5 px-5 text-stone-900 font-semibold bg-stone-50/50">Core 2 Weights</td>
                <td className="py-3.5 px-5 text-stone-600">Full 12-Weight Family</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-medium text-stone-900">Production Web & Mobile UI</td>
                <td className="py-3.5 px-5 text-stone-400">Key screens only</td>
                <td className="py-3.5 px-5 text-stone-900 font-semibold bg-stone-50/50">End-to-end multiplatform</td>
                <td className="py-3.5 px-5 text-stone-600">Omnichannel & Spatial</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-medium text-stone-900">3D Spatial & Architectural Modeling</td>
                <td className="py-3.5 px-5 text-stone-400">—</td>
                <td className="py-3.5 px-5 text-stone-900 font-semibold bg-stone-50/50">Included</td>
                <td className="py-3.5 px-5 text-stone-600">Physical & WebXR Blueprints</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-medium text-stone-900">Direct Slack Access</td>
                <td className="py-3.5 px-5 text-stone-400">—</td>
                <td className="py-3.5 px-5 text-stone-900 font-semibold bg-stone-50/50">Yes (Senior squad)</td>
                <td className="py-3.5 px-5 text-stone-600">Yes (Principal Director)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-medium text-stone-900">Turnaround Cadence</td>
                <td className="py-3.5 px-5 text-stone-600">2–3 weeks</td>
                <td className="py-3.5 px-5 text-stone-900 font-semibold bg-stone-50/50">Weekly 48h sprints</td>
                <td className="py-3.5 px-5 text-stone-600">Continuous live availability</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. FAQ Accordion */}
      <section className="max-w-3xl mx-auto space-y-6 pt-6">
        <div className="text-center space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Common Inquiries
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Frequently asked questions.
          </h2>
        </div>

        <div className="divide-y divide-stone-200 border-y border-stone-200">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={faq.q} className="py-4">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-stone-900 group-hover:text-stone-700 transition-colors">
                    {faq.q}
                  </span>
                  <span className="text-stone-500 shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed pr-8 animate-in fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
