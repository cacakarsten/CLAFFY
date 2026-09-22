import React from 'react';
import { CustomConfig } from '../types';
import { formatPrice } from '../utils/format';

interface PipeCleanerVisualizerProps {
  config: CustomConfig;
  className?: string;
  showCardPreview?: boolean;
}

export const PipeCleanerVisualizer: React.FC<PipeCleanerVisualizerProps> = ({
  config,
  className = '',
  showCardPreview = true,
}) => {
  const { productType, flowerSelections, primaryColor, secondaryColor, arrangementStyle, vesselOrWrapper, accessories, personalMessage } = config;

  // Total stem count
  const totalStems = flowerSelections.reduce((sum, f) => sum + f.quantity, 0);

  // Check accessories
  const hasFairyLights = accessories.some(a => a.id === 'acc-lights');
  const hasButterfly = accessories.some(a => a.id === 'acc-butterfly');
  const hasVelvetBow = accessories.some(a => a.id === 'acc-velvet-bow');
  const hasWoodenTag = accessories.some(a => a.id === 'acc-wooden-tag');

  // Spread flowers into an array for positioning
  const flattenedStems: { id: string; name: string; hex: string; index: number }[] = [];
  flowerSelections.forEach(f => {
    for (let i = 0; i < f.quantity; i++) {
      flattenedStems.push({
        id: f.flowerId,
        name: f.flowerName,
        hex: f.hex || primaryColor.hex,
        index: flattenedStems.length,
      });
    }
  });

  // Calculate coordinates for flowers based on arrangement style & product type
  const flowerPositions = flattenedStems.map((stem, i) => {
    const count = Math.max(flattenedStems.length, 1);
    const progress = i / (count > 1 ? count - 1 : 1);
    
    // Spread angle
    let spreadAngle = (progress - 0.5) * 55;
    let radius = 90 + (i % 3) * 15;
    let yOffset = 0;

    if (arrangementStyle.id === 'wild-meadow') {
      spreadAngle = (progress - 0.5) * 75 + ((i * 17) % 15 - 7);
      radius = 85 + (i % 4) * 22;
      yOffset = (i % 2 === 0 ? -12 : 8);
    } else if (arrangementStyle.id === 'cascading') {
      spreadAngle = (progress - 0.5) * 85;
      radius = 80 + Math.sin(progress * Math.PI) * 35;
      yOffset = (i % 2 === 1 ? 16 : -8);
    } else if (arrangementStyle.id === 'minimal-trio') {
      spreadAngle = (progress - 0.5) * 30;
      radius = 95;
    }

    const radians = (spreadAngle - 90) * (Math.PI / 180);
    const cx = 200 + Math.cos(radians) * radius;
    const cy = 210 + Math.sin(radians) * radius + yOffset;

    return { ...stem, cx, cy, angle: spreadAngle * 0.4 };
  });

  return (
    <div className={`relative flex flex-col items-center justify-center p-5 bg-[#FAF7F2] rounded-2xl border border-[#C5A059]/40 shadow-lg ${className}`}>
      {/* Editorial corner subtle notches */}
      <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#C5A059]/60"></div>
      <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#C5A059]/60"></div>
      <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#C5A059]/60"></div>
      <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#C5A059]/60"></div>

      {/* Brand stamp badge */}
      <div className="absolute top-3.5 right-3.5 bg-[#26150F]/90 backdrop-blur-sm text-[#DFC282] px-3 py-0.5 rounded-full border border-[#C5A059]/50 text-[10px] font-medium tracking-[0.15em] uppercase shadow-sm">
        CLAFFY Atelier
      </div>

      <div className="w-full max-w-[360px] aspect-[4/4.4] relative flex items-center justify-center">
        <svg
          viewBox="0 0 400 440"
          className="w-full h-full drop-shadow-md select-none overflow-visible"
        >
          <defs>
            {/* Pipe cleaner fuzzy filter */}
            <filter id="chenille-texture" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* Kraft paper texture pattern */}
            <linearGradient id="kraft-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C99B72" />
              <stop offset="50%" stopColor="#B3835B" />
              <stop offset="100%" stopColor="#9C6F47" />
            </linearGradient>

            {/* Linen wrap gradient */}
            <linearGradient id="linen-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFEE8" />
              <stop offset="100%" stopColor="#EFE3AF" />
            </linearGradient>

            {/* Wicker basket gradient */}
            <linearGradient id="wicker-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#AC7753" />
              <stop offset="50%" stopColor="#8C5C39" />
              <stop offset="100%" stopColor="#694025" />
            </linearGradient>

            {/* Round box gradient */}
            <linearGradient id="box-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FAF4AA" />
              <stop offset="100%" stopColor="#E8DD8C" />
            </linearGradient>

            {/* Glow for fairy lights */}
            <filter id="light-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Stems */}
          <g id="stems">
            {flowerPositions.map((f, i) => (
              <path
                key={`stem-${i}`}
                d={`M 200 290 Q ${190 + (f.cx - 200) * 0.4} 240 ${f.cx} ${f.cy + 18}`}
                fill="none"
                stroke="#6B7240"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="2 1"
              />
            ))}
          </g>

          {/* Chenille Leaves */}
          <g id="chenille-leaves">
            <path d="M 170 230 Q 130 215 150 195 Q 175 210 170 230 Z" fill="#6B7240" stroke="#4A522A" strokeWidth="2.5" />
            <path d="M 230 235 Q 270 220 250 200 Q 225 215 230 235 Z" fill="#788048" stroke="#4A522A" strokeWidth="2.5" />
            <path d="M 190 220 Q 180 180 195 175 Q 205 195 190 220 Z" fill="#6B7240" stroke="#4A522A" strokeWidth="2.5" />
          </g>

          {/* Pipe Cleaner Flowers */}
          <g id="flowers">
            {flowerPositions.map((flower, i) => {
              const { cx, cy, hex, id, angle } = flower;
              const isRose = id.includes('rose');
              const isTulip = id.includes('tulip');
              const isSunflower = id.includes('sunflower');
              const isDaisy = id.includes('daisy');
              const isLavender = id.includes('lavender');

              return (
                <g key={`flower-${i}`} transform={`translate(${cx}, ${cy}) rotate(${angle})`}>
                  {/* Stem connection fluff */}
                  <circle cx="0" cy="10" r="6" fill="#6B7240" opacity="0.8" />

                  {isRose ? (
                    /* Pipe cleaner spiral rose */
                    <g filter="url(#chenille-texture)">
                      <circle cx="0" cy="0" r="23" fill={hex} stroke="#6E0300" strokeWidth="3" />
                      <path
                        d="M -14 0 C -14 -14, 14 -14, 14 0 C 14 10, -8 12, -8 2 C -8 -5, 6 -6, 5 0"
                        fill="none"
                        stroke="#FAF4AA"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <circle cx="0" cy="0" r="7" fill="#6E0300" />
                    </g>
                  ) : isTulip ? (
                    /* Pipe cleaner looped tulip */
                    <g filter="url(#chenille-texture)">
                      <path
                        d="M -16 12 C -22 -12, -4 -25, 0 -22 C 4 -25, 22 -12, 16 12 Z"
                        fill={hex}
                        stroke="#7B4D31"
                        strokeWidth="2.5"
                      />
                      <path
                        d="M -8 10 C -12 -8, -2 -18, 0 -17 C 2 -18, 12 -8, 8 10 Z"
                        fill="#FEE873"
                        stroke="#7B4D31"
                        strokeWidth="2"
                        opacity="0.85"
                      />
                    </g>
                  ) : isSunflower ? (
                    /* Pipe cleaner sunflower */
                    <g filter="url(#chenille-texture)">
                      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(rot => (
                        <ellipse
                          key={rot}
                          cx="0"
                          cy="-20"
                          rx="6"
                          ry="12"
                          fill={hex || '#F7B915'}
                          stroke="#7B4D31"
                          strokeWidth="2"
                          transform={`rotate(${rot})`}
                        />
                      ))}
                      {/* Textured seed center */}
                      <circle cx="0" cy="0" r="14" fill="#7B4D31" stroke="#6E0300" strokeWidth="2.5" />
                      <circle cx="0" cy="0" r="9" fill="#AC7753" stroke="#FAF4AA" strokeWidth="1.5" strokeDasharray="2 2" />
                    </g>
                  ) : isLavender ? (
                    /* Pipe cleaner lavender sprig */
                    <g filter="url(#chenille-texture)">
                      <line x1="0" y1="20" x2="0" y2="-25" stroke="#6B7240" strokeWidth="3" />
                      {[-20, -12, -4, 4, 12].map((y, idx) => (
                        <g key={idx}>
                          <ellipse cx="-7" cy={y} rx="5" ry="4" fill={hex} stroke="#7B4D31" strokeWidth="1.5" />
                          <ellipse cx="7" cy={y} rx="5" ry="4" fill={hex} stroke="#7B4D31" strokeWidth="1.5" />
                        </g>
                      ))}
                    </g>
                  ) : (
                    /* Default Pipe cleaner Daisy */
                    <g filter="url(#chenille-texture)">
                      {[0, 45, 90, 135, 180, 225, 270, 315].map(rot => (
                        <ellipse
                          key={rot}
                          cx="0"
                          cy="-16"
                          rx="6"
                          ry="11"
                          fill={hex || '#FAF4AA'}
                          stroke="#7B4D31"
                          strokeWidth="2"
                          transform={`rotate(${rot})`}
                        />
                      ))}
                      <circle cx="0" cy="0" r="9" fill="#F7B915" stroke="#7B4D31" strokeWidth="2" />
                      <circle cx="-2" cy="-2" r="3" fill="#FEE873" />
                    </g>
                  )}
                </g>
              );
            })}
          </g>

          {/* Fairy Lights Effect if Selected */}
          {hasFairyLights && (
            <g id="fairy-lights" filter="url(#light-glow)">
              <path
                d="M 160 140 Q 200 180 240 150 Q 210 200 170 220 Q 230 230 250 190"
                fill="none"
                stroke="#FEE873"
                strokeWidth="1.2"
                strokeDasharray="2 4"
                opacity="0.75"
              />
              {[
                { x: 165, y: 145 },
                { x: 195, y: 170 },
                { x: 235, y: 155 },
                { x: 180, y: 210 },
                { x: 220, y: 215 },
                { x: 245, y: 195 },
                { x: 140, y: 180 },
              ].map((pt, i) => (
                <circle key={i} cx={pt.x} cy={pt.y} r="3.5" fill="#FFFBE6" stroke="#F7B915" strokeWidth="1" />
              ))}
            </g>
          )}

          {/* Vessel / Wrapper Layer */}
          {productType === 'bouquet' && (
            <g id="bouquet-wrapper">
              {/* Kraft/Linen Paper Wrap */}
              <path
                d="M 125 240 L 160 380 Q 200 395 240 380 L 275 240 Q 200 265 125 240 Z"
                fill={vesselOrWrapper.id === 'vessel-linen' ? 'url(#linen-grad)' : 'url(#kraft-grad)'}
                stroke="#7B4D31"
                strokeWidth="2.5"
              />
              {/* Paper fold line */}
              <path
                d="M 135 245 L 205 385"
                stroke="#7B4D31"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.6"
              />
              <path
                d="M 265 245 L 195 385"
                stroke="#7B4D31"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.6"
              />

              {/* Wrapped Satin / Twine Ribbon */}
              <rect x="165" y="315" width="70" height="14" rx="4" fill="#7B4D31" stroke="#6E0300" strokeWidth="1.5" />
              {/* Ribbon Bow */}
              <circle cx="200" cy="322" r="6" fill="#6E0300" />
              <path d="M 195 322 Q 170 310 185 335 Z" fill="#6E0300" />
              <path d="M 205 322 Q 230 310 215 335 Z" fill="#6E0300" />
              <path d="M 195 325 Q 185 350 180 365" stroke="#6E0300" strokeWidth="3" fill="none" />
              <path d="M 205 325 Q 215 350 220 365" stroke="#6E0300" strokeWidth="3" fill="none" />
            </g>
          )}

          {productType === 'basket' && (
            <g id="basket-wrapper">
              {/* Basket Handle */}
              <path
                d="M 130 260 Q 200 130 270 260"
                fill="none"
                stroke="#7B4D31"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M 130 260 Q 200 130 270 260"
                fill="none"
                stroke="#AC7753"
                strokeWidth="4"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />

              {/* Woven Basket Body */}
              <path
                d="M 115 260 Q 200 275 285 260 L 265 375 Q 200 390 135 375 Z"
                fill="url(#wicker-grad)"
                stroke="#7B4D31"
                strokeWidth="3"
              />
              {/* Woven criss-cross lines */}
              <path
                d="M 125 280 Q 200 295 275 280 M 128 310 Q 200 325 272 310 M 131 340 Q 200 355 269 340"
                fill="none"
                stroke="#FAF4AA"
                strokeWidth="1.5"
                opacity="0.45"
              />
              <path
                d="M 150 265 L 145 375 M 180 268 L 178 380 M 220 268 L 222 380 M 250 265 L 255 375"
                fill="none"
                stroke="#7B4D31"
                strokeWidth="2"
                opacity="0.5"
              />
              {/* Moss top edge */}
              <path
                d="M 115 260 Q 200 270 285 260 Q 280 275 260 272 Q 220 280 180 273 Q 140 278 115 260 Z"
                fill="#6B7240"
              />
            </g>
          )}

          {productType === 'box' && (
            <g id="box-wrapper">
              {/* Round Box Body */}
              <path
                d="M 110 265 Q 200 285 290 265 L 285 375 Q 200 395 115 375 Z"
                fill="url(#box-grad)"
                stroke="#7B4D31"
                strokeWidth="3"
              />
              {/* Gold foil embossed rim */}
              <path
                d="M 110 265 Q 200 285 290 265 L 290 285 Q 200 305 110 285 Z"
                fill="#F7B915"
                stroke="#7B4D31"
                strokeWidth="2"
              />
              {/* Box Logo emblem */}
              <ellipse cx="200" cy="330" rx="36" ry="18" fill="#FAF4AA" stroke="#7B4D31" strokeWidth="1.5" />
              <text x="200" y="334" textAnchor="middle" fill="#6E0300" fontSize="11" fontWeight="bold" fontFamily="serif">
                CLAFFY
              </text>
            </g>
          )}

          {/* Butterfly Accessory */}
          {hasButterfly && (
            <g transform="translate(255, 120) rotate(15)">
              <ellipse cx="-8" cy="-5" rx="9" ry="6" fill="#F7B915" stroke="#7B4D31" strokeWidth="1.5" />
              <ellipse cx="8" cy="-5" rx="9" ry="6" fill="#F7B915" stroke="#7B4D31" strokeWidth="1.5" />
              <ellipse cx="-6" cy="4" rx="6" ry="4" fill="#6E0300" stroke="#7B4D31" strokeWidth="1" />
              <ellipse cx="6" cy="4" rx="6" ry="4" fill="#6E0300" stroke="#7B4D31" strokeWidth="1" />
              <line x1="0" y1="-9" x2="0" y2="7" stroke="#7B4D31" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {/* Wooden Tag Accessory */}
          {hasWoodenTag && (
            <g transform="translate(230, 310) rotate(-12)">
              <line x1="0" y1="0" x2="-20" y2="-15" stroke="#7B4D31" strokeWidth="1.5" strokeDasharray="2 2" />
              <rect x="-3" y="-2" width="46" height="24" rx="4" fill="#AC7753" stroke="#7B4D31" strokeWidth="1.5" />
              <circle cx="4" cy="10" r="2.5" fill="#FAF4AA" stroke="#7B4D31" strokeWidth="1" />
              <text x="24" y="14" textAnchor="middle" fill="#FAF4AA" fontSize="8" fontWeight="bold">
                MEMORIES
              </text>
            </g>
          )}

          {/* Velvet Bow on front */}
          {hasVelvetBow && (
            <g transform="translate(200, 305)">
              <ellipse cx="-16" cy="0" rx="14" ry="9" fill="#6E0300" stroke="#FAF4AA" strokeWidth="1" />
              <ellipse cx="16" cy="0" rx="14" ry="9" fill="#6E0300" stroke="#FAF4AA" strokeWidth="1" />
              <circle cx="0" cy="0" r="6" fill="#F7B915" stroke="#6E0300" strokeWidth="1.5" />
              <path d="M -5 4 Q -15 22 -20 30" stroke="#6E0300" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 5 4 Q 15 22 20 30" stroke="#6E0300" strokeWidth="4" fill="none" strokeLinecap="round" />
            </g>
          )}
        </svg>
      </div>

      {/* Arrangement Info Pill */}
      <div className="mt-4 flex items-center justify-between w-full px-4 py-2 bg-white rounded-xl border border-[#C5A059]/40 text-xs shadow-xs">
        <span className="font-medium text-[#26150F] flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full border border-[#C5A059]/50" style={{ backgroundColor: primaryColor.hex }}></span>
          <span>{config.productName} ({totalStems} stems)</span>
        </span>
        <span className="font-serif text-sm font-semibold text-[#26150F]">
          {formatPrice(config.estimatedPrice)}
        </span>
      </div>

      {/* Message Card mini preview */}
      {showCardPreview && personalMessage.messageText && (
        <div className="mt-3 w-full p-3.5 bg-[#FAF7F2] rounded-xl border border-[#C5A059]/40 text-left relative overflow-hidden">
          <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-[#C5A059] font-medium mb-1.5">
            <span>To: {personalMessage.recipient || 'Beloved'}</span>
            <span>From: {personalMessage.sender || 'With Devotion'}</span>
          </div>
          <p className="text-xs italic text-[#26150F] font-serif line-clamp-2 leading-relaxed">
            "{personalMessage.messageText}"
          </p>
        </div>
      )}
    </div>
  );
};
