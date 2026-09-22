import React, { useState } from 'react';
import { OrderRecord, TrackingStep } from '../types';
import { Search, Sparkles, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

interface OrderTrackingViewProps {
  initialOrderId?: string;
  recentOrders: OrderRecord[];
  onContinueShopping: () => void;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  initialOrderId = '',
  recentOrders,
  onContinueShopping,
}) => {
  const [searchInput, setSearchInput] = useState(initialOrderId || 'CF-CUSTOM-BLOOM');

  // Pre-configured demo orders for presentation
  const demoOrders: Record<string, OrderRecord> = {
    'CF-CUSTOM-BLOOM': {
      orderId: 'CF-CUSTOM-BLOOM',
      kind: 'custom',
      orderDate: 'May 18, 2026',
      estimatedDelivery: 'May 23, 2026',
      status: 'production',
      subtotal: 185000,
      shipping: 0,
      total: 185000,
      recipientName: 'Emma Watson',
      recipientAddress: 'Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan',
      customerEmail: 'maya.lin@example.com',
      items: [
        {
          id: 'item-demo-1',
          productId: 'cust-bespoke-bouquet',
          name: 'Bespoke Atelier Bouquet (7 Stems)',
          image: '',
          kind: 'custom',
          category: 'bouquet',
          unitPrice: 185000,
          quantity: 1,
        }
      ],
      steps: [
        { title: 'Order Registered', description: 'Atelier received design specifications & personal letter.', date: 'May 18, 10:15 AM', completed: true, current: false },
        { title: 'Atelier Shaping', description: 'Artisans coiling velvet chenille sunflowers and daisies.', date: 'May 19, 02:30 PM', completed: true, current: true },
        { title: 'Quality Assurance', description: 'Inspect petal firmness, fluff density & wax seal.', date: 'May 20 (Est)', completed: false, current: false },
        { title: 'Presentation Packaging', description: 'Boxed in signature rigid packaging with satin ribbon.', date: 'May 21 (Est)', completed: false, current: false },
        { title: 'Dispatched', description: 'Courier transit initiated with direct tracking.', date: 'May 21 (Est)', completed: false, current: false },
        { title: 'Delivered', description: 'Direct handover into recipient hands.', date: 'May 23 (Est)', completed: false, current: false },
      ],
    },
    'CF-READY-MADE': {
      orderId: 'CF-READY-MADE',
      kind: 'ready-made',
      orderDate: 'May 19, 2026',
      estimatedDelivery: 'May 21, 2026',
      status: 'packed',
      subtotal: 125000,
      shipping: 20000,
      total: 145000,
      recipientName: 'Lucas Grey',
      recipientAddress: 'Menteng Central, Jl. Teuku Umar No. 12, Jakarta Pusat',
      customerEmail: 'lucas.g@example.com',
      items: [
        {
          id: 'item-demo-2',
          productId: 'rm-golden-sunflower-bouquet',
          name: 'Sunny Nostalgia Gathered Bouquet',
          image: '',
          kind: 'ready-made',
          category: 'bouquet',
          unitPrice: 125000,
          quantity: 1,
        }
      ],
      steps: [
        { title: 'Order Registered', description: 'Inventory reserved in studio vaults.', date: 'May 19, 09:00 AM', completed: true, current: false },
        { title: 'Presentation Packaging', description: 'Boxed in signature gift case with letter card.', date: 'May 19, 01:20 PM', completed: true, current: true },
        { title: 'Dispatched', description: 'Dispatched via insured courier.', date: 'May 20 (Est)', completed: false, current: false },
        { title: 'Delivered', description: 'Delivered directly to doorstep.', date: 'May 21 (Est)', completed: false, current: false },
      ],
    },
  };

  // Check recent user orders or fallback to demo
  const matchedRecent = recentOrders.find((o) => o.orderId.toLowerCase() === searchInput.trim().toLowerCase());
  const matchedDemo = demoOrders[searchInput.trim().toUpperCase()] || demoOrders['CF-CUSTOM-BLOOM'];
  const activeOrder = matchedRecent || matchedDemo;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-left">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C5A059]">
          Atelier Tracking
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#26150F] tracking-tight">
          Track Your Creation
        </h1>
        <p className="text-xs sm:text-sm text-[#826251] font-light max-w-lg mx-auto">
          Follow each stage of your handcrafted creation—from wire shaping in our atelier to courier delivery.
        </p>
      </div>

      {/* Tracking Search & Demo Preset Selector */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#C5A059]/35 shadow-xs space-y-3.5">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#826251]" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter your Order ID (e.g. CF-CUSTOM-BLOOM)"
              className="w-full pl-9 pr-3.5 py-2.5 text-xs border border-[#C5A059]/40 rounded-lg focus:outline-none focus:border-[#C5A059] bg-[#FAF7F2]/40 text-[#26150F]"
            />
          </div>
          <button
            onClick={() => {}}
            className="craft-button-primary px-6 py-2.5 text-xs"
          >
            Track
          </button>
        </div>

        {/* Demo Preset Buttons for Quick Testing */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#826251]">Example Portfolios:</span>
          <button
            onClick={() => setSearchInput('CF-CUSTOM-BLOOM')}
            className={`px-3 py-1 rounded-full border text-[11px] font-medium transition ${
              searchInput === 'CF-CUSTOM-BLOOM'
                ? 'bg-[#26150F] text-[#DFC282] border-[#C5A059]'
                : 'bg-[#FAF7F2] text-[#826251] border-[#C5A059]/30 hover:border-[#C5A059]'
            }`}
          >
            ✨ Bespoke Atelier 6-Step Journey
          </button>
          <button
            onClick={() => setSearchInput('CF-READY-MADE')}
            className={`px-3 py-1 rounded-full border text-[11px] font-medium transition ${
              searchInput === 'CF-READY-MADE'
                ? 'bg-[#26150F] text-[#DFC282] border-[#C5A059]'
                : 'bg-[#FAF7F2] text-[#826251] border-[#C5A059]/30 hover:border-[#C5A059]'
            }`}
          >
            📦 Ready-Made 4-Step Flow
          </button>
        </div>
      </div>

      {/* Order Card Display */}
      {activeOrder && (
        <div className="bg-white rounded-2xl border border-[#C5A059]/35 shadow-sm p-6 sm:p-8 space-y-8">
          {/* Top Order Information */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#C5A059]/20 gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <span className="font-serif text-2xl font-normal text-[#26150F] tracking-tight">
                  Order #{activeOrder.orderId}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#C5A059] text-[10px] font-medium border border-[#C5A059]/30 uppercase tracking-wider">
                  {activeOrder.kind === 'custom' ? 'Bespoke Atelier Commission' : 'Signature Ready-Made'}
                </span>
              </div>
              <p className="text-xs text-[#826251] font-light">
                Commissioned on {activeOrder.orderDate} • Estimated Delivery: <strong className="text-[#26150F] font-medium">{activeOrder.estimatedDelivery}</strong>
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-[#826251] block">Destination</span>
              <p className="text-xs font-medium text-[#26150F]">{activeOrder.recipientName}</p>
              <p className="text-[11px] text-[#826251] font-light">{activeOrder.recipientAddress}</p>
            </div>
          </div>

          {/* Luxury Visual Timeline */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-light text-[#26150F] flex items-center gap-2 tracking-tight">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>
                {activeOrder.kind === 'custom'
                  ? 'Atelier Commission Progress (6 Stages)'
                  : 'Ready-Made Delivery Flow (4 Stages)'}
              </span>
            </h3>

            {/* Desktop Horizontal / Mobile Vertical Timeline */}
            <div className="relative pl-6 sm:pl-0 sm:grid sm:grid-cols-6 gap-2">
              {activeOrder.steps.map((step, idx) => {
                const isCompleted = step.completed;
                const isCurrent = step.current;

                return (
                  <div
                    key={idx}
                    className="relative pb-8 sm:pb-0 flex sm:flex-col items-start sm:items-center text-left sm:text-center group"
                  >
                    {/* Connecting line */}
                    {idx < activeOrder.steps.length - 1 && (
                      <div
                        className={`absolute left-3.5 top-7 bottom-0 w-0.5 sm:top-4 sm:left-1/2 sm:right-[-50%] sm:w-full sm:h-0.5 sm:bottom-auto transition-colors duration-300 ${
                          isCompleted ? 'bg-[#C5A059]' : 'bg-[#C5A059]/20'
                        }`}
                      />
                    )}

                    {/* Timeline Node Badge */}
                    <div
                      className={`relative z-10 w-8 h-8 rounded-full border flex items-center justify-center text-xs font-medium shrink-0 transition-all duration-300 ${
                        isCompleted
                          ? 'bg-[#26150F] border-[#C5A059] text-[#DFC282]'
                          : isCurrent
                          ? 'bg-[#C5A059] border-[#C5A059] text-[#26150F] ring-4 ring-[#C5A059]/20'
                          : 'bg-white border-[#C5A059]/30 text-[#826251]'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-[#DFC282]" />
                      ) : isCurrent ? (
                        <Clock className="w-4 h-4 text-[#26150F]" />
                      ) : (
                        <span className="text-[11px]">0{idx + 1}</span>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="ml-4 sm:ml-0 sm:mt-3 space-y-1">
                      <h4
                        className={`font-serif text-xs font-normal leading-tight ${
                          isCurrent
                            ? 'text-[#26150F] font-medium'
                            : isCompleted
                            ? 'text-[#26150F]'
                            : 'text-[#826251]'
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-[10px] text-[#826251] max-w-[130px] leading-tight hidden sm:block font-light">
                        {step.description}
                      </p>
                      <span className="text-[9px] font-medium text-[#C5A059] block uppercase tracking-wider">
                        {step.date}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Handcraft Studio Update Note */}
          <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#C5A059]/30 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C5A059]">Atelier Dispatch Notice:</span>
              <p className="text-xs text-[#826251] font-light leading-relaxed">
                {activeOrder.kind === 'custom'
                  ? 'Your commissioned blooms are actively being sculpted by hand. Our floral artisan is currently coiling velvet petals and balancing wire stem tension to align with your chosen palette.'
                  : 'Your ready-made blooms have been inspected and placed inside our rigid gift packaging with French ribbon, awaiting courier collection.'}
              </p>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-2 text-center">
            <button
              onClick={onContinueShopping}
              className="craft-button-secondary px-8 py-3 text-xs inline-flex items-center gap-2"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
