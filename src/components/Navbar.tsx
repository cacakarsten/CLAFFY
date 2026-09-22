import React, { useState } from 'react';
import { PageType } from '../types';
import { Search, ShoppingBag, User, Menu, X, Sparkles, Heart } from 'lucide-react';

interface NavbarProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  cartCount: number;
  openCart: () => void;
  openSearch: () => void;
  openAccount: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  cartCount,
  openCart,
  openSearch,
  openAccount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: PageType; sub?: string }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
    { label: 'Ready-Made', page: 'ready-made' },
    { label: 'Customize', page: 'custom' },
    { label: 'Accessories', page: 'accessories' },
    { label: 'About', page: 'about' },
    { label: 'How It Works', page: 'how-it-works' },
    { label: 'Track Order', page: 'order-tracking' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#C5A059]/30">
      {/* Top micro announcement bar */}
      <div className="bg-[#26150F] text-[#FAF7F2] py-2 px-4 text-center text-[11px] font-sans tracking-[0.18em] uppercase flex items-center justify-center gap-2.5 border-b border-[#C5A059]/20">
        <Sparkles className="w-3 h-3 text-[#C5A059]" />
        <span>Atelier Handcrafted Blooms • Complimentary Delivery on Orders Over Rp. 250.000 • Bespoke Keepsakes</span>
        <Sparkles className="w-3 h-3 text-[#C5A059]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            id="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#26150F] hover:bg-[#C5A059]/10 border border-transparent hover:border-[#C5A059]/40 transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <button
            id="mobile-search-btn"
            onClick={openSearch}
            className="p-2 rounded-lg text-[#26150F] hover:bg-[#C5A059]/10 transition"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Brand Logo - Luxury High-Contrast Serif Wordmark */}
        <div className="flex items-center">
          <button
            id="brand-logo-btn"
            onClick={() => setCurrentPage('home')}
            className="group flex items-center gap-2 text-left focus:outline-none"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.24em] text-[#26150F] font-normal uppercase transition-colors group-hover:text-[#826251]">
              CLAFFY
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] inline-block -mt-1 group-hover:scale-125 transition-transform" />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                id={`nav-link-${item.page}`}
                onClick={() => setCurrentPage(item.page)}
                className={`text-xs uppercase tracking-[0.16em] font-medium transition py-1 relative ${
                  isActive
                    ? 'text-[#26150F] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#C5A059]'
                    : 'text-[#5A3E33] hover:text-[#C5A059]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons & Primary CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Search Icon */}
          <button
            id="nav-search-btn"
            onClick={openSearch}
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-[#C5A059]/40 text-[#26150F] hover:border-[#C5A059] hover:bg-[#C5A059]/10 transition"
            aria-label="Search blooms"
            title="Search"
          >
            <Search className="w-4 h-4 text-[#26150F]" />
          </button>

          {/* Account Icon */}
          <button
            id="nav-account-btn"
            onClick={openAccount}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-[#C5A059]/40 text-[#26150F] hover:border-[#C5A059] hover:bg-[#C5A059]/10 transition"
            aria-label="Account & Saved Blooms"
            title="Account"
          >
            <User className="w-4 h-4 text-[#26150F]" />
          </button>

          {/* Cart Icon with Counter */}
          <button
            id="nav-cart-btn"
            onClick={openCart}
            className="relative flex items-center justify-center w-9 h-9 rounded-full border border-[#C5A059]/50 bg-white text-[#26150F] hover:border-[#C5A059] hover:bg-[#FAF7F2] shadow-sm transition"
            aria-label={`Cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4 text-[#26150F]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#5A0C0E] text-[#FAF7F2] text-[10px] font-sans font-semibold w-4 h-4 rounded-full flex items-center justify-center border border-[#FAF7F2]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Main Navigation CTA: "Create Your Bloom" */}
          <button
            id="nav-create-bloom-cta"
            onClick={() => setCurrentPage('customizer')}
            className="hidden md:inline-flex items-center gap-2 craft-button-primary px-5 py-2.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Custom Studio</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-t border-[#C5A059]/30 px-4 pt-4 pb-6 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                id={`mobile-link-${item.page}`}
                onClick={() => {
                  setCurrentPage(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3.5 py-2.5 rounded-lg text-xs tracking-wider uppercase font-medium border transition ${
                  currentPage === item.page
                    ? 'bg-[#26150F] text-[#FAF7F2] border-[#C5A059]'
                    : 'bg-white/80 text-[#26150F] border-[#C5A059]/25 hover:border-[#C5A059]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              id="mobile-create-bloom-btn"
              onClick={() => {
                setCurrentPage('customizer');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 craft-button-primary py-3 rounded-xl"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Enter Custom Studio</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
