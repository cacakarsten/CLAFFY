import React, { useState, useMemo, useEffect } from 'react';
import { Product, ProductKind } from '../types';
import { Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { OCCASIONS_LIST } from '../data/customizerOptions';
import { formatPrice } from '../utils/format';

interface ShopViewProps {
  products: Product[];
  activeKind: ProductKind;
  setActiveKind: (kind: ProductKind) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onStartCustomizer: (initialType?: 'bouquet' | 'basket' | 'box') => void;
  initialOccasionFilter?: string | null;
  initialCategoryFilter?: string | null;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  activeKind,
  setActiveKind,
  onSelectProduct,
  onAddToCart,
  onStartCustomizer,
  initialOccasionFilter = null,
  initialCategoryFilter = null,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryFilter || 'all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>(initialOccasionFilter || 'all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');

  useEffect(() => {
    if (initialCategoryFilter) {
      setSelectedCategory(initialCategoryFilter);
    }
  }, [initialCategoryFilter]);

  // Categories depending on activeKind
  const readyMadeCategories = [
    { id: 'all', label: 'All Collections' },
    { id: 'bouquet', label: 'Bouquets' },
    { id: 'basket', label: 'Floral Baskets' },
    { id: 'box', label: 'Memory Boxes' },
    { id: 'accessories', label: 'Objets & Accessories' },
  ];

  const customCategories = [
    { id: 'all', label: 'All Bespoke' },
    { id: 'bouquet', label: 'Custom Bouquets' },
    { id: 'basket', label: 'Custom Baskets' },
    { id: 'box', label: 'Custom Gift Boxes' },
  ];

  const categories = activeKind === 'ready-made' ? readyMadeCategories : customCategories;

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesKind = p.kind === activeKind;
        const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesOccasion = selectedOccasion === 'all' || p.occasions.includes(selectedOccasion);
        return matchesKind && matchesCat && matchesOccasion;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, activeKind, selectedCategory, selectedOccasion, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header with Title & Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A059]">
          The CLAFFY Collection
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#26150F] tracking-tight">
          Curated Everlasting Blooms
        </h1>
        <p className="font-sans text-sm sm:text-base text-[#826251] max-w-xl mx-auto leading-relaxed">
          {activeKind === 'ready-made'
            ? 'Thoughtfully composed handmade arrangements ready for immediate gifting, packaged in signature luxury presentation boxes.'
            : 'Personalized bespoke floral creations composed to honor your memories, milestones, and personal narrative.'}
        </p>

        {/* Dual Tab Switcher: READY-MADE vs CUSTOM */}
        <div className="pt-6 inline-flex p-1 rounded-full bg-[#FAF7F2] border border-[#C5A059]/40 shadow-sm">
          <button
            id="tab-shop-readymade"
            onClick={() => {
              setActiveKind('ready-made');
              setSelectedCategory('all');
            }}
            className={`px-7 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
              activeKind === 'ready-made'
                ? 'bg-[#26150F] text-[#FAF7F2] shadow-sm'
                : 'text-[#826251] hover:text-[#26150F]'
            }`}
          >
            Ready-Made Collection
          </button>

          <button
            id="tab-shop-custom"
            onClick={() => {
              setActiveKind('custom');
              setSelectedCategory('all');
            }}
            className={`px-7 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
              activeKind === 'custom'
                ? 'bg-[#C5A059] text-[#1E120D] shadow-sm font-semibold'
                : 'text-[#826251] hover:text-[#26150F]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bespoke Customizer</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#26150F] text-[#EBD8B0] font-normal tracking-normal uppercase">
              Core Differentiator
            </span>
          </button>
        </div>
      </div>

      {/* Filter and Category Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white/80 border border-[#C5A059]/30 shadow-xs">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs tracking-wide transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-[#26150F] text-[#FAF7F2] font-medium'
                  : 'bg-transparent text-[#826251] hover:text-[#26150F] hover:bg-[#FAF7F2]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Occasion & Sort Dropdowns */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-end text-xs text-[#826251]">
          <div className="flex items-center gap-2">
            <span className="tracking-wider uppercase text-[10px]">Occasion:</span>
            <select
              value={selectedOccasion}
              onChange={(e) => setSelectedOccasion(e.target.value)}
              className="px-3 py-1.5 bg-[#FAF7F2] border border-[#C5A059]/30 rounded-lg text-[#26150F] focus:outline-none focus:border-[#C5A059] text-xs font-medium cursor-pointer"
            >
              <option value="all">All Occasions</option>
              {OCCASIONS_LIST.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="tracking-wider uppercase text-[10px]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 bg-[#FAF7F2] border border-[#C5A059]/30 rounded-lg text-[#26150F] focus:outline-none focus:border-[#C5A059] text-xs font-medium cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Custom Banner if in Custom Mode */}
      {activeKind === 'custom' && (
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#26150F] via-[#382017] to-[#26150F] text-[#FAF7F2] border border-[#C5A059]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-2 text-left relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#C5A059]/20 text-[#DFC282] border border-[#C5A059]/40 uppercase tracking-widest">
                Interactive Atelier
              </span>
              <span className="text-xs text-[#EBD8B0] font-light">Over 1,000+ Tailored Combinations</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#FAF7F2] tracking-tight">
              Design your custom heirloom bloom
            </h3>
            <p className="text-xs text-[#D1B8A3] max-w-xl font-light leading-relaxed">
              Step into the CLAFFY Atelier to select individual flowers, bespoke color harmonies, wrapping vessels, luxury charms, and embossed wax-seal keepsake messages.
            </p>
          </div>

          <button
            onClick={() => onStartCustomizer()}
            className="craft-button-gold px-8 py-3.5 text-xs whitespace-nowrap flex items-center gap-2.5 shrink-0 relative z-10"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Bespoke Atelier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white/40 rounded-2xl border border-dashed border-[#C5A059]/40 space-y-4">
          <p className="text-sm font-serif italic text-[#826251]">No blooms match your selected parameters.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedOccasion('all');
            }}
            className="craft-button-secondary px-6 py-2.5 text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="luxury-card flex flex-col justify-between overflow-hidden group bg-white"
            >
              {/* Product Image */}
              <div
                onClick={() => onSelectProduct(p)}
                className="relative aspect-[4/5] overflow-hidden bg-[#FAF7F2] cursor-pointer"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-[#26150F]/85 backdrop-blur-sm text-[#DFC282] text-[10px] font-medium tracking-wider uppercase border border-[#C5A059]/30">
                    {p.kind === 'custom' ? 'Customizable' : p.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#26150F] text-[10px] font-medium border border-[#C5A059]/30">
                    {p.availability}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5 text-left">
                  <h4
                    onClick={() => onSelectProduct(p)}
                    className="font-serif text-xl font-normal text-[#26150F] hover:text-[#C5A059] transition-colors cursor-pointer tracking-tight"
                  >
                    {p.name}
                  </h4>
                  <p className="text-xs text-[#826251] line-clamp-2 leading-relaxed font-light">
                    {p.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#C5A059]/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#826251] block font-light">
                      {p.kind === 'custom' ? 'From' : 'Price'}
                    </span>
                    <span className="font-serif text-lg font-medium text-[#26150F]">
                      {formatPrice(p.price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct(p)}
                      className="px-3 py-1.5 rounded-full border border-[#C5A059]/50 text-xs font-medium text-[#26150F] hover:bg-[#FAF7F2] transition-colors"
                    >
                      View
                    </button>

                    {p.kind === 'custom' ? (
                      <button
                        onClick={() => onStartCustomizer(p.category as any)}
                        className="craft-button-gold px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Customize</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onAddToCart(p)}
                        className="craft-button-primary px-3.5 py-1.5 text-xs font-medium"
                      >
                        Add to Bag
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
