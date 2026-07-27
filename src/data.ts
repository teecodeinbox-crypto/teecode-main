import { Product, Review, LookbookItem } from './types';
import regeneratedImage1 from './assets/images/regenerated_image_1783024087886.png';
import regeneratedImage2 from './assets/images/regenerated_image_1783024091462.png';

export const COLORS = [
  { name: 'Black', hex: '#0F0F11' },
  { name: 'White', hex: '#F9FAFB' },
  { name: 'Brown', hex: '#5C4033' },
  { name: 'Olive Green', hex: '#3B3F30' },
  { name: 'Beige', hex: '#E1D9D1' },
  { name: 'Navy Blue', hex: '#1E293B' },
  { name: 'Sky Blue', hex: '#87CEEB' },
  { name: 'Grey', hex: '#808080' },
  { name: 'Maroon', hex: '#800020' },
  { name: 'Blue', hex: '#4169E1' },
  { name: 'Red', hex: '#DC2626' },
  { name: 'Yellow', hex: '#F5C518' },
  { name: 'Light Grey', hex: '#D3D3D3' }
];

export const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export const WASHING_INSTRUCTIONS = [
  'Machine wash cold, inside out, with like colors (gentle cycle).',
  'Do not bleach or dry clean to preserve print quality.',
  'Tumble dry low or hang dry in shade for best longevity.',
  'Warm iron inside out if needed. Never iron directly over the printed graphic design.',
  'Avoid fabric softeners to maintain the 240 GSM premium heavy cotton texture.'
];

export const FAQS = [
  {
    question: 'What is the material and fit of TeeCode T-shirts?',
    answer: 'All TeeCode T-shirts are made from 240 GSM premium 100% combed cotton, providing a heavy, high-quality structure. They feature an engineered unisex oversized fit with dropped shoulders for the ultimate streetwear silhouette.'
  },
  {
    question: 'How do I choose my size?',
    answer: 'We recommend ordering your standard size for the intended relaxed, oversized fit. If you prefer a more regular or fitted silhouette, size down one size. Please refer to our interactive Size Guide for detailed measurements.'
  },
  {
    question: 'How can I place an order via WhatsApp?',
    answer: 'You can click the "Buy on WhatsApp" button on any product page or checkout page. This will generate a pre-filled message detailing your selected t-shirt, size, and color, and connect you directly with our concierge team to finalize your order.'
  },
  {
    question: 'What payment options are available?',
    answer: 'Our website is Razorpay and Cashfree gateway ready, supporting credit/debit cards, UPI (GPay, PhonePe, Paytm), Net Banking, and popular digital wallets. We also support manual verification for WhatsApp orders.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'We ship orders within 24–48 hours. Delivery takes 3–5 business days for major metropolitan areas and 5–7 business days for the rest of India.'
  },
  {
    question: 'What is your exchange and return policy?',
    answer: 'We offer hassle-free exchanges or store credit within 7 days of delivery for any unworn, unwashed products with tags intact. View our full Return & Shipping Policy page for full details.'
  }
];

export const PRODUCTS: Product[] = [
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Karan Malhotra',
    rating: 5,
    comment: 'Honestly, the best oversized fit I have ever bought in India. The 240 GSM is extremely high-quality and stiff, so it drops perfectly on the shoulders. Already ordered 2 more colors!',
    date: 'June 24, 2026',
    verified: true,
    avatarColor: 'bg-rose-500'
  },
  {
    id: 'r2',
    name: 'Ananya Roy',
    rating: 5,
    comment: 'The Tokyo Drift design is insane. The graphic doesn\'t crack even after three machine washes inside out. Very premium fabric and super comfortable for summer.',
    date: 'June 18, 2026',
    verified: true,
    avatarColor: 'bg-zinc-700'
  },
  {
    id: 'r3',
    name: 'Rohan Sharma',
    rating: 4,
    comment: 'Super fast delivery (got it in Bangalore in 2 days). The material is heavy, so it feels very expensive. Ordered XL but L would have fit fine too. It is indeed very oversized.',
    date: 'May 30, 2026',
    verified: true,
    avatarColor: 'bg-amber-600'
  },
  {
    id: 'r4',
    name: 'Sneha Patel',
    rating: 5,
    comment: 'The Earth Core olive green is beautiful. Hard to find unisex streetwear with actual 240 GSM cotton at this price. Absolute steal for ₹799!',
    date: 'May 14, 2026',
    verified: true,
    avatarColor: 'bg-emerald-600'
  }
];

export const LOOKBOOK: LookbookItem[] = [
  {
    id: 'l1',
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop',
    title: 'NIGHT RACING SQUAD',
    tag: 'Tokyo Drift Style',
    instaUrl: 'https://www.instagram.com/teecode_apparel/',
    facebookUrl: 'https://www.facebook.com/profile.php?id=61590684009463'
  },
  {
    id: 'l2',
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop',
    title: 'CYBER STREET RUNNER',
    tag: 'Cyberpunk Drop',
    instaUrl: 'https://www.instagram.com/teecode_apparel/',
    facebookUrl: 'https://www.facebook.com/profile.php?id=61590684009463'
  },
  {
    id: 'l3',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop',
    title: 'MINIMAL CONCRETE ELEVATION',
    tag: 'Acid Wash Boxy',
    instaUrl: 'https://www.instagram.com/teecode_apparel/',
    facebookUrl: 'https://www.facebook.com/profile.php?id=61590684009463'
  },
  {
    id: 'l4',
    imageUrl: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop',
    title: 'INDUSTRIAL OVERSIZED COMFORT',
    tag: 'Heavyweight Core',
    instaUrl: 'https://www.instagram.com/teecode_apparel/',
    facebookUrl: 'https://www.facebook.com/profile.php?id=61590684009463'
  }
];

export const SIZE_CHART = {
  columns: ['Size', 'Chest (inches)', 'Length (inches)', 'Sleeve (inches)', 'Shoulder (inches)'],
  rows: [
    { size: 'S', chest: '44', length: '28.5', sleeve: '9.0', shoulder: '20.0' },
    { size: 'M', chest: '46', length: '29.5', sleeve: '9.5', shoulder: '21.0' },
    { size: 'L', chest: '48', length: '30.5', sleeve: '10.0', shoulder: '22.0' },
    { size: 'XL', chest: '50', length: '31.5', sleeve: '10.5', shoulder: '23.0' },
    { size: 'XXL', chest: '52', length: '32.5', sleeve: '11.0', shoulder: '24.0' }
  ],
  instructions: 'For a true oversized streetwear silhouette with dropped shoulders, buy your standard size. For a regular fit, size down.'
};

export const SIZE_CHARTS = {
  Oversized: {
    title: 'Oversized Fit',
    columns: ['Size', 'Chest (inches)', 'Length (inches)', 'Sleeve (inches)', 'Shoulder (inches)'],
    rows: [
      { size: 'S', chest: '44', length: '28.5', sleeve: '9.0', shoulder: '20.0' },
      { size: 'M', chest: '46', length: '29.5', sleeve: '9.5', shoulder: '21.0' },
      { size: 'L', chest: '48', length: '30.5', sleeve: '10.0', shoulder: '22.0' },
      { size: 'XL', chest: '50', length: '31.5', sleeve: '10.5', shoulder: '23.0' },
      { size: 'XXL', chest: '52', length: '32.5', sleeve: '11.0', shoulder: '24.0' }
    ],
    instructions: 'Engineered unisex streetwear oversized dimensions with dropped shoulders and a heavy loose drape. We recommend ordering your standard size.'
  },
  Regular: {
    title: 'Regular Fit',
    columns: ['Size', 'Chest (inches)', 'Length (inches)', 'Sleeve (inches)', 'Shoulder (inches)'],
    rows: [
      { size: 'S', chest: '38', length: '27.0', sleeve: '8.0', shoulder: '17.5' },
      { size: 'M', chest: '40', length: '28.0', sleeve: '8.5', shoulder: '18.5' },
      { size: 'L', chest: '42', length: '29.0', sleeve: '9.0', shoulder: '19.5' },
      { size: 'XL', chest: '44', length: '30.0', sleeve: '9.5', shoulder: '20.5' },
      { size: 'XXL', chest: '46', length: '31.0', sleeve: '10.0', shoulder: '21.5' }
    ],
    instructions: 'A balanced classic drape built for comfort and natural body contouring. Fits true to size.'
  },
  Slim: {
    title: 'Slim Fit',
    columns: ['Size', 'Chest (inches)', 'Length (inches)', 'Sleeve (inches)', 'Shoulder (inches)'],
    rows: [
      { size: 'S', chest: '36', length: '26.5', sleeve: '7.5', shoulder: '16.5' },
      { size: 'M', chest: '38', length: '27.5', sleeve: '8.0', shoulder: '17.5' },
      { size: 'L', chest: '40', length: '28.5', sleeve: '8.5', shoulder: '18.5' },
      { size: 'XL', chest: '42', length: '29.5', sleeve: '9.0', shoulder: '19.5' },
      { size: 'XXL', chest: '44', length: '30.5', sleeve: '9.5', shoulder: '20.5' }
    ],
    instructions: 'An athletic contoured fit designed to hug the torso comfortably. Go one size up if you prefer a looser fit.'
  },
  Crop: {
    title: 'Crop Fit',
    columns: ['Size', 'Chest (inches)', 'Length (inches)', 'Sleeve (inches)', 'Shoulder (inches)'],
    rows: [
      { size: 'S', chest: '42', length: '17.5', sleeve: '7.0', shoulder: '19.0' },
      { size: 'M', chest: '44', length: '18.5', sleeve: '7.5', shoulder: '20.0' },
      { size: 'L', chest: '46', length: '19.5', sleeve: '8.0', shoulder: '21.0' },
      { size: 'XL', chest: '48', length: '20.5', sleeve: '8.5', shoulder: '22.0' },
      { size: 'XXL', chest: '50', length: '21.5', sleeve: '9.0', shoulder: '23.0' }
    ],
    instructions: 'A trendy boxy cropped cut. Wide through the body but shortened at the hem to pair beautifully with high-waisted denim or cargo pants.'
  }
};

export function getNocturnisImage(
  name: string,
  price: number,
  gsm: number,
  fitType: string,
  pose: 'front' | 'back' | 'detail' | 'model' = 'front'
): string {
  const cleanId = name.replace(/[^a-zA-Z0-9]/g, '');
  const uppercaseName = name.toUpperCase();
  const activePoseLabel = pose.toUpperCase();

  let bodyContent = '';

  if (pose === 'front') {
    bodyContent = `
    <!-- MODEL SILHOUETTE (FRONT VIEW) -->
    <g id="model-container">
      <path d="M 370 230 C 370 210 400 190 420 200 C 440 210 450 230 445 250" fill="none" stroke="#333339" stroke-width="3" />
      <path d="M 350 120 C 330 140 330 170 340 190 C 350 200 370 210 390 200 C 410 190 420 170 430 150 C 440 130 430 100 400 90 C 370 80 360 100 350 120 Z" fill="#08080a" />
      <circle cx="345" cy="130" r="15" fill="#0a0a0d" />
      <circle cx="360" cy="115" r="15" fill="#08080a" />
      <circle cx="380" cy="100" r="18" fill="#050506" />
      <circle cx="410" cy="110" r="16" fill="#09090c" />
      <circle cx="425" cy="130" r="14" fill="#08080a" />
      <circle cx="415" cy="150" r="12" fill="#0a0a0d" />
      <circle cx="355" cy="165" r="15" fill="#08080a" />
      <path d="M 360 160 C 355 170 355 180 360 185 C 362 187 365 185 365 180" fill="#202024" />
      <path d="M 365 185 L 380 215 C 390 225 410 230 425 220" fill="none" stroke="#25252a" stroke-width="2" />
      <!-- THE T-SHIRT (FRONT VIEW) -->
      <path d="M 220 340 C 260 250 310 240 360 240 C 380 240 400 242 420 240 C 470 240 520 250 560 340 C 580 390 590 460 610 520 C 590 530 550 540 520 530 L 510 650 C 510 730 520 800 525 810 C 450 820 350 820 260 810 C 265 800 275 730 275 650 L 265 530 C 235 540 195 530 175 520 C 195 460 200 390 220 340 Z" fill="#121215" stroke="#1f1f24" stroke-width="2" />
      <path d="M 285 270 L 255 375" stroke="#09090b" stroke-width="3" opacity="0.8" />
      <path d="M 495 270 L 525 375" stroke="#09090b" stroke-width="3" opacity="0.8" />
      <path d="M 355 240 C 355 255 425 255 425 240" fill="none" stroke="#2a2a32" stroke-width="5" />
      <path d="M 260 400 Q 300 450 310 520" fill="none" stroke="#0a0a0c" stroke-width="12" opacity="0.6" />
      <path d="M 520 400 Q 480 450 470 520" fill="none" stroke="#0a0a0c" stroke-width="12" opacity="0.6" />
      <path d="M 275 620 C 320 640 460 640 510 620" fill="none" stroke="#070709" stroke-width="10" opacity="0.7" />
      <path d="M 265 720 C 320 745 460 745 520 720" fill="none" stroke="#070709" stroke-width="12" opacity="0.8" />
      <path d="M 330 255 Q 350 400 310 650" fill="none" stroke="#000000" stroke-width="6" opacity="0.5" />
      <path d="M 450 255 Q 430 400 470 650" fill="none" stroke="#000000" stroke-width="6" opacity="0.5" />
      
      <!-- GOTHIC SCREEN PRINT DESIGN (ON THE SHIRT) -->
      <g id="shirt-print-artwork" transform="translate(0, 40)">
        <path d="M 310 320 Q 390 230 470 320 L 470 560 L 310 560 Z" fill="#18181c" stroke="#2c2c35" stroke-width="1.5" />
        <path d="M 315 325 Q 390 240 465 325 L 465 555 L 315 555 Z" fill="#141417" stroke="#ff2e2e" stroke-width="0.75" stroke-dasharray="2,2" />
        <path d="M 330 350 Q 390 290 450 350 L 450 540 L 330 540 Z" fill="none" stroke="#25252b" stroke-width="1" />
        
        <!-- Angel Wings -->
        <path d="M 320 410 C 280 340 310 280 370 350 C 340 380 330 420 320 410 Z" fill="#2d2d35" stroke="#3a3a45" stroke-width="0.5" />
        <path d="M 460 410 C 500 340 470 280 410 350 C 440 380 450 420 460 410 Z" fill="#2d2d35" stroke="#3a3a45" stroke-width="0.5" />
        <path d="M 300 370 Q 330 360 350 375 M 290 390 Q 320 380 345 395" stroke="#484855" stroke-width="1" />
        <path d="M 480 370 Q 450 360 430 375 M 490 390 Q 460 380 435 395" stroke="#484855" stroke-width="1" />
        
        <path d="M 370 390 Q 390 350 410 390 L 420 530 L 360 530 Z" fill="#3a3a45" />
        <path d="M 380 400 L 375 520 M 390 395 L 390 530 M 400 400 L 405 520" stroke="#1f1f24" stroke-width="1.5" />
        <path d="M 360 360 Q 390 345 420 360" fill="none" stroke="#5c5c6b" stroke-width="1.5" />
        <circle cx="390" cy="370" r="10" fill="#4d4d5a" />
        <path d="M 385 365 Q 390 360 395 365 M 382 370 Q 390 375 398 370" fill="none" stroke="#202025" stroke-width="1" />
        <line x1="390" y1="380" x2="390" y2="480" stroke="#d4af37" stroke-width="2" />
        <line x1="378" y1="395" x2="402" y2="395" stroke="#d4af37" stroke-width="2" />
        <circle cx="390" cy="485" r="2.5" fill="#d4af37" />
        
        <path id="brandPath-${cleanId}" d="M 315 310 Q 390 240 465 310" fill="none" stroke="none" />
        <text font-family="\'Cinzel\', \'Georgia\', serif" font-size="28" font-weight="900" fill="#ffffff" letter-spacing="4" text-anchor="middle" filter="url(#glow)">
          <textPath href="#brandPath-${cleanId}" startOffset="50%">Nocturnis</textPath>
        </text>
        <text x="390" y="325" font-family="\'Courier New\', monospace" font-size="6" fill="#ff2e2e" font-weight="bold" letter-spacing="1" text-anchor="middle">
          IN DARKNESS, I FIND MY TRUTH
        </text>
        <circle cx="390" cy="515" r="12" fill="none" stroke="#3a3a45" stroke-width="1" />
        <path d="M 390 503 L 390 527 M 378 515 L 402 515" stroke="#3a3a45" stroke-width="1" />
        <text x="390" y="545" font-family="\'Courier New\', monospace" font-size="5" fill="#4d4d5a" letter-spacing="1" text-anchor="middle">
          MEMENTO MORI • TEMPUS FUGIT
        </text>
        <text x="390" y="552" font-family="\'Courier New\', monospace" font-size="4" fill="#ff2e2e" letter-spacing="1" text-anchor="middle">
          BEYOND THE SHADOWS LIES THE FREEDOM
        </text>
      </g>
      <circle cx="282" cy="740" r="4" fill="#333339" stroke="#121215" stroke-width="1" />
      <path d="M 282 744 L 285 765" stroke="#333339" stroke-width="2" stroke-linecap="round" />
      <circle cx="502" cy="740" r="4" fill="#333339" stroke="#121215" stroke-width="1" />
      <path d="M 502 744 L 499 765" stroke="#333339" stroke-width="2" stroke-linecap="round" />
    </g>`;
  } else if (pose === 'back') {
    bodyContent = `
    <!-- MODEL SILHOUETTE (BACK VIEW) -->
    <g id="model-container-back">
      <path d="M 345 110 C 330 130 330 160 340 180 C 350 200 370 215 395 215 C 420 215 440 200 450 180 C 460 160 460 130 445 110 C 420 90 370 90 345 110 Z" fill="#08080a" />
      <path d="M 370 215 C 380 230 410 230 420 215 L 415 235 L 375 235 Z" fill="#202024" />
      
      <!-- THE T-SHIRT (REAR VIEW) -->
      <path d="M 220 340 C 260 250 310 240 360 240 C 380 240 400 242 420 240 C 470 240 520 250 560 340 C 580 390 590 460 610 520 C 590 530 550 540 520 530 L 510 650 C 510 730 520 800 525 810 C 450 820 350 820 260 810 C 265 800 275 730 275 650 L 265 530 C 235 540 195 530 175 520 C 195 460 200 390 220 340 Z" fill="#121215" stroke="#1f1f24" stroke-width="2" />
      
      <path d="M 285 270 L 255 375" stroke="#09090b" stroke-width="3" opacity="0.8" />
      <path d="M 495 270 L 525 375" stroke="#09090b" stroke-width="3" opacity="0.8" />
      <path d="M 355 240 C 355 230 425 230 425 240" fill="none" stroke="#25252b" stroke-width="5" />
      <path d="M 355 242 C 355 232 425 232 425 242" fill="none" stroke="#1a1a20" stroke-width="2" />
      
      <path d="M 255 375 Q 310 400 330 480" fill="none" stroke="#070709" stroke-width="8" opacity="0.5" />
      <path d="M 525 375 Q 470 400 450 480" fill="none" stroke="#070709" stroke-width="8" opacity="0.5" />
      <path d="M 275 650 C 340 665 440 665 510 650" fill="none" stroke="#070709" stroke-width="10" opacity="0.6" />
      <path d="M 265 740 C 340 760 440 760 520 740" fill="none" stroke="#070709" stroke-width="12" opacity="0.8" />
      
      <!-- LARGE GOTHIC REAR BRAND PRINT -->
      <g transform="translate(0, -20)">
        <path d="M 390 320 L 390 620 M 310 410 L 470 410" stroke="#1d1d23" stroke-width="12" stroke-linecap="square" opacity="0.8" />
        <path d="M 390 320 L 390 620 M 310 410 L 470 410" stroke="#ff2e2e" stroke-width="2" stroke-linecap="square" opacity="0.4" />
        
        <text x="390" y="340" font-family="\'Cinzel\', \'Georgia\', serif" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="6">T</text>
        <text x="390" y="380" font-family="\'Cinzel\', \'Georgia\', serif" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="6">E</text>
        <text x="390" y="420" font-family="\'Cinzel\', \'Georgia\', serif" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="6">E</text>
        <text x="390" y="460" font-family="\'Cinzel\', \'Georgia\', serif" font-size="14" font-weight="900" fill="#ff2e2e" text-anchor="middle" letter-spacing="6">C</text>
        <text x="390" y="500" font-family="\'Cinzel\', \'Georgia\', serif" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="6">O</text>
        <text x="390" y="540" font-family="\'Cinzel\', \'Georgia\', serif" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="6">D</text>
        <text x="390" y="580" font-family="\'Cinzel\', \'Georgia\', serif" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="6">E</text>
        
        <path id="backArch" d="M 280 320 Q 390 270 500 320" fill="none" stroke="none" />
        <text font-family="\'Courier New\', monospace" font-size="11" font-weight="black" fill="#ff2e2e" letter-spacing="4" text-anchor="middle">
          <textPath href="#backArch" startOffset="50%">CRAFTED FOR STREET VANDALS</textPath>
        </text>
        
        <rect x="300" y="605" width="180" height="40" fill="#15151b" stroke="#ff2e2e" stroke-width="0.5" opacity="0.5" />
        <text x="390" y="618" font-family="\'Courier New\', monospace" font-size="6.5" fill="#a1a1aa" font-weight="bold" text-anchor="middle">PRODUCT SYSTEM ID: ${cleanId.slice(0, 10).toUpperCase()}</text>
        <text x="390" y="628" font-family="\'Courier New\', monospace" font-size="6.5" fill="#ffffff" font-weight="black" text-anchor="middle">240 GSM COMBED COTTON - HEAVY DRAPE</text>
        <text x="390" y="638" font-family="\'Courier New\', monospace" font-size="5.5" fill="#ff2e2e" font-weight="bold" text-anchor="middle">GENUINE TEECODE.STORE HARDWARE</text>
      </g>
    </g>`;
  } else if (pose === 'detail') {
    // Generate static grid texture lines manually to avoid nested template literal issues
    let gridLinesHtml = '';
    for (let i = 0; i < 40; i++) {
      gridLinesHtml += `<line x1="${i * 15}" y1="0" x2="${i * 15}" y2="660" />`;
    }
    for (let i = 0; i < 44; i++) {
      gridLinesHtml += `<line x1="0" y1="${i * 15}" x2="600" y2="${i * 15}" />`;
    }

    bodyContent = `
    <!-- DETAILED CLOSE-UP ZOOM & WOVEN LABEL TAG VIEW -->
    <g id="detail-tag-view" transform="translate(100, 160)">
      <rect x="0" y="0" width="600" height="660" fill="#101013" rx="10" stroke="#25252b" stroke-width="2" />
      
      <g stroke="#18181d" stroke-width="1" opacity="0.4">
        ${gridLinesHtml}
      </g>
      
      <path d="M -50 40 Q 300 180 650 40" fill="none" stroke="#1c1c22" stroke-width="40" />
      <path d="M -50 68 Q 300 208 650 68" fill="none" stroke="#ff2e2e" stroke-width="1.5" stroke-dasharray="3,3" />
      <path d="M -50 74 Q 300 214 650 74" fill="none" stroke="#ff2e2e" stroke-width="1.5" stroke-dasharray="3,3" />
      
      <g transform="translate(150, 150)">
        <rect x="-10" y="-10" width="320" height="420" fill="#000000" opacity="0.6" rx="4" />
        <rect x="0" y="0" width="300" height="400" fill="#15151a" stroke="#2c2c34" stroke-width="3" rx="2" />
        <rect x="8" y="8" width="284" height="384" fill="none" stroke="#ff2e2e" stroke-width="1" stroke-dasharray="3,3" opacity="0.6" />
        
        <text x="150" y="45" font-family="\'Cinzel\', \'Georgia\', serif" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="4">TEECODE</text>
        <text x="150" y="65" font-family="\'Courier New\', monospace" font-size="8" font-weight="bold" fill="#ff2e2e" text-anchor="middle" letter-spacing="6">STREET LABORATORY</text>
        <line x1="40" y1="80" x2="260" y2="80" stroke="#2c2c34" stroke-width="1" />
        
        <text x="150" y="115" font-family="\'Courier New\', monospace" font-size="12" fill="#a1a1aa" font-weight="bold" text-anchor="middle">SIZE :</text>
        <text x="150" y="160" font-family="\'Cinzel\', \'Georgia\', serif" font-size="44" fill="#ffffff" font-weight="900" text-anchor="middle" letter-spacing="1">M</text>
        <text x="150" y="185" font-family="\'Courier New\', monospace" font-size="9" fill="#ff2e2e" font-weight="black" text-anchor="middle" letter-spacing="3">${fitType.toUpperCase()} FIT</text>
        
        <line x1="40" y1="205" x2="260" y2="205" stroke="#2c2c34" stroke-width="1" />
        
        <g font-family="\'Courier New\', monospace" font-size="8.5" fill="#d4d4d8" text-anchor="middle">
          <text x="150" y="230" font-weight="bold" fill="#ffffff">100% COMBED COTTON</text>
          <text x="150" y="247" font-weight="bold" fill="#ffffff">${gsm} GSM DOUBLE COMPACT</text>
          <text x="150" y="264" fill="#a1a1aa">PRE-SHRUNK FABRIC</text>
          <text x="150" y="281" fill="#a1a1aa">WASH INSIDE OUT WITH COLD WATER</text>
          <text x="150" y="298" fill="#ff2e2e" font-weight="bold">DO NOT IRON DIRECTLY ON GRAPHICS</text>
        </g>
        
        <line x1="45" y1="315" x2="255" y2="315" stroke="#2c2c34" stroke-width="1" />
        
        <g transform="translate(60, 330)">
          <line x1="5" y1="0" x2="5" y2="22" stroke="#ffffff" stroke-width="1.5" />
          <line x1="10" y1="0" x2="10" y2="22" stroke="#ffffff" stroke-width="3" />
          <line x1="16" y1="0" x2="16" y2="22" stroke="#ffffff" stroke-width="1" />
          <line x1="22" y1="0" x2="22" y2="22" stroke="#ffffff" stroke-width="4" />
          <line x1="29" y1="0" x2="29" y2="22" stroke="#ffffff" stroke-width="1.5" />
          <line x1="34" y1="0" x2="34" y2="22" stroke="#ffffff" stroke-width="2.5" />
          <line x1="41" y1="0" x2="41" y2="22" stroke="#ffffff" stroke-width="1" />
          <line x1="47" y1="0" x2="47" y2="22" stroke="#ffffff" stroke-width="3" />
          <line x1="55" y1="0" x2="55" y2="22" stroke="#ffffff" stroke-width="1.5" />
          <line x1="62" y1="0" x2="62" y2="22" stroke="#ffffff" stroke-width="4.5" />
          <line x1="71" y1="0" x2="71" y2="22" stroke="#ffffff" stroke-width="1" />
          <line x1="76" y1="0" x2="76" y2="22" stroke="#ffffff" stroke-width="2" />
          <line x1="83" y1="0" x2="83" y2="22" stroke="#ffffff" stroke-width="3.5" />
          <line x1="91" y1="0" x2="91" y2="22" stroke="#ffffff" stroke-width="1.5" />
          <line x1="97" y1="0" x2="97" y2="22" stroke="#ffffff" stroke-width="4" />
          <line x1="105" y1="0" x2="105" y2="22" stroke="#ffffff" stroke-width="1" />
          <line x1="110" y1="0" x2="110" y2="22" stroke="#ffffff" stroke-width="2.5" />
          <line x1="118" y1="0" x2="118" y2="22" stroke="#ffffff" stroke-width="1.5" />
          <line x1="124" y1="0" x2="124" y2="22" stroke="#ffffff" stroke-width="4.5" />
          <line x1="131" y1="0" x2="131" y2="22" stroke="#ffffff" stroke-width="1" />
          <line x1="137" y1="0" x2="137" y2="22" stroke="#ffffff" stroke-width="3" />
          <line x1="145" y1="0" x2="145" y2="22" stroke="#ffffff" stroke-width="1.5" />
          <line x1="152" y1="0" x2="152" y2="22" stroke="#ffffff" stroke-width="4" />
          <line x1="160" y1="0" x2="160" y2="22" stroke="#ffffff" stroke-width="1" />
          <line x1="165" y1="0" x2="165" y2="22" stroke="#ffffff" stroke-width="2.5" />
          <line x1="172" y1="0" x2="172" y2="22" stroke="#ffffff" stroke-width="3.5" />
          
          <text x="90" y="32" font-size="7" fill="#88888e" font-weight="bold" letter-spacing="2" text-anchor="middle">AUTHENTIC * TEECODE * ${cleanId.slice(0, 4).toUpperCase()}</text>
        </g>
      </g>
      
      <line x1="30" y1="0" x2="30" y2="660" stroke="#1d1d23" stroke-width="2" stroke-dasharray="5,5" />
      <line x1="570" y1="0" x2="570" y2="660" stroke="#1d1d23" stroke-width="2" stroke-dasharray="5,5" />
    </g>`;
  } else if (pose === 'model') {
    let backgroundLines = '';
    for (let i = 0; i < 11; i++) {
      backgroundLines += `<line x1="${150 + i * 50}" y1="130" x2="${150 + i * 50}" y2="810" stroke="#1a1a20" stroke-width="0.5" opacity="0.6" />`;
    }
    for (let i = 0; i < 13; i++) {
      backgroundLines += `<line x1="150" y1="${150 + i * 50}" x2="650" y2="${150 + i * 50}" stroke="#1a1a20" stroke-width="0.5" opacity="0.6" />`;
    }

    bodyContent = `
    <!-- LIFESTYLE MODEL STREET FIT & STYLING SPECIFICATIONS -->
    <g id="lifestyle-model-view">
      <g>
        ${backgroundLines}
      </g>
      <path d="M 120 130 L 120 810 L 180 810 L 180 200 Z" fill="#0c0c0e" stroke="#1c1c22" stroke-width="1" opacity="0.5" />
      <path d="M 680 130 L 680 810 L 620 810 L 620 200 Z" fill="#0c0c0e" stroke="#1c1c22" stroke-width="1" opacity="0.5" />
      
      <g transform="translate(0, 10)">
        <path d="M 390 125 C 375 125 365 140 365 155 C 365 170 380 185 400 185 C 420 185 435 170 435 155 C 435 140 425 125 410 125 Z" fill="#050507" />
        <path d="M 365 150 L 345 155 L 360 162 Z" fill="#ff2e2e" />
        
        <path d="M 385 185 L 385 220 L 415 220 L 415 185" fill="#18181c" stroke="#25252b" stroke-width="1" />
        
        <path d="M 280 320 C 320 230 350 220 400 220 C 450 220 480 230 520 320 L 550 480 L 480 500 L 470 700 C 470 740 400 750 400 750 C 400 750 330 740 330 700 L 320 500 L 250 480 Z" fill="#121215" stroke="#ff2e2e" stroke-width="1.5" />
        
        <path d="M 340 250 L 325 360" stroke="#000000" stroke-width="3" opacity="0.8" />
        <path d="M 460 250 L 475 360" stroke="#000000" stroke-width="3" opacity="0.8" />
        <path d="M 355 220 C 355 230 445 230 445 220" fill="none" stroke="#25252b" stroke-width="4" />
        <path d="M 330 450 C 380 470 420 470 470 450" fill="none" stroke="#0a0a0c" stroke-width="12" opacity="0.6" />
        <path d="M 330 600 C 380 620 420 620 470 600" fill="none" stroke="#0a0a0c" stroke-width="10" opacity="0.7" />
        
        <g opacity="0.5" transform="translate(0, -10)">
          <path d="M 360 300 Q 400 250 440 300 L 440 440 L 360 440 Z" fill="#18181c" stroke="#ff2e2e" stroke-width="0.5" />
          <line x1="400" y1="330" x2="400" y2="400" stroke="#ff2e2e" stroke-width="2" />
          <circle cx="400" cy="415" r="5" fill="#d4af37" />
          <text x="400" y="290" font-family="\'Cinzel\', \'Georgia\', serif" font-size="12" font-weight="black" fill="#ffffff" text-anchor="middle">Nocturnis</text>
        </g>
        
        <line x1="435" y1="225" x2="590" y2="225" stroke="#ff2e2e" stroke-width="1" stroke-dasharray="2,2" />
        <circle cx="435" cy="225" r="3" fill="#ff2e2e" />
        <text x="600" y="222" font-family="\'Courier New\', monospace" font-size="8.5" fill="#ff2e2e" font-weight="black" text-anchor="start">1.2" RIBBED SEAMLESS COLLAR</text>
        <text x="600" y="234" font-family="\'Courier New\', monospace" font-size="7.5" fill="#a1a1aa" text-anchor="start">Shape retention after 100+ machine washes</text>
        
        <line x1="315" y1="260" x2="160" y2="260" stroke="#ff2e2e" stroke-width="1" stroke-dasharray="2,2" />
        <circle cx="315" cy="260" r="3" fill="#ff2e2e" />
        <text x="150" y="257" font-family="\'Courier New\', monospace" font-size="8.5" fill="#ff2e2e" font-weight="black" text-anchor="end">DROPPED SHOULDER ARCH (+5.5CM)</text>
        <text x="150" y="269" font-family="\'Courier New\', monospace" font-size="7.5" fill="#a1a1aa" text-anchor="end">Engineered for authentic slouch streetwear drape</text>
        
        <line x1="520" y1="400" x2="590" y2="400" stroke="#ff2e2e" stroke-width="1" stroke-dasharray="2,2" />
        <circle cx="520" cy="400" r="3" fill="#ff2e2e" />
        <text x="600" y="397" font-family="\'Courier New\', monospace" font-size="8.5" fill="#ff2e2e" font-weight="black" text-anchor="start">EXTENDED BOX SLEEVE (9.5" LENGTH)</text>
        <text x="600" y="409" font-family="\'Courier New\', monospace" font-size="7.5" fill="#a1a1aa" text-anchor="start">Sits exactly at the elbow bend for perfect width</text>
        
        <line x1="335" y1="640" x2="160" y2="640" stroke="#ff2e2e" stroke-width="1" stroke-dasharray="2,2" />
        <circle cx="335" cy="640" r="3" fill="#ff2e2e" />
        <text x="150" y="637" font-family="\'Courier New\', monospace" font-size="8.5" fill="#ff2e2e" font-weight="black" text-anchor="end">DOUBLE COMPACT COMBED 240 GSM</text>
        <text x="150" y="649" font-family="\'Courier New\', monospace" font-size="7.5" fill="#a1a1aa" text-anchor="end">Ultra-heavy density structures shoulder and lower hem</text>
      </g>
    </g>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <!-- Definitions -->
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0b0b0d" />
      <stop offset="50%" stop-color="#141418" />
      <stop offset="100%" stop-color="#060608" />
    </linearGradient>
    <linearGradient id="moonGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3a3a42" />
      <stop offset="100%" stop-color="#18181c" />
    </linearGradient>
    <linearGradient id="redGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ff2e2e" />
      <stop offset="100%" stop-color="#990000" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#d4af37" />
      <stop offset="100%" stop-color="#8a6d1c" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Dark Atmospheric Background -->
  <rect width="800" height="1000" fill="url(#bgGrad)" />

  <!-- Gothic Cathedral Windows & Tower Silhouettes at the Back -->
  <g opacity="0.15">
    <path d="M 300 450 Q 400 350 500 450 L 500 800 L 300 800 Z" fill="none" stroke="#ffffff" stroke-width="2" />
    <line x1="350" y1="410" x2="350" y2="800" stroke="#ffffff" stroke-width="1" />
    <line x1="450" y1="410" x2="450" y2="800" stroke="#ffffff" stroke-width="1" />
    <circle cx="400" cy="250" r="140" fill="url(#moonGrad)" stroke="#55555d" stroke-width="3" />
    <path d="M 540 800 L 590 400 L 600 420 L 620 300 L 640 420 L 650 400 L 700 800 Z" fill="#000000" />
    <path d="M 100 800 L 150 400 L 160 420 L 180 300 L 200 420 L 210 400 L 260 800 Z" fill="#000000" />
  </g>

  <!-- Luminous Red Sparkle Stars -->
  <g filter="url(#glow)">
    <path d="M 400 130 Q 400 150 380 150 Q 400 150 400 170 Q 400 150 420 150 Q 400 150 400 130" fill="#ff2e2e" />
    <path d="M 180 200 Q 180 210 170 210 Q 180 210 180 220 Q 180 210 190 210 Q 180 210 180 200" fill="#ff2e2e" opacity="0.8" />
    <path d="M 620 180 Q 620 190 610 190 Q 620 190 620 200 Q 620 190 630 190 Q 620 190 620 180" fill="#ff2e2e" opacity="0.8" />
  </g>

  <!-- Flying Bats (Silhouettes) -->
  <g fill="#050505" opacity="0.6">
    <path d="M 150 250 Q 160 240 170 250 Q 165 255 150 250" />
    <path d="M 640 220 Q 650 210 660 220 Q 655 225 640 220" />
    <path d="M 580 150 Q 590 142 600 150 Q 595 153 580 150" />
  </g>

  <!-- Ornate Border Frame around the poster -->
  <rect x="15" y="15" width="770" height="970" fill="none" stroke="#25252b" stroke-width="2" />
  <rect x="20" y="20" width="760" height="960" fill="none" stroke="#121215" stroke-width="1" />
  <path d="M 15 35 L 35 15 M 15 965 L 35 985 M 785 35 L 765 15 M 785 965 L 765 985" stroke="#25252b" stroke-width="2" />

  <!-- DYNAMIC BODY CONTENT -->
  ${bodyContent}

  <!-- BRAND HEADERS (ON THE POSTER) -->
  <g font-family="\'Cinzel\', \'Georgia\', serif" fill="#ffffff" text-anchor="middle">
    <text x="400" y="70" font-size="34" font-weight="900" letter-spacing="6" filter="url(#glow)">${uppercaseName}</text>
    <text x="400" y="90" font-family="\'Courier New\', monospace" font-size="10" font-weight="bold" fill="#ff2e2e" letter-spacing="6">SHROUDED. TIMELESS. UNYIELDING.</text>
    <text x="400" y="45" font-family="\'Courier New\', monospace" font-size="8" fill="#ff2e2e" letter-spacing="4" opacity="0.6">INTRODUCING [${activePoseLabel} VIEW]</text>
  </g>

  <!-- SIDEBAR PANELS -->
  
  <!-- LEFT PANEL: About the Tee specifications -->
  <g font-family="\'Courier New\', monospace" fill="#ffffff" font-size="11" text-anchor="start">
    <text x="40" y="150" font-family="\'Cinzel\', \'Georgia\', serif" font-size="12" font-weight="bold" fill="#ff2e2e" letter-spacing="1">ABOUT THE TEE</text>
    <text x="40" y="175" fill="#a1a1aa" opacity="0.8">Nocturnis is a tribute to the</text>
    <text x="40" y="195" fill="#a1a1aa" opacity="0.8">shadows we walk through</text>
    <text x="40" y="215" fill="#a1a1aa" opacity="0.8">and the truth we carry within.</text>
    <text x="40" y="235" fill="#a1a1aa" opacity="0.8">A fusion of gothic art and</text>
    <text x="40" y="255" fill="#a1a1aa" opacity="0.8">raw emotion — for those</text>
    <text x="40" y="275" fill="#a1a1aa" opacity="0.8">who rise after dark.</text>

    <text x="40" y="335" font-family="\'Cinzel\', \'Georgia\', serif" font-size="12" font-weight="bold" fill="#ff2e2e" letter-spacing="1">PREMIUM QUALITY</text>
    
    <!-- Spec 1 -->
    <rect x="40" y="360" width="18" height="18" fill="none" stroke="#ff2e2e" stroke-width="1" />
    <path d="M 44 369 L 49 374 L 54 364" stroke="#ff2e2e" stroke-width="1.5" fill="none" />
    <text x="68" y="373" font-size="11" font-weight="bold">${gsm} GSM</text>
    <text x="68" y="388" font-size="9" fill="#a1a1aa">HEAVYWEIGHT COTTON</text>

    <!-- Spec 2 -->
    <rect x="40" y="415" width="18" height="18" fill="none" stroke="#ff2e2e" stroke-width="1" />
    <path d="M 44 429 L 49 434 L 54 424" stroke="#ff2e2e" stroke-width="1.5" fill="none" />
    <text x="68" y="428" font-size="11" font-weight="bold">${fitType.toUpperCase()} FIT</text>
    <text x="68" y="443" font-size="9" fill="#a1a1aa">STREETWEAR STYLE</text>

    <!-- Spec 3 -->
    <rect x="40" y="470" width="18" height="18" fill="none" stroke="#ff2e2e" stroke-width="1" />
    <path d="M 44 484 L 49 489 L 54 479" stroke="#ff2e2e" stroke-width="1.5" fill="none" />
    <text x="68" y="483" font-size="11" font-weight="bold">DURABLE PRINT</text>
    <text x="68" y="498" font-size="9" fill="#a1a1aa">BUILT TO LAST</text>
  </g>

  <!-- RIGHT PANEL: Ordering CTA & Perks -->
  <g font-family="\'Courier New\', monospace" fill="#ffffff" font-size="11" text-anchor="end">
    <!-- Border Box around ordering info -->
    <path d="M 600 135 L 760 135 L 760 375 L 600 375 Z" fill="none" stroke="#25252b" stroke-width="1" />
    
    <text x="745" y="160" font-family="\'Cinzel\', \'Georgia\', serif" font-size="12" font-weight="bold" fill="#ff2e2e" letter-spacing="1">FOR ORDER</text>
    <text x="745" y="185" font-size="11" fill="#a1a1aa">WHATSAPP AT</text>
    <!-- WhatsApp Number -->
    <text x="745" y="215" font-family="\'Courier New\', monospace" font-size="14" font-weight="900" fill="#ffffff">919196294654</text>
    
    <!-- Perk 1 -->
    <text x="745" y="255" font-size="10" font-weight="bold" fill="#ffffff">PREMIUM QUALITY</text>
    <text x="745" y="270" font-size="9" fill="#a1a1aa">${gsm} GSM COMBED LUXURY</text>
    
    <!-- Perk 2 -->
    <text x="745" y="305" font-size="10" font-weight="bold" fill="#ffffff">SECURE PACKAGING</text>
    <text x="745" y="320" font-size="9" fill="#a1a1aa">BOX &amp; STICKERS INCLUDED</text>
    
    <!-- Perk 3 -->
    <text x="745" y="355" font-size="10" font-weight="bold" fill="#ffffff">FAST DELIVERY</text>
    <text x="745" y="367" font-size="9" fill="#a1a1aa">3-5 DAYS METRO INDIA</text>
  </g>

  <!-- BOTTOM PANEL: Banner Details & Pricing -->
  <!-- Divider line -->
  <line x1="30" y1="840" x2="770" y2="840" stroke="#ff2e2e" stroke-width="1" opacity="0.3" />
  
  <!-- "WEAR THE DARK" emblem -->
  <g transform="translate(680, 580)">
    <circle cx="0" cy="0" r="55" fill="none" stroke="#25252b" stroke-width="1.5" />
    <circle cx="0" cy="0" r="50" fill="none" stroke="#ff2e2e" stroke-width="0.75" stroke-dasharray="3,3" />
    <path d="M -15 0 Q 0 -15 15 0 Q 0 15 -15 0" fill="none" stroke="#ff2e2e" stroke-width="1" />
    <path d="M 0 -25 L 0 25 M -25 0 L 25 0" stroke="#ff2e2e" stroke-width="1" />
    <text x="0" y="35" font-family="\'Cinzel\', \'Georgia\', serif" font-size="9" fill="#ff2e2e" letter-spacing="1" text-anchor="middle">OWN THE NIGHT</text>
  </g>

  <!-- Big Price Display -->
  <g font-family="'Cinzel', 'Georgia', serif" fill="#ffffff">
    <text x="250" y="900" font-size="64" font-weight="900" letter-spacing="4" filter="url(#glow)">₹${price}</text>
    <text x="250" y="930" font-family="'Courier New', monospace" font-size="14" font-weight="bold" fill="#ff2e2e" letter-spacing="3">${fitType.toUpperCase()} TEE</text>
    
    <text x="490" y="875" font-family="'Courier New', monospace" font-size="11" font-weight="bold" fill="#ff2e2e" letter-spacing="1" text-anchor="start">NOT JUST A TEE.</text>
    <text x="490" y="895" font-family="'Courier New', monospace" font-size="13" font-weight="bold" fill="#ffffff" letter-spacing="2" text-anchor="start">IT'S A STATEMENT.</text>
  </g>

  <!-- Bottom Specs icons -->
  <g transform="translate(30, 945)" font-family="'Courier New', monospace" font-size="9" fill="#a1a1aa" text-anchor="middle">
    <!-- Icon 1 -->
    <text x="350" y="20" font-weight="bold" fill="#ffffff">PREMIUM FABRIC</text>
    <!-- Icon 2 -->
    <text x="470" y="20" font-weight="bold" fill="#ffffff">SOFT &amp; COMFORTABLE</text>
    <!-- Icon 3 -->
    <text x="600" y="20" font-weight="bold" fill="#ffffff">HIGH PRINT QUALITY</text>
    <!-- Icon 4 -->
    <text x="710" y="20" font-weight="bold" fill="#ffffff">BUILT TO LAST</text>
  </g>
</svg>`;

  try {
    const base64 = typeof window !== 'undefined' 
      ? window.btoa(unescape(encodeURIComponent(svg))) 
      : Buffer.from(svg).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
  } catch (e) {
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }
}

const TSHIRT_TYPE_MAP: Record<string, Product['tshirtType']> = {
};

export const TSHIRT_TYPES = [
  { id: 'classic-polo', name: 'Classic Polo', description: 'Premium collar polo T-shirts', image: 'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316675/WHITE_1_mmh9g8.png' },
  { id: 'teecode-training-gear', name: 'TeeCode Training Gear', description: 'Premium training vests & gym wear', image: 'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541168/OLIVE_3_hp2ppp.png' },
  { id: 'hoodies', name: 'Hoodies', description: 'Premium oversized hoodies', image: 'https://res.cloudinary.com/dtzyjynai/image/upload/v1783867772/Screenshot_2026-07-12_at_8.14.38_PM_prakqb.png' },
];

export const NAV_CATEGORIES = [
  {
    id: 'men',
    name: 'MEN',
    subcategories: [
      {
        id: 'men-tshirts',
        name: 'T-Shirts',
        image: 'https://res.cloudinary.com/dtzyjynai/image/upload/v1783701996/6c5d9716-fe06-4074-adfa-d62bdc3774bc_uzh2os.png',
        collections: ['Oversized Collection', 'Anime Code', 'Dark Void', 'Washed Edition', 'Essential Solids'],
      },
      { id: 'men-shirts', name: 'Shirts', image: 'https://res.cloudinary.com/dtzyjynai/image/upload/v1783855964/Screenshot_2026-07-12_at_5.00.06_PM_i9nj2u.png', collections: ['Casual Shirts'] },
      {
        id: 'men-polos',
        name: 'Polos',
        collections: ['Classic Polo'],
      },
      { id: 'men-joggers', name: 'Bottoms', image: 'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854421/Screenshot_2026-07-12_at_4.31.40_PM_b6r62g.png', collections: ['Casual Trousers'] },
      {
        id: 'men-gym-gear',
        name: 'TeeCode Gym Gear',
        collections: ['TeeCode Training Gear'],
      },
      {
        id: 'men-hoodies',
        name: 'Hoodies',
        image: 'https://res.cloudinary.com/dtzyjynai/image/upload/v1783867772/Screenshot_2026-07-12_at_8.14.38_PM_prakqb.png',
        collections: ['Hoodies'],
      },
    ],
  },
  {
    id: 'women',
    name: 'WOMEN',
    subcategories: [
      { id: 'women-tshirts', name: 'T-Shirts', image: 'https://res.cloudinary.com/dtzyjynai/image/upload/v1785175559/31d9084eb8b2edba03c8c387ade8915f_vyyvzj.jpg', collections: ['Oversized Collection'] },
      { id: 'women-hoodies', name: 'Hoodies', image: 'https://res.cloudinary.com/dtzyjynai/image/upload/v1783875131/Screenshot_2026-07-12_at_10.20.20_PM_dbsjgc.png', collections: ['Hoodies'] },
      { id: 'women-joggers', name: 'Bottoms', image: 'https://res.cloudinary.com/dtzyjynai/image/upload/v1783875303/BOT_ekpnyw.jpg', collections: [] as string[], comingSoon: true },
      { id: 'women-gym-gear', name: 'TeeCode Gym Gear', image: 'https://res.cloudinary.com/dtzyjynai/image/upload/v1783875303/GYM_yhkwnt.jpg', collections: [] as string[], comingSoon: true },
    ],
  },
  {
    id: 'accessories',
    name: 'ACCESSORIES',
    subcategories: [
      { id: 'accessories-all', name: 'All Accessories', collections: [] as string[], comingSoon: true },
    ],
  },
];

// Maps display names (used in nav) to internal filter values (used in product tshirtType)
export const COLLECTION_FILTER_MAP: Record<string, string> = {
  'Dark Void': 'Graphic Universe',
};

// Helper: get the filter value for a collection display name
export const getCollectionFilterValue = (displayName: string): string => {
  return COLLECTION_FILTER_MAP[displayName] || displayName;
};


const NEW_PRODUCTS_TO_ADD: Product[] = [
  {
    id: 'teecode-womens-los-angeles-95-oversized-graphic-tshirt',
    name: 'TEECODE Los Angeles 95 Oversized T-Shirt',
    price: 1999,
    salePrice: 799,
    description: 'Bring effortless varsity style to your everyday wardrobe with the TEECODE Los Angeles 95 Oversized T-Shirt. Designed in a soft off-white shade, this statement tee features a distressed burgundy "LOS ANGELES 95" graphic for a vintage collegiate look. Its relaxed silhouette, dropped shoulders, and loose sleeves create an easy oversized fit that works perfectly with wide-leg trousers, denim, cargos, shorts, or skirts.',
    fit: 'Oversized and relaxed fit with dropped shoulders and loose short sleeves',
    fitType: 'Oversized',
    gsm: 240,
    material: '240 GSM Premium 100% Combed Organic Cotton',
    printFront: 'Distressed burgundy "LOS ANGELES 95" varsity front print',
    printBack: 'Plain back',
    style: 'Vintage Varsity / Streetwear / Casual — Women\'s',
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Off-White', hex: '#F5F5DC' },
    ],
    images: [
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1785175559/31d9084eb8b2edba03c8c387ade8915f_vyyvzj.jpg',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1785175561/111_cryka7.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1785175563/1_iouedo.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1785175568/11_wjydhw.png',
    ],
    category: 'new',
    gender: 'women',
    tshirtType: 'Oversized Collection',
    additionalTypes: ['Oversized Collection', 'Graphic Universe', 'Anime Code', 'Washed Edition', 'Essential Solids'],
    tag: 'NEW ARRIVAL',
    graphicDesc: 'Distressed burgundy LOS ANGELES 95 front print',
    washingInstructions: [
      'Machine wash cold with similar colours',
      'Wash inside out to protect the print',
      'Use mild detergent',
      'Do not bleach',
      'Do not iron directly over the graphic',
      'Dry in shade',
      'Avoid tumble drying for longer print life',
    ]
  },
  {
    id: 'teecode-mens-casual-short-sleeve-linen-blend-button-up-shirt',
    name: 'Men\'s Solid Color Casual Shirt, Fashionable Short Sleeve Shacket, Mint Green, Hawaiian Resort Beach Shirt',
    price: 1999,
    salePrice: 749,
    description: 'Stay cool and stylish with the TeeCode Men\'s Casual Short Sleeve Linen Blend Button-Up Shirt. Designed for effortless everyday wear, this lightweight shirt combines breathable fabric with a relaxed fit, making it the perfect choice for warm-weather days, beach vacations, weekend outings, and casual occasions. Featuring a classic button-up front, spread collar, and a functional chest pocket, this shirt delivers a clean, modern look that pairs effortlessly with shorts, chinos, jeans, or linen trousers. Whether you\'re heading to a beach getaway or a casual evening out, this versatile shirt keeps you looking sharp and feeling comfortable all day long.',
    fit: 'Regular Fit',
    fitType: 'Regular',
    gsm: 180,
    material: 'Premium Linen Blend, lightweight & breathable',
    printFront: 'Solid color with classic button-up design and spread collar',
    printBack: 'Plain back',
    style: 'Casual / Beach / Resort / Travel — Men\'s',
    sizes: SIZES,
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Blue', hex: '#4169E1' },
      { name: 'Green', hex: '#3CB371' },
    ],
    images: [
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783855971/Screenshot_2026-07-12_at_4.58.30_PM_f0uzws.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783855970/Screenshot_2026-07-12_at_4.58.36_PM_zypohy.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783855971/Screenshot_2026-07-12_at_4.58.42_PM_ckfbh9.png',
    ],
    colorImages: {
      'White': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783855971/Screenshot_2026-07-12_at_4.58.30_PM_f0uzws.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783855970/Screenshot_2026-07-12_at_4.58.36_PM_zypohy.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783855971/Screenshot_2026-07-12_at_4.58.42_PM_ckfbh9.png',
        ],
      'Black': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783855965/Screenshot_2026-07-12_at_4.59.41_PM_dl4ckd.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783855971/Screenshot_2026-07-12_at_4.59.46_PM_xoxz1s.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783855966/Screenshot_2026-07-12_at_4.59.52_PM_ntx9sw.png',
        ],
      'Blue': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783855968/Screenshot_2026-07-12_at_4.59.09_PM_weobys.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783855968/Screenshot_2026-07-12_at_4.59.16_PM_yimq1j.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783855965/Screenshot_2026-07-12_at_4.59.21_PM_zmkave.png',
        ],
      'Green': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783855964/Screenshot_2026-07-12_at_5.00.06_PM_i9nj2u.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783855963/Screenshot_2026-07-12_at_5.00.12_PM_zxizap.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783855963/Screenshot_2026-07-12_at_5.00.18_PM_vgelqn.png',
      ],
    },
    category: 'new',
    gender: 'men',
    tshirtType: 'Casual Shirts',
    tag: 'NEW DROP',
    graphicDesc: 'Men\'s Casual Shirt, Linen Blend Shirt, Short Sleeve Shirt, Button-Up Shirt, Beach Shirt, Hawaiian Shirt, Resort Wear, Summer Shirt for Men, TeeCode Shirts',
    sizeChartImage: 'https://res.cloudinary.com/dtzyjynai/image/upload/v1783855972/Screenshot_2026-07-12_at_5.00.42_PM_kvspcs.png',
    washingInstructions: [
      'Machine wash with similar colours',
      'Use cold water and mild detergent',
      'Do not bleach',
      'Iron on low heat if needed',
      'Dry in shade',
    ]
  },
  {
    id: 'teecode-mens-relaxed-fit-drawstring-casual-trousers',
    name: 'Men\'s Spring/Summer Thin Breathable Hip Hop Linen Casual Lounge Sports Long Pants Beach Straight Leg Hawaiian Solid Color',
    price: 1999,
    salePrice: 749,
    description: 'Experience everyday comfort with the TeeCode Men\'s Relaxed Fit Drawstring Casual Trousers. Designed with a relaxed silhouette and a soft, breathable fabric, these trousers offer the perfect combination of style and ease. The adjustable drawstring waistband ensures a comfortable fit, while the minimalist design makes them ideal for casual outings, vacations, lounging, or everyday wear. Whether paired with oversized T-shirts, polos, or casual shirts, these trousers deliver a clean, modern look suitable for every season.',
    fit: 'Relaxed Fit',
    fitType: 'Regular',
    gsm: 180,
    material: 'Premium Linen-Cotton Blend, lightweight & breathable',
    printFront: 'Solid color with clean minimalist design',
    printBack: 'Plain back',
    style: 'Casual / Travel / Resort / Everyday — Men\'s',
    sizes: SIZES,
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Beige', hex: '#D2B48C' },
      { name: 'Blue', hex: '#4169E1' },
    ],
    images: [
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854421/Screenshot_2026-07-12_at_4.31.40_PM_b6r62g.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854419/Screenshot_2026-07-12_at_4.31.56_PM_ytgvep.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854419/Screenshot_2026-07-12_at_4.31.49_PM_htei2s.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854901/Screenshot_2026-07-12_at_4.44.22_PM_az0n5d.png',
    ],
    colorImages: {
      'White': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854421/Screenshot_2026-07-12_at_4.31.40_PM_b6r62g.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854419/Screenshot_2026-07-12_at_4.31.56_PM_ytgvep.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854419/Screenshot_2026-07-12_at_4.31.49_PM_htei2s.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854901/Screenshot_2026-07-12_at_4.44.22_PM_az0n5d.png',
      ],
      'Black': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854426/Screenshot_2026-07-12_at_4.34.33_PM_qoitxp.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854419/Screenshot_2026-07-12_at_4.34.50_PM_uzfkrb.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854418/Screenshot_2026-07-12_at_4.34.42_PM_pd4cfe.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854901/Screenshot_2026-07-12_at_4.44.22_PM_az0n5d.png',
      ],
      'Beige': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854416/Screenshot_2026-07-12_at_4.35.23_PM_lcqnjz.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854425/Screenshot_2026-07-12_at_4.35.41_PM_oc7xhc.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854414/Screenshot_2026-07-12_at_4.35.29_PM_zm0ctr.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854901/Screenshot_2026-07-12_at_4.44.22_PM_az0n5d.png',
      ],
      'Blue': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854413/Screenshot_2026-07-12_at_4.36.03_PM_hkhe8e.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854412/Screenshot_2026-07-12_at_4.36.14_PM_c9gsjt.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854416/Screenshot_2026-07-12_at_4.36.08_PM_veo0as.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854901/Screenshot_2026-07-12_at_4.44.22_PM_az0n5d.png',
      ],
    },
    category: 'new',
    gender: 'men',
    tshirtType: 'Casual Trousers',
    tag: 'NEW DROP',
    graphicDesc: 'Men\'s Bottoms, Casual Trousers, Linen Pants, Drawstring Pants, Relaxed Fit Pants, Straight Leg Trousers, Beach Pants, Lounge Pants, Summer Pants for Men, TeeCode Bottoms, Breathable Trousers, Resort Wear',
    sizeChartImage: 'https://res.cloudinary.com/dtzyjynai/image/upload/v1783854901/Screenshot_2026-07-12_at_4.44.22_PM_az0n5d.png',
    washingInstructions: [
      'Machine wash with similar colours',
      'Use cold water and mild detergent',
      'Do not bleach',
      'Iron on low heat if needed',
      'Dry in shade',
    ]
  },
  {
    id: 'teecode-cool-mens-casual-solid-color-crew-neck-short-sleeve-t-shirt',
    name: 'TeeCode Cool Men\'s Casual Solid Color Crew Neck Short Sleeve T-Shirt',
    price: 1999,
    salePrice: 999,
    description: 'Upgrade your wardrobe with the TeeCode Cool Men\'s Casual Solid Color Crew Neck Short Sleeve T-Shirt. Featuring a premium vintage acid-wash finish and an oversized relaxed fit, this tee blends modern streetwear with everyday comfort. Crafted from soft, breathable cotton, it is perfect for casual outings, travel, college, or daily wear. Its clean minimalist design pairs effortlessly with jeans, cargos, joggers, or shorts, making it an essential addition to any wardrobe.',
    fit: 'Oversized Relaxed Fit',
    fitType: 'Oversized',
    gsm: 240,
    material: 'Premium Cotton, 240 GSM soft breathable fabric',
    printFront: 'Solid color with premium vintage acid-wash finish',
    printBack: 'Plain back',
    style: 'Casual / Streetwear / Everyday — Men\'s',
    sizes: SIZES,
    colors: [
      { name: 'Acid Wash Grey', hex: '#8B8682' },
    ],
    images: [
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783853176/Screenshot_2026-07-12_at_4.13.27_PM_xl24kc.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783853184/Screenshot_2026-07-12_at_4.13.14_PM_j3dlwf.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783853175/Screenshot_2026-07-12_at_4.13.21_PM_q6nsjy.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783853182/Screenshot_2026-07-12_at_4.13.06_PM_zktehp.png',
    ],
    colorImages: {
      'Acid Wash Grey': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783853176/Screenshot_2026-07-12_at_4.13.27_PM_xl24kc.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783853184/Screenshot_2026-07-12_at_4.13.14_PM_j3dlwf.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783853175/Screenshot_2026-07-12_at_4.13.21_PM_q6nsjy.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783853182/Screenshot_2026-07-12_at_4.13.06_PM_zktehp.png',
      ],
    },
    category: 'new',
    gender: 'men',
    tshirtType: 'Washed Edition',
    tag: 'NEW DROP',
    graphicDesc: 'Oversized T-Shirt for Men, Acid Wash T-Shirt, Vintage Wash Tee, Men\'s Casual T-Shirt, Streetwear T-Shirt, Crew Neck Tee, Premium Cotton T-Shirt, TeeCode Men\'s T-Shirt, Solid Color Oversized Tee, Urban Fashion India',
    washingInstructions: [
      'Machine wash with similar colours',
      'Use cold water and mild detergent',
      'Do not bleach',
      'Avoid ironing directly over the fabric',
      'Dry in shade to preserve the acid-wash finish',
    ]
  },
  {
    id: 'vintage-eagle-graphic-crop-tshirt',
    name: 'Vintage Eagle Graphic Crop T-Shirt',
    price: 2999,
    salePrice: 1499,
    description: 'A bold vintage-inspired crop tee featuring a striking eagle graphic with heritage detailing. Crafted for a relaxed, effortless look with a modern cropped silhouette. Perfect for pairing with high-waisted jeans, skirts, or layered streetwear outfits.',
    fit: 'Relaxed Crop Fit',
    fitType: 'Regular',
    gsm: 200,
    material: '100% Premium Cotton, 200 GSM soft-touch fabric',
    printFront: 'Vintage eagle graphic with heritage-style typography',
    printBack: 'Plain back',
    style: 'Casual / Vintage / Streetwear — Women\'s',
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Vintage White', hex: '#F5F0E8' },
    ],
    images: [
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783840168/Screenshot_2026-07-12_at_12.36.42_PM_jpw1ao.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783840171/Screenshot_2026-07-12_at_12.36.36_PM_ovdgpu.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783840165/Screenshot_2026-07-12_at_12.36.48_PM_qqjiqo.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783840162/Screenshot_2026-07-12_at_12.37.02_PM_ygfycg.png',
    ],
    colorImages: {
      'Vintage White': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783840168/Screenshot_2026-07-12_at_12.36.42_PM_jpw1ao.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783840171/Screenshot_2026-07-12_at_12.36.36_PM_ovdgpu.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783840165/Screenshot_2026-07-12_at_12.36.48_PM_qqjiqo.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783840162/Screenshot_2026-07-12_at_12.37.02_PM_ygfycg.png',
      ],
    },
    category: 'new',
    gender: 'women',
    tag: 'NEW DROP',
    graphicDesc: 'Vintage eagle graphic crop tee with heritage-inspired detailing and modern cropped silhouette for women.',
    washingInstructions: [
      'Wash inside out with similar colours',
      'Use cold water and mild detergent',
      'Do not bleach',
      'Avoid ironing directly over the print',
      'Dry in shade to preserve the vintage print and artwork',
    ]
  },
  {
    id: 'ashforge-lace-up-vintage-tee',
    name: 'Ashforge Lace-Up Vintage Tee',
    price: 4999,
    salePrice: 2499,
    description: 'A rugged vintage-inspired tee featuring a distinctive lace-up V-neck, distressed washed finish, and raw-edge detailing. Crafted for everyday comfort with a bold heritage aesthetic, it\'s perfect for casual streetwear, biker looks, and vintage-inspired outfits.',
    fit: 'Regular Fit',
    fitType: 'Regular',
    gsm: 240,
    material: 'Premium cotton blend',
    printFront: 'Vintage acid-washed finish with lace-up V-neck design',
    printBack: 'Plain back with distressed raw-edge detailing',
    style: 'Casual / Streetwear / Heritage — Men\'s',
    sizes: SIZES,
    colors: [
      { name: 'Vintage Wash', hex: '#5C4033' },
    ],
    images: [
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783784227/1_fwqajm.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783784229/2_ajwejd.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783784227/3_g9917j.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783784227/4_w0ndns.png',
    ],
    colorImages: {
      'Vintage Wash': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783784227/1_fwqajm.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783784229/2_ajwejd.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783784227/3_g9917j.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783784227/4_w0ndns.png',
      ],
    },
    category: 'new',
    gender: 'men',
    tshirtType: 'Washed Edition',
    tag: 'NEW DROP',
    graphicDesc: 'vintage tee, lace-up t-shirt, men\'s vintage t-shirt, acid wash tee, distressed tee, heritage tee, casual t-shirt, premium men\'s fashion, rugged style, washed t-shirt',
    washingInstructions: [
      'Wash inside out with similar colours',
      'Use cold water and mild detergent',
      'Do not bleach',
      'Avoid ironing directly over the print',
      'Dry in shade to preserve the vintage wash and artwork',
    ]
  },
  // ── Graphic Universe Collection (Gothic Drops) ──────────────────────────────────────
  {
    id: 'noir-sanctum-oversized-tee',
    name: 'Noir Sanctum Oversized Tee',
    price: 3999,
    salePrice: 1999,
    description: 'Step into dark streetwear energy with the Noir Sanctum Oversized Tee from TeeCode\'s Graphic Universe Collection. Designed in an oversized fit with bold gothic artwork, premium 100% cotton 240 GSM heavyweight fabric, washed texture, and a powerful streetwear silhouette, this tee is made for standout everyday styling. Pair it with cargos, denim, or black streetwear bottoms for a complete gothic urban look.',
    fit: 'Oversized Fit',
    fitType: 'Oversized',
    gsm: 240,
    material: '100% Cotton, 240 GSM premium heavyweight fabric',
    printFront: 'Bold gothic artwork with dark streetwear aesthetic',
    printBack: 'Clean back with subtle gothic detail',
    style: 'Gothic / Streetwear — Unisex',
    sizes: SIZES,
    colors: [
      { name: 'Brown', hex: '#5C4033' },
      { name: 'Black', hex: '#0F0F11' },
      { name: 'Maroon', hex: '#800020' },
    ],
    images: [
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698282/BROWN_1_ntmrth.webp',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698302/brown2_pt09zo.webp',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698283/BROWN_3_r9yofd.webp',
    ],
    colorImages: {
      'Brown': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698282/BROWN_1_ntmrth.webp',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698302/brown2_pt09zo.webp',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698283/BROWN_3_r9yofd.webp',
      ],
      'Black': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698282/3_mgmm8t.webp',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698281/2_rpd6tl.webp',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698281/1_mi5mdr.webp',
      ],
      'Maroon': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698283/MAROON_1_lmyxc2.webp',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698282/MAROON2_sl3upb.webp',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698283/MAROON3_rw8wet.webp',
      ],
    },
    category: 'new',
    tshirtType: 'Graphic Universe',
    additionalTypes: ['Oversized Collection'],
    tag: '50% OFF',
    graphicDesc: 'Dark sanctum-inspired gothic artwork with premium washed finish and streetwear silhouette.',
    washingInstructions: [
      'Machine wash cold',
      'Wash inside out',
      'Do not bleach',
      'Dry in shade',
      'Do not iron directly on print',
      'Use mild detergent',
    ]
  },
  {
    id: 'obsidian-requiem-oversized-tee',
    name: 'Obsidian Requiem Oversized Tee',
    price: 3999,
    salePrice: 1999,
    description: 'Step into dark streetwear energy with the Obsidian Requiem Oversized Tee from TeeCode\'s Graphic Universe Collection. Designed in an oversized fit with bold gothic artwork, premium 100% cotton 240 GSM heavyweight fabric, washed texture, and a powerful streetwear silhouette, this tee is made for standout everyday styling. Pair it with cargos, denim, or black streetwear bottoms for a complete gothic urban look.',
    fit: 'Oversized Fit',
    fitType: 'Oversized',
    gsm: 240,
    material: '100% Cotton, 240 GSM premium heavyweight fabric',
    printFront: 'Bold obsidian requiem gothic artwork',
    printBack: 'Clean back with subtle gothic detail',
    style: 'Gothic / Streetwear — Unisex',
    sizes: SIZES,
    colors: [
      { name: 'Black', hex: '#0F0F11' },
      { name: 'Brown', hex: '#5C4033' },
      { name: 'Maroon', hex: '#800020' },
    ],
    images: [
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698301/black_1_jxaoyv.jpg',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698301/back2_as2iaw.webp',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698301/black_3_wpa8tq.webp',
    ],
    colorImages: {
      'Black': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698301/black_1_jxaoyv.jpg',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698301/back2_as2iaw.webp',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698301/black_3_wpa8tq.webp',
      ],
      'Brown': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698303/brown1_dua6zi.webp',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698302/brown2_pt09zo.webp',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698303/brown_3_f6f1er.webp',
      ],
      'Maroon': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698304/maroon_j4iau7.webp',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698302/maroon_2_fiiif5.webp',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783698304/maroon_3_kggjhy.webp',
      ],
    },
    category: 'new',
    tshirtType: 'Graphic Universe',
    additionalTypes: ['Oversized Collection'],
    tag: '50% OFF',
    graphicDesc: 'Dark obsidian requiem artwork with gothic streetwear aesthetic and premium washed finish.',
    washingInstructions: [
      'Machine wash cold',
      'Wash inside out',
      'Do not bleach',
      'Dry in shade',
      'Do not iron directly on print',
      'Use mild detergent',
    ]
  },
  {
    id: 'medusa-eclipse-acid-wash-oversized-tee',
    name: 'Medusa Eclipse Acid-Wash Oversized Tee',
    price: 3999,
    salePrice: 1999,
    description: 'The Medusa Eclipse Acid-Wash Oversized Tee brings dark mythology into premium streetwear. Featuring a bold Medusa and serpent-inspired front graphic, this oversized tee delivers a powerful gothic look with a modern acid-wash finish. The premium black acid-wash texture gives every piece a unique vintage appearance, while the relaxed oversized silhouette offers effortless comfort and a modern unisex fit. Pair it with cargo pants, denim, shorts, sneakers, or layered streetwear for a standout everyday outfit. Oversized and relaxed. Choose your usual size for a loose fit or size down for a more regular silhouette.',
    fit: 'Oversized Fit',
    fitType: 'Oversized',
    gsm: 240,
    material: '100% Cotton, 240 GSM premium heavyweight fabric',
    printFront: 'Detailed Medusa and serpent front graphic with acid-wash finish',
    printBack: 'Plain back with no print',
    style: 'Gothic Streetwear / Dark Mythology — Unisex',
    sizes: SIZES,
    colors: [
      { name: 'Acid-Wash Black', hex: '#1A1A1A' },
    ],
    images: [
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783703033/1089b93d-3a2a-4ddf-85db-a2316ce4fc0a_vca1k0.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783703035/259034bd-217d-461c-b8b5-2d85a7ebf22f_xecrxg.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783703034/7e3f0f1d-a756-4f2e-ab1c-9afec1fdca47_gavyka.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783703034/7e3f0f1d-a756-4f2e-ab1c-9afec1fdca47_gavyka.png',
    ],
    colorImages: {
      'Acid-Wash Black': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783703033/1089b93d-3a2a-4ddf-85db-a2316ce4fc0a_vca1k0.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783703035/259034bd-217d-461c-b8b5-2d85a7ebf22f_xecrxg.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783703034/7e3f0f1d-a756-4f2e-ab1c-9afec1fdca47_gavyka.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783703034/7e3f0f1d-a756-4f2e-ab1c-9afec1fdca47_gavyka.png',
      ],
    },
    category: 'new',
    gender: 'women',
    tshirtType: 'Graphic Universe',
    additionalTypes: ['Oversized Collection'],
    tag: '50% OFF',
    graphicDesc: 'Unleash a bold gothic streetwear look with a striking monochrome Medusa-inspired graphic with detailed serpents and dark mythological elements.',
    washingInstructions: [
      'Wash inside out with similar colours',
      'Use cold water and mild detergent',
      'Do not bleach',
      'Avoid ironing directly over the print',
      'Dry in shade to preserve the acid-wash texture and artwork',
    ]
  },
  // ── Anime Collection (New Drop) ──────────────────────────────────────
  {
    id: 'shadow-strike-anime-oversized-tee',
    name: 'Shadow Strike Anime Oversized Tee',
    price: 1999,
    salePrice: 999,
    description: 'The Shadow Strike Anime Oversized Tee brings anime energy into premium streetwear. Designed with a dark warrior-inspired graphic, bold red accents, and a relaxed oversized fit, this tee is perfect for anyone who loves anime fashion, urban styling, and statement outfits. Pair it with cargos, baggy jeans, sneakers, or layered accessories for a complete streetwear look.',
    fit: 'Oversized Fit',
    fitType: 'Oversized',
    gsm: 240,
    material: '100% Cotton, 240 GSM heavyweight fabric',
    printFront: 'Anime shadow warrior graphic with bold red-black artwork',
    printBack: 'Clean back',
    style: 'Anime / Dark Streetwear — Unisex',
    sizes: SIZES,
    colors: [
      { name: 'Black', hex: '#0F0F11' },
    ],
    images: [
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783701996/83f84b11-d5f1-4ca5-9e6c-78f2135fd8b2_egncuz.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783701997/a3e56b55-7690-4fad-9a7c-db2212cf7c64_rtlquv.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783701996/6c5d9716-fe06-4074-adfa-d62bdc3774bc_uzh2os.png',
    ],
    colorImages: {
      'Black': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783701996/83f84b11-d5f1-4ca5-9e6c-78f2135fd8b2_egncuz.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783701997/a3e56b55-7690-4fad-9a7c-db2212cf7c64_rtlquv.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783701996/6c5d9716-fe06-4074-adfa-d62bdc3774bc_uzh2os.png',
      ],
    },
    category: 'new',
    tshirtType: 'Anime Code',
    additionalTypes: ['Oversized Collection'],
    tag: '50% OFF',
    graphicDesc: 'A bold anime-inspired oversized tee made for dark streetwear lovers. Featuring intense red-black artwork, Japanese-style graphic elements, and a powerful shadow warrior aesthetic.',
    washingInstructions: [
      'Wash inside out',
      'Machine wash cold',
      'Do not bleach',
      'Dry in shade',
      'Do not iron directly on print',
      'Use mild detergent',
    ]
  },
  // ── Washed Edition (Merged — all colors as variants) ──────
  {
    id: 'acid-wash-oversized-tee',
    name: 'Acid Wash Oversized Tee',
    price: 3000,
    salePrice: 1499,
    description: 'Upgrade your streetwear look with this premium acid wash oversized tee. Designed for comfort, bold style, and everyday wear, this tee gives a unique washed texture with a relaxed oversized fit. Perfect for casual outings, streetwear styling, college looks, and daily fashion.',
    fit: 'Oversized Fit',
    fitType: 'Oversized',
    gsm: 240,
    material: 'Premium Cotton Blend',
    printFront: 'Premium acid wash finish',
    printBack: 'Clean acid wash back',
    style: 'Streetwear / Casual Wear — Unisex',
    sizes: SIZES,
    colors: [
      { name: 'Grey', hex: '#808080' },
      { name: 'Olive Green', hex: '#3B3F30' },
      { name: 'Black', hex: '#0F0F11' },
      { name: 'Blue', hex: '#4169E1' },
      { name: 'Maroon', hex: '#800020' },
      { name: 'Brown', hex: '#5C4033' },
    ],
    images: [
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264451/96dccc60-30d0-4e4b-b912-5697bebe207a_rmrvec.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264550/Screenshot_2026-07-05_at_8.34.00_PM_zargbk.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264549/Screenshot_2026-07-05_at_8.36.45_PM_wizd8u.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264549/Screenshot_2026-07-05_at_8.39.10_PM_onbiql.png',
    ],
    colorImages: {
      'Grey': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264451/96dccc60-30d0-4e4b-b912-5697bebe207a_rmrvec.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264550/Screenshot_2026-07-05_at_8.34.00_PM_zargbk.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264549/Screenshot_2026-07-05_at_8.36.45_PM_wizd8u.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264549/Screenshot_2026-07-05_at_8.39.10_PM_onbiql.png',
      ],
      'Olive Green': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264464/Screenshot_2026-07-05_at_8.25.50_PM_ufto9d.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264462/Screenshot_2026-07-05_at_8.30.47_PM_q2exal.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264458/5b365e6f-02e3-45dc-8420-855f56f1ce65_i9k1ob.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264454/c276c91f-3fe2-4c0a-84a8-7e998f984dd7_aznjfu.png',
      ],
      'Black': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264460/8b2b0cfb-bb6b-4a1e-bf41-7e5b1eddd7fd_dxslp1.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264460/eaacaf1f-bcd7-4451-998d-9ab77a789271_joi7xb.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264462/06a22587-c448-460e-8052-549f6a501bfa_ehcbjl.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264450/bb4fc7dd-4199-4eca-8589-68e1cd442cae_occnnd.png',
      ],
      'Blue': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264461/Screenshot_2026-07-05_at_8.19.02_PM_qdgknp.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264456/c797779b-0d18-42ca-a69e-e80da8d05aa2_bhrp9t.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264466/f761160e-c664-4789-9781-89e4cb97e9b9_fwolmp.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264454/c7d3be19-6d30-486d-bfde-0d1873fcbd58_wgfltn.png',
      ],
      'Maroon': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264462/fc88eef1-cde0-4032-96ff-707ddf39d1d8_2_ddtyy6.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264457/d8ae84cb-288c-4241-a143-376c368ccd20_oc2vre.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264451/8307bf09-b487-426a-88f9-db511f076b34_pt2neu.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264453/47847cbd-929c-4794-9ac3-37ea33657008_tkrrz6.png',
      ],
      'Brown': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264449/a71dc5d0-64f8-4461-8d17-d5e7bc2e8c71_ry7h6r.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264449/19ffd488-19ac-49c6-a64b-f5a3dfa52378_iru2xh.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264459/fc88eef1-cde0-4032-96ff-707ddf39d1d8_zyh4k4.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783264457/e7b338d0-7d37-442c-b795-b1b08eaa8efc_ga3omp.png',
      ],
    },
    category: 'new',
    tshirtType: 'Washed Edition',
    additionalTypes: ['Oversized Collection'],
    tag: '50% OFF',
    graphicDesc: 'Premium acid wash finish with unique washed texture. Available in Grey, Olive Green, Black, Blue, Maroon, and Brown.',
    washingInstructions: WASHING_INSTRUCTIONS
  },
  // ── Classic Polo Collection ──────────────────────────────────────
  {
    id: 'classic-polo-tee',
    name: 'Classic Polo Tee',
    price: 1999,
    salePrice: 999,
    description: 'Classic Polo Tee with a premium collar, button placket, soft fabric feel, and regular fit. Designed for everyday comfort, smart casual styling, office casuals, travel, and weekend wear.',
    fit: 'Regular Fit',
    fitType: 'Regular',
    gsm: 220,
    material: '220 GSM premium 100% combed cotton pique',
    printFront: 'Premium collar with button placket',
    printBack: 'Clean minimal back',
    style: 'Unisex smart casual style',
    sizes: SIZES,
    colors: [
      { name: 'White', hex: '#F9FAFB' },
      { name: 'Olive Green', hex: '#3B3F30' },
      { name: 'Navy Blue', hex: '#1E293B' },
      { name: 'Maroon', hex: '#800020' },
      { name: 'Black', hex: '#0F0F11' },
      { name: 'Grey', hex: '#808080' },
      { name: 'Beige', hex: '#E1D9D1' },
      { name: 'Brown', hex: '#5C4033' },
      { name: 'Sky Blue', hex: '#87CEEB' },
      { name: 'Red', hex: '#DC2626' },
    ],
    images: [
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316675/WHITE_1_mmh9g8.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316650/WHITE_2_bvpnjf.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316650/WHITE_3_khubmo.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783317781/ChatGPT_Image_Jul_6_2026_11_31_18_AM_b3bbvj.png',
    ],
    colorImages: {
      'White': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316675/WHITE_1_mmh9g8.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316650/WHITE_2_bvpnjf.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316650/WHITE_3_khubmo.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783317781/ChatGPT_Image_Jul_6_2026_11_31_18_AM_b3bbvj.png',
      ],
      'Olive Green': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316639/OLIVE_GREEN_1_j1jggq.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316640/OLIVE_GREEN_2_ot82pu.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316670/OLIVE_GREEN_3_i5cmiq.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783317781/ChatGPT_Image_Jul_6_2026_11_31_18_AM_b3bbvj.png',
      ],
      'Navy Blue': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316653/NAVY_1_sxuuel.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316638/NAVY_2_zshjbp.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316640/NAVY_3_d2miwo.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783317781/ChatGPT_Image_Jul_6_2026_11_31_18_AM_b3bbvj.png',
      ],
      'Maroon': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316643/MAROON_1_cnywnw.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316631/MAROON_2_bcjwqa.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316637/MAROON_3_v5vw5x.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783317781/ChatGPT_Image_Jul_6_2026_11_31_18_AM_b3bbvj.png',
      ],
      'Black': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316631/BLACK_1_cocd4x.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316646/BLACK_2_jrwqln.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316646/BLACK_2_jrwqln.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783317781/ChatGPT_Image_Jul_6_2026_11_31_18_AM_b3bbvj.png',
      ],
      'Grey': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316646/GREY_1_e8zlzo.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316628/GREY_2_sb8sts.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316634/GREY_3_gmh19h.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783317781/ChatGPT_Image_Jul_6_2026_11_31_18_AM_b3bbvj.png',
      ],
      'Beige': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316635/BEIGE_1_qebdig.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316629/BEIGE_2_samll5.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316636/BEIGE_3_mqmfhj.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783317781/ChatGPT_Image_Jul_6_2026_11_31_18_AM_b3bbvj.png',
      ],
      'Brown': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316635/BROWN_1_k20dkw.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316634/BROWN_2_zmgzii.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316637/BROWN_3_dzslyb.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783317781/ChatGPT_Image_Jul_6_2026_11_31_18_AM_b3bbvj.png',
      ],
      'Sky Blue': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316645/SKY_BLUE_1_vflbte.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316647/SKY_BLUE_2_yznmjy.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316648/SKY_BLUE_3_cawyah.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783317781/ChatGPT_Image_Jul_6_2026_11_31_18_AM_b3bbvj.png',
      ],
      'Red': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316642/RED_1_bx9r4b.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316643/RED_2_v1gpay.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783316645/RED_3_j0rlzx.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783317781/ChatGPT_Image_Jul_6_2026_11_31_18_AM_b3bbvj.png',
      ],
    },
    category: 'new',
    tshirtType: 'Classic Polo',
    tag: '50% OFF',
    graphicDesc: "Men's Classic Polo Tee regular fit in premium solid color, front back and side view.",
    washingInstructions: WASHING_INSTRUCTIONS
  },
  // ── TeeCode Training Gear Collection ──────────────────────────────────────
  {
    id: 'teecode-premium-gym-vest',
    name: 'TeeCode Premium TeeCode Training Gear',
    price: 1199,
    salePrice: 499,
    description: 'Premium soft-touch TeeCode Training Gear made with lightweight, breathable fabric for all-day comfort. Designed with a relaxed fit, deep armholes, and stretch-friendly material for easy movement during workouts, casual wear, and photoshoots.',
    fit: 'Relaxed gym fit',
    fitType: 'Regular',
    gsm: 180,
    material: 'Cotton blend, soft, breathable, lightweight',
    printFront: 'Clean minimal front',
    printBack: 'Clean minimal back',
    style: 'Gym, training, casual wear',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    colors: [
      { name: 'Olive Green', hex: '#3B3F30' },
      { name: 'Maroon', hex: '#800020' },
      { name: 'Sky Blue', hex: '#87CEEB' },
      { name: 'Grey', hex: '#808080' },
      { name: 'Black', hex: '#0F0F11' },
      { name: 'Beige', hex: '#E1D9D1' },
      { name: 'Yellow', hex: '#F5C518' },
      { name: 'Light Grey', hex: '#D3D3D3' },
    ],
    images: [
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541168/OLIVE_3_hp2ppp.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541167/OLIVE_2_sa7bop.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541168/OLIVE_4_v2cu7l.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541168/OLIVE_3_hp2ppp.png',
    ],
    colorImages: {
      'Olive Green': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541168/OLIVE_3_hp2ppp.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541167/OLIVE_2_sa7bop.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541168/OLIVE_4_v2cu7l.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541168/OLIVE_3_hp2ppp.png',
      ],
      'Maroon': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541167/MAROON_1_cje309.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541381/9e9ebf84-26d2-4492-b487-d0163774f3c2_todyb5.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541168/MAROON_3_kkyj91.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541165/MAROON_4_jigbnn.png',
      ],
      'Sky Blue': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541175/SKY_1_aemqyt.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541170/SKY_2_ikgt3n.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541171/SKY_3_ahiqir.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541170/SKY_4_cmczh6.png',
      ],
      'Grey': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541163/GREY_1_b7dzdq.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541165/GREY_2_ed0uyo.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541164/GREY_3_s30ooi.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541162/EY_4_zaq3mf.png',
      ],
      'Black': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541157/BLACK_1_nvu45f.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541162/BLACK_2_hoe4t8.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541161/BLACK_3_zkwzoe.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541162/BLACK_4_zz1zkf.png',
      ],
      'Beige': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541158/BEIGE_1_gds8a5.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541160/BEIGE_2_zgkoje.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541175/BEIGE_3_wlr9dy.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541157/BEIGE_4_auemyp.png',
      ],
      'Yellow': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541174/YELLOW_1_zm0j31.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541173/YELLOW_2_ge436x.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541173/YELLOW_3_ifspbk.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541175/YELLOW_4_uxzc7p.png',
      ],
      'Light Grey': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541160/1_e0n4pw.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541159/2_z9rntg.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541161/47688261-fe7e-4323-b7df-4629d0c67995_qf11kd.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783541158/4_pdr12x.png',
      ],
    },
    category: 'new',
    tshirtType: 'TeeCode Training Gear',
    tag: '₹700 OFF',
    graphicDesc: 'Premium soft-touch gym vest in solid color with relaxed fit and deep armholes.',
    washingInstructions: [
      'Machine wash cold, inside out, with like colors.',
      'Do not bleach or dry clean.',
      'Dry in shade for best longevity.',
      'Warm iron inside out if needed.',
      'Fabric: Cotton blend – Fit: Relaxed gym fit – Feel: Soft, breathable, lightweight.'
    ]
  },
  {
    id: 'nyc-brooklyn-oversized-hoodie',
    name: 'NYC Brooklyn Oversized Hoodie',
    price: 2999,
    salePrice: 1199,
    description: 'Make a bold statement with the NYC Brooklyn Oversized Hoodie, designed for those who appreciate urban fashion and everyday comfort. Featuring a striking NYC Brooklyn graphic inspired by city street maps, this hoodie blends modern streetwear aesthetics with a relaxed oversized fit. Crafted from premium-quality fabric, it delivers lasting comfort, warmth, and durability, making it a versatile essential for every season.\n\nPerfect for casual outings, travel, weekend wear, or layering, the spacious kangaroo pocket and adjustable drawstring hood add practicality without compromising style. Pair it effortlessly with jeans, joggers, or cargo pants for a confident streetwear look.',
    fit: 'Oversized Fit',
    fitType: 'Oversized',
    gsm: 320,
    material: 'Premium heavyweight fleece-lined cotton blend',
    printFront: 'NYC Brooklyn graphic streetwear print with city street map design',
    printBack: 'Plain back',
    style: 'Urban Streetwear / Casual / Travel — Men\'s',
    sizes: SIZES,
    colors: [
      { name: 'Black', hex: '#0F0F11' },
      { name: 'White', hex: '#F9FAFB' },
      { name: 'Beige', hex: '#E1D9D1' },
      { name: 'Grey', hex: '#808080' },
      { name: 'Dark Grey', hex: '#404040' },
    ],
    images: [
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783867772/Screenshot_2026-07-12_at_8.14.38_PM_prakqb.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783867769/Screenshot_2026-07-12_at_8.15.27_PM_kzu3wu.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783867770/Screenshot_2026-07-12_at_8.15.32_PM_aixqxp.png',
    ],
    colorImages: {
      'Black': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783867769/Screenshot_2026-07-12_at_8.15.27_PM_kzu3wu.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783867770/Screenshot_2026-07-12_at_8.15.32_PM_aixqxp.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783867767/Screenshot_2026-07-12_at_8.15.38_PM_dw5l9c.png',
      ],
      'White': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783867760/Screenshot_2026-07-12_at_8.15.50_PM_ha5s9u.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783867762/Screenshot_2026-07-12_at_8.15.55_PM_sskc8i.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783867758/Screenshot_2026-07-12_at_8.16.06_PM_hut36s.png',
      ],
      'Beige': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783867755/Screenshot_2026-07-12_at_8.16.22_PM_idc0gq.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783867751/Screenshot_2026-07-12_at_8.16.28_PM_ftp58p.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783867752/Screenshot_2026-07-12_at_8.16.34_PM_rdkim3.png',
      ],
      'Grey': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783867732/Screenshot_2026-07-12_at_8.17.27_PM_y8ctjj.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783867732/Screenshot_2026-07-12_at_8.17.33_PM_vy4gvm.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783867731/Screenshot_2026-07-12_at_8.17.38_PM_grxgcu.png',
      ],
      'Dark Grey': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783867772/Screenshot_2026-07-12_at_8.14.38_PM_prakqb.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783867772/Screenshot_2026-07-12_at_8.14.44_PM_putblr.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783867777/Screenshot_2026-07-12_at_8.15.05_PM_nk702h.png',
      ],
    },
    category: 'new',
    gender: 'men',
    tshirtType: 'Hoodies',
    tag: 'NEW DROP',
    graphicDesc: 'NYC Brooklyn Oversized Hoodie, Men\'s Hoodie, Oversized Hoodie, Streetwear Hoodie, Urban Fashion Hoodie, Brooklyn Graphic Hoodie, Kangaroo Pocket Hoodie, Premium Hoodie India, TeeCode Hoodies, Winter Hoodie',
    sizeChartImage: 'https://res.cloudinary.com/dtzyjynai/image/upload/v1783867750/Screenshot_2026-07-12_at_8.17.06_PM_rsfosb.png',
    washingInstructions: [
      'Machine wash cold, inside out, with like colors.',
      'Do not bleach or dry clean.',
      'Tumble dry low or hang dry in shade.',
      'Warm iron inside out if needed. Never iron directly over the print.',
      'Avoid fabric softeners to maintain the premium fleece texture.'
    ]
  },
  {
    id: 'teecode-zip-up-cropped-hoodie',
    name: 'TEECODE Zip-Up Cropped Hoodie',
    price: 3999,
    salePrice: 1499,
    description: 'Upgrade your everyday wardrobe with this Women\'s Oversized Zip-Up Hoodie, designed for effortless comfort and modern streetwear style. Made from a premium cotton-blend fleece, this hoodie offers a soft, breathable feel with a relaxed oversized silhouette that\'s perfect for layering throughout the year.\n\nFeaturing a full-length front zipper, an adjustable drawstring hood, ribbed cuffs and hem, and spacious front pockets, it combines functionality with a clean, minimalist design. Whether you\'re heading to the gym, traveling, running errands, or relaxing at home, this versatile hoodie pairs seamlessly with joggers, leggings, denim, or shorts for a stylish, laid-back look.',
    fit: 'Oversized Fit',
    fitType: 'Oversized',
    gsm: 320,
    material: 'Premium cotton-blend fleece, soft & breathable',
    printFront: 'Clean minimalist design with full front zip closure',
    printBack: 'Plain back',
    style: 'Casual / Streetwear / Loungewear — Women\'s',
    sizes: SIZES,
    colors: [
      { name: 'Pink', hex: '#F4A7BB' },
      { name: 'Grey', hex: '#808080' },
      { name: 'Off White', hex: '#FAF0E6' },
      { name: 'Black', hex: '#0F0F11' },
    ],
    images: [
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783875130/Screenshot_2026-07-12_at_10.19.26_PM_zemlrf.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783875135/Screenshot_2026-07-12_at_10.19.34_PM_rdnjhl.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1783875131/Screenshot_2026-07-12_at_10.20.13_PM_aoolw9.png',
    ],
    colorImages: {
      'Pink': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783875130/Screenshot_2026-07-12_at_10.19.26_PM_zemlrf.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783875135/Screenshot_2026-07-12_at_10.19.34_PM_rdnjhl.png',
      ],
      'Grey': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783875131/Screenshot_2026-07-12_at_10.19.59_PM_qhrlyz.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783875130/Screenshot_2026-07-12_at_10.20.05_PM_qkkfr2.png',
      ],
      'Off White': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783875134/Screenshot_2026-07-12_at_10.19.41_PM_vsjtlv.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783875133/Screenshot_2026-07-12_at_10.19.49_PM_qr467b.png',
      ],
      'Black': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783875131/Screenshot_2026-07-12_at_10.20.13_PM_aoolw9.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1783875131/Screenshot_2026-07-12_at_10.20.20_PM_dbsjgc.png',
      ],
    },
    category: 'new',
    gender: 'women',
    tshirtType: 'Hoodies',
    tag: 'NEW DROP',
    graphicDesc: 'Women\'s Zip-Up Hoodie, Cropped Hoodie, Oversized Hoodie for Women, Streetwear Hoodie, Cotton Blend Fleece Hoodie, Casual Hoodie, TeeCode Women\'s Hoodies, Premium Zip Hoodie India, Loungewear Hoodie',
    washingInstructions: [
      'Machine wash cold with similar fabrics.',
      'Do not bleach.',
      'Tumble dry low or hang to dry.',
      'Iron on low heat if required.',
      'Avoid dry cleaning for longer fabric life.'
    ]
  },
  // ── Shadow Cross — MEN / T-Shirts / Anime / Gothic ────────────────────
  {
    id: 'teecode-shadow-cross-oversized-tshirt',
    name: 'TEECODE Shadow Cross Oversized T-Shirt',
    price: 1999,
    salePrice: 999,
    description: 'Embrace bold streetwear with a dark gothic aesthetic in the TEECODE Shadow Cross Oversized T-Shirt. Featuring a striking monochrome anime-inspired warrior framed by an ornate cathedral cross, celestial moon elements, and intricate gothic detailing, this design blends mystery, power, and modern fashion into one statement piece. Crafted from premium heavyweight cotton, this oversized tee offers exceptional comfort, breathability, and a relaxed fit that\'s perfect for everyday wear. The high-definition front graphic delivers crisp details and long-lasting durability, making it a standout addition to any streetwear collection.',
    fit: 'Oversized Fit',
    fitType: 'Oversized',
    gsm: 240,
    material: '100% Premium Combed Cotton, 240 GSM heavyweight, bio-washed, pre-shrunk',
    printFront: 'High-definition DTG anime warrior with ornate cathedral cross, celestial moon elements, and gothic detailing',
    printBack: 'Clean back',
    style: 'Streetwear / Gothic / Anime / Dark Aesthetic — Men\'s',
    sizes: SIZES,
    colors: [
      { name: 'Black', hex: '#0F0F11' },
    ],
    images: [
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1784217314/1_m6qpn7.webp',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1784217316/2_sbg7wr.webp',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1784217315/3_fflw9k.webp',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1784217316/4_ntuy9z.webp',
    ],
    colorImages: {
      'Black': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1784217314/1_m6qpn7.webp',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1784217316/2_sbg7wr.webp',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1784217315/3_fflw9k.webp',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1784217316/4_ntuy9z.webp',
      ],
    },
    category: 'new',
    gender: 'men',
    tshirtType: 'Anime Code',
    additionalTypes: ['Oversized Collection', 'Graphic Universe'],
    tag: '50% OFF',
    graphicDesc: 'TEECODE Shadow Cross Oversized T-Shirt, Gothic Anime Tee, Dark Aesthetic Graphic Tee, Cathedral Cross Design, Monochrome Anime Warrior, Celestial Moon Gothic Streetwear, Premium Heavyweight Oversized Tee',
    washingInstructions: [
      'Machine wash cold inside out',
      'Wash with similar colors',
      'Do not bleach',
      'Do not iron directly on the print',
      'Tumble dry low or hang dry for best results',
    ]
  },
  // ── Original Typography Graphic T-Shirt — WOMEN / T-Shirts ────────────
  {
    id: 'original-typography-graphic-tshirt-women',
    name: 'Original Typography Graphic T-Shirt',
    price: 1999,
    salePrice: 799,
    description: 'Celebrate individuality with the Original Typography Graphic T-Shirt, designed for those who appreciate timeless style and everyday comfort. Featuring a bold vintage-inspired "Original" graphic with the statement "One of One – One Run, No Represses", this tee adds a distinctive touch to your casual wardrobe. Crafted from premium-quality cotton, it offers a soft feel, breathable comfort, and a durable print that stays vibrant wear after wear. Its classic crew neck and comfortable fit make it perfect for daily wear, travel, weekends, or layering with your favorite jacket.',
    fit: 'Regular Fit',
    fitType: 'Regular',
    gsm: 180,
    material: '100% Premium Cotton, soft, breathable & lightweight',
    printFront: 'Bold vintage-inspired "Original" typography graphic with "One of One – One Run, No Represses" statement',
    printBack: 'Clean back',
    style: 'Casual / Typography / Everyday — Women\'s',
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', hex: '#F9FAFB' },
    ],
    images: [
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1784219871/Screenshot_2026-07-16_at_10.07.03_PM_tzx4rm.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1784219871/Screenshot_2026-07-16_at_10.06.45_PM_ddbydj.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1784219870/Screenshot_2026-07-16_at_10.06.52_PM_vf854e.png',
    ],
    colorImages: {
      'White': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1784219871/Screenshot_2026-07-16_at_10.07.03_PM_tzx4rm.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1784219871/Screenshot_2026-07-16_at_10.06.45_PM_ddbydj.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1784219870/Screenshot_2026-07-16_at_10.06.52_PM_vf854e.png',
      ],
    },
    category: 'new',
    gender: 'women',
    tag: '60% OFF',
    graphicDesc: 'Original Typography Graphic T-Shirt for Women, Premium Cotton Casual Crew Neck Tee, Vintage Inspired Graphic Print, Everyday Casual Wear, Street Style Fashion',
    washingInstructions: [
      'Machine wash cold',
      'Wash inside out',
      'Do not bleach',
      'Tumble dry low',
      'Iron inside out if required',
      'Do not dry clean',
    ]
  },
  // ── Vintage Drive Oversized Off-Shoulder Graphic Tee — WOMEN / T-Shirts ──
  {
    id: 'teecode-vintage-drive-oversized-off-shoulder-graphic-tee',
    name: 'TeeCode Vintage Drive Oversized Off-Shoulder Graphic Tee',
    price: 1999,
    salePrice: 749,
    description: 'Upgrade your casual wardrobe with the TeeCode Vintage Drive Oversized Off-Shoulder Graphic Tee. Featuring a vintage-inspired automobile graphic with bold typography, this tee delivers the perfect combination of retro fashion and contemporary street style.\n\nThe oversized silhouette and wide neckline make it easy to style off one shoulder for a relaxed and trendy look. Crafted from a soft and breathable cotton-blend fabric, it is designed for comfortable everyday wear.\n\nPerfect for casual outings, college and campus wear, weekend trips, coffee dates, travel, and streetwear styling.',
    fit: 'Oversized Fit — Drop Shoulder — Half Sleeves — Hip Length',
    fitType: 'Oversized',
    gsm: 200,
    material: 'Cotton Blend with a soft-touch finish. Breathable, skin-friendly, and comfortable for everyday wear.',
    printFront: 'Vintage-inspired automobile graphic with bold retro typography',
    printBack: 'Plain back',
    style: 'Casual / Vintage / Streetwear — Women\'s',
    sizes: ['XXS', 'XS', 'S', 'M', 'L'],
    colors: [
      { name: 'White', hex: '#F9FAFB' },
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Off White', hex: '#F5F0E8' },
    ],
    images: [
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1784373261/Screenshot_2026-07-18_at_4.42.33_PM_bnyxjx.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1784373265/Screenshot_2026-07-18_at_4.42.50_PM_xujplo.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1784373265/Screenshot_2026-07-18_at_4.42.44_PM_keavic.png',
      'https://res.cloudinary.com/dtzyjynai/image/upload/v1784373262/Screenshot_2026-07-18_at_4.42.39_PM_u56nzk.png',
    ],
    colorImages: {
      'White': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1784373261/Screenshot_2026-07-18_at_4.42.33_PM_bnyxjx.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1784373265/Screenshot_2026-07-18_at_4.42.50_PM_xujplo.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1784373265/Screenshot_2026-07-18_at_4.42.44_PM_keavic.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1784373262/Screenshot_2026-07-18_at_4.42.39_PM_u56nzk.png',
      ],
      'Black': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1784373258/Screenshot_2026-07-18_at_4.42.01_PM_vqnfba.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1784373261/Screenshot_2026-07-18_at_4.42.13_PM_zbrnqk.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1784373264/Screenshot_2026-07-18_at_4.42.07_PM_hby79y.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1784373260/Screenshot_2026-07-18_at_4.42.20_PM_bvartu.png',
      ],
      'Off White': [
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1784373257/Screenshot_2026-07-18_at_4.40.18_PM_iyry1c.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1784373264/Screenshot_2026-07-18_at_4.40.32_PM_wb0soe.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1784373257/Screenshot_2026-07-18_at_4.40.25_PM_dmcmij.png',
        'https://res.cloudinary.com/dtzyjynai/image/upload/v1784373261/Screenshot_2026-07-18_at_4.40.38_PM_cmwfh3.png',
      ],
    },
    category: 'new',
    gender: 'women',
    tag: '63% OFF',
    graphicDesc: 'Vintage Drive Oversized Off-Shoulder Graphic Tee for Women, Retro Car Graphic Tee, Women\'s Oversized T-Shirt, Off-Shoulder Tee, Cotton Blend Graphic Tee, Streetwear Women\'s T-Shirt, TeeCode Women\'s Collection',
    washingInstructions: [
      'Machine wash cold',
      'Wash inside out',
      'Do not bleach',
      'Tumble dry on low',
      'Iron on the reverse side',
      'Do not iron directly over the graphic print',
    ]
  }
];

// Append these to PRODUCTS array
PRODUCTS.push(...NEW_PRODUCTS_TO_ADD);

// Real product image mapping
const REAL_PRODUCT_IMAGES: Record<string, string[]> = {
  'teecode-womens-los-angeles-95-oversized-graphic-tshirt': [
    'https://res.cloudinary.com/dtzyjynai/image/upload/v1785175559/31d9084eb8b2edba03c8c387ade8915f_vyyvzj.jpg',
    'https://res.cloudinary.com/dtzyjynai/image/upload/v1785175561/111_cryka7.png',
    'https://res.cloudinary.com/dtzyjynai/image/upload/v1785175563/1_iouedo.png',
    'https://res.cloudinary.com/dtzyjynai/image/upload/v1785175568/11_wjydhw.png',
  ],
  'ryu-dragon': [
    '/products/nocturnis/nocturnis-4.png',
    '/products/nocturnis/nocturnis-10.png',
    '/products/shadow-faith/shadow-faith-1.png',
    '/products/nocturnis/nocturnis-2.png',
  ],
  'chimera-legend': [
    '/products/nocturnis/nocturnis-8.png',
    '/products/nocturnis/nocturnis-6.png',
    '/products/shadow-faith/shadow-faith-2.png',
    '/products/nocturnis/nocturnis-10.png',
  ],
};

// Map for products that should also appear in additional categories (many-to-many)
const ADDITIONAL_TYPES_MAP: Record<string, string[]> = {
};

// Map PRODUCTS to use real images where available, SVG fallback for the rest
PRODUCTS.forEach(p => {
  // Set tshirtType if not already specified
  if (!p.tshirtType && TSHIRT_TYPE_MAP[p.id]) {
    p.tshirtType = TSHIRT_TYPE_MAP[p.id];
  }

  // Set additionalTypes if not already specified
  if (!p.additionalTypes && ADDITIONAL_TYPES_MAP[p.id]) {
    p.additionalTypes = ADDITIONAL_TYPES_MAP[p.id];
  }

  // Use real images if available (skip products with colorImages — they manage their own galleries)
  if (p.colorImages) {
    // Product has per-color-variant images, don't override
  } else if (REAL_PRODUCT_IMAGES[p.id]) {
    p.images = REAL_PRODUCT_IMAGES[p.id];
  } else if (p.images && p.images.length > 0 && !p.images[0].startsWith('data:image/svg+xml')) {
    // Preserve specified real images without SVG fallbacks
  } else {
    // SVG fallback for products without real photos
    let modelPhoto = '';
    if (p.images && p.images.length > 0) {
      const found = p.images.find(img => !img.startsWith('data:image/svg+xml'));
      if (found) modelPhoto = found;
    }
    if (!modelPhoto) {
      modelPhoto = getNocturnisImage(p.name, p.salePrice || p.price, p.gsm || 240, p.fitType || 'Oversized', 'model');
    }

    p.images = [
      getNocturnisImage(p.name, p.salePrice || p.price, p.gsm || 240, p.fitType || 'Oversized', 'front'),
      getNocturnisImage(p.name, p.salePrice || p.price, p.gsm || 240, p.fitType || 'Oversized', 'back'),
      getNocturnisImage(p.name, p.salePrice || p.price, p.gsm || 240, p.fitType || 'Oversized', 'detail'),
      modelPhoto
    ];
  }
});

// Default all products to 'unisex' if no gender is set
PRODUCTS.forEach((p) => {
  if (!p.gender) {
    p.gender = 'unisex';
  }
});
