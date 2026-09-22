export interface FlowerOption {
  id: string;
  name: string;
  meaning: string;
  basePrice: number;
  icon: string;
  defaultColorHex: string;
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  description: string;
}

export interface ArrangementOption {
  id: string;
  name: string;
  description: string;
  priceModifier: number;
  stemsRecommended: string;
}

export interface VesselOption {
  id: string;
  name: string;
  description: string;
  priceModifier: number;
  productTypes: ('bouquet' | 'basket' | 'box')[];
}

export interface AccessoryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export const FLOWER_OPTIONS: FlowerOption[] = [
  { id: 'fl-sunflower', name: 'Golden Sunflower', meaning: 'Adoration & Loyalty', basePrice: 25000, icon: '🌻', defaultColorHex: '#DE9E36' },
  { id: 'fl-tulip', name: 'Velvet Tulip', meaning: 'Perfect & Deep Love', basePrice: 22000, icon: '🌷', defaultColorHex: '#C5A059' },
  { id: 'fl-rose', name: 'Chenille Rose', meaning: 'Timeless Affection', basePrice: 25000, icon: '🌹', defaultColorHex: '#5A0C0E' },
  { id: 'fl-daisy', name: 'Sunny Daisy', meaning: 'Innocence & Cheerfulness', basePrice: 18000, icon: '🌼', defaultColorHex: '#FBF9F5' },
  { id: 'fl-lavender', name: 'Fragrant Lavender', meaning: 'Grace & Serenity', basePrice: 18000, icon: '🌾', defaultColorHex: '#826251' },
  { id: 'fl-bellflower', name: 'Meadow Bellflower', meaning: 'Gratitude & Constancy', basePrice: 20000, icon: '🔔', defaultColorHex: '#DE9E36' },
  { id: 'fl-carnation', name: 'Ruffled Carnation', meaning: 'Pure Friendship', basePrice: 20000, icon: '🌸', defaultColorHex: '#C85A17' },
  { id: 'fl-eucalyptus', name: 'Chenille Greenery Sprig', meaning: 'Healing & Protection', basePrice: 14000, icon: '🌿', defaultColorHex: '#6B7240' },
];

export const BRAND_COLORS: ColorOption[] = [
  { id: 'c-champagne-gold', name: 'Champagne Gold', hex: '#C5A059', description: 'CLAFFY signature metallic champagne gold luxury tone' },
  { id: 'c-chocolate-brown', name: 'Rich Chocolate Brown', hex: '#26150F', description: 'Deep editorial cocoa brown tone' },
  { id: 'c-ivory-cream', name: 'Warm Ivory Cream', hex: '#FBF9F5', description: 'Soft radiant parchment ivory shade' },
  { id: 'c-sunflower-yellow', name: 'Muted Sunflower Yellow', hex: '#DE9E36', description: 'Subtle warm golden floral tone' },
  { id: 'c-warm-orange', name: 'Warm Amber Orange', hex: '#C85A17', description: 'Sophisticated warm sunset accent' },
  { id: 'c-burgundy-red', name: 'Deep Burgundy Red', hex: '#5A0C0E', description: 'Romantic dark wine velvet accent shade' },
  { id: 'c-olive-sage', name: 'Chenille Olive Sage', hex: '#6B7240', description: 'Natural botanical green for foliage and stems' },
];

export const ARRANGEMENT_STYLES: ArrangementOption[] = [
  {
    id: 'compact-round',
    name: 'Harmonious Round',
    description: 'Neat, symmetrical cluster emphasizing full flower heads and balanced contours.',
    priceModifier: 0,
    stemsRecommended: '5 - 9 stems',
  },
  {
    id: 'wild-meadow',
    name: 'Wild Meadow Bloom',
    description: 'Organic, varied stem heights reminiscent of an untouched sunny countryside field.',
    priceModifier: 15000,
    stemsRecommended: '7 - 12 stems',
  },
  {
    id: 'cascading',
    name: 'Cascading Romance',
    description: 'Gracefully arching stems with trailing greenery and textured volume.',
    priceModifier: 30000,
    stemsRecommended: '8 - 14 stems',
  },
  {
    id: 'minimal-trio',
    name: 'Poetic Minimal Trio',
    description: 'Clean, understated statement focusing on three hero blooms and delicate accents.',
    priceModifier: 0,
    stemsRecommended: '3 - 5 stems',
  },
];

export const VESSEL_OPTIONS: VesselOption[] = [
  {
    id: 'vessel-kraft',
    name: 'Artisan Ribbed Kraft Paper',
    description: 'Heavyweight organic kraft wrapping tied with dark brown satin ribbon.',
    priceModifier: 0,
    productTypes: ['bouquet'],
  },
  {
    id: 'vessel-linen',
    name: 'Warm Cream Linen Wrap',
    description: 'Textured fabric wrapping with frayed raw-edge borders and cotton twine.',
    priceModifier: 20000,
    productTypes: ['bouquet'],
  },
  {
    id: 'vessel-wicker',
    name: 'Hand-Woven Willow Basket',
    description: 'Natural woven willow with sturdy handle and preserved moss cushioning.',
    priceModifier: 45000,
    productTypes: ['basket'],
  },
  {
    id: 'vessel-round-box',
    name: 'Heritage Round Hat Box',
    description: 'Sturdy circular presentation box with gold-foil CLAFFY logo stamp.',
    priceModifier: 50000,
    productTypes: ['box'],
  },
];

export const ACCESSORY_OPTIONS: AccessoryOption[] = [
  {
    id: 'acc-lights',
    name: 'Warm Micro Fairy Lights',
    description: 'Battery-operated delicate copper wire fairy lights woven through the stems.',
    price: 25000,
    icon: '✨',
  },
  {
    id: 'acc-wooden-tag',
    name: 'Hand-Stamped Wooden Tag',
    description: 'Laser-cut wood tag stamped with a custom initial or date.',
    price: 15000,
    icon: '🏷️',
  },
  {
    id: 'acc-velvet-bow',
    name: 'Deep Red Velvet Ribbon Bow',
    description: 'Double-faced French velvet ribbon bow tied at the neck.',
    price: 15000,
    icon: '🎀',
  },
  {
    id: 'acc-butterfly',
    name: 'Handcrafted Pipe-Cleaner Butterfly',
    description: 'A whimsical miniature chenille butterfly resting on the top bloom.',
    price: 20000,
    icon: '🦋',
  },
  {
    id: 'acc-scent-sachet',
    name: 'Wild Honey & Vanilla Scent Sachet',
    description: 'Natural botanical essential oil sachet tucked discreetly inside.',
    price: 18000,
    icon: '🍯',
  },
];

export const OCCASIONS_LIST = [
  { id: 'Birthday', label: 'Birthday', desc: 'Bright, joyous blooms to celebrate another sweet year.' },
  { id: 'Anniversary', label: 'Anniversary', desc: 'Everlasting flowers representing lasting love.' },
  { id: 'Graduation', label: 'Graduation', desc: 'Pride and cheer for monumental achievements.' },
  { id: 'Friendship', label: 'Friendship', desc: 'Heartfelt tokens of laughter and shared moments.' },
  { id: 'Appreciation', label: 'Appreciation', desc: 'Saying thank you in the warmest possible way.' },
  { id: 'Just Because', label: 'Just Because', desc: 'Spontaneous little blooms because they crossed your mind.' },
];
