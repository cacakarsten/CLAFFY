import React, { useState } from 'react';
import { CartItem } from '../types';
import { Trash2, ArrowRight, ArrowLeft, ShoppingBag, Sparkles, Edit3 } from 'lucide-react';
import { formatPrice } from '../utils/format';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onEditCustomItem: (item: CartItem) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onEditCustomItem,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shipping = subtotal >= 250000 || subtotal === 0 ? 0 : 20000;
  const total = subtotal - discountAmount + shipping;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'BLOOM10' || promoCode.trim().toUpperCase() === 'CLAFFY10') {
      setDiscountPercent(10);
      setPromoMessage('10% Privilege Privé discount applied.');
    } else {
      setPromoMessage('Invalid invitation code. Use "CLAFFY10" for 10% privilege.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#FAF7F2] border border-[#C5A059]/40 flex items-center justify-center text-[#26150F] shadow-sm">
          <ShoppingBag className="w-8 h-8 text-[#C5A059]" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#26150F] tracking-tight">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-sm text-[#826251] max-w-md mx-auto font-light leading-relaxed">
          You have not added any ready-made arrangements or bespoke handcrafted florals to your bag yet.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <button
            onClick={onContinueShopping}
            className="craft-button-secondary px-8 py-3.5 text-xs"
          >
            Explore Ready-Made
          </button>
          <button
            onClick={() => onContinueShopping()}
            className="craft-button-gold px-8 py-3.5 text-xs flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Design Bespoke Bloom</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Title */}
      <div className="border-b border-[#C5A059]/25 pb-5 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C5A059]">
            Order Selection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#26150F] tracking-tight mt-1">
            Your Shopping Bag
          </h1>
        </div>
        <span className="text-xs uppercase tracking-wider font-medium text-[#826251]">
          {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => {
            const isCustom = item.kind === 'custom' && !!item.customConfig;
            const config = item.customConfig;

            return (
              <div
                key={item.id}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-[#C5A059]/35 shadow-xs flex flex-col sm:flex-row gap-5 items-start"
              >
                {/* Image */}
                <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden border border-[#C5A059]/30 bg-[#FAF7F2] shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-2.5 min-w-0 w-full text-left">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#C5A059] text-[9px] font-semibold border border-[#C5A059]/30 uppercase tracking-wider">
                          {isCustom ? 'Bespoke Atelier' : 'Signature Ready-Made'}
                        </span>
                        <span className="text-[10px] text-[#826251] capitalize font-medium">• {item.category}</span>
                      </div>
                      <h4 className="font-serif text-xl font-normal text-[#26150F] tracking-tight">
                        {item.name}
                      </h4>
                    </div>

                    <div className="text-right">
                      <span className="font-serif text-lg font-medium text-[#26150F]">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                      <span className="text-[11px] text-[#826251] block font-light">
                        {formatPrice(item.unitPrice)} each
                      </span>
                    </div>
                  </div>

                  {/* Custom Product Breakdown */}
                  {isCustom && config && (
                    <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#C5A059]/30 text-xs text-[#826251] space-y-1.5 font-light">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#26150F] uppercase tracking-wider text-[10px]">Bespoke Specifications:</span>
                        <button
                          onClick={() => onEditCustomItem(item)}
                          className="text-[11px] font-medium text-[#C5A059] underline flex items-center gap-1 hover:text-[#26150F] transition"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Reopen Atelier</span>
                        </button>
                      </div>

                      <p>
                        <strong className="text-[#26150F] font-medium">Flora:</strong>{' '}
                        {config.flowerSelections.map((f) => `${f.quantity}x ${f.flowerName}`).join(', ')}
                      </p>
                      <p>
                        <strong className="text-[#26150F] font-medium">Harmony:</strong> {config.primaryColor.name} & {config.secondaryColor.name}
                      </p>
                      <p>
                        <strong className="text-[#26150F] font-medium">Presentation:</strong> {config.arrangementStyle.name} • {config.vesselOrWrapper.name}
                      </p>
                      {config.accessories.length > 0 && (
                        <p>
                          <strong className="text-[#26150F] font-medium">Objets:</strong>{' '}
                          {config.accessories.map((a) => a.name).join(', ')}
                        </p>
                      )}
                      {config.personalMessage.messageText && (
                        <p className="italic text-[#26150F] font-serif pt-1 border-t border-[#C5A059]/15">
                          Wax-Sealed Card: "{config.personalMessage.messageText}"
                        </p>
                      )}
                    </div>
                  )}

                  {/* Quantity & Remove controls */}
                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center border border-[#C5A059]/40 rounded-full bg-white overflow-hidden shadow-2xs">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-3 py-1 text-[#26150F] hover:bg-[#FAF7F2] font-medium text-xs transition"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-semibold text-[#26150F] min-w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-3 py-1 text-[#26150F] hover:bg-[#FAF7F2] font-medium text-xs transition"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-xs text-[#826251] hover:text-[#5A0C0E] flex items-center gap-1.5 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="pt-3">
            <button
              onClick={onContinueShopping}
              className="text-xs uppercase tracking-wider font-medium text-[#826251] hover:text-[#26150F] flex items-center gap-2 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Exploring Collection</span>
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary & Checkout Card */}
        <div className="lg:col-span-4 bg-white p-7 rounded-2xl border border-[#C5A059]/40 shadow-sm space-y-6 text-left">
          <h3 className="font-serif text-2xl font-light text-[#26150F] border-b border-[#C5A059]/20 pb-3 tracking-tight">
            Order Summary
          </h3>

          <div className="space-y-3 text-xs text-[#826251]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-[#26150F]">{formatPrice(subtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-800 font-medium">
                <span>Privilege Discount (10%)</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Complimentary Insured Courier</span>
              <span>{shipping === 0 ? <strong className="text-emerald-800 font-medium uppercase tracking-wider">Complimentary</strong> : formatPrice(shipping)}</span>
            </div>

            {shipping > 0 && (
              <p className="text-[11px] text-[#C5A059] font-light">
                Add {formatPrice(250000 - subtotal)} more for complimentary shipping.
              </p>
            )}

            <div className="pt-3 border-t border-[#C5A059]/25 flex justify-between items-center text-sm">
              <span className="font-serif text-base text-[#26150F]">Total Investment:</span>
              <span className="font-serif text-2xl font-normal text-[#26150F]">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Promo code form */}
          <form onSubmit={handleApplyPromo} className="space-y-2 pt-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Privilege Code (CLAFFY10)"
                className="flex-1 px-3.5 py-2 text-xs rounded-lg border border-[#C5A059]/40 uppercase tracking-wider focus:outline-none focus:border-[#C5A059] bg-[#FAF7F2]/40"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#26150F] hover:bg-[#382017] text-[#FAF7F2] rounded-lg text-xs font-medium uppercase tracking-wider transition"
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <p className="text-[11px] text-[#C5A059] font-medium">{promoMessage}</p>
            )}
          </form>

          {/* Proceed to Checkout CTA */}
          <button
            id="cart-checkout-cta"
            onClick={onProceedToCheckout}
            className="w-full craft-button-primary py-4 px-6 text-xs flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#C5A059]/30 text-[11px] text-[#826251] text-center font-light leading-relaxed">
            Encrypted Checkout • Every creation packaged in signature rigid gift presentation boxes.
          </div>
        </div>
      </div>
    </div>
  );
};
