import React, { useState } from 'react';
import { PageType } from '../types';
import { Heart, Send, Sparkles, MapPin, Mail, Instagram } from 'lucide-react';
import { FlowerDoodle, SparkleDoodle } from './Doodles';

interface FooterProps {
  setCurrentPage: (page: PageType) => void;
  onSubscribeNewsletter: (email: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, onSubscribeNewsletter }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubscribeNewsletter(email);
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#26150F] border-t border-[#C5A059]/40 pt-16 pb-12 text-[#FAF7F2] relative overflow-hidden">
      {/* Subtle luxury ambient gold glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#C5A059]/25">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-3xl font-light tracking-[0.24em] text-[#FAF7F2] uppercase">
                CLAFFY
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            </div>
            
            <p className="font-serif italic text-lg text-[#C5A059] font-normal">
              “Where Every Bloom Holds Memories”
            </p>
            
            <p className="text-xs text-[#E5D7CE]/80 max-w-sm leading-relaxed font-sans font-light">
              CLAFFY sculpts bespoke botanical art from velvety chenille pipe cleaners. Eternal, tactile, and thoughtfully assembled in our atelier to celebrate life’s quiet romances and landmark milestones.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#C5A059]/40 bg-[#382017] text-[11px] font-sans tracking-wider uppercase text-[#C5A059]">
                <Heart className="w-3 h-3 fill-[#C5A059]" />
                Handcrafted Atelier
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#C5A059]/40 bg-[#382017] text-[11px] font-sans tracking-wider uppercase text-[#FAF7F2]">
                <Sparkles className="w-3 h-3 text-[#C5A059]" />
                Eternal Keepsakes
              </span>
            </div>
          </div>

          {/* Col 2: Shop & Collections */}
          <div>
            <h4 className="font-serif text-xs font-semibold text-[#C5A059] mb-4 uppercase tracking-[0.2em]">
              The Atelier
            </h4>
            <ul className="space-y-2.5 text-xs font-sans tracking-wider">
              <li>
                <button onClick={() => setCurrentPage('ready-made')} className="text-[#E5D7CE]/80 hover:text-[#C5A059] transition">
                  Ready-Made Bouquets
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('shop')} className="text-[#E5D7CE]/80 hover:text-[#C5A059] transition">
                  Botanical Baskets
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('shop')} className="text-[#E5D7CE]/80 hover:text-[#C5A059] transition">
                  Memory Flower Boxes
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('accessories')} className="text-[#E5D7CE]/80 hover:text-[#C5A059] transition">
                  Gift Accessories & Pins
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('customizer')} className="text-[#C5A059] font-medium flex items-center gap-1 hover:text-[#DFC282] transition">
                  <span>Custom Studio</span>
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Story */}
          <div>
            <h4 className="font-serif text-xs font-semibold text-[#C5A059] mb-4 uppercase tracking-[0.2em]">
              Boutique Care
            </h4>
            <ul className="space-y-2.5 text-xs font-sans tracking-wider">
              <li>
                <button onClick={() => setCurrentPage('about')} className="text-[#E5D7CE]/80 hover:text-[#C5A059] transition">
                  Atelier Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('how-it-works')} className="text-[#E5D7CE]/80 hover:text-[#C5A059] transition">
                  Crafting Process
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('order-tracking')} className="text-[#E5D7CE]/80 hover:text-[#C5A059] transition">
                  Track Your Bloom
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('custom')} className="text-[#E5D7CE]/80 hover:text-[#C5A059] transition">
                  Bespoke Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-serif text-xs font-semibold text-[#C5A059] mb-3 uppercase tracking-[0.2em]">
              The Bloom Journal
            </h4>
            <p className="text-xs text-[#E5D7CE]/80 mb-3 leading-relaxed font-sans font-light">
              Receive private releases, flower symbolism stories, and seasonal boutique invitations.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#382017] border border-[#C5A059]/60 rounded-lg text-xs font-serif text-[#C5A059]">
                ✦ Welcome to the CLAFFY Circle. Your welcome gift is on its way.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#1E100A] rounded-lg border border-[#C5A059]/40 text-xs text-[#FAF7F2] placeholder:text-[#A68C7E] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#C5A059] hover:bg-[#DFC282] text-[#26150F] rounded-lg text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 transition duration-200"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}

            <div className="mt-4 pt-3 border-t border-[#C5A059]/20 flex items-center gap-4 text-xs text-[#E5D7CE]/70 font-sans">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Private Studio</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>concierge@claffy.studio</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E5D7CE]/60 gap-4">
          <p>© {new Date().getFullYear()} CLAFFY Atelier. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="font-serif italic text-sm text-[#C5A059]">
              “Made by You. Handcrafted by CLAFFY.”
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
