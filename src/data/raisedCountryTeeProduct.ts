import { Product } from '../types';

export interface RaisedCountryTeeConfig {
  id: string;
  name: string;
  brand: string;
  collectionName: string;
  categoryName: string;
  primaryCategoryUrl: string;
  generalCollectionUrl: string;
  tagline: string;
  price: number;
  mrp: number;
  discountPercentage: number;
  colorName: string;
  colorHex: string;
  sizes: string[];
  images: string[];
  description: {
    paragraphs: string[];
  };
  highlights: {
    title: string;
    description: string;
  }[];
  fitCopy: {
    title: string;
    description: string;
  };
  specifications: {
    label: string;
    value: string;
  }[];
  styleItYourWay: {
    title: string;
    description: string;
  }[];
  perfectFor: string[];
  sizeGuide: {
    headers: string[];
    rows: { size: string; chest: string; length: string; shoulder: string }[];
    note: string;
  };
  accordions: {
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

export const PRIMARY_CATEGORY_URL = 'https://www.teecode.store/women/t-shirts';
export const GENERAL_COLLECTION_URL =
  'https://www.teecode.store/shop?gender=women&category=women-gym-gear&coming-soon=true';

export const RAISED_COUNTRY_TEE_CONFIG: RaisedCountryTeeConfig = {
  id: 'raised-on-90s-country-graphic-tee',
  name: "Raised On 90's Country Graphic Tee",
  brand: 'TeeCode Active Gear',
  collectionName: "Women's Collection",
  categoryName: "Women's T-Shirts",
  primaryCategoryUrl: PRIMARY_CATEGORY_URL,
  generalCollectionUrl: GENERAL_COLLECTION_URL,
  tagline: 'Vintage attitude. Western soul. Everyday comfort.',
  price: 499,
  mrp: 1199,
  discountPercentage: 58,
  colorName: 'Vintage Beige',
  colorHex: '#F5F0E6',
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  images: [
    'https://res.cloudinary.com/dtzyjynai/image/upload/v1792955130/photoshoot_6_kjyqve.webp',
    'https://res.cloudinary.com/dtzyjynai/image/upload/v1792955132/photoshoot_7_t8ycn6.webp',
    'https://res.cloudinary.com/dtzyjynai/image/upload/v1792955130/photoshoot_4_zblbty.webp',
    'https://res.cloudinary.com/dtzyjynai/image/upload/v1792955129/photoshoot_3_fxehsz.webp',
    'https://res.cloudinary.com/dtzyjynai/image/upload/v1792955128/photoshoot_1_wcq1op.webp',
  ],
  description: {
    paragraphs: [
      "Bring classic country-inspired style into your everyday wardrobe with the TeeCode Raised On 90's Country Graphic Tee.",
      'Designed with a relaxed oversized silhouette and a bold vintage-inspired longhorn graphic, this statement tee delivers an effortless retro look with a distinctly western edge.',
      'The warm beige/cream base pairs perfectly with the distressed red graphic and bold typography, making it an easy standout piece for casual streetwear, festivals, road trips, concerts and everyday styling.',
    ],
  },
  highlights: [
    {
      title: 'Vintage Western Graphic',
      description: 'Bold longhorn skull artwork with distressed detailing.',
    },
    {
      title: "90's Country Design",
      description: 'Statement "Raised On 90\'S Country" typography.',
    },
    {
      title: 'Relaxed Silhouette',
      description: 'An easy oversized shape designed for effortless everyday styling.',
    },
    {
      title: 'Classic Crew Neck',
      description: 'Simple crew neckline for a timeless casual look.',
    },
    {
      title: 'Short Sleeves',
      description: 'Relaxed short sleeves for an easy, comfortable silhouette.',
    },
    {
      title: 'Versatile Neutral Color',
      description: 'Vintage beige/cream works easily with denim, black and earthy tones.',
    },
  ],
  fitCopy: {
    title: 'Relaxed / Oversized Fit',
    description:
      'The relaxed oversized silhouette creates an effortless, casual look. Wear it loose for a laid-back streetwear style or pair it with high-waisted denim, shorts or a skirt for a more defined silhouette.',
  },
  specifications: [
    { label: 'Brand', value: 'TeeCode Active Gear' },
    { label: 'Collection', value: "Women's Collection" },
    { label: 'Category', value: "Women's T-Shirts" },
    { label: 'Product Type', value: 'Graphic T-Shirt' },
    { label: 'Style', value: 'Vintage / Western / Casual' },
    { label: 'Color', value: 'Vintage Beige / Cream' },
    { label: 'Graphic', value: "Longhorn / 90's Country" },
    { label: 'Fit', value: 'Relaxed / Oversized' },
    { label: 'Neck', value: 'Crew Neck' },
    { label: 'Sleeve', value: 'Short Sleeve' },
  ],
  styleItYourWay: [
    {
      title: 'Western Look',
      description: 'Pair with distressed denim shorts, cowboy boots and a western hat.',
    },
    {
      title: 'Streetwear Look',
      description: 'Style with baggy jeans, sneakers and a crossbody bag.',
    },
    {
      title: 'Casual Look',
      description: 'Wear with denim shorts and everyday sneakers.',
    },
    {
      title: 'Festival Look',
      description: 'Pair with boots, statement accessories and layered jewelry.',
    },
  ],
  perfectFor: [
    'Everyday casual wear',
    'Weekend outfits',
    'Concerts',
    'Music festivals',
    'Country & western events',
    'Road trips',
    'Vacation styling',
    'Streetwear',
    'Casual outings',
    'Gift for country music lovers',
  ],
  sizeGuide: {
    headers: ['Size', 'Chest (Inches)', 'Length (Inches)', 'Shoulder (Inches)'],
    rows: [
      { size: 'XS', chest: '38', length: '26', shoulder: '18' },
      { size: 'S', chest: '40', length: '27', shoulder: '19' },
      { size: 'M', chest: '42', length: '28', shoulder: '20' },
      { size: 'L', chest: '44', length: '29', shoulder: '21' },
      { size: 'XL', chest: '46', length: '30', shoulder: '22' },
      { size: 'XXL', chest: '48', length: '31', shoulder: '23' },
    ],
    note: 'Garment measurements in inches. This tee has an engineered oversized cut. Order standard size for relaxed look, or size down for a standard fit.',
  },
  accordions: {
    fabricAndCare: [
      'Premium breathable cotton blend designed for a soft hand-feel and comfortable everyday wear.',
      'Gentle cold machine wash inside out with like colors.',
      'Do not bleach or dry clean.',
      'Tumble dry low or dry flat in shade.',
      'Warm iron inside out if needed; avoid ironing directly on the printed graphic.',
    ],
    shippingAndDelivery: [
      'FREE shipping on orders above ₹999 across India.',
      'Dispatches within 24 to 48 business hours.',
      'Standard express delivery across major cities in 3–5 business days; rest of India in 5–7 business days.',
      'Real-time tracking notifications provided upon dispatch.',
    ],
    returnsAndExchange: [
      'Hassle-free 7-day exchange window for unused items with original tags intact.',
      'Easy doorstep reverse pickup available in serviceable postal codes.',
      'Store credit or direct replacement for eligible returns.',
    ],
  },
  seo: {
    title: "Raised On 90's Country Graphic Tee | TeeCode Active Gear",
    description:
      "Shop the TeeCode Raised On 90's Country Graphic Tee — a vintage-inspired western graphic tee with a relaxed oversized fit. Available for ₹499.",
    ogImage:
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1792955130/photoshoot_6_kjyqve.webp',
  },
};

export const RAISED_COUNTRY_TEE_PRODUCT: Product = {
  id: 'raised-on-90s-country-graphic-tee',
  name: "Raised On 90's Country Graphic Tee",
  price: 1199,
  salePrice: 499,
  description: RAISED_COUNTRY_TEE_CONFIG.description.paragraphs.join(' '),
  tagline: RAISED_COUNTRY_TEE_CONFIG.tagline,
  fit: 'Relaxed / Oversized Fit',
  fitType: 'Oversized',
  gsm: 220,
  material: 'Premium Breathable Cotton Blend',
  printFront: 'Distressed red "Raised On 90\'S Country" with longhorn skull graphic',
  printBack: 'Plain back',
  style: "Vintage / Western / Streetwear — Women's",
  sizes: RAISED_COUNTRY_TEE_CONFIG.sizes,
  colors: [{ name: 'Vintage Beige', hex: '#F5F0E6' }],
  images: RAISED_COUNTRY_TEE_CONFIG.images,
  colorImages: {
    'Vintage Beige': RAISED_COUNTRY_TEE_CONFIG.images,
  },
  category: 'new',
  tshirtType: 'Oversized Collection',
  additionalTypes: ["Women's T-Shirts", 'Graphic Universe', 'Oversized Collection'],
  gender: 'women',
  tag: '58% OFF',
  graphicDesc: 'Vintage Western Longhorn artwork with Raised On 90S Country typography.',
  seoTitle: RAISED_COUNTRY_TEE_CONFIG.seo.title,
  metaDescription: RAISED_COUNTRY_TEE_CONFIG.seo.description,
  washingInstructions: RAISED_COUNTRY_TEE_CONFIG.accordions.fabricAndCare,
  productDetails: {
    fabric: 'Premium soft cotton blend for a breathable, lived-in feel',
    fit: 'Relaxed oversized fit with dropped shoulders and loose short sleeves',
    style: 'Western vintage graphic tee',
    feel: 'Soft, airy, comfortable everyday wear',
    whyYoullLoveIt: [
      'Bold vintage longhorn skull artwork with distressed detailing',
      'Warm vintage beige/cream base that styles with denim and neutrals',
      'Relaxed oversized silhouette that delivers effortless comfort',
    ],
  },
};
