import React from 'react';
import { PageType, Product } from '../types';
import { ArrowRight, Sparkles, Heart, Clock, Award, ShieldCheck, ChevronRight, Gift } from 'lucide-react';
import { heroBouquetImg, basketImg, boxImg } from '../data/products';
import { OCCASIONS_LIST } from '../data/customizerOptions';
import { FlowerDoodle, SparkleDoodle, StampBadge } from '../components/Doodles';
import { formatPrice } from '../utils/format';

interface HomeViewProps {
  setCurrentPage: (page: PageType) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onStartCustomizer: () => void;
  onFilterOccasion: (occasion: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentPage,
  products,
  onSelectProduct,
  onAddToCart,
  onStartCustomizer,
  onFilterOccasion,
}) => {
  // Grab ready-made products to showcase in Section 3
  const readyMadeSample = products.filter(p => p.kind === 'ready-made' && p.featured).slice(0, 4);

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* ==================================================
          SECTION 1 — HERO SECTION (LUXURY EDITORIAL)
          ================================================== */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 overflow-hidden">
        {/* Subtle champagne light glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 left-10 w-72 h-72 bg-[#DE9E36]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C5A059]/60 bg-[#FAF7F2] text-[11px] font-serif tracking-[0.2em] uppercase text-[#26150F] shadow-xs">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span>High-Craft Pipe Cleaner Floristry</span>
              <span className="text-[#C5A059]">✦</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#26150F] leading-[1.06] tracking-tight">
              Where Every Bloom <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#5A0C0E] relative inline-block">
                Holds Memories
                <span className="absolute bottom-1 left-0 right-0 h-[1.5px] bg-[#C5A059]/70" />
              </span>
            </h1>

            <div className="space-y-3 max-w-xl">
              <h2 className="font-serif text-xl sm:text-2xl text-[#826251] font-light italic">
                Sculpted by hand in soft velvet chenille wire.
              </h2>
              <p className="text-sm sm:text-base text-[#4A2E23] leading-relaxed font-sans font-normal">
                From bespoke floral architecture to ready-to-cherish signature arrangements, CLAFFY creates eternal blooms designed to hold life’s quietest sentiments and greatest milestones.
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="hero-create-bloom-cta"
                onClick={onStartCustomizer}
                className="craft-button-primary px-8 py-3.5 text-xs font-semibold tracking-[0.16em] uppercase flex items-center justify-center gap-2.5 shadow-sm transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Custom Atelier Studio</span>
              </button>

              <button
                id="hero-shop-readymade-cta"
                onClick={() => setCurrentPage('ready-made')}
                className="craft-button-gold px-8 py-3.5 text-xs font-semibold tracking-[0.16em] uppercase flex items-center justify-center gap-2 transition"
              >
                <span>Shop Ready-Made</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Trust hallmarks */}
            <div className="pt-6 border-t border-[#C5A059]/25 flex flex-wrap items-center gap-6 text-xs text-[#5A3E33] font-sans tracking-wider">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                <span>Velvet Chenille Wire</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                <span>Enduring Keepsake</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                <span>Wax-Sealed Message</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image Column — Luxury Editorial Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md sm:max-w-lg aspect-[4/4.2] bg-white p-3 sm:p-4 rounded-xl border border-[#C5A059]/40 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
              {/* Main Photo with Editorial Crop */}
              <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#FAF7F2]">
                <img
                  src={heroBouquetImg}
                  alt="CLAFFY handmade bespoke pipe-cleaner flower arrangement"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                
                {/* Floating Atelier Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#26150F]/90 border border-[#C5A059]/40 px-4 py-2.5 rounded-lg shadow-lg backdrop-blur-md flex items-center justify-between text-[#FAF7F2]">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] block font-sans">
                      Signature Bouquet
                    </span>
                    <span className="font-serif text-sm font-normal tracking-wide">
                      Sunny Nostalgia Arrangement
                    </span>
                  </div>
                  <span className="text-xs font-serif text-[#C5A059]">Rp. 285.000</span>
                </div>
              </div>

              {/* Atelier Stamp Accent */}
              <div className="absolute -top-3 -right-3 bg-[#26150F] text-[#FAF7F2] border border-[#C5A059] rounded-full p-2.5 shadow-lg flex flex-col items-center justify-center w-16 h-16">
                <span className="text-[8px] font-sans tracking-widest text-[#C5A059] uppercase">Atelier</span>
                <span className="text-[9px] font-serif italic text-white leading-none">Crafted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 2 — THE ATELIER PHILOSOPHY (WHY CLAFFY)
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-serif tracking-[0.2em] uppercase text-[#C5A059]">
            <span>✦</span>
            <span>The Pipe-Cleaner Artistry</span>
            <span>✦</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#26150F] tracking-tight">
            More Than Flowers.
          </h2>
          <p className="font-serif text-xl sm:text-2xl text-[#826251] font-light italic">
            “A tactile memory that never fades.”
          </p>
        </div>

        {/* 4 Benefits Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* I Hand-Sculpted */}
          <div className="luxury-card p-7 flex flex-col justify-between group hover:border-[#C5A059] transition-colors duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl text-[#C5A059] font-light">I</span>
                <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#C5A059]/40 flex items-center justify-center text-[#26150F]">
                  <Heart className="w-4 h-4 text-[#5A0C0E] fill-[#5A0C0E]" />
                </div>
              </div>
              <h3 className="font-serif text-xl font-normal text-[#26150F]">
                Hand-Sculpted Artistry
              </h3>
              <p className="text-xs text-[#5A3E33] leading-relaxed font-sans font-light">
                Every petal, stamen, and stem is individually coaxed and twisted from plush velvet chenille craft wire by dedicated craftspeople.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#C5A059]/20 text-[10px] tracking-widest uppercase font-serif text-[#C5A059]">
              ✦ Patient Atelier Craft
            </div>
          </div>

          {/* II Bespoke Customization */}
          <div className="luxury-card p-7 flex flex-col justify-between bg-white border border-[#C5A059]/80 shadow-md group hover:border-[#C5A059] transition-colors duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl text-[#C5A059] font-light">II</span>
                <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#C5A059] flex items-center justify-center text-[#26150F]">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                </div>
              </div>
              <h3 className="font-serif text-xl font-normal text-[#26150F]">
                Bespoke Personalization
              </h3>
              <p className="text-xs text-[#5A3E33] leading-relaxed font-sans font-light">
                Curate every hue, bloom type, vessel arrangement, and accompany your gift with a wax-sealed personal letter.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#C5A059]/20 text-[10px] tracking-widest uppercase font-serif text-[#C5A059]">
              ✦ Infinite Nuance
            </div>
          </div>

          {/* III Eternal Keepsake */}
          <div className="luxury-card p-7 flex flex-col justify-between group hover:border-[#C5A059] transition-colors duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl text-[#C5A059] font-light">III</span>
                <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#C5A059]/40 flex items-center justify-center text-[#26150F]">
                  <Clock className="w-4 h-4 text-[#26150F]" />
                </div>
              </div>
              <h3 className="font-serif text-xl font-normal text-[#26150F]">
                Everlasting Permanence
              </h3>
              <p className="text-xs text-[#5A3E33] leading-relaxed font-sans font-light">
                Unlike fresh flora that withers within days, CLAFFY pipe cleaner blooms remain vivid, tactile, and permanently timeless.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#C5A059]/20 text-[10px] tracking-widest uppercase font-serif text-[#C5A059]">
              ✦ Never Withering
            </div>
          </div>

          {/* IV Landmark Celebrations */}
          <div className="luxury-card p-7 flex flex-col justify-between group hover:border-[#C5A059] transition-colors duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl text-[#C5A059] font-light">IV</span>
                <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#C5A059]/40 flex items-center justify-center text-[#26150F]">
                  <Award className="w-4 h-4 text-[#26150F]" />
                </div>
              </div>
              <h3 className="font-serif text-xl font-normal text-[#26150F]">
                Gifts for Every Era
              </h3>
              <p className="text-xs text-[#5A3E33] leading-relaxed font-sans font-light">
                From graduations and anniversaries to quiet spontaneous affections, each stem becomes an emotional heirloom.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#C5A059]/20 text-[10px] tracking-widest uppercase font-serif text-[#C5A059]">
              ✦ Keepsake Quality
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 3 — READY-MADE CURATION
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-[#C5A059]/25 pb-6">
          <div className="space-y-2">
            <span className="text-[11px] font-serif uppercase tracking-[0.2em] text-[#C5A059] block">
              Curated Editions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#26150F]">
              Ready-Made Arrangements
            </h2>
            <p className="font-serif text-base text-[#826251] font-light italic">
              Completed and prepared in our atelier, ready to become part of your next moment.
            </p>
          </div>

          <button
            id="readymade-see-all-cta"
            onClick={() => setCurrentPage('ready-made')}
            className="craft-button-gold self-start md:self-auto px-6 py-2.5 text-xs tracking-widest uppercase flex items-center gap-2"
          >
            <span>View All Curations</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {readyMadeSample.map((product) => (
            <div
              key={product.id}
              className="luxury-card overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:border-[#C5A059]"
            >
              {/* Product Image */}
              <div
                onClick={() => onSelectProduct(product)}
                className="relative aspect-square overflow-hidden bg-[#FAF7F2] cursor-pointer border-b border-[#C5A059]/20"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Category & Availability tag */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#26150F]/85 text-[#FAF7F2] text-[9.5px] font-sans tracking-widest uppercase border border-[#C5A059]/40 backdrop-blur-xs">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h4
                    onClick={() => onSelectProduct(product)}
                    className="font-serif text-lg font-normal text-[#26150F] hover:text-[#C5A059] cursor-pointer line-clamp-1 transition-colors"
                  >
                    {product.name}
                  </h4>
                  <p className="text-xs text-[#5A3E33]/90 line-clamp-2 leading-relaxed font-sans font-light">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#C5A059]/20 flex items-center justify-between">
                  <span className="font-serif text-base text-[#26150F]">
                    {formatPrice(product.price)}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="px-3 py-1.5 rounded-md border border-[#C5A059]/50 text-xs font-sans tracking-wider uppercase text-[#26150F] hover:border-[#C5A059] hover:bg-[#C5A059]/10 transition"
                    >
                      Inspect
                    </button>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="craft-button-primary px-3.5 py-1.5 text-xs font-sans tracking-wider uppercase transition"
                    >
                      Acquire
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          SECTION 4 — CUSTOM ATELIER (MAIN DIFFERENTIATOR)
          ================================================== */}
      <section className="relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-[#26150F] text-[#FAF7F2] rounded-2xl border border-[#C5A059]/50 p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          {/* Ambient Champagne Lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C5A059]/40 bg-[#382017] text-[11px] font-serif tracking-[0.2em] uppercase text-[#C5A059]">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>The CLAFFY Custom Atelier</span>
                <span className="text-[#C5A059]">✦</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#FAF7F2] tracking-tight">
                Make It Truly Yours.
              </h2>
              <p className="font-serif text-xl text-[#C5A059] font-light italic">
                “Design a bloom arrangement as singular as your story.”
              </p>
              <p className="text-xs sm:text-sm text-[#E5D7CE]/80 max-w-xl mx-auto font-sans font-light leading-relaxed">
                Step into our interactive digital workshop where you hand-select flower species, velvet wire palettes, wrapping styles, and personalized keepsake cards.
              </p>
            </div>

            {/* Customization 6 Steps Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12">
              {[
                { step: '01', title: 'Choose Vessel', desc: 'Bouquet, Basket, or Box' },
                { step: '02', title: 'Pick Blooms', desc: 'Sunflowers, Tulips, Daisies' },
                { step: '03', title: 'Curate Tones', desc: 'Champagne, Gold, Chocolate' },
                { step: '04', title: 'Add Accents', desc: 'Gilded ribbons, fairy lights' },
                { step: '05', title: 'Wax Seal Note', desc: 'Your handwritten note' },
                { step: '06', title: 'Atelier Twist', desc: 'Handcrafted by CLAFFY' },
              ].map((s) => (
                <div
                  key={s.step}
                  className="bg-[#1E100A] p-4 rounded-xl border border-[#C5A059]/30 flex flex-col justify-between text-left space-y-3 transition-colors hover:border-[#C5A059]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif text-[11px] tracking-widest text-[#C5A059]">
                        STEP {s.step}
                      </span>
                      <span className="text-[#C5A059] text-xs">✦</span>
                    </div>
                    <h4 className="font-serif text-sm font-normal text-[#FAF7F2]">
                      {s.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-[#E5D7CE]/70 leading-tight font-sans font-light">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Highlight Interactive Atelier Card */}
            <div className="bg-[#1E100A]/80 rounded-xl border border-[#C5A059]/40 p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="space-y-4 max-w-lg text-left">
                <div className="flex items-center gap-2">
                  <StampBadge text="BESPOKE STUDIO" className="border-[#C5A059] text-[#C5A059] bg-[#26150F]" />
                  <span className="text-[11px] font-sans text-[#E5D7CE]/70">• Real-Time Studio Arrangement</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#FAF7F2]">
                  Compose your eternal pipe-cleaner sculpture.
                </h3>
                <p className="text-xs sm:text-sm text-[#E5D7CE]/80 leading-relaxed font-sans font-light">
                  Watch your bespoke piece take shape on screen with immediate pricing calculations, custom velvet tone previews, and personalized card inscriptions.
                </p>
                <div className="pt-2">
                  <button
                    id="custom-experience-start-cta"
                    onClick={onStartCustomizer}
                    className="craft-button-gold px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] flex items-center gap-2 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Enter Custom Studio</span>
                  </button>
                </div>
              </div>

              {/* Preview Image in editorial frame */}
              <div className="relative w-full max-w-sm aspect-[4/3] rounded-lg overflow-hidden border border-[#C5A059]/40 shadow-xl">
                <img
                  src={basketImg}
                  alt="Custom Pipe Cleaner arrangement"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#26150F]/90 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <p className="text-[10px] font-serif tracking-widest uppercase text-[#C5A059]">Bespoke Commission</p>
                    <p className="font-serif text-sm text-[#FAF7F2]">“Golden Hour Anniversary Basket”</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 5 — TWO PATHS TO MEMORY
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-[11px] font-serif uppercase tracking-[0.2em] text-[#C5A059] block">
            Transparent Craftsmanship
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#26150F]">
            Two Paths to Memory
          </h2>
          <p className="font-serif text-base text-[#826251] font-light italic">
            Whether you desire a finished studio creation or wish to sculpt every nuance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Path 1: READY-MADE */}
          <div className="luxury-card p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#C5A059]/25">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] block font-sans">
                    Immediate Curation
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#26150F]">
                    Ready-Made Edition
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full border border-[#C5A059]/40 bg-[#FAF7F2] text-[#26150F] text-[10px] font-sans tracking-widest uppercase">
                  Dispatches in 24–48h
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { step: '1', title: 'Discover', desc: 'Browse finished designs' },
                  { step: '2', title: 'Select', desc: 'Vessel & bouquet size' },
                  { step: '3', title: 'Secure', desc: 'Seamless acquisition' },
                  { step: '4', title: 'Gifted', desc: 'Delivered in luxury box' },
                ].map((st) => (
                  <div key={st.step} className="space-y-1">
                    <div className="w-8 h-8 mx-auto rounded-full border border-[#C5A059]/50 flex items-center justify-center font-serif text-xs text-[#26150F] bg-[#FAF7F2]">
                      {st.step}
                    </div>
                    <h5 className="font-serif text-xs text-[#26150F] font-normal">{st.title}</h5>
                    <p className="text-[10px] text-[#5A3E33]/80 leading-tight font-sans font-light">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setCurrentPage('ready-made')}
              className="craft-button-gold w-full py-3 text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition"
            >
              <span>Explore Ready-Made Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Path 2: CUSTOM */}
          <div className="luxury-card p-8 space-y-6 bg-white border border-[#C5A059] shadow-md flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#C5A059]/25">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] block font-sans">
                    Bespoke Commission
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#26150F]">
                    Custom Bloom Journey
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full border border-[#C5A059] bg-[#26150F] text-[#FAF7F2] text-[10px] font-sans tracking-widest uppercase">
                  Made to Order
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { step: '1', title: 'Format', desc: 'Bouquet, basket, box' },
                  { step: '2', title: 'Palette', desc: 'Hues & bloom types' },
                  { step: '3', title: 'Atelier', desc: 'Hand-sculpted stems' },
                  { step: '4', title: 'Keepsake', desc: 'Wax-sealed delivery' },
                ].map((st) => (
                  <div key={st.step} className="space-y-1">
                    <div className="w-8 h-8 mx-auto rounded-full bg-[#26150F] text-[#FAF7F2] border border-[#C5A059] flex items-center justify-center font-serif text-xs">
                      {st.step}
                    </div>
                    <h5 className="font-serif text-xs text-[#26150F] font-normal">{st.title}</h5>
                    <p className="text-[10px] text-[#5A3E33]/80 leading-tight font-sans font-light">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onStartCustomizer}
              className="craft-button-primary w-full py-3 text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Launch Custom Studio</span>
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 6 — BRAND STORY & PHILOSOPHY
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="luxury-card p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#C5A059]/40 bg-[#FAF7F2] text-[10px] uppercase tracking-widest font-serif text-[#5A0C0E]">
              <Heart className="w-3 h-3 fill-[#5A0C0E]" />
              <span>The CLAFFY Heritage</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#26150F] tracking-tight">
              Every Bloom Tells a Story.
            </h2>

            <p className="text-sm sm:text-base text-[#4A2E23] leading-relaxed font-sans font-light">
              CLAFFY creates handmade flowers designed to hold onto the moments that matter. From birthdays and graduations to friendships and little everyday celebrations, every bloom is made to become something worth remembering.
            </p>

            <p className="text-xs sm:text-sm text-[#5A3E33]/80 leading-relaxed font-sans font-light">
              We started with a simple belief: why should flowers that represent our most treasured relationships wither in a week? Pipe cleaners capture warmth, texture, and playfulness—allowing your sentiments to stay physically alive on a desk, bookshelf, or bedside forever.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setCurrentPage('about')}
                className="craft-button-gold px-7 py-3 text-xs tracking-widest uppercase flex items-center gap-2"
              >
                <span>Read Our Atelier Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="p-3 bg-white rounded-xl border border-[#C5A059]/40 shadow-xl">
              <img
                src={boxImg}
                alt="Handmade CLAFFY flower keepsake"
                referrerPolicy="no-referrer"
                className="rounded-lg w-full object-cover aspect-[4/3]"
              />
              <p className="text-center font-serif italic text-xs text-[#826251] mt-3">
                “Handcrafted memory boxes in our private atelier.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 7 — OCCASIONS
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[11px] font-serif uppercase tracking-[0.2em] text-[#C5A059] block">
            Curated Intentions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#26150F]">
            For Every Landmark Moment
          </h2>
          <p className="font-serif text-base text-[#826251] font-light italic">
            Find the arrangement formulated for your specific celebration.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {OCCASIONS_LIST.map((occ) => (
            <button
              key={occ.id}
              onClick={() => onFilterOccasion(occ.id)}
              className="p-5 rounded-xl bg-white border border-[#C5A059]/30 hover:border-[#C5A059] shadow-sm hover:shadow-md text-left transition group duration-200"
            >
              <div className="w-7 h-7 rounded-full bg-[#FAF7F2] border border-[#C5A059]/40 group-hover:border-[#C5A059] flex items-center justify-center text-[10px] text-[#C5A059] mb-3 transition">
                ✦
              </div>
              <h4 className="font-serif text-sm font-normal text-[#26150F] group-hover:text-[#5A0C0E] transition-colors">
                {occ.label}
              </h4>
              <p className="text-[11px] text-[#5A3E33]/70 mt-1 line-clamp-2 font-sans font-light">
                {occ.desc}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* ==================================================
          SECTION 8 — FINAL INVITATION
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#26150F] text-[#FAF7F2] rounded-2xl border border-[#C5A059]/50 p-10 sm:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C5A059]/40 bg-[#382017] text-[11px] font-serif tracking-[0.2em] uppercase text-[#C5A059]">
            <Heart className="w-3 h-3 text-[#C5A059] fill-[#C5A059]" />
            <span>Forever in Bloom</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#FAF7F2] max-w-2xl mx-auto leading-tight tracking-tight">
            Ready to Commission a Memory?
          </h2>

          <p className="font-serif text-lg sm:text-xl text-[#C5A059] max-w-xl mx-auto font-light italic">
            Craft something meaningful, one velvet stem at a time.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartCustomizer}
              className="craft-button-gold px-8 py-3.5 text-xs tracking-widest uppercase flex items-center gap-2 w-full sm:w-auto justify-center transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enter Custom Studio</span>
            </button>

            <button
              onClick={() => setCurrentPage('ready-made')}
              className="craft-button-primary px-8 py-3.5 text-xs tracking-widest uppercase flex items-center gap-2 w-full sm:w-auto justify-center transition"
            >
              <span>Explore Ready-Made</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

