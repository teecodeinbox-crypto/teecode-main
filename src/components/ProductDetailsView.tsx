import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Ruler,
  ShieldCheck,
  Heart,
  ShoppingBag,
  MessageCircle,
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
  Check,
  Sparkles,
  Truck,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { Product } from '../types';
import { SIZE_CHARTS, PRODUCTS } from '../data';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import WomensTennisSkortView from './WomensTennisSkortView';
import RaisedCountryTeeView from './RaisedCountryTeeView';

export default function ProductDetailsView() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  // Route to dedicated bespoke view for Black Pleated Tennis Skort
  if (
    productId === 'black-pleated-tennis-skort' ||
    productId === 'pleated-tennis-skort' ||
    productId === 'tennis-skort'
  ) {
    return <WomensTennisSkortView />;
  }

  // Route to dedicated bespoke view for Raised On 90's Country Graphic Tee
  if (
    productId === 'raised-on-90s-country-graphic-tee' ||
    productId === 'raised-on-90s-country'
  ) {
    return <RaisedCountryTeeView />;
  }

  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  // Find product by id (supporting alias for legacy id)
  const product =
    PRODUCTS.find((p) => p.id === productId) ||
    (productId === 'teecode-premium-370-gsm-oversized-hoodie' ||
    productId === 'teecode-premium-350-gsm-hoodie'
      ? PRODUCTS.find((p) => p.id === 'premium-350-gsm-hoodie')
      : undefined);

  if (!product) {
    return (
      <div className="bg-white min-h-screen text-street-black font-sans py-24 text-center">
        <h2 className="font-display text-2xl font-black uppercase">PRODUCT NOT FOUND</h2>
        <p className="text-zinc-500 font-mono text-xs mt-2">The product you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-6 bg-street-black hover:bg-street-red text-white font-mono text-xs font-bold uppercase tracking-widest py-3 px-6 transition-colors"
        >
          BACK TO SHOP
        </button>
      </div>
    );
  }

  // Determine default color: prefer White if available, otherwise first color
  const defaultColor =
    product.colors.find((c) => c.name.toLowerCase() === 'white')?.name ||
    product.colors[0]?.name ||
    'White';

  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>(defaultColor);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isAddedNotify, setIsAddedNotify] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Accordion state
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isWhyLoveOpen, setIsWhyLoveOpen] = useState(true);

  // Per-color images or fallback to product.images
  const displayImages = product.colorImages?.[selectedColor] || product.images;

  // Reset active image index when color changes
  const prevColorRef = useRef(selectedColor);
  useEffect(() => {
    if (prevColorRef.current !== selectedColor) {
      setActiveImageIndex(0);
      prevColorRef.current = selectedColor;
    }
  }, [selectedColor]);

  // When productId changes, reset default color and active image
  useEffect(() => {
    setSelectedColor(defaultColor);
    setActiveImageIndex(0);
  }, [product.id, defaultColor]);

  // Preload default White Image 1 for the Premium 350 GSM Hoodie
  useEffect(() => {
    if (product.id === 'premium-350-gsm-hoodie' && product.colorImages?.['White']?.[0]) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = product.colorImages['White'][0];
      // @ts-ignore
      link.fetchPriority = 'high';
      document.head.appendChild(link);
      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [product.id]);

  // Update SEO title
  useEffect(() => {
    const prevTitle = document.title;
    const title =
      product.seoTitle ||
      `${product.name} | Heavyweight Men's Hoodie | TeeCode`;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  }, [product.seoTitle, product.name]);

  // Update meta description
  useEffect(() => {
    if (product.metaDescription) {
      const meta = document.querySelector('meta[name="description"]');
      const prevContent = meta?.getAttribute('content') || '';
      if (meta) {
        meta.setAttribute('content', product.metaDescription);
      }
      return () => {
        if (meta && prevContent) {
          meta.setAttribute('content', prevContent);
        }
      };
    }
  }, [product.metaDescription]);

  // Dynamic alt text generator
  const getViewLabel = useCallback((idx: number) => {
    switch (idx) {
      case 0:
        return 'Front View';
      case 1:
        return 'Angle View';
      case 2:
        return 'Side View';
      case 3:
        return 'Detail View';
      default:
        return `View ${idx + 1}`;
    }
  }, []);

  const getAltText = useCallback(
    (idx: number) => {
      return `${product.name} - ${selectedColor} - ${getViewLabel(idx)}`;
    },
    [product.name, selectedColor, getViewLabel]
  );

  // Gallery Navigation Handlers
  const handlePrevImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  }, [displayImages.length]);

  const handleNextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  }, [displayImages.length]);

  // Touch handlers for mobile swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      handleNextImage();
    } else if (distance < -45) {
      handlePrevImage();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handlePrevImage, handleNextImage]);

  const currentPrice = product.salePrice || product.price;
  const savingsAmount = product.salePrice ? product.price - product.salePrice : 0;
  const selectedChart = SIZE_CHARTS[product.fitType || 'Oversized'];

  // Add to Bag
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor);
    }
    setIsAddedNotify(true);
    setTimeout(() => {
      setIsAddedNotify(false);
    }, 3000);
  };

  // Buy Now: add to cart and immediately go to checkout
  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor);
    }
    navigate('/checkout');
  };

  // WhatsApp Order
  const handleWhatsAppBuy = () => {
    const text = `Hi TeeCode!%20I%20want%20to%20buy%20the%20following%20streetwear:%0A%0A*PRODUCT:*%20${encodeURIComponent(
      product.name
    )}%0A*SIZE:*%20${selectedSize}%0A*COLOR:*%20${encodeURIComponent(
      selectedColor
    )}%0A*PRICE:*%20₹${currentPrice}%0A%0Ateecode.store`;
    window.open(`https://wa.me/919196294654?text=${text}`, '_blank');
  };

  const isHoodieProduct =
    product.id === 'premium-350-gsm-hoodie' ||
    product.id === 'teecode-premium-370-gsm-oversized-hoodie' ||
    Boolean(product.productDetails);

  return (
    <div className="bg-white min-h-screen text-street-black font-sans py-8 sm:py-12">
      {/* Toast Notification for Add To Cart */}
      <AnimatePresence>
        {isAddedNotify && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-street-black text-white px-6 py-4 border border-zinc-800 shadow-2xl flex items-center space-x-3 rounded-none font-mono text-xs tracking-wider uppercase"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-street-red animate-ping" />
            <span>
              ADDED {quantity}x {product.name} ({selectedSize} / {selectedColor}) TO BAG
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          id="product-back-btn"
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-zinc-500 hover:text-street-black font-mono text-xs uppercase tracking-widest mb-6 pb-2 border-b border-zinc-100 self-start transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>BACK TO CATALOG</span>
        </button>

        {/* Product Workspace Grid: 2 columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* ======================================================== */}
          {/* LEFT: Image Gallery Column (Visually Dominant - 6 cols)  */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Large Image Display */}
            <div
              className="bg-zinc-100 border border-zinc-200 aspect-[3/4] sm:aspect-[4/5] overflow-hidden relative group cursor-zoom-in select-none"
              onClick={() => setIsLightboxOpen(true)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${selectedColor}-${activeImageIndex}`}
                  src={displayImages[activeImageIndex]}
                  alt={getAltText(activeImageIndex)}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </AnimatePresence>

              {/* Tag Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
                {product.tag && (
                  <span className="bg-street-black text-white text-[10px] font-mono font-bold px-3 py-1 tracking-widest uppercase border border-zinc-800 shadow-sm">
                    {product.tag}
                  </span>
                )}
                <span className="bg-street-red text-white text-[10px] font-mono font-bold px-3 py-1 tracking-widest uppercase shadow-sm">
                  {product.gsm} GSM FABRIC
                </span>
              </div>

              {/* Lightbox / Zoom Action Button */}
              <button
                type="button"
                id="open-lightbox-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLightboxOpen(true);
                }}
                title="Zoom view"
                aria-label="Open image zoom modal"
                className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white text-street-black border border-zinc-200 shadow-sm transition-all duration-200 cursor-pointer"
              >
                <ZoomIn className="h-4 w-4" />
              </button>

              {/* Previous / Next Arrow Controls */}
              {displayImages.length > 1 && (
                <>
                  <button
                    type="button"
                    id="gallery-prev-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    title="Previous image"
                    aria-label="Previous product image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 hover:bg-white text-street-black shadow-md border border-zinc-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    id="gallery-next-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    title="Next image"
                    aria-label="Next product image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 hover:bg-white text-street-black shadow-md border border-zinc-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Image Counter Pill */}
              <div className="absolute bottom-4 right-4 bg-street-black/80 backdrop-blur-sm text-white font-mono text-[10px] font-bold px-2.5 py-1 uppercase tracking-widest">
                {activeImageIndex + 1} / {displayImages.length}
              </div>
            </div>

            {/* Thumbnails Gallery Strip (Images 1-4) */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {displayImages.map((img, idx) => {
                const isActive = activeImageIndex === idx;
                return (
                  <button
                    id={`thumbnail-img-${idx}`}
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    title={`View ${getViewLabel(idx)}`}
                    aria-label={`View ${getViewLabel(idx)} of ${product.name} in ${selectedColor}`}
                    aria-current={isActive}
                    className={`aspect-[3/4] bg-zinc-100 border overflow-hidden p-1 transition-all duration-200 cursor-pointer relative ${
                      isActive
                        ? 'border-street-black ring-2 ring-street-black shadow-sm'
                        : 'border-zinc-200 hover:border-zinc-400 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={getAltText(idx)}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                    <span className="sr-only">{getViewLabel(idx)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT: Ordering & Details Column (6 cols)                */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Breadcrumb Hierarchy */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-zinc-400 uppercase tracking-widest">
              <span>TEECODE</span>
              <span>/</span>
              <span>MEN'S HOODIES</span>
              <span>/</span>
              <span className="text-street-black font-bold truncate max-w-[220px]">
                {product.name}
              </span>
            </div>

            {/* Product Title & Tagline */}
            <div className="space-y-2">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-street-black leading-tight">
                {product.name}
              </h1>
              <p className="font-mono text-xs sm:text-sm font-bold text-street-red uppercase tracking-wider">
                {product.tagline || 'Premium quality. Heavyweight feel. Everyday comfort.'}
              </p>
            </div>

            {/* Pricing Section with Offer Price, MRP Strikethrough, and Savings */}
            <div className="space-y-1.5 border-b border-zinc-100 pb-5">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-mono text-3xl sm:text-4xl font-black text-street-black tracking-tight">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>
                {product.salePrice && product.price > product.salePrice && (
                  <>
                    <span className="font-mono text-lg text-zinc-400 line-through">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 font-mono font-bold text-xs px-2.5 py-1 rounded tracking-wider uppercase inline-flex items-center">
                      You Save ₹{savingsAmount.toLocaleString('en-IN')}
                    </span>
                  </>
                )}
              </div>
              <p className="font-mono text-[11px] text-zinc-400">
                MRP: ₹{product.price.toLocaleString('en-IN')} inclusive of all taxes. Free express shipping.
              </p>
            </div>

            {/* Product Description */}
            <p className="text-zinc-600 text-sm leading-relaxed">
              {product.description}
            </p>

            {/* ======================================================== */}
            {/* COLOR SELECTOR: 8 Variants with Clear Swatches           */}
            {/* ======================================================== */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-xs uppercase tracking-widest text-zinc-500">
                  COLOR:{' '}
                  <span className="text-street-black font-black uppercase">
                    {selectedColor}
                  </span>
                </span>
                <span className="font-mono text-[11px] text-zinc-400 uppercase">
                  {product.colors.length} VARIANTS
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {product.colors.map((color) => {
                  const isSelected = selectedColor === color.name;
                  const isWhite = color.name.toLowerCase() === 'white';
                  const isLightColor =
                    isWhite ||
                    color.name.toLowerCase() === 'yellow' ||
                    color.name.toLowerCase() === 'sky blue';

                  return (
                    <button
                      key={color.name}
                      id={`color-swatch-${color.name.toLowerCase().replace(/\s+/g, '-')}`}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      title={color.name}
                      aria-label={`Select color ${color.name}`}
                      aria-pressed={isSelected}
                      className={`group relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'ring-2 ring-street-black ring-offset-2 scale-105 shadow-md'
                          : 'hover:scale-105 opacity-90 hover:opacity-100'
                      } ${
                        isWhite
                          ? 'border-2 border-zinc-400 shadow-inner'
                          : 'border border-black/15'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {/* Check icon on selected color */}
                      {isSelected && (
                        <Check
                          className={`h-4 w-4 drop-shadow-sm ${
                            isLightColor ? 'text-zinc-900' : 'text-white'
                          }`}
                          strokeWidth={3}
                        />
                      )}

                      {/* Tooltip on hover */}
                      <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-street-black text-white text-[10px] font-mono px-2 py-0.5 rounded whitespace-nowrap z-20 shadow">
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-xs uppercase tracking-widest text-zinc-500">
                  SELECT SIZE: <span className="text-street-black font-black">{selectedSize}</span>
                </span>
                <button
                  id="size-chart-trigger"
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center space-x-1 font-mono text-[11px] text-street-red hover:underline uppercase cursor-pointer"
                >
                  <Ruler className="h-3.5 w-3.5" />
                  <span>INTERACTIVE SIZE CHART</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    id={`detail-size-btn-${size}`}
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 font-mono text-xs font-bold transition-all border cursor-pointer ${
                      selectedSize === size
                        ? 'bg-street-black text-white border-street-black ring-1 ring-offset-1 ring-street-black'
                        : 'bg-white text-street-black border-zinc-200 hover:border-street-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2 pt-1">
              <span className="font-display font-bold text-xs uppercase tracking-widest text-zinc-500 block">
                QUANTITY
              </span>
              <div className="flex items-center space-x-3">
                <button
                  id="qty-decrease-btn"
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={`w-10 h-10 border font-mono text-lg font-bold transition-all cursor-pointer ${
                    quantity <= 1
                      ? 'bg-zinc-50 text-zinc-300 border-zinc-200 cursor-not-allowed'
                      : 'bg-white text-street-black border-zinc-200 hover:border-street-black'
                  }`}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="font-mono text-lg font-black text-street-black w-10 text-center">
                  {quantity}
                </span>
                <button
                  id="qty-increase-btn"
                  type="button"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className={`w-10 h-10 border font-mono text-lg font-bold transition-all cursor-pointer ${
                    quantity >= 10
                      ? 'bg-zinc-50 text-zinc-300 border-zinc-200 cursor-not-allowed'
                      : 'bg-white text-street-black border-zinc-200 hover:border-street-black'
                  }`}
                  disabled={quantity >= 10}
                >
                  +
                </button>
                <span className="font-mono text-xs text-zinc-500 ml-2">
                  Total: <strong className="text-street-black font-bold">₹{(currentPrice * quantity).toLocaleString('en-IN')}</strong>
                </span>
              </div>
            </div>

            {/* ======================================================== */}
            {/* CTA BUTTONS: ADD TO CART & BUY NOW (Modern & High-Converting) */}
            {/* ======================================================== */}
            <div className="pt-3 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* ADD TO CART */}
                <button
                  id="add-to-cart-action-btn"
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center space-x-2.5 bg-street-black hover:bg-zinc-800 text-white font-display font-bold py-4 px-6 tracking-widest uppercase transition-all duration-200 active:scale-[0.98] shadow-md cursor-pointer"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>ADD TO CART</span>
                </button>

                {/* BUY NOW */}
                <button
                  id="buy-now-action-btn"
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full flex items-center justify-center space-x-2.5 bg-street-red hover:bg-red-700 text-white font-display font-bold py-4 px-6 tracking-widest uppercase transition-all duration-200 active:scale-[0.98] shadow-md cursor-pointer"
                >
                  <Zap className="h-5 w-5 fill-current" />
                  <span>BUY NOW</span>
                </button>
              </div>

              {/* Secondary Actions: WhatsApp & Wishlist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  id="buy-whatsapp-action-btn"
                  type="button"
                  onClick={handleWhatsAppBuy}
                  className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold py-3.5 px-4 tracking-widest uppercase transition-colors cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>BUY ON WHATSAPP</span>
                </button>

                <button
                  id="wishlist-toggle-pdp"
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`w-full flex items-center justify-center space-x-2 py-3.5 px-4 font-mono text-xs font-bold uppercase tracking-widest transition-colors border cursor-pointer ${
                    isWishlisted(product.id)
                      ? 'bg-rose-50 text-street-red border-street-red'
                      : 'bg-white text-zinc-600 border-zinc-200 hover:border-street-red hover:text-street-red'
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${isWishlisted(product.id) ? 'fill-street-red' : ''}`}
                  />
                  <span>
                    {isWishlisted(product.id) ? 'SAVED TO WISHLIST' : 'ADD TO WISHLIST'}
                  </span>
                </button>
              </div>
            </div>

            {/* Trust Guarantee Badges */}
            <div className="grid grid-cols-3 gap-2 border-t border-b border-zinc-200 py-4 font-mono text-[10px] text-zinc-600 text-center">
              <div className="flex flex-col items-center gap-1">
                <Truck className="h-4 w-4 text-street-red" />
                <span className="font-bold text-street-black uppercase">Fast Shipping</span>
                <span className="text-zinc-400">All India Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-x border-zinc-200 px-1">
                <ShieldCheck className="h-4 w-4 text-street-red" />
                <span className="font-bold text-street-black uppercase">100% Secure</span>
                <span className="text-zinc-400">Prepaid & COD</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="h-4 w-4 text-street-red" />
                <span className="font-bold text-street-black uppercase">Easy Exchanges</span>
                <span className="text-zinc-400">Hassle Free</span>
              </div>
            </div>

            {/* ======================================================== */}
            {/* PRODUCT DETAILS & WHY YOU'LL LOVE IT (Clean Accordions)  */}
            {/* ======================================================== */}
            <div className="space-y-3 pt-2">
              {/* Product Details Accordion */}
              <div className="border border-zinc-200 bg-white overflow-hidden">
                <button
                  type="button"
                  id="toggle-product-details-accordion"
                  onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                  className="w-full flex items-center justify-between p-4 bg-zinc-50 hover:bg-zinc-100 transition-colors text-left cursor-pointer"
                  aria-expanded={isDetailsOpen}
                >
                  <div className="flex items-center space-x-2.5">
                    <Sparkles className="h-4 w-4 text-street-red" />
                    <h2 className="font-display font-black text-xs uppercase tracking-widest text-street-black">
                      PRODUCT DETAILS
                    </h2>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-500 transition-transform duration-200 ${
                      isDetailsOpen ? 'rotate-180 text-street-red' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isDetailsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t border-zinc-200"
                    >
                      <div className="p-4 bg-white font-mono text-xs space-y-2 text-zinc-700">
                        {isHoodieProduct ? (
                          <>
                            <div className="flex justify-between border-b border-zinc-100 pb-2">
                              <span className="text-zinc-500 font-semibold uppercase">Fabric:</span>
                              <span className="text-street-black font-bold text-right">
                                Premium-quality 350 GSM fabric
                              </span>
                            </div>
                            <div className="flex justify-between border-b border-zinc-100 pb-2">
                              <span className="text-zinc-500 font-semibold uppercase">Fit:</span>
                              <span className="text-street-black font-bold text-right">
                                Relaxed, comfortable streetwear fit
                              </span>
                            </div>
                            <div className="flex justify-between border-b border-zinc-100 pb-2">
                              <span className="text-zinc-500 font-semibold uppercase">Hood:</span>
                              <span className="text-street-black font-bold text-right">
                                Structured hood with adjustable drawstrings
                              </span>
                            </div>
                            <div className="flex justify-between border-b border-zinc-100 pb-2">
                              <span className="text-zinc-500 font-semibold uppercase">Pocket:</span>
                              <span className="text-street-black font-bold text-right">
                                Spacious front kangaroo pocket
                              </span>
                            </div>
                            <div className="flex justify-between border-b border-zinc-100 pb-2">
                              <span className="text-zinc-500 font-semibold uppercase">Sleeves:</span>
                              <span className="text-street-black font-bold text-right">
                                Full sleeves with ribbed cuffs
                              </span>
                            </div>
                            <div className="flex justify-between border-b border-zinc-100 pb-2">
                              <span className="text-zinc-500 font-semibold uppercase">Construction:</span>
                              <span className="text-street-black font-bold text-right">
                                Durable stitching with clean finishing
                              </span>
                            </div>
                            <div className="flex justify-between border-b border-zinc-100 pb-2">
                              <span className="text-zinc-500 font-semibold uppercase">Feel:</span>
                              <span className="text-street-black font-bold text-right">
                                Soft, heavyweight, and comfortable for everyday wear
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-500 font-semibold uppercase">Style:</span>
                              <span className="text-street-black font-bold text-right">
                                Minimal, versatile, and premium
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-between border-b border-zinc-100 pb-2">
                              <span className="text-zinc-500 font-semibold uppercase">Fit Silhouette:</span>
                              <span className="text-street-black font-bold text-right">{product.fit}</span>
                            </div>
                            <div className="flex justify-between border-b border-zinc-100 pb-2">
                              <span className="text-zinc-500 font-semibold uppercase">Fabric Density:</span>
                              <span className="text-street-black font-bold text-right">{product.gsm} GSM</span>
                            </div>
                            <div className="flex justify-between border-b border-zinc-100 pb-2">
                              <span className="text-zinc-500 font-semibold uppercase">Material:</span>
                              <span className="text-street-black font-bold text-right">{product.material}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-500 font-semibold uppercase">Style:</span>
                              <span className="text-street-black font-bold text-right">{product.style}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Why You'll Love It Accordion */}
              <div className="border border-zinc-200 bg-white overflow-hidden">
                <button
                  type="button"
                  id="toggle-why-love-accordion"
                  onClick={() => setIsWhyLoveOpen(!isWhyLoveOpen)}
                  className="w-full flex items-center justify-between p-4 bg-zinc-50 hover:bg-zinc-100 transition-colors text-left cursor-pointer"
                  aria-expanded={isWhyLoveOpen}
                >
                  <div className="flex items-center space-x-2.5">
                    <Heart className="h-4 w-4 text-street-red" />
                    <h2 className="font-display font-black text-xs uppercase tracking-widest text-street-black">
                      WHY YOU'LL LOVE IT
                    </h2>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-500 transition-transform duration-200 ${
                      isWhyLoveOpen ? 'rotate-180 text-street-red' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isWhyLoveOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t border-zinc-200"
                    >
                      <div className="p-4 bg-white">
                        <ul className="space-y-2.5 font-mono text-xs text-zinc-700">
                          {(product.productDetails?.whyYoullLoveIt || [
                            'Heavyweight 350 GSM premium fabric',
                            'Comfortable for everyday styling',
                            'Excellent structure and fall',
                            'Designed for durability and repeated wear',
                            'Easy to pair with jeans, cargos, joggers, and sneakers',
                          ]).map((point, i) => (
                            <li key={i} className="flex items-start space-x-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-street-red mt-1.5 shrink-0" />
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Washing instructions card ONLY if present and NOT the 350 GSM Hoodie */}
              {!isHoodieProduct &&
                product.washingInstructions &&
                product.washingInstructions.length > 0 && (
                  <div className="border border-zinc-200 p-4 mt-4 space-y-2">
                    <h3 className="font-display font-bold text-xs uppercase tracking-widest text-street-black">
                      CARE INSTRUCTIONS
                    </h3>
                    <ul className="font-mono text-[11px] text-zinc-500 space-y-1 list-disc pl-4">
                      {product.washingInstructions.map((inst, i) => (
                        <li key={i}>{inst}</li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* LIGHTBOX / ZOOM MODAL                                    */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-60 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          >
            {/* Top Bar: Title & Close */}
            <div className="flex items-center justify-between text-white border-b border-zinc-800 pb-3">
              <div>
                <h4 className="font-display text-sm sm:text-base font-black uppercase tracking-wider">
                  {product.name}
                </h4>
                <p className="font-mono text-xs text-zinc-400">
                  {selectedColor} — {getViewLabel(activeImageIndex)} ({activeImageIndex + 1} of{' '}
                  {displayImages.length})
                </p>
              </div>
              <button
                type="button"
                id="close-lightbox-btn"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Close Lightbox (Esc)"
                aria-label="Close image lightbox"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Center Image with Prev / Next */}
            <div
              className="relative flex-1 flex items-center justify-center py-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={displayImages[activeImageIndex]}
                alt={getAltText(activeImageIndex)}
                referrerPolicy="no-referrer"
                className="max-h-[78vh] max-w-[90vw] object-contain select-none"
              />

              {displayImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    title="Previous image"
                    aria-label="Previous image"
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    title="Next image"
                    aria-label="Next image"
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 transition-all cursor-pointer"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom thumbnail strip in lightbox */}
            <div
              className="flex items-center justify-center gap-3 pt-3 border-t border-zinc-800 overflow-x-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {displayImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-18 bg-zinc-900 border overflow-hidden p-1 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-street-red ring-1 ring-street-red'
                      : 'border-zinc-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={getAltText(idx)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* SIZE CHART MODAL                                         */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeGuideOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white border-t-2 border-street-black p-6 sm:p-8 z-50 overflow-y-auto"
            >
              <div className="max-w-3xl mx-auto space-y-6 text-left">
                {/* Modal Title bar */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                  <div>
                    <span className="font-mono text-xs font-bold text-street-red uppercase tracking-wider">
                      TEECODE SIZE SPECS
                    </span>
                    <h3 className="font-display text-2xl font-black uppercase text-street-black">
                      {product.sizeChartImage
                        ? 'SIZE CHART'
                        : `${product.fitType || 'STREETWEAR'} FIT SIZE CHART`}
                    </h3>
                  </div>
                  <button
                    id="close-size-chart-btn"
                    type="button"
                    onClick={() => setIsSizeGuideOpen(false)}
                    className="p-2 border border-zinc-200 hover:border-street-black font-mono text-xs uppercase cursor-pointer"
                  >
                    CLOSE
                  </button>
                </div>

                {product.sizeChartImage ? (
                  <div className="w-full">
                    <img
                      src={product.sizeChartImage}
                      alt={`${product.name} Size Chart`}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-contain cursor-zoom-in"
                      onClick={() => window.open(product.sizeChartImage, '_blank')}
                    />
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto border border-zinc-200 bg-zinc-50">
                      <table className="w-full text-left font-mono text-xs border-collapse">
                        <thead>
                          <tr className="bg-street-black text-white border-b border-zinc-700 font-bold uppercase text-[10px] tracking-wider">
                            {selectedChart.columns.map((col, idx) => (
                              <th key={idx} className="p-3 text-center sm:p-4">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {selectedChart.rows.map((row, idx) => (
                            <tr
                              key={idx}
                              className={`border-b border-zinc-200 hover:bg-zinc-100 transition-colors text-center ${
                                row.size === selectedSize
                                  ? 'bg-rose-50 font-bold text-street-red'
                                  : ''
                              }`}
                            >
                              <td className="p-3 font-bold border-r border-zinc-200 bg-zinc-100 sm:p-4">
                                {row.size}
                              </td>
                              <td className="p-3 sm:p-4">{row.chest} inches</td>
                              <td className="p-3 sm:p-4">{row.length} inches</td>
                              <td className="p-3 sm:p-4">{row.sleeve} inches</td>
                              <td className="p-3 sm:p-4">{row.shoulder} inches</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-zinc-100 p-4 border border-zinc-200 font-mono text-[11px] text-zinc-600 leading-relaxed text-left flex items-start space-x-3">
                      <ShieldCheck className="h-5 w-5 text-street-red shrink-0" />
                      <div>
                        <p className="font-bold text-street-black uppercase mb-1">
                          {product.fitType || 'Streetwear'} Fit Sizing Tip:
                        </p>
                        <p>{selectedChart.instructions}</p>
                      </div>
                    </div>
                  </>
                )}

                <button
                  id="confirm-size-fit-btn"
                  type="button"
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="w-full bg-street-black hover:bg-street-red text-white py-4 font-display font-black text-xs tracking-widest uppercase transition-colors cursor-pointer"
                >
                  CONFIRM SIZE AND RETURN
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
