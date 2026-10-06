import React, { useState, useEffect } from 'react';
import { PageType, Product, ProductKind, CartItem, CustomConfig, OrderRecord } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast, ToastMessage } from './components/Toast';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';

// Views
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CustomizerView } from './views/CustomizerView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrderTrackingView } from './views/OrderTrackingView';
import { AboutView } from './views/AboutView';
import { HowItWorksView } from './views/HowItWorksView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [activeShopKind, setActiveShopKind] = useState<ProductKind>('ready-made');
  const [activeOccasionFilter, setActiveOccasionFilter] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>('all');

  // Selected Product for Detail View
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);

  // Initial Customizer Type
  const [customizerInitialType, setCustomizerInitialType] = useState<'bouquet' | 'basket' | 'box'>('bouquet');

  // Active Order for Tracking
  const [activeTrackingId, setActiveTrackingId] = useState<string>('CF-CUSTOM-BLOOM');

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Toast System
  const [currentToast, setCurrentToast] = useState<ToastMessage | null>({
    id: 'welcome',
    title: 'Welcome to CLAFFY Atelier',
    description: 'Discover bespoke handcrafted floral art & enduring botanical memories.',
    type: 'success',
  });

  const showToast = (title: string, description?: string, type: 'success' | 'info' = 'success') => {
    setCurrentToast({
      id: `${Date.now()}`,
      title,
      description,
      type,
    });
  };

  // Cart State (Pre-filled with 1 item for immediate delight)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      productId: 'rm-golden-sunflower-bouquet',
      name: 'Sunny Nostalgia Bouquet',
      image: '/assets/claffy_hero_bouquet.png',
      kind: 'ready-made',
      category: 'bouquet',
      unitPrice: 125000,
      quantity: 1,
    },
  ]);

  // Recent Placed Orders
  const [recentOrders, setRecentOrders] = useState<OrderRecord[]>([]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Navigation Helper
  const navigateTo = (page: PageType, kind?: ProductKind) => {
    if (page === 'ready-made') {
      setActiveShopKind('ready-made');
      setActiveCategoryFilter('all');
      setCurrentPage('shop');
      return;
    }
    if (page === 'custom') {
      setActiveShopKind('custom');
      setActiveCategoryFilter('all');
      setCurrentPage('shop');
      return;
    }
    if (page === 'accessories') {
      setActiveShopKind('ready-made');
      setActiveCategoryFilter('accessories');
      setCurrentPage('shop');
      return;
    }
    if (kind) {
      setActiveShopKind(kind);
    }
    if (page === 'shop' && !kind) {
      setActiveCategoryFilter('all');
    }
    setCurrentPage(page);
  };

  // Select Product to View Details
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  // Launch Customizer
  const handleStartCustomizer = (type: 'bouquet' | 'basket' | 'box' = 'bouquet') => {
    setCustomizerInitialType(type);
    setCurrentPage('customizer');
  };

  // Add Ready-Made Product to Cart
  const handleAddToCart = (product: Product, quantity = 1) => {
    const existingIndex = cartItems.findIndex((item) => item.productId === product.id && item.kind === 'ready-made');
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        productId: product.id,
        name: product.name,
        image: product.image,
        kind: product.kind,
        category: product.category,
        unitPrice: product.price,
        quantity,
      };
      setCartItems([...cartItems, newItem]);
    }
    showToast(`Added to Cart!`, `${quantity}x ${product.name}`, 'success');
  };

  // Add Custom Config to Cart
  const handleAddCustomToCart = (config: CustomConfig) => {
    const customItem: CartItem = {
      id: `custom-cart-${Date.now()}`,
      productId: `cust-${config.productType}-${Date.now()}`,
      name: config.productName,
      image: config.productType === 'basket' ? '/assets/claffy_flower_basket.png' : config.productType === 'box' ? '/assets/claffy_flower_box.png' : '/assets/claffy_hero_bouquet.png',
      kind: 'custom',
      category: config.productType,
      unitPrice: config.estimatedPrice,
      quantity: 1,
      customConfig: config,
    };

    setCartItems([...cartItems, customItem]);
    showToast('Custom Bloom Saved! ✨', `Added ${config.productName} to your basket.`, 'success');
    setCurrentPage('cart');
  };

  // Cart Management
  const handleUpdateCartQuantity = (id: string, delta: number) => {
    const updated = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];
    setCartItems(updated);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(cartItems.filter((i) => i.id !== id));
    showToast('Item Removed', 'Bloom removed from your basket.', 'info');
  };

  // Customize Similar Product from PDP
  const handleCustomizeSimilar = (product: Product) => {
    const targetType = product.category === 'basket' ? 'basket' : product.category === 'box' ? 'box' : 'bouquet';
    setCustomizerInitialType(targetType);
    setCurrentPage('customizer');
    showToast('Custom Studio Opened', `Starting with ${product.name} baseline specs!`, 'info');
  };

  // Complete Order
  const handleOrderComplete = (order: OrderRecord) => {
    setRecentOrders([order, ...recentOrders]);
    setActiveTrackingId(order.orderId);
    setCartItems([]);
    setCurrentPage('order-tracking');
    showToast('Order Placed Successfully! 🎉', `Tracking ID: ${order.orderId}`, 'success');
  };

  // Total Cart Items Count
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF4AA]/30 text-[#7B4D31] flex flex-col font-sans selection:bg-[#F7B915] selection:text-[#6E0300]">
      {/* Global Scrapbook / Paper texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0 bg-[radial-gradient(#7B4D31_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Main Navbar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={navigateTo}
        cartCount={totalCartCount}
        openCart={() => setCurrentPage('cart')}
        openSearch={() => setIsSearchOpen(true)}
        openAccount={() => setIsAccountOpen(true)}
      />

      {/* Primary Page Content Router */}
      <main className="flex-1 relative z-10">
        {currentPage === 'home' && (
          <HomeView
            setCurrentPage={navigateTo}
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onStartCustomizer={handleStartCustomizer}
            onFilterOccasion={(occ) => {
              setActiveOccasionFilter(occ);
              setCurrentPage('shop');
            }}
          />
        )}

        {currentPage === 'shop' && (
          <ShopView
            products={PRODUCTS}
            activeKind={activeShopKind}
            setActiveKind={setActiveShopKind}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onStartCustomizer={handleStartCustomizer}
            initialOccasionFilter={activeOccasionFilter}
            initialCategoryFilter={activeCategoryFilter}
          />
        )}

        {currentPage === 'product-detail' && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            onBack={() => navigateTo('shop', selectedProduct.kind)}
            onAddToCartWithQty={(prod, qty) => handleAddToCart(prod, qty)}
            onCustomizeSimilar={handleCustomizeSimilar}
          />
        )}

        {currentPage === 'customizer' && (
          <CustomizerView
            initialType={customizerInitialType}
            onAddCustomToCart={handleAddCustomToCart}
            onBackToShop={() => navigateTo('shop', 'custom')}
          />
        )}

        {currentPage === 'cart' && (
          <CartView
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onEditCustomItem={(item) => {
              if (item.customConfig) {
                setCustomizerInitialType(item.customConfig.productType);
                setCurrentPage('customizer');
              }
            }}
            onProceedToCheckout={() => setCurrentPage('checkout')}
            onContinueShopping={() => navigateTo('shop')}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutView
            cartItems={cartItems}
            onOrderComplete={handleOrderComplete}
            onBackToCart={() => setCurrentPage('cart')}
          />
        )}

        {currentPage === 'order-tracking' && (
          <OrderTrackingView
            initialOrderId={activeTrackingId}
            recentOrders={recentOrders}
            onContinueShopping={() => navigateTo('shop')}
          />
        )}

        {currentPage === 'about' && (
          <AboutView
            onStartCustomizer={() => handleStartCustomizer()}
            onBrowseShop={() => navigateTo('shop')}
          />
        )}

        {currentPage === 'how-it-works' && (
          <HowItWorksView
            onStartCustomizer={() => handleStartCustomizer()}
            onBrowseReadyMade={() => navigateTo('shop', 'ready-made')}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        setCurrentPage={navigateTo}
        onSubscribeNewsletter={(email) => {
          showToast('Subscribed to Bloom Club! 🌻', `We sent a 10% welcome coupon to ${email}`);
        }}
      />

      {/* Modals & Toasts */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => {
          handleSelectProduct(p);
          setIsSearchOpen(false);
        }}
        onStartCustomizer={() => {
          handleStartCustomizer();
          setIsSearchOpen(false);
        }}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        recentOrders={recentOrders}
        onTrackOrder={(orderId) => {
          setActiveTrackingId(orderId);
          setCurrentPage('order-tracking');
          setIsAccountOpen(false);
        }}
        setCurrentPage={navigateTo}
      />

      <Toast
        toast={currentToast}
        onDismiss={() => setCurrentToast(null)}
      />
    </div>
  );
}
