import React, { useState } from 'react';
import { CustomConfig, CustomFlowerSelection } from '../types';
import { PipeCleanerVisualizer } from '../components/PipeCleanerVisualizer';
import {
  FLOWER_OPTIONS,
  BRAND_COLORS,
  ARRANGEMENT_STYLES,
  VESSEL_OPTIONS,
  ACCESSORY_OPTIONS,
} from '../data/customizerOptions';
import { Sparkles, ArrowRight, ArrowLeft, Check, Plus, Minus, RefreshCw } from 'lucide-react';
import { formatPrice } from '../utils/format';

interface CustomizerViewProps {
  initialType?: 'bouquet' | 'basket' | 'box';
  onAddCustomToCart: (config: CustomConfig) => void;
  onBackToShop: () => void;
}

export const CustomizerView: React.FC<CustomizerViewProps> = ({
  initialType = 'bouquet',
  onAddCustomToCart,
  onBackToShop,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  // Initial State for Customization
  const [productType, setProductType] = useState<'bouquet' | 'basket' | 'box'>(initialType);
  const [flowerSelections, setFlowerSelections] = useState<CustomFlowerSelection[]>([
    { flowerId: 'fl-sunflower', flowerName: 'Golden Sunflower', quantity: 2, colorId: 'c-sunflower-yellow', colorName: 'Muted Sunflower Yellow', hex: '#DE9E36' },
    { flowerId: 'fl-daisy', flowerName: 'Sunny Daisy', quantity: 3, colorId: 'c-ivory-cream', colorName: 'Warm Ivory Cream', hex: '#FBF9F5' },
    { flowerId: 'fl-tulip', flowerName: 'Velvet Tulip', quantity: 2, colorId: 'c-champagne-gold', colorName: 'Champagne Gold', hex: '#C5A059' },
  ]);

  const [primaryColor, setPrimaryColor] = useState(BRAND_COLORS[0]); // Champagne Gold
  const [secondaryColor, setSecondaryColor] = useState(BRAND_COLORS[2]); // Warm Ivory Cream
  const [arrangementStyle, setArrangementStyle] = useState(ARRANGEMENT_STYLES[0]);
  const [vesselOrWrapper, setVesselOrWrapper] = useState(
    VESSEL_OPTIONS.find((v) => v.productTypes.includes(initialType)) || VESSEL_OPTIONS[0]
  );
  const [selectedAccessories, setSelectedAccessories] = useState<Array<{ id: string; name: string; price: number; icon: string }>>([
    { id: 'acc-velvet-bow', name: 'Deep Burgundy Velvet Ribbon Bow', price: 15000, icon: '🎀' }
  ]);
  const [personalMessage, setPersonalMessage] = useState<{
    recipient: string;
    messageText: string;
    sender: string;
    cardStyle: 'kraft-embossed' | 'cream-floral' | 'vintage-ribbon';
  }>({
    recipient: 'Eleanor',
    messageText: 'Every petal carries an everlasting memory of our golden moments together.',
    sender: 'Julian',
    cardStyle: 'kraft-embossed',
  });
  const [specialRequest, setSpecialRequest] = useState<string>('');

  // Calculate dynamic price
  const basePrices = {
    bouquet: 95000,
    basket: 135000,
    box: 125000,
  };

  const flowersTotal = flowerSelections.reduce((sum, f) => {
    const option = FLOWER_OPTIONS.find((opt) => opt.id === f.flowerId);
    return sum + (option ? option.basePrice * f.quantity : 18000 * f.quantity);
  }, 0);

  const accessoriesTotal = selectedAccessories.reduce((sum, a) => sum + a.price, 0);
  const vesselModifier = vesselOrWrapper.priceModifier;
  const arrangementModifier = arrangementStyle.priceModifier;

  const estimatedPrice = basePrices[productType] + flowersTotal + accessoriesTotal + vesselModifier + arrangementModifier;

  // Build the complete config object
  const currentConfig: CustomConfig = {
    productType,
    productName: `Bespoke ${productType === 'bouquet' ? 'Bouquet' : productType === 'basket' ? 'Floral Basket' : 'Memory Gift Box'}`,
    flowerSelections,
    primaryColor,
    secondaryColor,
    arrangementStyle,
    vesselOrWrapper,
    accessories: selectedAccessories,
    personalMessage,
    specialRequest,
    estimatedPrice,
  };

  // Helper functions to alter flower count
  const handleUpdateFlowerQuantity = (flowerId: string, delta: number) => {
    const existing = flowerSelections.find((f) => f.flowerId === flowerId);
    const flowerOpt = FLOWER_OPTIONS.find((opt) => opt.id === flowerId);
    if (!flowerOpt) return;

    if (existing) {
      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        setFlowerSelections(flowerSelections.filter((f) => f.flowerId !== flowerId));
      } else {
        setFlowerSelections(
          flowerSelections.map((f) => (f.flowerId === flowerId ? { ...f, quantity: newQty } : f))
        );
      }
    } else if (delta > 0) {
      setFlowerSelections([
        ...flowerSelections,
        {
          flowerId,
          flowerName: flowerOpt.name,
          quantity: 1,
          colorId: primaryColor.id,
          colorName: primaryColor.name,
          hex: flowerOpt.defaultColorHex || primaryColor.hex,
        },
      ]);
    }
  };

  const handleUpdateFlowerColor = (flowerId: string, color: typeof BRAND_COLORS[0]) => {
    setFlowerSelections(
      flowerSelections.map((f) =>
        f.flowerId === flowerId ? { ...f, colorId: color.id, colorName: color.name, hex: color.hex } : f
      )
    );
  };

  const toggleAccessory = (acc: typeof ACCESSORY_OPTIONS[0]) => {
    if (selectedAccessories.some((a) => a.id === acc.id)) {
      setSelectedAccessories(selectedAccessories.filter((a) => a.id !== acc.id));
    } else {
      setSelectedAccessories([...selectedAccessories, { id: acc.id, name: acc.name, price: acc.price, icon: acc.icon }]);
    }
  };

  const stepsList = [
    { num: 1, label: 'Form' },
    { num: 2, label: 'Blooms' },
    { num: 3, label: 'Palette' },
    { num: 4, label: 'Vessel' },
    { num: 5, label: 'Objets' },
    { num: 6, label: 'Message' },
    { num: 7, label: 'Atelier' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner & Progress Header */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40 uppercase tracking-widest">
                CLAFFY Atelier
              </span>
              <span className="text-xs text-[#826251] font-light">Custom Hand-Twisted Chenille Art</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#26150F] tracking-tight mt-1">
              Bespoke Studio Customizer
            </h1>
          </div>

          <button
            onClick={onBackToShop}
            className="self-start sm:self-auto text-xs uppercase tracking-wider font-medium text-[#826251] hover:text-[#26150F] bg-white px-4 py-2 rounded-full border border-[#C5A059]/40 shadow-xs transition"
          >
            ← Return to Collection
          </button>
        </div>

        {/* Step Progress Indicator (Editorial styling) */}
        <div className="bg-white/80 p-4 sm:p-5 rounded-2xl border border-[#C5A059]/35 shadow-xs overflow-x-auto">
          <div className="flex items-center justify-between min-w-[550px] gap-2">
            {stepsList.map((s, idx) => {
              const isPast = activeStep > s.num;
              const isCurrent = activeStep === s.num;
              return (
                <button
                  key={s.num}
                  onClick={() => setActiveStep(s.num)}
                  className="flex-1 flex flex-col items-center group relative text-center"
                >
                  <div className="flex items-center w-full">
                    {idx > 0 && (
                      <div
                        className={`h-[1px] flex-1 transition-all duration-300 ${
                          isPast ? 'bg-[#C5A059]' : 'bg-[#C5A059]/20'
                        }`}
                      />
                    )}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-medium text-[11px] transition-all duration-300 ${
                        isCurrent
                          ? 'bg-[#26150F] text-[#DFC282] border border-[#C5A059] shadow-sm scale-110'
                          : isPast
                          ? 'bg-[#C5A059] text-[#26150F]'
                          : 'bg-[#FAF7F2] text-[#826251] border border-[#C5A059]/30'
                      }`}
                    >
                      {isPast ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : `0${s.num}`}
                    </div>
                    {idx < stepsList.length - 1 && (
                      <div
                        className={`h-[1px] flex-1 transition-all duration-300 ${
                          activeStep > s.num ? 'bg-[#C5A059]' : 'bg-[#C5A059]/20'
                        }`}
                      />
                    )}
                  </div>
                  <span
                    className={`mt-2 text-[11px] uppercase tracking-wider whitespace-nowrap transition-colors ${
                      isCurrent ? 'font-semibold text-[#26150F]' : 'font-light text-[#826251]'
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Left-Right Layout (Stacked on Mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* ==================================================
            LEFT COLUMN: Customization Controls (Step Wizard)
            ================================================== */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#C5A059]/35 shadow-sm space-y-6">
          {/* STEP 1: CHOOSE PRODUCT TYPE */}
          {activeStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="border-b border-[#C5A059]/20 pb-4">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C5A059]">
                  Step 01
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#26150F] tracking-tight">
                  Choose Your Product Form
                </h3>
                <p className="text-xs text-[#826251] font-light mt-1">
                  Select the structural foundation for your personalized handmade bloom.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    type: 'bouquet',
                    title: 'Hand Bouquet',
                    desc: 'Classic gathered bouquet wrapped in artisan ribbed kraft or French linen with silk ribbons.',
                    base: formatPrice(95000),
                    icon: '💐',
                  },
                  {
                    type: 'basket',
                    title: 'Floral Basket',
                    desc: 'Hand-woven willow wicker basket with preserved forest moss foundation.',
                    base: formatPrice(135000),
                    icon: '🧺',
                  },
                  {
                    type: 'box',
                    title: 'Memory Box',
                    desc: 'Round hat presentation box stamped with gold-foil emblem and secret wax-sealed note slip.',
                    base: formatPrice(125000),
                    icon: '🎁',
                  },
                ].map((item) => (
                  <button
                    key={item.type}
                    onClick={() => {
                      setProductType(item.type as any);
                      const matchingVessel = VESSEL_OPTIONS.find((v) =>
                        v.productTypes.includes(item.type as any)
                      );
                      if (matchingVessel) setVesselOrWrapper(matchingVessel);
                    }}
                    className={`p-5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between space-y-3 ${
                      productType === item.type
                        ? 'bg-[#FAF7F2] border-[#C5A059] shadow-md ring-1 ring-[#C5A059]'
                        : 'bg-white border-[#C5A059]/30 hover:border-[#C5A059]/70 hover:bg-[#FAF7F2]/50'
                    }`}
                  >
                    <div>
                      <span className="text-2xl block mb-2">{item.icon}</span>
                      <h4 className="font-serif font-medium text-base text-[#26150F]">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#826251] mt-1.5 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-[#C5A059]/20 text-xs">
                      <span className="text-[#826251] font-light uppercase tracking-wider text-[10px]">Base</span>
                      <span className="font-serif font-medium text-[#26150F]">{item.base}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE FLOWERS */}
          {activeStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="border-b border-[#C5A059]/20 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C5A059]">
                    Step 02
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#26150F] tracking-tight">
                    Select Your Blooms
                  </h3>
                  <p className="text-xs text-[#826251] font-light mt-1">
                    Select flower varieties and configure stem quantities for your arrangement.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-[#26150F] px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#C5A059]/40">
                    {flowerSelections.reduce((sum, f) => sum + f.quantity, 0)} Stems Selected
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[380px] overflow-y-auto pr-1">
                {FLOWER_OPTIONS.map((flower) => {
                  const currentSel = flowerSelections.find((f) => f.flowerId === flower.id);
                  const qty = currentSel ? currentSel.quantity : 0;

                  return (
                    <div
                      key={flower.id}
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all duration-200 ${
                        qty > 0
                          ? 'bg-[#FAF7F2] border-[#C5A059] shadow-xs'
                          : 'bg-white border-[#C5A059]/25 hover:border-[#C5A059]/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl shrink-0">{flower.icon}</span>
                        <div className="min-w-0">
                          <h5 className="font-serif font-medium text-sm text-[#26150F] truncate">
                            {flower.name}
                          </h5>
                          <p className="text-[10px] text-[#826251] font-light italic truncate">{flower.meaning}</p>
                          <span className="text-xs font-medium text-[#C5A059]">
                            +{formatPrice(flower.basePrice)}/stem
                          </span>
                        </div>
                      </div>

                      {/* Quantity buttons */}
                      <div className="flex items-center border border-[#C5A059]/50 rounded-full bg-white shrink-0 shadow-2xs">
                        <button
                          onClick={() => handleUpdateFlowerQuantity(flower.id, -1)}
                          disabled={qty === 0}
                          className="px-2.5 py-1 text-[#26150F] disabled:opacity-30 hover:bg-[#FAF7F2] transition rounded-l-full"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-medium text-[#26150F] min-w-[20px] text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => handleUpdateFlowerQuantity(flower.id, 1)}
                          className="px-2.5 py-1 text-[#26150F] hover:bg-[#FAF7F2] transition rounded-r-full"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: CHOOSE COLORS */}
          {activeStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="border-b border-[#C5A059]/20 pb-4">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C5A059]">
                  Step 03
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#26150F] tracking-tight">
                  Atelier Color Harmonies
                </h3>
                <p className="text-xs text-[#826251] font-light mt-1">
                  CLAFFY's luxury palette features champagne gold, rich chocolate brown, warm ivory cream, and deep burgundy accents.
                </p>
              </div>

              {/* Primary Color Picker */}
              <div className="space-y-2.5">
                <label className="text-[11px] font-semibold text-[#26150F] uppercase tracking-wider block">
                  Primary Theme Color:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {BRAND_COLORS.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setPrimaryColor(color)}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 text-left transition-all duration-200 ${
                        primaryColor.id === color.id
                          ? 'border-[#C5A059] bg-[#FAF7F2] shadow-sm ring-1 ring-[#C5A059]'
                          : 'border-[#C5A059]/25 hover:bg-[#FAF7F2]/50'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-black/10 shrink-0 shadow-2xs"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[#26150F] truncate">{color.name}</p>
                        <span className="text-[10px] text-[#826251] uppercase font-light">{color.hex}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Secondary Accent Color */}
              <div className="space-y-2.5 pt-3 border-t border-[#C5A059]/20">
                <label className="text-[11px] font-semibold text-[#26150F] uppercase tracking-wider block">
                  Secondary Accent Color:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {BRAND_COLORS.map((color) => (
                    <button
                      key={`sec-${color.id}`}
                      onClick={() => setSecondaryColor(color)}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 text-left transition-all duration-200 ${
                        secondaryColor.id === color.id
                          ? 'border-[#C5A059] bg-[#FAF7F2] shadow-sm ring-1 ring-[#C5A059]'
                          : 'border-[#C5A059]/25 hover:bg-[#FAF7F2]/50'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-black/10 shrink-0 shadow-2xs"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[#26150F] truncate">{color.name}</p>
                        <span className="text-[10px] text-[#826251] uppercase font-light">{color.hex}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Individual Flower Color Customizer */}
              {flowerSelections.length > 0 && (
                <div className="pt-3 border-t border-[#C5A059]/20 space-y-2">
                  <h4 className="text-xs font-medium text-[#26150F]">Fine-tune individual bloom colors:</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {flowerSelections.map((sel) => (
                      <div
                        key={sel.flowerId}
                        className="flex items-center justify-between p-2.5 bg-[#FAF7F2] rounded-lg text-xs border border-[#C5A059]/20"
                      >
                        <span className="font-medium text-[#26150F]">
                          {sel.flowerName} ({sel.quantity}x)
                        </span>
                        <div className="flex items-center gap-1.5">
                          {BRAND_COLORS.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => handleUpdateFlowerColor(sel.flowerId, c)}
                              className={`w-4 h-4 rounded-full border transition-transform ${
                                sel.colorId === c.id ? 'ring-2 ring-[#C5A059] scale-125' : 'border-black/20 hover:scale-110'
                              }`}
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: CHOOSE ARRANGEMENT & VESSEL */}
          {activeStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="border-b border-[#C5A059]/20 pb-4">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C5A059]">
                  Step 04
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#26150F] tracking-tight">
                  Arrangement Silhouette & Vessel
                </h3>
                <p className="text-xs text-[#826251] font-light mt-1">
                  Choose the structural silhouette and signature packaging for presentation.
                </p>
              </div>

              {/* Arrangement Styles */}
              <div className="space-y-2.5">
                <h4 className="text-[11px] font-semibold text-[#26150F] uppercase tracking-wider">
                  Bouquet Silhouette:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ARRANGEMENT_STYLES.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setArrangementStyle(style)}
                      className={`p-3.5 rounded-xl border text-left transition-all duration-200 ${
                        arrangementStyle.id === style.id
                          ? 'border-[#C5A059] bg-[#FAF7F2] shadow-sm ring-1 ring-[#C5A059]'
                          : 'border-[#C5A059]/25 hover:bg-[#FAF7F2]/50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h5 className="font-serif font-medium text-sm text-[#26150F]">{style.name}</h5>
                        {style.priceModifier > 0 && (
                          <span className="text-xs font-medium text-[#C5A059]">
                            +{formatPrice(style.priceModifier)}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#826251] mt-1.5 font-light leading-relaxed">{style.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Vessel / Wrapper */}
              <div className="space-y-2.5 pt-3 border-t border-[#C5A059]/20">
                <h4 className="text-[11px] font-semibold text-[#26150F] uppercase tracking-wider">
                  Wrapping & Vessel:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {VESSEL_OPTIONS.filter((v) => v.productTypes.includes(productType)).map((vessel) => (
                    <button
                      key={vessel.id}
                      onClick={() => setVesselOrWrapper(vessel)}
                      className={`p-3.5 rounded-xl border text-left transition-all duration-200 ${
                        vesselOrWrapper.id === vessel.id
                          ? 'border-[#C5A059] bg-[#FAF7F2] shadow-sm ring-1 ring-[#C5A059]'
                          : 'border-[#C5A059]/25 hover:bg-[#FAF7F2]/50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h5 className="font-serif font-medium text-sm text-[#26150F]">{vessel.name}</h5>
                        {vessel.priceModifier > 0 && (
                          <span className="text-xs font-medium text-[#C5A059]">
                            +{formatPrice(vessel.priceModifier)}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#826251] mt-1.5 font-light leading-relaxed">{vessel.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: ACCESSORIES */}
          {activeStep === 5 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="border-b border-[#C5A059]/20 pb-4">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C5A059]">
                  Step 05
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#26150F] tracking-tight">
                  Atelier Objets & Accents
                </h3>
                <p className="text-xs text-[#826251] font-light mt-1">
                  Elevate your floral arrangement with delicate fairy lights, engraved charms, and velvet bows.
                </p>
              </div>

              <div className="space-y-3">
                {ACCESSORY_OPTIONS.map((acc) => {
                  const isSelected = selectedAccessories.some((a) => a.id === acc.id);
                  return (
                    <div
                      key={acc.id}
                      onClick={() => toggleAccessory(acc)}
                      className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between gap-4 transition-all duration-200 ${
                        isSelected
                          ? 'border-[#C5A059] bg-[#FAF7F2] shadow-sm ring-1 ring-[#C5A059]'
                          : 'border-[#C5A059]/25 hover:border-[#C5A059]/60 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="text-2xl">{acc.icon}</span>
                        <div>
                          <h5 className="font-serif font-medium text-sm text-[#26150F]">{acc.name}</h5>
                          <p className="text-xs text-[#826251] font-light mt-0.5">{acc.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-medium text-xs text-[#26150F]">+{formatPrice(acc.price)}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-[#C5A059] border-[#C5A059] text-[#26150F]' : 'border-[#C5A059]/50'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: PERSONAL MESSAGE & SPECIAL REQUESTS */}
          {activeStep === 6 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="border-b border-[#C5A059]/20 pb-4">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C5A059]">
                  Step 06
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#26150F] tracking-tight">
                  Wax-Sealed Keepsake Note
                </h3>
                <p className="text-xs text-[#826251] font-light mt-1">
                  Every CLAFFY arrangement includes a letterpress parchment card finished with our gold wax seal.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#26150F] uppercase tracking-wider block mb-1.5">
                      Recipient Name:
                    </label>
                    <input
                      type="text"
                      value={personalMessage.recipient}
                      onChange={(e) =>
                        setPersonalMessage({ ...personalMessage, recipient: e.target.value })
                      }
                      placeholder="e.g. Eleanor"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#C5A059]/40 text-xs bg-[#FAF7F2]/40 text-[#26150F] focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#26150F] uppercase tracking-wider block mb-1.5">
                      Sender Name:
                    </label>
                    <input
                      type="text"
                      value={personalMessage.sender}
                      onChange={(e) =>
                        setPersonalMessage({ ...personalMessage, sender: e.target.value })
                      }
                      placeholder="e.g. Julian"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#C5A059]/40 text-xs bg-[#FAF7F2]/40 text-[#26150F] focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#26150F] uppercase tracking-wider block mb-1.5">
                    Your Personalized Message:
                  </label>
                  <textarea
                    rows={4}
                    value={personalMessage.messageText}
                    onChange={(e) =>
                      setPersonalMessage({ ...personalMessage, messageText: e.target.value })
                    }
                    placeholder="Inscribe a memorable dedication, vow, celebration, or gentle memory..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#C5A059]/40 text-xs bg-[#FAF7F2]/40 text-[#26150F] focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] font-serif leading-relaxed"
                  />
                </div>

                <div className="pt-2 border-t border-[#C5A059]/20">
                  <label className="text-xs font-medium text-[#826251] uppercase tracking-wider block mb-1.5">
                    Special Atelier Request (Optional):
                  </label>
                  <input
                    type="text"
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    placeholder="e.g. 'Extra elongated eucalyptus stems' or 'Emboss wedding date'"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#C5A059]/30 text-xs bg-white text-[#26150F] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: PREVIEW YOUR CLAFFY */}
          {activeStep === 7 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="border-b border-[#C5A059]/20 pb-4">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C5A059]">
                  Step 07
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#26150F] tracking-tight">
                  Atelier Review & Confirmation
                </h3>
                <p className="text-xs text-[#826251] font-light mt-1">
                  Review your bespoke arrangement specifications before submitting to our floral artisans.
                </p>
              </div>

              {/* Summary table */}
              <div className="p-5 bg-[#FAF7F2] rounded-xl border border-[#C5A059]/40 space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#C5A059]/20">
                  <span className="font-medium text-[#26150F]">Product Base:</span>
                  <span className="text-[#826251]">{currentConfig.productName} ({formatPrice(basePrices[productType])})</span>
                </div>

                <div className="py-1.5 border-b border-[#C5A059]/20">
                  <span className="font-medium text-[#26150F] block mb-1">Flora Selections:</span>
                  <div className="space-y-1 pl-3 font-light text-[#826251]">
                    {flowerSelections.map((f) => (
                      <div key={f.flowerId} className="flex justify-between">
                        <span>• {f.quantity}x {f.flowerName} ({f.colorName})</span>
                        <span>{formatPrice((FLOWER_OPTIONS.find(o => o.id === f.flowerId)?.basePrice || 18000) * f.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between py-1.5 border-b border-[#C5A059]/20">
                  <span className="font-medium text-[#26150F]">Arrangement Silhouette:</span>
                  <span className="text-[#826251]">{arrangementStyle.name} (+{formatPrice(arrangementStyle.priceModifier)})</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-[#C5A059]/20">
                  <span className="font-medium text-[#26150F]">Vessel / Wrapping:</span>
                  <span className="text-[#826251]">{vesselOrWrapper.name} (+{formatPrice(vesselOrWrapper.priceModifier)})</span>
                </div>

                {selectedAccessories.length > 0 && (
                  <div className="py-1.5 border-b border-[#C5A059]/20">
                    <span className="font-medium text-[#26150F] block mb-1">Accents & Objets:</span>
                    <div className="space-y-1 pl-3 font-light text-[#826251]">
                      {selectedAccessories.map((a) => (
                        <div key={a.id} className="flex justify-between">
                          <span>• {a.name}</span>
                          <span>+{formatPrice(a.price)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {personalMessage.messageText && (
                  <div className="pt-2">
                    <span className="font-medium text-[#26150F] block mb-1">Letterpress Keepsake:</span>
                    <p className="italic text-[#26150F] bg-white p-3 rounded-lg border border-[#C5A059]/30 font-serif leading-relaxed">
                      "{personalMessage.messageText}" — to {personalMessage.recipient} from {personalMessage.sender}
                    </p>
                  </div>
                )}

                <div className="pt-3 flex justify-between items-center text-sm font-medium text-[#26150F]">
                  <span className="font-serif text-base">Estimated Total Investment:</span>
                  <span className="font-serif text-2xl font-normal text-[#C5A059]">{formatPrice(estimatedPrice)}</span>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button
                id="customizer-add-to-cart-cta"
                onClick={() => onAddCustomToCart(currentConfig)}
                className="w-full craft-button-gold py-4 px-6 text-xs flex items-center justify-center gap-2.5 shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Add Bespoke Bloom to Bag • {formatPrice(estimatedPrice)}</span>
              </button>
            </div>
          )}

          {/* Navigation Controls between Steps */}
          <div className="pt-5 border-t border-[#C5A059]/20 flex items-center justify-between">
            <button
              onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
              disabled={activeStep === 1}
              className="craft-button-secondary px-5 py-2.5 text-xs flex items-center gap-2 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Step</span>
            </button>

            {activeStep < 7 ? (
              <button
                onClick={() => setActiveStep(activeStep + 1)}
                className="craft-button-primary px-7 py-2.5 text-xs flex items-center gap-2"
              >
                <span>Continue to Step 0{activeStep + 1}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => onAddCustomToCart(currentConfig)}
                className="craft-button-gold px-7 py-2.5 text-xs flex items-center gap-2"
              >
                <span>Complete Order</span>
                <Check className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ==================================================
            RIGHT COLUMN: Live Visual Preview of the CLAFFY
            ================================================== */}
        <div className="lg:col-span-5 sticky top-28 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="font-serif text-sm font-medium text-[#26150F] uppercase tracking-widest">
              Live Atelier Preview
            </span>
            <span className="text-[11px] text-[#C5A059] font-medium flex items-center gap-1.5">
              <RefreshCw className="w-3 h-3" />
              Real-time Rendering
            </span>
          </div>

          <PipeCleanerVisualizer
            config={currentConfig}
            className="w-full"
            showCardPreview={true}
          />

          <div className="p-4 bg-white rounded-xl border border-[#C5A059]/30 text-center text-xs text-[#826251]">
            <p className="font-light leading-relaxed">
              <strong className="text-[#26150F] font-medium">Craft Heritage:</strong> Because each petal and leaf is twisted by hand with high-density chenille yarn, each bloom possesses unique character and organic beauty.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
