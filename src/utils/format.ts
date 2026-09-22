/**
 * Currency and date formatting utilities for CLAFFY
 */

export const formatPrice = (amount: number): string => {
  return `Rp. ${Math.round(amount).toLocaleString('id-ID')}`;
};

export const formatShortPrice = (amount: number): string => {
  return `Rp. ${Math.round(amount).toLocaleString('id-ID')}`;
};
