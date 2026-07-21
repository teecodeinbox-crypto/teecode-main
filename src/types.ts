export interface Product {
  id: string;
  name: string;
  price: number; // e.g. 999
  salePrice?: number; // e.g. 799
  description: string;
  fit: string; // e.g. "Oversized fit"
  fitType: 'Oversized' | 'Regular' | 'Slim' | 'Crop'; // e.g. "Oversized", "Regular", "Slim", "Crop"
  gsm: number; // e.g. 240
  material: string; // e.g. "240 GSM premium cotton"
  printFront: string; // e.g. "Front printed design"
  printBack: string; // e.g. "Plain back"
  style: string; // e.g. "Unisex streetwear style"
  sizes: string[]; // ['S', 'M', 'L', 'XL', 'XXL']
  colors: { name: string; hex: string }[]; // [{ name: 'Black', hex: '#000000' }, ...]
  images: string[]; // images of this product
  colorImages?: Record<string, string[]>; // per-color-variant image galleries
  category: 'featured' | 'new' | 'bestseller';
  tshirtType?: 'Oversized Collection' | 'TeeCode Training Gear' | 'Hoodies' | 'Anime Code' | 'Graphic Universe' | 'Washed Edition' | 'Essential Solids' | 'Classic Polo' | 'Casual Trousers' | 'Casual Shirts';
  additionalTypes?: string[]; // allows product to appear in multiple categories
  gender?: 'men' | 'women' | 'unisex'; // gender tab assignment
  tag?: string; // e.g., "LIMITED DROP", "BEST SELLER"
  graphicDesc: string;
  sizeChartImage?: string; // static size chart image URL
  washingInstructions: string[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  avatarColor: string;
}

export interface LookbookItem {
  id: string;
  imageUrl: string;
  title: string;
  tag: string;
  instaUrl?: string;
  facebookUrl?: string;
}
