import React, { useState, useRef, useEffect, useMemo } from 'react';
import { CustomConfig } from '../types';
import { formatPrice } from '../utils/format';
import { 
  Rotate3d, 
  Play, 
  Pause, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Sparkles, 
  Sun, 
  Flame, 
  Layers,
  Compass
} from 'lucide-react';

interface PipeCleanerVisualizerProps {
  config: CustomConfig;
  className?: string;
  showCardPreview?: boolean;
}

// Color utility to calculate realistic velvet highlight, midtone, and deep ambient shadow
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) return { r: 197, g: 160, b: 89 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return '#' + [clamp(r), clamp(g), clamp(b)].map(x => x.toString(16).padStart(2, '0')).join('');
}

function getVelvetShades(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  
  // Specular velvet highlight (soft golden tint + elevated brightness)
  const highlight = rgbToHex(
    r * 0.7 + 255 * 0.3 + 15,
    g * 0.7 + 245 * 0.3 + 10,
    b * 0.7 + 215 * 0.3
  );

  // Soft midtone (rich velvet saturation)
  const mid = hex;

  // Deep ambient shadow (occlusion inside petals and creases)
  const shadow = rgbToHex(r * 0.55, g * 0.48, b * 0.42);

  // Deepest core shadow (inner folds)
  const deepShadow = rgbToHex(r * 0.32, g * 0.25, b * 0.2);

  return { highlight, mid, shadow, deepShadow };
}

export const PipeCleanerVisualizer: React.FC<PipeCleanerVisualizerProps> = ({
  config,
  className = '',
  showCardPreview = true,
}) => {
  const { productType, flowerSelections, primaryColor, secondaryColor, arrangementStyle, vesselOrWrapper, accessories, personalMessage } = config;

  // 3D Turntable State
  const [rotationY, setRotationY] = useState<number>(0);
  const [rotationX, setRotationX] = useState<number>(8);
  const [zoom, setZoom] = useState<number>(1);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [activeLighting, setActiveLighting] = useState<'atelier' | 'studio' | 'golden'>('atelier');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; initialRotY: number; initialRotX: number } | null>(null);
  const autoRotateReqRef = useRef<number | null>(null);

  // Accessories checks
  const hasFairyLights = accessories.some(a => a.id === 'acc-lights');
  const hasButterfly = accessories.some(a => a.id === 'acc-butterfly');
  const hasVelvetBow = accessories.some(a => a.id === 'acc-velvet-bow');
  const hasWoodenTag = accessories.some(a => a.id === 'acc-wooden-tag');

  // Total stem count
  const totalStems = flowerSelections.reduce((sum, f) => sum + f.quantity, 0);

  // Auto-rotation loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (isAutoRotating && !isDragging) {
        setRotationY(prev => (prev + delta * 18) % 360);
      }

      autoRotateReqRef.current = requestAnimationFrame(loop);
    };

    autoRotateReqRef.current = requestAnimationFrame(loop);

    return () => {
      if (autoRotateReqRef.current) {
        cancelAnimationFrame(autoRotateReqRef.current);
      }
    };
  }, [isAutoRotating, isDragging]);

  // Mouse / Touch Drag handlers for smooth 3D Orbit
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialRotY: rotationY,
      initialRotX: rotationX,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setRotationY(dragStartRef.current.initialRotY + dx * 0.7);
    setRotationX(Math.max(-25, Math.min(35, dragStartRef.current.initialRotX - dy * 0.4)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      initialRotY: rotationY,
      initialRotX: rotationX,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !dragStartRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;
    setRotationY(dragStartRef.current.initialRotY + dx * 0.8);
    setRotationX(Math.max(-25, Math.min(35, dragStartRef.current.initialRotX - dy * 0.5)));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  // Preset view helpers
  const setPresetAngle = (y: number, x: number) => {
    setIsAutoRotating(false);
    setRotationY(y);
    setRotationX(x);
  };

  // Flatten stems into 3D positions with layered depth
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

  // Calculate coordinates with 3D depth layering
  const flowerPositions = useMemo(() => {
    return flattenedStems.map((stem, i) => {
      const count = Math.max(flattenedStems.length, 1);
      const progress = i / (count > 1 ? count - 1 : 1);
      
      let spreadAngle = (progress - 0.5) * 56;
      let radius = 95 + (i % 3) * 16;
      let yOffset = 0;
      let zDepth = ((i % 3) - 1) * 20; // 3D depth layer: -20px, 0px, +20px

      if (arrangementStyle.id === 'wild-meadow') {
        spreadAngle = (progress - 0.5) * 76 + ((i * 17) % 15 - 7);
        radius = 88 + (i % 4) * 22;
        yOffset = (i % 2 === 0 ? -14 : 10);
        zDepth = ((i % 4) - 1.5) * 24;
      } else if (arrangementStyle.id === 'cascading') {
        spreadAngle = (progress - 0.5) * 82;
        radius = 82 + Math.sin(progress * Math.PI) * 36;
        yOffset = (i % 2 === 1 ? 18 : -10);
        zDepth = Math.cos(progress * Math.PI) * 28;
      } else if (arrangementStyle.id === 'minimal-trio') {
        spreadAngle = (progress - 0.5) * 28;
        radius = 98;
        zDepth = (i - 1) * 15;
      }

      const radians = (spreadAngle - 90) * (Math.PI / 180);
      const cx = 200 + Math.cos(radians) * radius;
      const cy = 205 + Math.sin(radians) * radius + yOffset;

      return { ...stem, cx, cy, angle: spreadAngle * 0.45, zDepth };
    });
  }, [flattenedStems, arrangementStyle]);

  // Lighting environment themes
  const lightingThemes = {
    atelier: {
      keyLight: 'radial-gradient(circle at 35% 25%, rgba(255, 248, 230, 0.95) 0%, rgba(250, 244, 233, 0.8) 50%, rgba(235, 222, 202, 0.45) 100%)',
      pedestalGlow: 'rgba(197, 160, 89, 0.28)',
      ambientShadow: 'rgba(38, 21, 15, 0.18)',
    },
    studio: {
      keyLight: 'radial-gradient(circle at 45% 20%, rgba(255, 255, 255, 0.98) 0%, rgba(248, 246, 240, 0.85) 55%, rgba(226, 220, 210, 0.5) 100%)',
      pedestalGlow: 'rgba(215, 195, 160, 0.22)',
      ambientShadow: 'rgba(38, 21, 15, 0.15)',
    },
    golden: {
      keyLight: 'radial-gradient(circle at 30% 30%, rgba(255, 240, 205, 0.95) 0%, rgba(247, 220, 168, 0.8) 55%, rgba(222, 178, 110, 0.4) 100%)',
      pedestalGlow: 'rgba(222, 158, 54, 0.35)',
      ambientShadow: 'rgba(50, 24, 12, 0.24)',
    },
  };

  const currentLighting = lightingThemes[activeLighting];

  return (
    <div className={`relative flex flex-col items-center bg-[#FAF7F2] rounded-2xl border border-[#C5A059]/40 shadow-xl overflow-hidden ${className}`}>
      {/* Editorial Viewport Header Bar */}
      <div className="w-full bg-[#26150F] text-[#FAF7F2] px-4 py-2.5 flex items-center justify-between border-b border-[#C5A059]/30 z-20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
          <span className="font-serif text-xs tracking-[0.2em] uppercase text-[#DFC282]">
            3D Bespoke Studio
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase font-sans tracking-wider text-[#A68875] border-l border-[#C5A059]/30 pl-2">
            Volumetric Chenille Engine
          </span>
        </div>

        {/* View Angle Presets */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`px-2.5 py-1 rounded-md text-[10px] font-sans uppercase tracking-wider flex items-center gap-1 transition border ${
              isAutoRotating
                ? 'bg-[#C5A059] text-[#26150F] font-semibold border-[#C5A059]'
                : 'bg-white/10 text-[#DFC282] hover:bg-white/20 border-white/10'
            }`}
            title={isAutoRotating ? 'Pause 360° Rotation' : 'Start 360° Rotation'}
          >
            {isAutoRotating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span className="hidden xs:inline">360° Orbit</span>
          </button>

          <button
            onClick={() => setPresetAngle(0, 8)}
            className="px-2 py-1 rounded-md text-[10px] font-sans uppercase tracking-wider bg-white/10 text-[#FAF7F2] hover:bg-white/20 transition"
            title="Front View"
          >
            Front
          </button>

          <button
            onClick={() => setPresetAngle(35, 14)}
            className="px-2 py-1 rounded-md text-[10px] font-sans uppercase tracking-wider bg-white/10 text-[#FAF7F2] hover:bg-white/20 transition"
            title="Atelier 45° Angle"
          >
            45°
          </button>

          <button
            onClick={() => setPresetAngle(0, 36)}
            className="px-2 py-1 rounded-md text-[10px] font-sans uppercase tracking-wider bg-white/10 text-[#FAF7F2] hover:bg-white/20 transition"
            title="Top-Down Showcase"
          >
            Top
          </button>
        </div>
      </div>

      {/* 3D Interactive Viewport Stage */}
      <div
        className="w-full relative aspect-[4/4.3] flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden"
        style={{ background: currentLighting.keyLight }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Subtle Luxury Corner Notches */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#C5A059]/60 pointer-events-none" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#C5A059]/60 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#C5A059]/60 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#C5A059]/60 pointer-events-none" />

        {/* Ambient Radial Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(38,21,15,0.06)_100%)]" />

        {/* 3D Perspective Stage Wrapper */}
        <div
          className="relative w-full max-w-[360px] h-full max-h-[410px] flex items-center justify-center"
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Rotating 3D Turntable Entity */}
          <div
            className="relative w-full h-full flex items-center justify-center transition-transform duration-75"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${zoom})`,
            }}
          >
            {/* Turntable Base / Pedestal Shadow */}
            <div
              className="absolute bottom-6 w-[280px] h-[70px] rounded-[50%] transition-transform pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, ${currentLighting.pedestalGlow} 0%, ${currentLighting.ambientShadow} 45%, transparent 75%)`,
                transform: `rotateX(90deg) translateZ(-140px) scale(${1 + Math.sin((rotationY * Math.PI) / 180) * 0.05})`,
                filter: 'blur(6px)',
              }}
            />

            {/* Turntable Metallic Atelier Ring */}
            <div
              className="absolute bottom-10 w-[240px] h-[50px] rounded-[50%] border border-[#C5A059]/40 pointer-events-none opacity-60"
              style={{
                transform: 'rotateX(90deg) translateZ(-135px)',
                background: 'radial-gradient(ellipse at center, rgba(197, 160, 89, 0.15) 0%, transparent 80%)',
              }}
            />

            {/* Main Volumetric SVG Scene */}
            <svg
              viewBox="0 0 400 440"
              className="w-full h-full overflow-visible pointer-events-none select-none drop-shadow-[0_18px_24px_rgba(38,21,15,0.22)]"
            >
              <defs>
                {/* Micro-Chenille Fiber Texture (Volumetric Velvet Pile) */}
                <filter id="pbr-chenille-pile" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.22 0.22" numOctaves="3" result="noise" />
                  <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 0.85 0" in="noise" result="monoNoise" />
                  <feDiffuseLighting in="monoNoise" lightingColor="#FFF6E0" surfaceScale="1.4" diffuseConstant="1.2" result="light">
                    <feDistantLight azimuth="225" elevation="60" />
                  </feDiffuseLighting>
                  <feBlend in="SourceGraphic" in2="light" mode="multiply" result="blended" />
                  <feComposite in="blended" in2="SourceGraphic" operator="in" />
                </filter>

                {/* Soft ambient petal drop shadow (Realistic 3D depth, eliminates cartoon borders) */}
                <filter id="soft-petal-shadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.2" result="blur" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.15   0 0 0 0 0.08   0 0 0 0 0.05  0 0 0 0.35 0"/>
                  <feOffset dx="0" dy="3.5" result="offset" />
                  <feBlend in="SourceGraphic" in2="offset" mode="normal" />
                </filter>

                {/* Kraft Paper PBR Gradient */}
                <linearGradient id="kraft-pbr-grad" x1="0%" y1="0%" x2="100%" y2="80%">
                  <stop offset="0%" stopColor="#D9A980" />
                  <stop offset="35%" stopColor="#BE8E64" />
                  <stop offset="70%" stopColor="#A3754E" />
                  <stop offset="100%" stopColor="#7F5331" />
                </linearGradient>

                {/* French Ribbed Linen PBR Gradient */}
                <linearGradient id="linen-pbr-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FAF7F0" />
                  <stop offset="45%" stopColor="#EDE5D1" />
                  <stop offset="85%" stopColor="#DDD0B4" />
                  <stop offset="100%" stopColor="#C4B494" />
                </linearGradient>

                {/* Wicker 3D Cylindrical Weave Gradient */}
                <linearGradient id="wicker-3d-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5A351B" />
                  <stop offset="25%" stopColor="#9C6B46" />
                  <stop offset="60%" stopColor="#B58158" />
                  <stop offset="85%" stopColor="#7F502E" />
                  <stop offset="100%" stopColor="#46250F" />
                </linearGradient>

                {/* Memory Hat Box Cylindrical Curve Gradient */}
                <linearGradient id="box-3d-cylindrical" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C8B38E" />
                  <stop offset="20%" stopColor="#F5EDDE" />
                  <stop offset="55%" stopColor="#ECE0C8" />
                  <stop offset="85%" stopColor="#CDB995" />
                  <stop offset="100%" stopColor="#8C7550" />
                </linearGradient>

                {/* Metallic Champagne Gold Foil Accent */}
                <linearGradient id="gold-foil-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5E4B8" />
                  <stop offset="35%" stopColor="#D8B568" />
                  <stop offset="70%" stopColor="#B38B39" />
                  <stop offset="100%" stopColor="#7D5C1E" />
                </linearGradient>

                {/* Stem Organic 3D Gradient */}
                <linearGradient id="stem-3d-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#475225" />
                  <stop offset="45%" stopColor="#778644" />
                  <stop offset="80%" stopColor="#5B682F" />
                  <stop offset="100%" stopColor="#3A431D" />
                </linearGradient>

                {/* Fairy Lights Luminous Bloom */}
                <filter id="fairy-light-bloom" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="4.5" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* LAYER 1 (Depth -15px): Rear Stems & Ambient Leaves */}
              <g id="layer-stems-depth" style={{ transform: 'translateZ(-15px)' }}>
                {flowerPositions.map((f, i) => (
                  <path
                    key={`stem-${i}`}
                    d={`M 200 295 Q ${195 + (f.cx - 200) * 0.35} 250 ${f.cx} ${f.cy + 16}`}
                    fill="none"
                    stroke="url(#stem-3d-grad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity="0.95"
                  />
                ))}

                {/* Handcrafted Chenille Leaves with 3D Center Rib */}
                <g id="chenille-leaves">
                  <path
                    d="M 165 240 Q 120 220 145 190 Q 175 210 165 240 Z"
                    fill="url(#stem-3d-grad)"
                    filter="url(#soft-petal-shadow)"
                  />
                  <path
                    d="M 165 240 Q 145 215 145 190"
                    stroke="#8E9E52"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.8"
                  />

                  <path
                    d="M 235 245 Q 280 225 255 195 Q 225 215 235 245 Z"
                    fill="url(#stem-3d-grad)"
                    filter="url(#soft-petal-shadow)"
                  />
                  <path
                    d="M 235 245 Q 255 220 255 195"
                    stroke="#8E9E52"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.8"
                  />
                </g>
              </g>

              {/* LAYER 2 (Depth 0px): Vessel / Wrapper Container */}
              <g id="layer-vessel">
                {productType === 'bouquet' && (
                  <g id="bouquet-3d-wrap">
                    {/* Rear fold shadow */}
                    <path
                      d="M 115 230 L 150 390 Q 200 405 250 390 L 285 230 Z"
                      fill="#5C3B22"
                      opacity="0.35"
                    />

                    {/* Left Wrapping Sheet (Fluted Facet with 3D gradient) */}
                    <path
                      d="M 118 232 L 165 385 Q 198 396 200 388 L 140 238 Z"
                      fill={vesselOrWrapper.id === 'vessel-linen' ? 'url(#linen-pbr-grad)' : 'url(#kraft-pbr-grad)'}
                      filter="url(#soft-petal-shadow)"
                    />

                    {/* Right Wrapping Sheet (Overlapping fold) */}
                    <path
                      d="M 282 232 L 235 385 Q 202 396 200 388 L 260 238 Z"
                      fill={vesselOrWrapper.id === 'vessel-linen' ? 'url(#linen-pbr-grad)' : 'url(#kraft-pbr-grad)'}
                      filter="url(#soft-petal-shadow)"
                    />

                    {/* Center Front Wrap Silhouette */}
                    <path
                      d="M 132 242 L 172 386 Q 200 394 228 386 L 268 242 Q 200 270 132 242 Z"
                      fill={vesselOrWrapper.id === 'vessel-linen' ? 'url(#linen-pbr-grad)' : 'url(#kraft-pbr-grad)'}
                      stroke="rgba(197, 160, 89, 0.3)"
                      strokeWidth="1"
                    />

                    {/* Paper Crease Highlights */}
                    <path d="M 148 248 L 185 384" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5" fill="none" />
                    <path d="M 252 248 L 215 384" stroke="rgba(0, 0, 0, 0.2)" strokeWidth="1.5" fill="none" />

                    {/* Embossed Metallic Gold Atelier Seal */}
                    <g transform="translate(200, 310)">
                      <circle cx="0" cy="0" r="14" fill="url(#gold-foil-grad)" filter="url(#soft-petal-shadow)" />
                      <circle cx="0" cy="0" r="11.5" fill="none" stroke="#FAF7F2" strokeWidth="0.8" opacity="0.85" />
                      <text x="0" y="3" textAnchor="middle" fill="#26150F" fontSize="6.5" fontWeight="bold" fontFamily="serif" letterSpacing="0.1em">
                        CF
                      </text>
                    </g>
                  </g>
                )}

                {productType === 'basket' && (
                  <g id="basket-3d-wrap">
                    {/* Arched Braided Handle with 3D Depth */}
                    <path
                      d="M 125 265 Q 200 120 275 265"
                      fill="none"
                      stroke="#46250F"
                      strokeWidth="11"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 125 265 Q 200 120 275 265"
                      fill="none"
                      stroke="url(#wicker-3d-grad)"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 125 265 Q 200 120 275 265"
                      fill="none"
                      stroke="rgba(255, 240, 200, 0.45)"
                      strokeWidth="2.5"
                      strokeDasharray="6 4"
                      strokeLinecap="round"
                    />

                    {/* Woven Basket Body with Volumetric Relief */}
                    <path
                      d="M 110 262 Q 200 280 290 262 L 270 382 Q 200 398 130 382 Z"
                      fill="url(#wicker-3d-grad)"
                      filter="url(#soft-petal-shadow)"
                    />

                    {/* Woven Horizontal Reeds with 3D Lighting */}
                    {[282, 305, 328, 351, 372].map((y, idx) => (
                      <path
                        key={`reed-${idx}`}
                        d={`M ${114 + idx * 3} ${y} Q 200 ${y + 16} ${286 - idx * 3} ${y}`}
                        fill="none"
                        stroke="rgba(255, 235, 190, 0.35)"
                        strokeWidth="2"
                      />
                    ))}

                    {/* Vertical Weft Bands with Shadow Accents */}
                    {[145, 175, 200, 225, 255].map((x, idx) => (
                      <line
                        key={`weft-${idx}`}
                        x1={x}
                        y1="265"
                        x2={x + (idx - 2) * 1.5}
                        y2="382"
                        stroke="#3A1C0B"
                        strokeWidth="2"
                        opacity="0.45"
                      />
                    ))}

                    {/* Lush Preserved Chenille Moss Cushion Rim */}
                    <path
                      d="M 108 262 Q 200 276 292 262 Q 284 278 260 274 Q 220 282 180 275 Q 135 281 108 262 Z"
                      fill="#556228"
                      filter="url(#soft-petal-shadow)"
                    />
                  </g>
                )}

                {productType === 'box' && (
                  <g id="box-3d-wrap">
                    {/* Cylindrical Round Hat Box Body */}
                    <path
                      d="M 105 266 Q 200 288 295 266 L 290 382 Q 200 402 110 382 Z"
                      fill="url(#box-3d-cylindrical)"
                      filter="url(#soft-petal-shadow)"
                    />

                    {/* Gold Foil Embossed Rim Band */}
                    <path
                      d="M 105 266 Q 200 288 295 266 L 293 286 Q 200 308 107 286 Z"
                      fill="url(#gold-foil-grad)"
                    />

                    {/* Box Center Luxury Serif Stamping */}
                    <ellipse cx="200" cy="336" rx="42" ry="20" fill="rgba(38, 21, 15, 0.05)" />
                    <text
                      x="200"
                      y="338"
                      textAnchor="middle"
                      fill="#26150F"
                      fontSize="13"
                      fontWeight="600"
                      fontFamily="serif"
                      letterSpacing="0.22em"
                    >
                      CLAFFY
                    </text>
                    <text
                      x="200"
                      y="348"
                      textAnchor="middle"
                      fill="#C5A059"
                      fontSize="6"
                      fontWeight="500"
                      fontFamily="sans-serif"
                      letterSpacing="0.28em"
                    >
                      ATELIER
                    </text>
                  </g>
                )}
              </g>

              {/* LAYER 3 (Depth +25px to +50px): Bespoke Volumetric 3D Flowers */}
              <g id="layer-blooms">
                {flowerPositions.map((flower, i) => {
                  const { cx, cy, hex, id, angle, zDepth } = flower;
                  const shades = getVelvetShades(hex);
                  const isRose = id.includes('rose');
                  const isTulip = id.includes('tulip');
                  const isSunflower = id.includes('sunflower');
                  const isLavender = id.includes('lavender');

                  return (
                    <g
                      key={`bloom-${i}`}
                      transform={`translate(${cx}, ${cy}) rotate(${angle})`}
                      filter="url(#soft-petal-shadow)"
                      style={{
                        transformOrigin: `${cx}px ${cy}px`,
                      }}
                    >
                      {/* Stem-bloom plush junction */}
                      <ellipse cx="0" cy="14" rx="7" ry="5" fill="#4B5625" opacity="0.85" />

                      {/* 1. Volumetric Spiral Velvet Rose (No cartoon lines; layered concentric 3D petals) */}
                      {isRose && (
                        <g filter="url(#pbr-chenille-pile)">
                          {/* Outer Petals Layer */}
                          <path
                            d="M -26 -6 C -28 16, 28 16, 26 -6 C 18 -26, -18 -26, -26 -6 Z"
                            fill={shades.shadow}
                          />
                          <path
                            d="M -22 6 C -26 22, 26 22, 22 6 C 18 -12, -18 -12, -22 6 Z"
                            fill={shades.mid}
                          />
                          {/* Curled outer petal rim highlights */}
                          <path
                            d="M -20 8 Q 0 20 20 8"
                            stroke={shades.highlight}
                            strokeWidth="3.5"
                            fill="none"
                            strokeLinecap="round"
                          />

                          {/* Mid Petals (Interlocking shells) */}
                          <ellipse cx="-7" cy="-2" rx="14" ry="12" fill={shades.mid} />
                          <path
                            d="M -18 -2 C -18 -16, 6 -16, 6 -2"
                            stroke={shades.highlight}
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                          />
                          <ellipse cx="7" cy="0" rx="13" ry="11" fill={shades.mid} />
                          <path
                            d="M -2 0 C -2 -14, 18 -14, 18 0"
                            stroke={shades.highlight}
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                          />

                          {/* Inner Tight Velvet Spiral Heart */}
                          <ellipse cx="0" cy="0" rx="9" ry="8" fill={shades.deepShadow} />
                          <path
                            d="M -6 1 C -6 -6, 6 -6, 6 1 C 6 6, -3 7, -3 2 C -3 -2, 3 -3, 3 1"
                            fill="none"
                            stroke={shades.highlight}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                          <circle cx="0" cy="1" r="2.5" fill="#C5A059" opacity="0.9" />
                        </g>
                      )}

                      {/* 2. Volumetric Golden Sunflower (Dual concentric petal tiers + plush seed disc) */}
                      {isSunflower && (
                        <g filter="url(#pbr-chenille-pile)">
                          {/* Back Petal Tier (12 petals, shaded) */}
                          {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((rot) => (
                            <ellipse
                              key={`back-petal-${rot}`}
                              cx="0"
                              cy="-22"
                              rx="5.5"
                              ry="13"
                              fill={shades.shadow}
                              transform={`rotate(${rot})`}
                            />
                          ))}

                          {/* Front Petal Tier (12 petals, rich velvet highlight) */}
                          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((rot) => (
                            <g key={`front-petal-${rot}`} transform={`rotate(${rot})`}>
                              <ellipse cx="0" cy="-21" rx="6" ry="12" fill={shades.mid} />
                              <path
                                d="M 0 -31 L 0 -13"
                                stroke={shades.highlight}
                                strokeWidth="2"
                                strokeLinecap="round"
                                opacity="0.75"
                              />
                            </g>
                          ))}

                          {/* Center 3D Chenille Cushion Disc with Golden Pollen Halo */}
                          <circle cx="0" cy="0" r="15" fill="#3D2114" />
                          <circle cx="0" cy="0" r="12" fill="#5E331E" />
                          <circle cx="0" cy="0" r="8" fill="#7A4529" />
                          {/* Metallic Pollen Glimmers */}
                          {[0, 45, 90, 135, 180, 225, 270, 315].map((rot) => (
                            <circle
                              key={`pollen-${rot}`}
                              cx="0"
                              cy="-10"
                              r="1.2"
                              fill="#DE9E36"
                              transform={`rotate(${rot})`}
                            />
                          ))}
                        </g>
                      )}

                      {/* 3. Volumetric Goblet Tulip (3D Cup with visible dark hollow throat) */}
                      {isTulip && (
                        <g filter="url(#pbr-chenille-pile)">
                          {/* Dark Inner Hollow Throat */}
                          <ellipse cx="0" cy="-6" rx="10" ry="14" fill={shades.deepShadow} />

                          {/* Rear Petal Crown */}
                          <path
                            d="M -7 -14 Q 0 -26 7 -14"
                            stroke={shades.highlight}
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                          />

                          {/* Left Wing Petal */}
                          <path
                            d="M -17 12 C -24 -10, -4 -22, 0 -20 C -6 -8, -6 6, -17 12 Z"
                            fill={shades.shadow}
                          />

                          {/* Right Wing Petal */}
                          <path
                            d="M 17 12 C 24 -10, 4 -22, 0 -20 C 6 -8, 6 6, 17 12 Z"
                            fill={shades.shadow}
                          />

                          {/* Center Dominant Front Petal */}
                          <path
                            d="M -12 14 C -16 -4, -2 -18, 0 -17 C 2 -18, 16 -4, 12 14 Z"
                            fill={shades.mid}
                          />
                          {/* Velvety Center Highlight Crest */}
                          <path
                            d="M 0 12 L 0 -14"
                            stroke={shades.highlight}
                            strokeWidth="3"
                            strokeLinecap="round"
                            opacity="0.8"
                          />
                        </g>
                      )}

                      {/* 4. Volumetric Spire Lavender (3D clustered chenille calyces) */}
                      {isLavender && (
                        <g filter="url(#pbr-chenille-pile)">
                          <line x1="0" y1="22" x2="0" y2="-28" stroke="#5B682F" strokeWidth="3.5" strokeLinecap="round" />
                          {[-24, -16, -8, 0, 8, 16].map((y, idx) => (
                            <g key={`lav-${idx}`}>
                              {/* Left calyx */}
                              <ellipse cx="-7" cy={y} rx="6" ry="4.5" fill={shades.mid} />
                              <circle cx="-6" cy={y - 1} r="2" fill={shades.highlight} opacity="0.8" />
                              {/* Right calyx */}
                              <ellipse cx="7" cy={y} rx="6" ry="4.5" fill={shades.mid} />
                              <circle cx="6" cy={y - 1} r="2" fill={shades.highlight} opacity="0.8" />
                            </g>
                          ))}
                        </g>
                      )}

                      {/* 5. Volumetric Sunny Daisy (Radiant loops with warm plush center) */}
                      {!isRose && !isSunflower && !isTulip && !isLavender && (
                        <g filter="url(#pbr-chenille-pile)">
                          {/* 10 Radiating Chenille Petals */}
                          {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((rot) => (
                            <g key={`daisy-petal-${rot}`} transform={`rotate(${rot})`}>
                              <ellipse cx="0" cy="-18" rx="6" ry="11" fill={shades.mid} />
                              <ellipse cx="0" cy="-18" rx="3.5" ry="8" fill={shades.highlight} opacity="0.8" />
                            </g>
                          ))}
                          {/* Plush Center Dome */}
                          <circle cx="0" cy="0" r="10.5" fill="#DE9E36" />
                          <circle cx="0" cy="0" r="7.5" fill="#F7B915" />
                          <circle cx="-2" cy="-2.5" r="3" fill="#FFF280" opacity="0.9" />
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>

              {/* LAYER 4 (Depth +65px): Interactive Accessories & Accents */}
              <g id="layer-accessories">
                {/* Fairy Lights Luminous Strand with Optical Glow */}
                {hasFairyLights && (
                  <g id="fairy-lights-3d" filter="url(#fairy-light-bloom)">
                    <path
                      d="M 155 140 Q 200 175 245 145 Q 215 195 170 215 Q 230 230 255 190"
                      fill="none"
                      stroke="#FFEA88"
                      strokeWidth="1.6"
                      strokeDasharray="3 5"
                      opacity="0.85"
                    />
                    {[
                      { x: 160, y: 142 },
                      { x: 198, y: 168 },
                      { x: 242, y: 150 },
                      { x: 175, y: 208 },
                      { x: 218, y: 212 },
                      { x: 248, y: 194 },
                    ].map((pt, i) => (
                      <g key={`light-${i}`}>
                        <circle cx={pt.x} cy={pt.y} r="5" fill="#FFEAA8" opacity="0.9" />
                        <circle cx={pt.x} cy={pt.y} r="2.5" fill="#FFFFFF" />
                      </g>
                    ))}
                  </g>
                )}

                {/* 3D Velvet Ribbon Bow */}
                {hasVelvetBow && (
                  <g transform="translate(200, 310)" filter="url(#soft-petal-shadow)">
                    {/* Left Loop with 3D Depth */}
                    <ellipse cx="-18" cy="-2" rx="16" ry="10" fill="#5A0C0E" />
                    <ellipse cx="-17" cy="-2" rx="12" ry="6" fill="#801518" />
                    <path d="M -24 -2 Q -12 4 0 -2" stroke="#B32B30" strokeWidth="2" fill="none" opacity="0.7" />

                    {/* Right Loop with 3D Depth */}
                    <ellipse cx="18" cy="-2" rx="16" ry="10" fill="#5A0C0E" />
                    <ellipse cx="17" cy="-2" rx="12" ry="6" fill="#801518" />
                    <path d="M 0 -2 Q 12 4 24 -2" stroke="#B32B30" strokeWidth="2" fill="none" opacity="0.7" />

                    {/* Central Gold-Stitched Knot */}
                    <circle cx="0" cy="-2" r="7.5" fill="#5A0C0E" />
                    <circle cx="0" cy="-2" r="5" fill="#C5A059" opacity="0.9" />

                    {/* Draped Curled Ribbon Tails */}
                    <path
                      d="M -5 4 Q -16 26 -22 38"
                      stroke="#5A0C0E"
                      strokeWidth="5"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 5 4 Q 16 26 22 38"
                      stroke="#5A0C0E"
                      strokeWidth="5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </g>
                )}

                {/* 3D Wooden Keepsake Tag */}
                {hasWoodenTag && (
                  <g transform="translate(235, 315) rotate(-10)" filter="url(#soft-petal-shadow)">
                    {/* Hanging Craft Twine */}
                    <path d="M -20 -18 Q -10 -6 0 0" stroke="#7E5638" strokeWidth="1.8" fill="none" strokeDasharray="3 2" />
                    {/* Tag Body */}
                    <rect x="0" y="-4" width="48" height="26" rx="5" fill="#A8734B" stroke="#683F20" strokeWidth="1.5" />
                    <circle cx="8" cy="9" r="3" fill="#FAF7F2" />
                    <text x="27" y="13" textAnchor="middle" fill="#FAF7F2" fontSize="7.5" fontWeight="bold" letterSpacing="0.12em" fontFamily="serif">
                      ETERNAL
                    </text>
                  </g>
                )}

                {/* 3D Folded Brass/Chenille Butterfly */}
                {hasButterfly && (
                  <g transform="translate(255, 125) rotate(16)" filter="url(#soft-petal-shadow)">
                    {/* Wing Left */}
                    <ellipse cx="-10" cy="-6" rx="10" ry="7" fill="url(#gold-foil-grad)" />
                    {/* Wing Right */}
                    <ellipse cx="10" cy="-6" rx="10" ry="7" fill="url(#gold-foil-grad)" />
                    {/* Lower Wings */}
                    <ellipse cx="-7" cy="5" rx="7" ry="5" fill="#801518" />
                    <ellipse cx="7" cy="5" rx="7" ry="5" fill="#801518" />
                    {/* Body */}
                    <line x1="0" y1="-10" x2="0" y2="9" stroke="#26150F" strokeWidth="3" strokeLinecap="round" />
                  </g>
                )}
              </g>
            </svg>
          </div>
        </div>

        {/* Orbit Drag Instruction Overlay (Fades on drag) */}
        {!isDragging && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#26150F]/75 backdrop-blur-xs text-[#DFC282] text-[10px] font-sans tracking-widest uppercase flex items-center gap-1.5 pointer-events-none transition-opacity duration-300">
            <Compass className="w-3 h-3 text-[#C5A059]" />
            <span>Drag to Orbit in 3D</span>
          </div>
        )}

        {/* Lighting & Zoom Controls Dock */}
        <div className="absolute right-3 bottom-3 flex flex-col gap-1.5 z-20">
          {/* Lighting Mode Selector */}
          <div className="bg-white/90 backdrop-blur-md rounded-lg p-1 border border-[#C5A059]/40 shadow-sm flex flex-col gap-1">
            <button
              onClick={() => setActiveLighting('atelier')}
              className={`p-1.5 rounded transition ${
                activeLighting === 'atelier' ? 'bg-[#26150F] text-[#DFC282]' : 'text-[#826251] hover:text-[#26150F]'
              }`}
              title="Warm Atelier Spotlight"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveLighting('studio')}
              className={`p-1.5 rounded transition ${
                activeLighting === 'studio' ? 'bg-[#26150F] text-[#DFC282]' : 'text-[#826251] hover:text-[#26150F]'
              }`}
              title="Studio Daylight"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveLighting('golden')}
              className={`p-1.5 rounded transition ${
                activeLighting === 'golden' ? 'bg-[#26150F] text-[#DFC282]' : 'text-[#826251] hover:text-[#26150F]'
              }`}
              title="Golden Hour Glow"
            >
              <Flame className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Zoom In / Out */}
          <div className="bg-white/90 backdrop-blur-md rounded-lg p-1 border border-[#C5A059]/40 shadow-sm flex flex-col gap-1">
            <button
              onClick={() => setZoom(prev => Math.min(1.4, prev + 0.1))}
              className="p-1.5 text-[#826251] hover:text-[#26150F] transition"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(prev => Math.max(0.75, prev - 0.1))}
              className="p-1.5 text-[#826251] hover:text-[#26150F] transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setZoom(1);
                setRotationY(0);
                setRotationX(8);
              }}
              className="p-1.5 text-[#826251] hover:text-[#26150F] transition"
              title="Reset View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Atelier Specification Pill */}
      <div className="w-full px-5 py-3 bg-white border-t border-[#C5A059]/30 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full border border-[#C5A059]/60 shadow-xs"
            style={{ backgroundColor: primaryColor.hex }}
            title={primaryColor.name}
          />
          <span className="font-serif font-medium text-[#26150F]">
            {config.productName}
          </span>
          <span className="text-[11px] text-[#826251] font-light">
            ({totalStems} velvet stems)
          </span>
        </div>

        <span className="font-serif text-base font-normal text-[#C5A059]">
          {formatPrice(config.estimatedPrice)}
        </span>
      </div>

      {/* Mini Keepsake Card Preview */}
      {showCardPreview && personalMessage.messageText && (
        <div className="w-full px-5 pb-4 pt-1 bg-white">
          <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#C5A059]/35 text-left relative overflow-hidden">
            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-[#C5A059] font-medium mb-1">
              <span>To: {personalMessage.recipient || 'Beloved'}</span>
              <span>From: {personalMessage.sender || 'With Devotion'}</span>
            </div>
            <p className="text-xs italic text-[#26150F] font-serif line-clamp-2 leading-relaxed">
              "{personalMessage.messageText}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
