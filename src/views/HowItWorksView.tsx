import React, { useState } from 'react';
import { Sparkles, ChevronDown, ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';
import { formatPrice } from '../utils/format';

interface HowItWorksViewProps {
  onStartCustomizer: () => void;
  onBrowseReadyMade: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({
  onStartCustomizer,
  onBrowseReadyMade,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do velvet chenille flowers ever gather dust or lose color?',
      a: 'Our high-density velvet chenille wire retains color brilliance over decades. To maintain their luster, simply use a soft blush brush or a gentle pass from a cool hairdryer. Never submerge in water.',
    },
    {
      q: 'What is the lead time for bespoke atelier commissions versus ready-made?',
      a: 'Ready-made pieces ship the following business day. Bespoke atelier creations require 2 to 3 days of meticulous artisanal shaping before presentation packaging and courier handover.',
    },
    {
      q: 'May I send a gift directly to the recipient with a sealed card?',
      a: 'Certainly. During checkout, provide the recipient destination. We ensure no commercial invoices or prices appear inside the parcel, only your bespoke wax-sealed letterpress card.',
    },
    {
      q: 'What distinguishes CLAFFY craft from common pipe cleaners?',
      a: 'We import ultra-dense 6mm to 9mm velvet chenille wire reinforced with flexible internal alloy cores, preventing fiber shedding and ensuring permanent structural integrity.',
    },
    {
      q: 'Can our atelier sculpt botanical species not listed in the catalog?',
      a: 'Yes. In the final step of our customizer, include your bespoke request. Our master florists frequently craft bespoke orchids, camellias, and custom wedding fauna.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16 text-left">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C5A059]">
          Artisan Workflow
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#26150F] tracking-tight">
          How CLAFFY Works
        </h1>
        <p className="font-serif text-base sm:text-lg text-[#826251] font-light leading-relaxed max-w-2xl mx-auto">
          Whether selecting an immediate ready-made arrangement or commissioning a bespoke floral sculpture, our atelier delivers enduring tactile luxury.
        </p>
      </div>

      {/* Side-by-Side Path Cards: Ready-Made vs Custom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* PATH 1: READY-MADE */}
        <div className="bg-white p-7 sm:p-9 rounded-2xl border border-[#C5A059]/35 shadow-xs flex flex-col justify-between space-y-8">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#FAF7F2] text-[#26150F] text-[10px] font-medium border border-[#C5A059]/30 uppercase tracking-widest">
                Path A: Signature Ready-Made
              </span>
              <span className="text-xs text-[#826251] font-light">Dispatched Next Day</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#26150F] tracking-tight">
              Curated Ready-Made Florals
            </h3>
            <p className="text-xs text-[#826251] font-light leading-relaxed">
              Designed by our resident botanical artists showcasing our most celebrated color harmonies and iconic bouquet silhouettes.
            </p>

            {/* Steps list */}
            <div className="space-y-4 pt-2">
              {[
                { step: '01', title: 'Explore the Curated Portfolio', desc: 'Browse bouquets, presentation boxes, and willow baskets curated for special milestones.' },
                { step: '02', title: 'Select Presentation & Accents', desc: 'Add luxury ribbon accents, presentation boxes, and a handwritten parchment card.' },
                { step: '03', title: 'Next-Day Courier Dispatch', desc: 'Carefully cushioned in our signature rigid gift box and dispatched within 24 hours.' },
              ].map((s) => (
                <div key={s.step} className="flex gap-3.5 items-start text-xs">
                  <span className="w-6 h-6 rounded-full bg-[#FAF7F2] border border-[#C5A059]/40 flex items-center justify-center font-serif text-[11px] text-[#26150F] shrink-0 font-medium">
                    {s.step}
                  </span>
                  <div>
                    <h5 className="font-medium text-[#26150F]">{s.title}</h5>
                    <p className="text-[#826251] text-[11px] font-light mt-0.5 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onBrowseReadyMade}
            className="craft-button-secondary w-full py-3.5 text-xs flex items-center justify-center gap-2"
          >
            <span>Explore Ready-Made Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* PATH 2: CUSTOM BESPOKE */}
        <div className="bg-[#FAF7F2] p-7 sm:p-9 rounded-2xl border border-[#C5A059] shadow-sm flex flex-col justify-between space-y-8 relative overflow-hidden">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#26150F] text-[#DFC282] text-[10px] font-medium border border-[#C5A059]/40 uppercase tracking-widest">
                Path B: Atelier Customizer
              </span>
              <span className="text-xs text-[#C5A059] font-medium">Bespoke Differentiator</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#26150F] tracking-tight">
              Craft Your Personalized Bloom
            </h3>
            <p className="text-xs text-[#826251] font-light leading-relaxed">
              Step inside our interactive studio customizer to architect an enduring floral composition tailored to your memory, relationship, or celebration.
            </p>

            {/* Steps list */}
            <div className="space-y-4 pt-2">
              {[
                { step: '01', title: 'Choose Presentation Architecture', desc: 'Select between an artisanal hand-bouquet, woven wicker basket, or round hat box.' },
                { step: '02', title: 'Curate Stems & Flora Count', desc: 'Combine velvet sunflowers, sunny daisies, sculpted tulips, and aromatic lavender.' },
                { step: '03', title: 'Harmonize Signature Palettes', desc: 'Pair champagne gold, rich chocolate brown, warm ivory cream, and deep burgundy.' },
                { step: '04', title: 'Inscribe Wax-Sealed Keepsake', desc: 'We press and gold wax-seal your personal letter on heavy artisan parchment.' },
              ].map((s) => (
                <div key={s.step} className="flex gap-3.5 items-start text-xs">
                  <span className="w-6 h-6 rounded-full bg-[#26150F] text-[#DFC282] border border-[#C5A059] flex items-center justify-center font-serif text-[11px] shrink-0 font-medium">
                    {s.step}
                  </span>
                  <div>
                    <h5 className="font-medium text-[#26150F]">{s.title}</h5>
                    <p className="text-[#826251] text-[11px] font-light mt-0.5 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onStartCustomizer}
            className="craft-button-gold w-full py-4 text-xs flex items-center justify-center gap-2 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Studio Atelier Customizer</span>
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white p-7 sm:p-9 rounded-2xl border border-[#C5A059]/35 shadow-xs space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-[#C5A059]">At a Glance</span>
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#26150F] tracking-tight">
            Ready-Made vs. Bespoke Atelier
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[#C5A059]/30">
                <th className="py-3.5 px-4 font-serif text-sm font-normal text-[#26150F]">Dimension</th>
                <th className="py-3.5 px-4 font-serif text-sm font-normal text-[#826251]">Ready-Made Collection</th>
                <th className="py-3.5 px-4 font-serif text-sm font-medium text-[#26150F] bg-[#FAF7F2]">Bespoke Atelier Commission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C5A059]/15">
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#26150F]">Design Autonomy</td>
                <td className="py-3.5 px-4 text-[#826251] font-light">Pre-curated botanical harmonies</td>
                <td className="py-3.5 px-4 text-[#26150F] font-medium bg-[#FAF7F2]">Complete stem & palette customization</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#26150F]">Artisanal Lead Time</td>
                <td className="py-3.5 px-4 text-[#826251] font-light">Dispatched next business day</td>
                <td className="py-3.5 px-4 text-[#26150F] font-medium bg-[#FAF7F2]">2 to 3 days handcrafting</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#26150F]">Starting Price</td>
                <td className="py-3.5 px-4 text-[#826251] font-light">From {formatPrice(45000)}</td>
                <td className="py-3.5 px-4 text-[#26150F] font-medium bg-[#FAF7F2]">From {formatPrice(95000)} (Base + flora)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#26150F]">Palette Options</td>
                <td className="py-3.5 px-4 text-[#826251] font-light">Fixed signature colorways</td>
                <td className="py-3.5 px-4 text-[#26150F] font-medium bg-[#FAF7F2]">7 CLAFFY signature luxury pigments</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#26150F]">Personal Keepsake</td>
                <td className="py-3.5 px-4 text-[#826251] font-light">Printed gift enclosure note</td>
                <td className="py-3.5 px-4 text-[#26150F] font-medium bg-[#FAF7F2]">Gold wax-sealed letterpress parchment</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="bg-white p-7 sm:p-9 rounded-2xl border border-[#C5A059]/35 shadow-xs space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C5A059]">
            Inquiries
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#26150F] tracking-tight">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="divide-y divide-[#C5A059]/20 pt-2">
          {faqs.map((faq, i) => (
            <div key={i} className="py-4">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex justify-between items-center text-left py-2 font-serif text-base font-normal text-[#26150F] hover:text-[#C5A059] transition"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#826251] transition-transform ${
                    openFaq === i ? 'rotate-180 text-[#C5A059]' : ''
                  }`}
                />
              </button>
              {openFaq === i && (
                <p className="text-xs text-[#826251] leading-relaxed pt-2 pb-2 font-light">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
