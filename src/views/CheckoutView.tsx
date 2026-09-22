import React, { useState } from 'react';
import { CartItem, OrderRecord, TrackingStep } from '../types';
import { ArrowLeft, Sparkles, CreditCard, Truck, ShieldCheck, Check } from 'lucide-react';
import { formatPrice } from '../utils/format';

interface CheckoutViewProps {
  cartItems: CartItem[];
  onOrderComplete: (order: OrderRecord) => void;
  onBackToCart: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cartItems,
  onOrderComplete,
  onBackToCart,
}) => {
  // Form State
  const [customerName, setCustomerName] = useState('Maya Lin');
  const [customerEmail, setCustomerEmail] = useState('maya.lin@example.com');
  const [customerPhone, setCustomerPhone] = useState('+62 812-3456-7890');

  const [recipientSameAsCustomer, setRecipientSameAsCustomer] = useState(false);
  const [recipientName, setRecipientName] = useState('Emma Watson');
  const [addressLine, setAddressLine] = useState('Jl. Senopati No. 42, Kebayoran Baru');
  const [city, setCity] = useState('Jakarta Selatan');
  const [stateZip, setStateZip] = useState('DKI Jakarta 12190');

  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qris' | 'bank-transfer'>('card');

  const hasCustomItems = cartItems.some((i) => i.kind === 'custom');

  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shipping = deliveryOption === 'express' ? 35000 : (subtotal >= 250000 ? 0 : 20000);
  const total = subtotal + shipping;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const randomId = `CF-${Math.floor(100000 + Math.random() * 900000)}`;
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const estDeliveryDate = new Date(Date.now() + (hasCustomItems ? 5 : 2) * 86400000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    let steps: TrackingStep[] = [];
    if (hasCustomItems) {
      steps = [
        { title: 'Order Confirmed', description: 'Bespoke design specifications logged in our atelier.', date: today, completed: true, current: false },
        { title: 'Atelier Handcrafting', description: 'Floral artisans meticulously coiling velvet chenille petals.', date: 'In progress', completed: false, current: true },
        { title: 'Quality Assurance', description: 'Inspecting wire tension, fluff density & wax seal.', date: 'Upcoming', completed: false, current: false },
        { title: 'Presentation Packaging', description: 'Curated into rigid keepsake box tied with French ribbon.', date: 'Upcoming', completed: false, current: false },
        { title: 'Dispatched', description: 'Handed to premium white-glove courier.', date: 'Upcoming', completed: false, current: false },
        { title: 'Delivered', description: 'Arrived safely into recipient hands.', date: estDeliveryDate, completed: false, current: false },
      ];
    } else {
      steps = [
        { title: 'Order Confirmed', description: 'Inventory reserved in studio vaults.', date: today, completed: true, current: false },
        { title: 'Presentation Packaging', description: 'Carefully wrapped with velvet ribbon and protective box.', date: 'In progress', completed: false, current: true },
        { title: 'Dispatched', description: 'In transit with tracking.', date: 'Upcoming', completed: false, current: false },
        { title: 'Delivered', description: 'Delivered safely.', date: estDeliveryDate, completed: false, current: false },
      ];
    }

    const orderRecord: OrderRecord = {
      orderId: randomId,
      kind: hasCustomItems ? 'custom' : 'ready-made',
      orderDate: today,
      estimatedDelivery: estDeliveryDate,
      status: 'confirmed',
      items: cartItems,
      subtotal,
      shipping,
      total,
      recipientName: recipientSameAsCustomer ? customerName : recipientName,
      recipientAddress: `${addressLine}, ${city}, ${stateZip}`,
      customerEmail,
      steps,
    };

    onOrderComplete(orderRecord);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-left">
      <div>
        <button
          onClick={onBackToCart}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-[#826251] hover:text-[#26150F] bg-white px-4 py-2 rounded-full border border-[#C5A059]/30 shadow-xs mb-4 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Bag</span>
        </button>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#26150F] tracking-tight">
          Secure Checkout
        </h1>
        <p className="text-xs text-[#826251] font-light mt-1.5">
          Provide your recipient and delivery destination to commence handcrafted preparation.
        </p>
      </div>

      {/* Order Kind Indicator Banner */}
      <div className="p-5 bg-white rounded-2xl border border-[#C5A059]/40 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#C5A059]/40 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#C5A059]" />
          </div>
          <div>
            <span className="font-serif text-lg font-normal text-[#26150F] tracking-tight">
              {hasCustomItems ? 'Bespoke Atelier Commission' : 'Signature Ready-Made Order'}
            </span>
            <p className="text-xs text-[#826251] font-light">
              {hasCustomItems
                ? 'Includes hand-shaped wire sculpture, custom color tuning & wax-sealed keepsake note.'
                : 'Pre-curated botanical pieces prepared for prompt courier dispatch.'}
            </p>
          </div>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-[#FAF7F2] text-[#C5A059] border border-[#C5A059]/30 text-xs font-medium uppercase tracking-wider">
          {hasCustomItems ? '2-3 Days Atelier Crafting' : 'Ships Next Business Day'}
        </span>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Form: Customer, Recipient, Shipping & Payment */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Customer Information */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#C5A059]/35 shadow-xs space-y-4">
            <h3 className="font-serif text-xl font-light text-[#26150F] border-b border-[#C5A059]/20 pb-3 tracking-tight">
              1. Customer Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] uppercase tracking-wider font-medium text-[#826251] block mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#C5A059]/40 text-xs bg-[#FAF7F2]/40 text-[#26150F] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider font-medium text-[#826251] block mb-1.5">
                  Email for Confirmation & Tracking
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#C5A059]/40 text-xs bg-[#FAF7F2]/40 text-[#26150F] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] uppercase tracking-wider font-medium text-[#826251] block mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#C5A059]/40 text-xs bg-[#FAF7F2]/40 text-[#26150F] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Recipient Details */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#C5A059]/35 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#C5A059]/20 pb-3">
              <h3 className="font-serif text-xl font-light text-[#26150F] tracking-tight">
                2. Recipient & Destination
              </h3>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#826251] font-light">
                <input
                  type="checkbox"
                  checked={recipientSameAsCustomer}
                  onChange={(e) => setRecipientSameAsCustomer(e.target.checked)}
                  className="rounded border-[#C5A059] text-[#26150F] focus:ring-[#C5A059]"
                />
                <span>Ship to my billing address</span>
              </label>
            </div>

            {!recipientSameAsCustomer && (
              <div className="space-y-4 pt-1">
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-medium text-[#826251] block mb-1.5">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Full name of recipient"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#C5A059]/40 text-xs bg-[#FAF7F2]/40 text-[#26150F] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider font-medium text-[#826251] block mb-1.5">
                    Street Address & Apartment / Suite
                  </label>
                  <input
                    type="text"
                    required
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    placeholder="e.g. Jl. Senopati No. 42"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#C5A059]/40 text-xs bg-[#FAF7F2]/40 text-[#26150F] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-medium text-[#826251] block mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#C5A059]/40 text-xs bg-[#FAF7F2]/40 text-[#26150F] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-medium text-[#826251] block mb-1.5">
                      Province / Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      value={stateZip}
                      onChange={(e) => setStateZip(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#C5A059]/40 text-xs bg-[#FAF7F2]/40 text-[#26150F] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Delivery Speed */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#C5A059]/35 shadow-xs space-y-4">
            <h3 className="font-serif text-xl font-light text-[#26150F] border-b border-[#C5A059]/20 pb-3 tracking-tight">
              3. Courier Selection
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                className={`p-4 rounded-xl border cursor-pointer flex flex-col justify-between transition-all duration-200 ${
                  deliveryOption === 'standard'
                    ? 'border-[#C5A059] bg-[#FAF7F2] shadow-xs ring-1 ring-[#C5A059]'
                    : 'border-[#C5A059]/25 hover:bg-[#FAF7F2]/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryOption === 'standard'}
                      onChange={() => setDeliveryOption('standard')}
                      className="text-[#C5A059] focus:ring-[#C5A059]"
                    />
                    <span className="font-serif font-medium text-sm text-[#26150F]">Standard Insured Courier</span>
                  </div>
                  <span className="text-xs font-medium text-[#26150F]">
                    {subtotal >= 250000 ? 'Complimentary' : formatPrice(20000)}
                  </span>
                </div>
                <p className="text-[11px] text-[#826251] mt-2 font-light">
                  3–4 business days delivery in shockproof reinforced packaging.
                </p>
              </label>

              <label
                className={`p-4 rounded-xl border cursor-pointer flex flex-col justify-between transition-all duration-200 ${
                  deliveryOption === 'express'
                    ? 'border-[#C5A059] bg-[#FAF7F2] shadow-xs ring-1 ring-[#C5A059]'
                    : 'border-[#C5A059]/25 hover:bg-[#FAF7F2]/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryOption === 'express'}
                      onChange={() => setDeliveryOption('express')}
                      className="text-[#C5A059] focus:ring-[#C5A059]"
                    />
                    <span className="font-serif font-medium text-sm text-[#26150F]">Priority Express Air</span>
                  </div>
                  <span className="text-xs font-medium text-[#26150F]">{formatPrice(35000)}</span>
                </div>
                <p className="text-[11px] text-[#826251] mt-2 font-light">
                  Next-day dispatch with temperature-controlled courier routing.
                </p>
              </label>
            </div>
          </div>

          {/* Section 4: Payment Method */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#C5A059]/35 shadow-xs space-y-4">
            <h3 className="font-serif text-xl font-light text-[#26150F] border-b border-[#C5A059]/20 pb-3 tracking-tight">
              4. Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'card', name: 'Credit / Debit Card', icon: '💳' },
                { id: 'qris', name: 'QRIS Instant Pay', icon: '📱' },
                { id: 'bank-transfer', name: 'Bank Virtual Account', icon: '🏦' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPaymentMethod(p.id as any)}
                  className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all duration-200 ${
                    paymentMethod === p.id
                      ? 'border-[#C5A059] bg-[#FAF7F2] ring-1 ring-[#C5A059] shadow-xs'
                      : 'border-[#C5A059]/25 hover:bg-[#FAF7F2]/50'
                  }`}
                >
                  <span className="text-xl">{p.icon}</span>
                  <span className="text-xs font-medium text-[#26150F]">{p.name}</span>
                </button>
              ))}
            </div>

            <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#C5A059]/30 text-xs text-[#826251] flex items-center gap-2.5 font-light">
              <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>All transactions are 256-bit SSL encrypted. No full card numbers are stored on our servers.</span>
            </div>
          </div>
        </div>

        {/* Right Summary Sticky Card */}
        <div className="lg:col-span-4 bg-white p-7 rounded-2xl border border-[#C5A059]/40 shadow-sm space-y-6 sticky top-28">
          <h3 className="font-serif text-2xl font-light text-[#26150F] border-b border-[#C5A059]/20 pb-3 tracking-tight">
            Order Review
          </h3>

          <div className="space-y-3.5 max-h-60 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-start text-xs border-b border-[#C5A059]/15 pb-2.5">
                <div>
                  <h5 className="font-medium text-[#26150F]">{item.name}</h5>
                  <span className="text-[#826251] font-light text-[11px]">Qty: {item.quantity}</span>
                </div>
                <span className="font-serif font-medium text-[#26150F]">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2.5 text-xs text-[#826251] pt-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-[#26150F]">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Insured Courier</span>
              <span className="font-medium text-[#26150F]">
                {shipping === 0 ? <span className="text-emerald-800">Complimentary</span> : formatPrice(shipping)}
              </span>
            </div>
            <div className="pt-3 border-t border-[#C5A059]/20 flex justify-between items-center text-sm">
              <span className="font-serif text-base text-[#26150F]">Total Payment:</span>
              <span className="font-serif text-2xl font-normal text-[#26150F]">{formatPrice(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full craft-button-gold py-4 px-6 text-xs flex items-center justify-center gap-2 shadow-md"
          >
            <Check className="w-4 h-4" />
            <span>Confirm Order • {formatPrice(total)}</span>
          </button>

          <p className="text-[11px] text-[#826251] text-center font-light leading-relaxed">
            By confirming, your order will be assigned to a CLAFFY artisan and tracking link generated immediately.
          </p>
        </div>
      </form>
    </div>
  );
};
