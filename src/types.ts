export type PageType = 
  | 'home' 
  | 'shop' 
  | 'ready-made' 
  | 'custom' 
  | 'product-detail' 
  | 'customizer' 
  | 'cart' 
  | 'checkout' 
  | 'order-tracking' 
  | 'about' 
  | 'how-it-works' 
  | 'accessories';

export type ProductCategory = 'bouquet' | 'basket' | 'box' | 'accessories';
export type ProductKind = 'ready-made' | 'custom';

export interface Product {
  id: string;
  name: string;
  kind: ProductKind;
  category: ProductCategory;
  price: number;
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  description: string;
  materials: string[];
  size: string;
  availability: 'In Stock' | 'Made to Order' | 'Limited Batch';
  leadTime: string;
  image: string;
  gallery: string[];
  flowersIncluded: string[];
  colors: string[];
  occasions: string[];
  featured?: boolean;
}

export interface CustomFlowerSelection {
  flowerId: string;
  flowerName: string;
  quantity: number;
  colorId: string;
  colorName: string;
  hex: string;
}

export interface CustomConfig {
  productType: 'bouquet' | 'basket' | 'box';
  productName: string;
  flowerSelections: CustomFlowerSelection[];
  primaryColor: { id: string; name: string; hex: string };
  secondaryColor: { id: string; name: string; hex: string };
  arrangementStyle: { id: string; name: string; description: string; priceModifier: number };
  vesselOrWrapper: { id: string; name: string; description: string; priceModifier: number };
  accessories: Array<{ id: string; name: string; price: number; icon: string }>;
  personalMessage: {
    recipient: string;
    messageText: string;
    sender: string;
    cardStyle: 'kraft-embossed' | 'cream-floral' | 'vintage-ribbon';
  };
  specialRequest?: string;
  estimatedPrice: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  kind: ProductKind;
  category: ProductCategory;
  unitPrice: number;
  quantity: number;
  customConfig?: CustomConfig;
}

export type OrderStatus = 'confirmed' | 'production' | 'quality_check' | 'packed' | 'shipped' | 'delivered';

export interface TrackingStep {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  current: boolean;
}

export interface OrderRecord {
  orderId: string;
  kind: ProductKind;
  orderDate: string;
  estimatedDelivery: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  recipientName: string;
  recipientAddress: string;
  customerEmail: string;
  steps: TrackingStep[];
}
