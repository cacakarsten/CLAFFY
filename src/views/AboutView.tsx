import React from 'react';
import { Sparkles, Heart, Award } from 'lucide-react';

interface AboutViewProps {
  onStartCustomizer: () => void;
  onBrowseShop: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onStartCustomizer,
  onBrowseShop,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16 text-left">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#C5A059]/40 text-xs font-medium text-[#26150F] shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          <span className="uppercase tracking-widest text-[10px] text-[#C5A059]">Maison de Flore</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#26150F] tracking-tight">
          Where Every Bloom Holds Memories
        </h1>

        <p className="font-serif text-base sm:text-xl text-[#826251] font-light leading-relaxed max-w-2xl mx-auto">
          CLAFFY was born out of a poetic conviction: fresh blossoms surrender to time within days, yet the emotions they honor deserve to endure forever.
        </p>
      </div>

      {/* Main Story & Behind the Scenes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Editorial Studio Frame */}
        <div className="lg:col-span-5 relative">
          <div className="p-4 bg-white rounded-2xl border border-[#C5A059]/40 shadow-sm">
            <div className="aspect-4/3 rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#C5A059]/25">
              <img
                src="/assets/claffy_flower_box.png"
                alt="CLAFFY Atelier Studio"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3.5 text-center">
              <span className="font-serif text-base text-[#26150F] block font-normal">
                The CLAFFY Botanical Atelier
              </span>
              <span className="text-xs text-[#826251] italic font-light">
                Meticulously coiling velvet chenille yarn petal by petal.
              </span>
            </div>
          </div>
        </div>

        {/* Right: The Brand Philosophy */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C5A059]">
            Tactile Haute Couture
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#26150F] tracking-tight">
            The Art of Sculptural Chenille
          </h2>
          <p className="text-sm text-[#826251] font-light leading-relaxed">
            In our atelier, chenille wire transcends its humble craft origins to become an expressive sculptural medium. Its plush velvet texture conveys warmth, nuance, and structural permanence.
          </p>
          <p className="text-sm text-[#826251] font-light leading-relaxed">
            Unlike sterile plastic synthetics that lack warmth, velvet chenille captures ambient light with softness. It never decays, demands zero water, and retains rich, lightfast hues season after season on your console table, vanity, or study library.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-white rounded-xl border border-[#C5A059]/30 space-y-1.5 shadow-2xs">
              <span className="text-xl">🌸</span>
              <h4 className="font-serif font-medium text-sm text-[#26150F]">Timeless Vibrance</h4>
              <p className="text-[11px] text-[#826251] font-light">Permanent luster, zero shedding, zero pollen allergens.</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#C5A059]/30 space-y-1.5 shadow-2xs">
              <span className="text-xl">👐</span>
              <h4 className="font-serif font-medium text-sm text-[#26150F]">Artisanal Handcraft</h4>
              <p className="text-[11px] text-[#826251] font-light">Each petal individually formed by master floral artisans.</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#C5A059]/30 space-y-1.5 shadow-2xs">
              <span className="text-xl">💌</span>
              <h4 className="font-serif font-medium text-sm text-[#26150F]">Sentimental Relic</h4>
              <p className="text-[11px] text-[#826251] font-light">Preserves vows, milestones, and dedications indefinitely.</p>
            </div>
          </div>
        </div>
      </div>

      {/* The 4-Pillar Craftsmanship Standard */}
      <div className="p-8 sm:p-12 bg-white rounded-2xl border border-[#C5A059]/35 shadow-xs space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C5A059]">
            Our Standards
          </span>
          <h3 className="font-serif text-3xl font-light text-[#26150F] tracking-tight">
            How We Shape CLAFFY Blooms
          </h3>
          <p className="text-xs text-[#826251] font-light">
            Our disciplined four-step craft system ensures anatomical realism and permanent structural stability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Velvet Chenille Selection',
              desc: 'We source high-density 6mm to 9mm velvet chenille wire with rich fiber density and no exposed inner core.',
            },
            {
              step: '02',
              title: 'Petal Curvature Sculpting',
              desc: 'Using hand-tensioned micro-mandrels, each petal curvature is sculpted to reproduce natural botanical bloom contours.',
            },
            {
              step: '03',
              title: 'Structural Core Bonding',
              desc: 'Dual-gauge alloy stems are bonded with fine floral tape to provide lifelong rigidity that will never droop.',
            },
            {
              step: '04',
              title: 'Atelier Presentation',
              desc: 'Arranged in handcrafted vessels with velvet ribbons, preserved moss, and wax-sealed letterpress parchment.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-5 bg-[#FAF7F2] rounded-xl border border-[#C5A059]/30 space-y-2.5 relative"
            >
              <span className="text-[11px] font-serif font-medium text-[#26150F] bg-white px-2.5 py-0.5 rounded-full border border-[#C5A059]/40 shadow-2xs">
                {item.step}
              </span>
              <h4 className="font-serif font-medium text-sm text-[#26150F] pt-1">
                {item.title}
              </h4>
              <p className="text-xs text-[#826251] font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-10 bg-[#FAF7F2] rounded-2xl border border-[#C5A059] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#26150F] tracking-tight">
            Ready to immortalize your memories?
          </h3>
          <p className="text-xs text-[#826251] font-light">
            Acquire a signature ready-made piece or commission your bespoke bloom in our atelier.
          </p>
        </div>
        <div className="flex gap-4 shrink-0">
          <button
            onClick={onBrowseShop}
            className="craft-button-secondary px-6 py-3 text-xs"
          >
            Ready-Made Collection
          </button>
          <button
            onClick={onStartCustomizer}
            className="craft-button-gold px-6 py-3 text-xs flex items-center gap-2 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Atelier</span>
          </button>
        </div>
      </div>
    </div>
  );
};
