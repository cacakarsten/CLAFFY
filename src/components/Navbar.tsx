import React, { useState, useRef, useEffect } from 'react';
import { PageType } from '../types';
import { Search, ShoppingBag, User, Menu, X, Sparkles, ChevronDown, Sparkle, ArrowRight, Flower2, Palette, Gem, Box } from 'lucide-react';

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
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [mobileShopExpanded, setMobileShopExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShopDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setShopDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setShopDropdownOpen(false);
    }, 200);
  };

  // Main desktop nav items (Ready-Made, Customize, Accessories are housed under the Shop curation)
  const navItems: { label: string; page: PageType }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'How It Works', page: 'how-it-works' },
    { label: 'Track Order', page: 'order-tracking' },
  ];

  const shopSubCategories = [
    {
      id: 'shop-all',
      title: 'All Collections',
      description: 'Explore the complete repertoire of handcrafted floral art & keepsakes.',
      page: 'shop' as PageType,
      icon: Flower2,
      badge: 'Full Catalog',
    },
    {
      id: 'shop-ready-made',
      title: 'Ready-Made Blooms',
      description: 'Finished artisanal bouquets, woven baskets & gift boxes ready to deliver.',
      page: 'ready-made' as PageType,
      icon: Box,
      badge: 'Ready to Ship',
    },
    {
      id: 'shop-customize',
      title: 'Customize & Bespoke',
      description: 'Hand-tailor flowers, colors, personalized messages & keepsake arrangements.',
      page: 'custom' as PageType,
      icon: Palette,
      badge: 'Made to Order',
    },
    {
      id: 'shop-accessories',
      title: 'Objets & Accessories',
      description: 'Handmade bag charms, flower keychains, pins & delicate floral accents.',
      page: 'accessories' as PageType,
      icon: Gem,
      badge: 'Keepsakes',
    },
  ];

  const isShopActive = ['shop', 'ready-made', 'custom', 'accessories', 'product-detail'].includes(currentPage);

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
            onClick={() => {
              setCurrentPage('home');
              setShopDropdownOpen(false);
            }}
            className="group flex items-center gap-2 text-left focus:outline-none"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.24em] text-[#26150F] font-normal uppercase transition-colors group-hover:text-[#826251]">
              CLAFFY
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] inline-block -mt-1 group-hover:scale-125 transition-transform" />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
          {/* Home Link */}
          <button
            id="nav-link-home"
            onClick={() => {
              setCurrentPage('home');
              setShopDropdownOpen(false);
            }}
            className={`text-xs uppercase tracking-[0.16em] font-medium transition py-1 relative ${
              currentPage === 'home'
                ? 'text-[#26150F] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#C5A059]'
                : 'text-[#5A3E33] hover:text-[#C5A059]'
            }`}
          >
            Home
          </button>

          {/* Shop with Integrated Dropdown (Housing Ready-Made, Customize, and Accessories) */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              id="nav-link-shop"
              onClick={() => {
                setCurrentPage('shop');
                setShopDropdownOpen(false);
              }}
              className={`flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] font-medium transition py-1 relative ${
                isShopActive
                  ? 'text-[#26150F] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#C5A059]'
                  : 'text-[#5A3E33] hover:text-[#C5A059]'
              }`}
            >
              <span>Shop</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#C5A059] transition-transform duration-200 ${
                  shopDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Atelier Luxury Dropdown Panel */}
            {shopDropdownOpen && (
              <div className="absolute top-full -left-20 pt-3 z-50 w-[440px] animate-fadeIn">
                <div className="bg-[#FAF7F2] border border-[#C5A059]/40 rounded-xl shadow-[0_16px_40px_rgba(38,21,15,0.12)] p-4 backdrop-blur-md">
                  <div className="text-[10px] font-sans uppercase tracking-[0.22em] text-[#826251] px-2 pb-2.5 mb-1 border-b border-[#C5A059]/20 flex items-center justify-between">
                    <span>Atelier Collections</span>
                    <span className="text-[#C5A059]">Bespoke Craft</span>
                  </div>

                  <div className="space-y-1">
                    {shopSubCategories.map((sub) => {
                      const IconComponent = sub.icon;
                      return (
                        <button
                          key={sub.id}
                          id={sub.id}
                          onClick={() => {
                            setCurrentPage(sub.page);
                            setShopDropdownOpen(false);
                          }}
                          className="w-full text-left p-2.5 rounded-lg transition group flex items-start gap-3 hover:bg-white border border-transparent hover:border-[#C5A059]/30"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#26150F]/5 text-[#26150F] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#26150F] group-hover:text-[#FAF7F2] transition-colors">
                            <IconComponent className="w-4 h-4 text-[#C5A059]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-serif text-sm text-[#26150F] font-medium group-hover:text-[#826251] transition-colors">
                                {sub.title}
                              </span>
                              <span className="text-[9px] font-sans uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#C5A059]/15 text-[#5A3E33] border border-[#C5A059]/20">
                                {sub.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#826251] mt-0.5 leading-snug line-clamp-1">
                              {sub.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Atelier Custom Studio Shortcut Banner */}
                  <div className="mt-3 pt-3 border-t border-[#C5A059]/20">
                    <button
                      onClick={() => {
                        setCurrentPage('customizer');
                        setShopDropdownOpen(false);
                      }}
                      className="w-full bg-[#26150F] hover:bg-[#3D251C] text-[#FAF7F2] p-2.5 rounded-lg flex items-center justify-between transition group border border-[#C5A059]/30"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkle className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span className="text-xs uppercase font-medium tracking-[0.14em]">
                          Open 3D Customizer Studio
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Remaining Core Links */}
          {navItems.slice(1).map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                id={`nav-link-${item.page}`}
                onClick={() => {
                  setCurrentPage(item.page);
                  setShopDropdownOpen(false);
                }}
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

          {/* Main Navigation CTA: "Custom Studio" */}
          <button
            id="nav-create-bloom-cta"
            onClick={() => {
              setCurrentPage('customizer');
              setShopDropdownOpen(false);
            }}
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
          <div className="space-y-1.5">
            {/* Mobile Home */}
            <button
              id="mobile-link-home"
              onClick={() => {
                setCurrentPage('home');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs tracking-wider uppercase font-medium border transition ${
                currentPage === 'home'
                  ? 'bg-[#26150F] text-[#FAF7F2] border-[#C5A059]'
                  : 'bg-white/80 text-[#26150F] border-[#C5A059]/25 hover:border-[#C5A059]'
              }`}
            >
              Home
            </button>

            {/* Mobile Shop Section with subcategory toggle */}
            <div className="border border-[#C5A059]/30 rounded-lg bg-white/60 overflow-hidden">
              <div className="flex items-center justify-between p-1">
                <button
                  id="mobile-link-shop"
                  onClick={() => {
                    setCurrentPage('shop');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex-1 text-left px-3 py-2 text-xs tracking-wider uppercase font-medium ${
                    isShopActive ? 'text-[#26150F] font-bold' : 'text-[#5A3E33]'
                  }`}
                >
                  Shop
                </button>
                <button
                  onClick={() => setMobileShopExpanded(!mobileShopExpanded)}
                  className="p-2 text-[#826251] hover:text-[#26150F]"
                  aria-label="Toggle subcategories"
                >
                  <ChevronDown className={`w-4 h-4 text-[#C5A059] transition-transform ${mobileShopExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {mobileShopExpanded && (
                <div className="border-t border-[#C5A059]/20 bg-[#FAF7F2]/80 p-2 space-y-1">
                  {shopSubCategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setCurrentPage(sub.page);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-xs flex items-center justify-between transition ${
                        currentPage === sub.page
                          ? 'bg-[#26150F] text-[#FAF7F2]'
                          : 'text-[#26150F] hover:bg-[#C5A059]/10'
                      }`}
                    >
                      <span>{sub.title}</span>
                      <span className="text-[10px] text-[#C5A059] uppercase tracking-wider">{sub.badge}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Core Navigation Links */}
            {navItems.slice(1).map((item) => (
              <button
                key={item.page}
                id={`mobile-link-${item.page}`}
                onClick={() => {
                  setCurrentPage(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs tracking-wider uppercase font-medium border transition ${
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
