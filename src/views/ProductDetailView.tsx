import React, { useState } from 'react';
import { Product } from '../types';
import { Sparkles, ArrowLeft, Star, Share2, Check, ShieldCheck, Clock, Award } from 'lucide-react';
import { formatPrice } from '../utils/format';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onAddToCartWithQty: (product: Product, quantity: number) => void;
  onCustomizeSimilar: (product: Product) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBack,
  onAddToCartWithQty,
  onCustomizeSimilar,
}) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-[#826251] hover:text-[#26150F] bg-white px-4 py-2 rounded-full border border-[#C5A059]/40 shadow-xs transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Collection</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left: Product Images with Editorial Framing */}
        <div className="lg:col-span-6 space-y-5">
          <div className="p-3 bg-white rounded-2xl border border-[#C5A059]/40 shadow-lg relative">
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#FAF7F2] relative">
              <img
                src={selectedImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Availability Badge */}
            <div className="absolute top-6 left-6 px-3.5 py-1 rounded-full bg-[#26150F]/85 backdrop-blur-sm border border-[#C5A059]/40 text-xs font-medium text-[#DFC282] shadow-sm uppercase tracking-wider">
              {product.availability}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {product.gallery.length > 1 && (
            <div className="flex items-center gap-3">
              {product.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === img
                      ? 'border-[#C5A059] shadow-md scale-105'
                      : 'border-transparent opacity-65 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Luxury Craft Promise Card */}
          <div className="p-5 bg-gradient-to-r from-[#FAF7F2] to-white rounded-xl border border-[#C5A059]/40 flex items-center gap-4 text-xs text-[#826251]">
            <Award className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div className="space-y-0.5">
              <strong className="text-[#26150F] font-serif font-medium text-sm block">Authentic Atelier Guarantee</strong>
              <span>Every individual petal and stem is meticulously hand-shaped from premium chenille wires in our floral atelier, designed never to fade or wilt.</span>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Controls */}
        <div className="lg:col-span-6 space-y-7 text-left">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-[#C5A059]/15 text-[#C5A059] text-[10px] font-semibold tracking-widest border border-[#C5A059]/40 uppercase">
                {product.kind === 'custom' ? 'Custom Atelier Model' : 'Signature Ready-Made'}
              </span>
              <span className="text-xs text-[#826251] capitalize tracking-wide font-medium">• {product.category}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#26150F] tracking-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center text-[#DE9E36]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-medium text-[#26150F]">{product.rating}</span>
              <span className="text-[#826251]">({product.reviewsCount} verified reviews)</span>
            </div>

            <div className="pt-2">
              <span className="font-serif text-3xl sm:text-4xl font-normal text-[#26150F]">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>

          <p className="text-sm text-[#826251] leading-relaxed font-light">
            {product.description}
          </p>

          {/* Specifications Box */}
          <div className="p-5 bg-white rounded-xl border border-[#C5A059]/35 space-y-3 text-xs text-[#826251]">
            <div className="flex justify-between py-1.5 border-b border-[#C5A059]/15">
              <span className="font-medium text-[#26150F] uppercase tracking-wider text-[11px]">Dimensions:</span>
              <span className="text-[#826251]">{product.size}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#C5A059]/15">
              <span className="font-medium text-[#26150F] uppercase tracking-wider text-[11px]">Atelier Lead Time:</span>
              <span className="text-[#826251]">{product.leadTime}</span>
            </div>
            <div className="py-1.5">
              <span className="font-medium text-[#26150F] uppercase tracking-wider text-[11px] block mb-2">Artisan Materials:</span>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((m, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-[#FAF7F2] text-[#26150F] border border-[#C5A059]/30 text-[11px] font-medium"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Flowers Included */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-semibold text-[#C5A059] uppercase tracking-widest">
              Flora Included In This Arrangement
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.flowersIncluded.map((f, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-[#C5A059]/40 text-xs font-medium text-[#26150F] shadow-xs"
                >
                  🌸 {f}
                </span>
              ))}
            </div>
          </div>

          {/* Quantity Selector & Add to Cart */}
          <div className="pt-4 space-y-4">
            <div className="flex items-center gap-4">
              {/* Quantity */}
              <div className="flex items-center border border-[#C5A059]/60 rounded-full bg-white overflow-hidden shadow-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2.5 text-[#26150F] hover:bg-[#FAF7F2] font-semibold text-sm transition"
                >
                  -
                </button>
                <span className="px-4 py-2.5 text-sm font-semibold text-[#26150F] min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2.5 text-[#26150F] hover:bg-[#FAF7F2] font-semibold text-sm transition"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                id="pdp-add-to-cart-btn"
                onClick={() => onAddToCartWithQty(product, quantity)}
                className="flex-1 craft-button-primary py-3.5 px-6 text-xs flex items-center justify-center gap-2"
              >
                <span>Add {quantity} to Bag • {formatPrice(product.price * quantity)}</span>
              </button>

              {/* Share button */}
              <button
                onClick={handleShare}
                className="p-3 rounded-full border border-[#C5A059]/50 bg-white text-[#26150F] hover:bg-[#FAF7F2] transition"
                title="Share bloom link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-700" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Secondary CTA: "Customize Similar Product" */}
            <div className="pt-2">
              <button
                id="pdp-customize-similar-btn"
                onClick={() => onCustomizeSimilar(product)}
                className="w-full craft-button-gold py-3 px-6 text-xs flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Customize Similar Arrangement in Studio Atelier</span>
              </button>
              <p className="text-[11px] text-[#826251] text-center mt-2 font-light">
                Admire this aesthetic but desire custom colorways or a personal wax-sealed note? Open in Bespoke Studio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
