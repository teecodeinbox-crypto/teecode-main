import { Product } from '../types';

export interface ProductColorVariant {
  name: string;
  hex: string;
  class: string;
}

export interface SizeGuideRow {
  size: string;
  waist: string;
  hip: string;
  length: string;
}

export interface KeyFeature {
  title: string;
  description: string;
  iconName?: string;
}

export interface TennisSkortProductConfig {
  id: string;
  name: string;
  brand: string;
  collectionName: string;
  collectionUrl: string;
  price: number;
  mrp: number;
  discountPercentage: number;
  rating: number;
  ratingCount: number;
  shortDescription: string;
  descriptionParagraphs: string[];
  defaultColor: string;
  colors: ProductColorVariant[];
  sizes: string[];
  imagesByColor: Record<string, string[]>;
  keyFeatures: KeyFeature[];
  styleItYourWay: string;
  sizeGuide: {
    headers: string[];
    rows: SizeGuideRow[];
    note: string;
  };
  detailsAccordion: {
    fabricAndCare: string[];
    shippingAndDelivery: string[];
    returnsAndExchange: string[];
  };
  seo: {
    title: string;
    description: string;
    ogImage: string;
  };
}

export const WOMENS_COLLECTION_CLEAN_URL =
  'https://www.teecode.store/shop?gender=women&category=women-gym-gear&coming-soon=true';

export const TENNIS_SKORT_CONFIG: TennisSkortProductConfig = {
  id: 'black-pleated-tennis-skort',
  name: 'Black Pleated Tennis Skort',
  brand: 'TeeCode Active Gear',
  collectionName: "Women's Collection",
  collectionUrl: WOMENS_COLLECTION_CLEAN_URL,
  price: 699,
  mrp: 1499,
  discountPercentage: 53,
  rating: 5,
  ratingCount: 142,
  shortDescription: 'Sporty performance meets effortless style.',
  descriptionParagraphs: [
    'Designed for movement, this sleek pleated tennis skort combines a flattering high-rise waistband with a feminine pleated silhouette for a polished on-court look.',
    'The built-in shorts provide added coverage and confidence, while the lightweight construction allows comfortable movement during tennis, workouts, and everyday activities.'
  ],
  defaultColor: 'Black',
  colors: [
    { name: 'Black', hex: '#111111', class: 'bg-black' },
    { name: 'Green', hex: '#3E5443', class: 'bg-[#3E5443]' },
    { name: 'White', hex: '#F3F4F6', class: 'bg-neutral-100' }
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  imagesByColor: {
    Black: [
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1792948650/Screenshot_2026-10-25_at_22.41.10_efmzpy.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1792948650/Screenshot_2026-10-25_at_22.41.17_gt6er6.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1792948651/Screenshot_2026-10-25_at_22.41.24_cddapp.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1792948652/Screenshot_2026-10-25_at_22.41.32_kzbdri.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1792948652/Screenshot_2026-10-25_at_22.41.38_etkxe9.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1792948653/Screenshot_2026-10-25_at_22.41.46_cd3ysu.png'
    ],
    Green: [
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1792948655/Screenshot_2026-10-25_at_22.45.17_a4g71j.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1792948654/Screenshot_2026-10-25_at_22.45.10_hmphcu.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1792948655/Screenshot_2026-10-25_at_22.45.23_zas1ju.png'
    ],
    White: [
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1792948657/Screenshot_2026-10-25_at_22.45.42_icuuqa.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1792948656/Screenshot_2026-10-25_at_22.45.36_w1wbw1.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1792948658/Screenshot_2026-10-25_at_22.45.47_nlwqlj.png'
    ]
  },
  keyFeatures: [
    {
      title: 'High-Rise Waistband',
      description: 'Secure and flattering fit that stays in place during high-energy movement.'
    },
    {
      title: 'Pleated Design',
      description: 'Classic pleated flow tailored for effortless mobility and elegant court aesthetic.'
    },
    {
      title: 'Built-In Shorts',
      description: 'Added inner coverage and confidence while stretching, running, or lunging.'
    },
    {
      title: 'Functional Side Pocket',
      description: 'Discreet inner short pocket for your phone, keys, tennis ball, or essentials.'
    },
    {
      title: 'Smooth Waistband',
      description: 'Elasticated lay-flat band creates a clean, streamlined silhouette with zero chafing.'
    },
    {
      title: 'Versatile Activewear',
      description: 'Engineered for tennis, golf, pickleball, gym workouts, and everyday athleisure.'
    }
  ],
  styleItYourWay:
    'Pair it with a fitted performance top and sneakers for an elevated athletic look, or style it with a casual tee and trainers for an everyday sporty outfit.',
  sizeGuide: {
    headers: ['Size', 'Waist (Inches)', 'Hip (Inches)', 'Total Length (Inches)'],
    rows: [
      { size: 'XS', waist: '24 - 26', hip: '34 - 36', length: '13.5' },
      { size: 'S', waist: '26 - 28', hip: '36 - 38', length: '14.0' },
      { size: 'M', waist: '28 - 30', hip: '38 - 40', length: '14.5' },
      { size: 'L', waist: '30 - 32', hip: '40 - 42', length: '15.0' },
      { size: 'XL', waist: '32 - 34', hip: '42 - 44', length: '15.5' },
      { size: 'XXL', waist: '34 - 36', hip: '44 - 46', length: '16.0' }
    ],
    note: 'Measurements are editable garment sizing. Model is wearing size S. We recommend choosing your standard activewear size.'
  },
  detailsAccordion: {
    fabricAndCare: [
      'Premium 4-way stretch active fabric blend with quick-dry moisture management.',
      'Breathable, lightweight, and engineered for high shape retention.',
      'Built-in inner compression shorts with smooth anti-friction flatlock seams.',
      'Machine wash cold (30°C) with like colors on gentle cycle.',
      'Do not bleach, soak, or use chemical fabric softeners.',
      'Line dry in shade or tumble dry low; do not iron directly or dry clean.'
    ],
    shippingAndDelivery: [
      'FREE shipping on all orders above ₹999 across India.',
      'Express dispatch within 24 to 48 business hours.',
      'Delivery time: 3–5 business days for metro cities, 5–7 business days for rest of India.',
      'Cash on Delivery (COD) and all major online payment options supported.'
    ],
    returnsAndExchange: [
      'Hassle-free 7-day exchange and return policy from date of product delivery.',
      'Item must be unworn, unwashed, with all original tags and hygiene liner intact.',
      'Doorstep reverse pickup arranged automatically in all serviceable pincodes.'
    ]
  },
  seo: {
    title: "Black Pleated Tennis Skort | TeeCode Active Gear — Women's Collection",
    description:
      'Shop the Black Pleated Tennis Skort from TeeCode Active Gear. High-rise waistband, built-in shorts, functional side pocket, and sporty pleated style. ₹699 (53% OFF).',
    ogImage:
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1792948650/Screenshot_2026-10-25_at_22.41.10_efmzpy.png'
  }
};

export const TENNIS_SKORT_AS_PRODUCT: Product = {
  id: 'black-pleated-tennis-skort',
  name: 'Black Pleated Tennis Skort',
  price: 1499,
  salePrice: 699,
  description:
    'Designed for movement, this sleek pleated tennis skort combines a flattering high-rise waistband with a feminine pleated silhouette for a polished on-court look. The built-in shorts provide added coverage and confidence, while the lightweight construction allows comfortable movement during tennis, workouts, and everyday activities.',
  tagline: 'Sporty performance meets effortless style.',
  fit: 'High-Rise Waistband with Built-In Shorts',
  fitType: 'Regular',
  gsm: 220,
  material: 'Premium 4-Way Stretch Active Performance Blend',
  printFront: 'Pleated silhouette with clean high-rise waistband',
  printBack: 'Streamlined athletic back profile',
  style: "TeeCode Active Gear — Women's Activewear",
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colors: [
    { name: 'Black', hex: '#111111' },
    { name: 'Green', hex: '#3E5443' },
    { name: 'White', hex: '#F3F4F6' }
  ],
  images: TENNIS_SKORT_CONFIG.imagesByColor.Black,
  colorImages: TENNIS_SKORT_CONFIG.imagesByColor,
  category: 'featured',
  tshirtType: 'TeeCode Training Gear',
  additionalTypes: ['TeeCode Training Gear', 'Bottoms'],
  gender: 'women',
  tag: '53% OFF',
  graphicDesc: 'Black Pleated Tennis Skort with high-rise waistband and built-in shorts.',
  seoTitle: "Black Pleated Tennis Skort | TeeCode Active Gear — Women's Collection",
  metaDescription:
    "Shop the Black Pleated Tennis Skort from TeeCode Active Gear. High-rise waistband, built-in shorts, functional side pocket. ₹699 (53% OFF).",
  washingInstructions: TENNIS_SKORT_CONFIG.detailsAccordion.fabricAndCare,
  productDetails: {
    fabric: 'Premium 4-way stretch active fabric blend with quick-dry moisture management',
    fit: 'High-rise athletic fit with built-in compression inner shorts',
    pocket: 'Functional side pocket on inner shorts for small essentials',
    feel: 'Lightweight, ultra-soft, breathable, and smooth on skin',
    style: 'Pleated court skirt over built-in security shorts',
    whyYoullLoveIt: [
      'High-Rise Waistband: Secure and flattering fit.',
      'Pleated Design: Designed for comfortable movement.',
      'Built-In Shorts: Added coverage and confidence while moving.',
      'Functional Side Pocket: Convenient space for small essentials.',
      'Smooth Waistband: Creates a clean, streamlined appearance.',
      'Versatile Activewear: Ideal for tennis, golf, pickleball, workouts and everyday wear.'
    ]
  }
};

