import React, { useState, useMemo } from 'react';
import { Product, PageType } from '../types';
import { Search, X, Sparkles, ArrowRight, Tag } from 'lucide-react';
import { formatPrice } from '../utils/format';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onStartCustomizer: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onStartCustomizer,
}) => {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string>('all');

  const popularKeywords = ['Sunflower', 'Tulip', 'Daisy', 'Rose', 'Basket', 'Box', 'Birthday', 'Graduation', 'Charm'];

  const filteredProducts = useMemo(() => {
    if (!query.trim() && activeTag === 'all') return products.slice(0, 6);

    return products.filter((p) => {
      const matchQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
        p.flowersIncluded.some((f) => f.toLowerCase().includes(query.toLowerCase())) ||
        p.occasions.some((o) => o.toLowerCase().includes(query.toLowerCase()));

      const matchTag =
        activeTag === 'all' ||
        p.category === activeTag ||
        p.occasions.includes(activeTag) ||
        p.flowersIncluded.some((f) => f.toLowerCase().includes(activeTag.toLowerCase()));

      return matchQuery && matchTag;
    });
  }, [products, query, activeTag]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#7B4D31]/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#FAF4AA] w-full max-w-2xl rounded-2xl border-2 border-[#7B4D31] shadow-[6px_8px_0px_#7B4D31] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search header */}
        <div className="p-4 bg-[#FEE873] border-b-2 border-[#7B4D31] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#6E0300]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ready-made blooms, flower types (tulip, daisy), occasions..."
            autoFocus
            className="flex-1 bg-transparent text-base sm:text-lg font-medium text-[#7B4D31] placeholder:text-[#AC7753] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:bg-[#FAF4AA] rounded-md text-[#7B4D31]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[#7B4D31] bg-white text-[#7B4D31] hover:bg-[#FAF4AA]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tag filters */}
        <div className="p-3 bg-[#FAF4AA] border-b border-[#AC7753]/30 flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-[#AC7753] font-bold uppercase text-[10px] pl-1 mr-1">Popular:</span>
          {popularKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => {
                setQuery(kw);
              }}
              className="px-2.5 py-1 rounded-full bg-white border border-[#7B4D31]/40 text-[#7B4D31] hover:bg-[#FEE873] hover:border-[#7B4D31] whitespace-nowrap transition"
            >
              {kw}
            </button>
          ))}
        </div>

        {/* Custom studio promotion card inside search */}
        <div className="p-3 bg-[#F7B915]/30 border-b border-[#7B4D31]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#6E0300] fill-[#6E0300]" />
            <span className="text-xs font-bold text-[#6E0300]">Looking for something unique? Create your own custom bloom</span>
          </div>
          <button
            onClick={() => {
              onClose();
              onStartCustomizer();
            }}
            className="text-xs font-bold text-[#6E0300] underline hover:text-[#7B4D31] flex items-center gap-1"
          >
            <span>Start Customizer</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Search Results */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <p className="text-sm text-[#7B4D31]">No exact ready-made match found for "{query}".</p>
              <button
                onClick={() => {
                  onClose();
                  onStartCustomizer();
                }}
                className="craft-button-primary px-4 py-2 text-xs"
              >
                Create this bloom with Customizer ✦
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-white border border-[#7B4D31] hover:border-[#6E0300] hover:shadow-[2px_3px_0px_#7B4D31] cursor-pointer flex items-center gap-3 transition"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-lg border border-[#7B4D31]"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#AC7753] uppercase block">
                      {p.kind === 'custom' ? 'Custom Design' : p.category}
                    </span>
                    <h5 className="font-serif text-sm font-bold text-[#7B4D31] truncate">
                      {p.name}
                    </h5>
                    <p className="text-xs font-bold text-[#6E0300]">{formatPrice(p.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
