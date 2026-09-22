import React from 'react';

export const SparkleDoodle: React.FC<{ className?: string }> = ({ className = 'w-4 h-4 text-[#C5A059]' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L13.8 8.2L22 10L13.8 11.8L12 20L10.2 11.8L2 10L10.2 8.2L12 0Z" />
    <circle cx="12" cy="10" r="1.5" fill="#FAF7F2" />
  </svg>
);

export const FlowerDoodle: React.FC<{ className?: string; color?: string }> = ({ className = 'w-5 h-5', color = '#C5A059' }) => (
  <svg viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8 C16 4 20 4 20 8 C20 12 16 14 16 16 C16 14 12 12 12 8 C12 4 16 4 16 8 Z" fill="rgba(197, 160, 89, 0.12)" />
    <path d="M24 16 C28 16 28 20 24 20 C20 20 18 16 16 16 C18 16 20 12 24 12 C28 12 28 16 24 16 Z" fill="rgba(197, 160, 89, 0.12)" />
    <path d="M16 24 C16 28 12 28 12 24 C12 20 16 18 16 16 C16 18 20 20 20 24 C20 28 16 28 16 24 Z" fill="rgba(197, 160, 89, 0.12)" />
    <path d="M8 16 C4 16 4 12 8 12 C12 12 14 16 16 16 C14 16 12 20 8 20 C4 20 4 16 8 16 Z" fill="rgba(197, 160, 89, 0.12)" />
    <circle cx="16" cy="16" r="2.5" fill="#C5A059" stroke="none" />
  </svg>
);

export const HeartDoodle: React.FC<{ className?: string; color?: string }> = ({ className = 'w-4 h-4', color = '#5A0C0E' }) => (
  <svg viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M12 20.2l-1.2-1.09C5.5 14.4 2 11.23 2 7.35 2 4.4 4.35 2.1 7.3 2.1c1.66 0 3.25.77 4.7 2 1.45-1.23 3.04-2 4.7-2 2.95 0 5.3 2.3 5.3 5.25 0 3.88-3.5 7.05-8.8 11.76L12 20.2z" />
  </svg>
);

export const PipeCleanerSwirl: React.FC<{ className?: string; color?: string }> = ({ className = 'w-8 h-4', color = '#C5A059' }) => (
  <svg viewBox="0 0 60 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" className={className}>
    <path d="M 4 16 C 18 2, 28 18, 42 6 C 48 2, 54 8, 56 12" />
  </svg>
);

export const StampBadge: React.FC<{ text?: string; className?: string }> = ({ text = 'HEIRLOOM CRAFT', className = '' }) => (
  <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full border border-[#C5A059]/60 bg-[#FAF7F2] text-[10px] font-serif tracking-[0.2em] text-[#26150F] uppercase shadow-sm ${className}`}>
    <span className="text-[#C5A059] mr-1.5 text-[8px]">✦</span>
    <span>{text}</span>
    <span className="text-[#C5A059] ml-1.5 text-[8px]">✦</span>
  </div>
);
