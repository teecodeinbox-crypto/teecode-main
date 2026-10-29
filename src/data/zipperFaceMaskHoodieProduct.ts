import { Product } from '../types';

export const ZIPPER_FACE_MASK_HOODIE_BLACK_IMAGES = [
  'https://res.cloudinary.com/dtzyjynai/image/upload/v1793258473/6_xcghgn.webp',
  'https://res.cloudinary.com/dtzyjynai/image/upload/v1793258473/4_dykpcv.webp',
  'https://res.cloudinary.com/dtzyjynai/image/upload/v1793258472/1_lxklt8.webp',
  'https://res.cloudinary.com/dtzyjynai/image/upload/v1793258472/3_kaqmhy.webp',
  'https://res.cloudinary.com/dtzyjynai/image/upload/v1793258474/5_inltys.webp',
  'https://res.cloudinary.com/dtzyjynai/image/upload/v1793258473/7_oujhia.webp',
];

export const ZIPPER_FACE_MASK_HOODIE_WHITE_IMAGES = [
  'https://res.cloudinary.com/dtzyjynai/image/upload/v1793258476/5w_nul1pl.webp',
  'https://res.cloudinary.com/dtzyjynai/image/upload/v1793258477/w_moq9me.webp',
  'https://res.cloudinary.com/dtzyjynai/image/upload/v1793258481/2_krngp4.webp',
  'https://res.cloudinary.com/dtzyjynai/image/upload/v1793258476/6w_t8rg2w.webp',
  'https://res.cloudinary.com/dtzyjynai/image/upload/v1793258476/4w_fmkfis.webp',
  'https://res.cloudinary.com/dtzyjynai/image/upload/v1793258476/3w_bqkjqi.webp',
];

export const OVERSIZED_ZIPPER_FACE_MASK_HOODIE_PRODUCT: Product = {
  id: 'oversized-zipper-face-mask-hoodie',
  name: "Men's Oversized Hoodie with Zipper Face Mask – Urban Streetwear",
  brand: 'Teecode',
  price: 3999,
  salePrice: 2499,
  tagline: 'Distinctive zipper face-covering design. Relaxed oversized silhouette.',
  description:
    "Upgrade your streetwear collection with the Men's Oversized Hoodie with Zipper Face Mask, designed for those who embrace bold fashion and effortless style. Featuring a relaxed oversized fit, an attached hood, and a distinctive front zipper face-covering design, this hoodie brings a modern edge to everyday streetwear. Crafted for comfort and style, its contemporary silhouette pairs perfectly with cargo pants, joggers, and relaxed-fit denim. Whether you're heading out with friends, exploring the city, or creating a standout streetwear look, this hoodie delivers the perfect combination of urban fashion and everyday comfort.",
  fit: 'Relaxed Oversized Fit',
  fitType: 'Oversized',
  gsm: 360,
  material: 'Premium Heavyweight Cotton-Poly Fleece with Soft Brushed Interior',
  printFront: 'Functional front zipper face-covering detail, attached hood & kangaroo pocket',
  printBack: 'Clean, minimalist urban streetwear silhouette',
  style: 'Urban Streetwear / Contemporary Techwear / Men\'s Fashion',
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  colors: [
    { name: 'Black', hex: '#111111' },
    { name: 'White', hex: '#FFFFFF' },
  ],
  // Primary product images default to Black variant (with first Black image as card thumbnail)
  images: [...ZIPPER_FACE_MASK_HOODIE_BLACK_IMAGES],
  colorImages: {
    'Black': ZIPPER_FACE_MASK_HOODIE_BLACK_IMAGES,
    'White': ZIPPER_FACE_MASK_HOODIE_WHITE_IMAGES,
  },
  category: 'new',
  gender: 'men',
  tshirtType: 'Hoodies',
  additionalTypes: ['Hoodies'],
  tag: '37.5% OFF',
  graphicDesc: "Men's Oversized Hoodie with Zipper Face Mask, Urban Streetwear Hoodie, Face-Covering Detail with Front Zipper, Kangaroo Pocket, Relaxed Fit",
  seoTitle: "Men's Oversized Hoodie with Zipper Face Mask | Teecode",
  metaDescription:
    "Shop the men's oversized hoodie with zipper face mask at Teecode. Featuring a relaxed fit, attached hood, kangaroo pocket, and modern urban streetwear design. Available in Black and White at ₹2,499.",
  seoKeywords: [
    "men's oversized hoodie",
    'zipper face mask hoodie',
    'streetwear hoodie for men',
    'urban fashion hoodie',
    'oversized pullover hoodie',
    "men's fashion hoodie",
    'hoodie with face covering',
    'cargo pants streetwear',
    'Teecode hoodie',
  ],
  features: [
    'Oversized Fit: Relaxed silhouette for a contemporary streetwear look.',
    'Zipper Face Mask Design: Distinctive face-covering detail with a front zipper.',
    'Attached Hood: Stylish, urban-inspired finish.',
    'Kangaroo Pocket: Practical front pocket for everyday convenience.',
    'Ribbed Hem and Cuffs: Comfortable and structured fit.',
    'Versatile Styling: Easy to pair with cargo pants, joggers, and sneakers.',
    'Streetwear Essential: Ideal for casual outings, urban fashion, and everyday styling.',
  ],
  productDetails: {
    fabric: 'Premium Heavyweight Cotton-Poly Fleece (360 GSM) with soft brushed inner lining',
    fit: 'Relaxed oversized streetwear silhouette for freedom of movement',
    hood: 'Attached streetwear hood with integrated zip-up face-mask collar',
    pocket: 'Spacious front kangaroo pocket for warmth and essentials',
    sleeves: 'Dropped shoulders with ribbed cuffs for structured shape retention',
    construction: 'Reinforced double-needle stitching along stress seams',
    feel: 'Heavyweight, plush, and cozy for all-day comfort',
    style: 'Pair with cargo pants, joggers, relaxed denim, and high-top sneakers',
    whyYoullLoveIt: [
      'Oversized Fit: Relaxed silhouette for a contemporary streetwear look.',
      'Zipper Face Mask Design: Distinctive face-covering detail with a front zipper.',
      'Attached Hood: Stylish, urban-inspired finish.',
      'Kangaroo Pocket: Practical front pocket for everyday convenience.',
      'Ribbed Hem and Cuffs: Comfortable and structured fit.',
      'Versatile Styling: Easy to pair with cargo pants, joggers, and sneakers.',
      'Streetwear Essential: Ideal for casual outings, urban fashion, and everyday styling.',
    ],
  },
  customSizeChart: {
    title: "Men's Oversized Zipper Face Mask Hoodie Size Guide",
    columns: ['Size', 'Chest (Full)', 'Shoulder', 'Length', 'Sleeve Length'],
    rows: [
      { size: 'S', chest: '42', shoulder: '21', length: '27', sleeve: '23' },
      { size: 'M', chest: '44', shoulder: '22', length: '28', sleeve: '23.5' },
      { size: 'L', chest: '46', shoulder: '23', length: '29', sleeve: '24' },
      { size: 'XL', chest: '48', shoulder: '24', length: '30', sleeve: '24.5' },
      { size: 'XXL', chest: '50', shoulder: '25', length: '31', sleeve: '25' },
    ],
    instructions:
      'Our oversized hoodie is designed with a relaxed silhouette for a comfortable and contemporary streetwear look. Chest measurements represent the full garment circumference. For the best fit, compare the measurements with a hoodie you already own. Please allow a measurement tolerance of 0.5–1 inch due to manual measurement.',
    notes: [
      'For a regular fit, consider choosing one size smaller.',
      'For a relaxed oversized look, select your usual size.',
      'For an extra-loose streetwear fit, consider sizing up.',
      'Chest measurements represent the full garment circumference.',
      'Compare measurements with a hoodie you already own for optimal sizing.',
    ],
  },
  washingInstructions: [
    'Machine wash cold (30°C) with like colors',
    'Turn inside out before washing to protect zipper and hardware',
    'Do not bleach or dry clean',
    'Tumble dry low or line dry in shade',
    'Cool iron on reverse side if needed; do not iron directly over zipper',
  ],
};
