import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  ShoppingBag,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
  Check,
  Search,
  User,
  Menu,
  Ruler,
  MapPin,
  Share2,
  Sparkles,
} from 'lucide-react';
import {
  RAISED_COUNTRY_TEE_CONFIG,
  RAISED_COUNTRY_TEE_PRODUCT,
  PRIMARY_CATEGORY_URL,
  GENERAL_COLLECTION_URL,
} from '../data/raisedCountryTeeProduct';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function RaisedCountryTeeView() {
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const config = RAISED_COUNTRY_TEE_CONFIG;
  const productAsItem: Product = RAISED_COUNTRY_TEE_PRODUCT;

  // Selected states
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Modals & Drawers
  const [isSizeGuideModalOpen, setIsSizeGuideModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCopiedShare, setIsCopiedShare] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  // Accordions
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    description: true,
    fitAndStyle: false,
    sizeGuide: false,
    fabricCare: false,
    shippingDelivery: false,
    returnsExchange: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Pincode checker
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<
    'idle' | 'checking' | 'serviceable' | 'invalid'
  >('idle');
  const [deliveryEstimate, setDeliveryEstimate] = useState<string>('');

  // SEO & Preload Hero Image
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = config.images[0];
    // @ts-ignore
    link.fetchPriority = 'high';
    document.head.appendChild(link);

    const prevTitle = document.title;
    document.title = config.seo.title;

    const meta = document.querySelector('meta[name="description"]');
    const prevMeta = meta?.getAttribute('content') || '';
    if (meta) {
      meta.setAttribute('content', config.seo.description);
    }

    return () => {
      document.title = prevTitle;
      if (meta && prevMeta) {
        meta.setAttribute('content', prevMeta);
      }
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [config]);

  // Gallery Navigation Handlers
  const handlePrevImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev === 0 ? config.images.length - 1 : prev - 1));
  }, [config.images.length]);

  const handleNextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev === config.images.length - 1 ? 0 : prev + 1));
  }, [config.images.length]);

  // Lightbox keyboard controls
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handlePrevImage, handleNextImage]);

  // Touch Swipe for Mobile Gallery
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
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) handleNextImage();
    if (diff < -45) handlePrevImage();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Add to Bag with Validation
  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      const sizeElem = document.getElementById('size-selector-section');
      if (sizeElem) {
        sizeElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setSizeError(false);
    for (let i = 0; i < quantity; i++) {
      addToCart(productAsItem, selectedSize, config.colorName);
    }
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
    setIsCartOpen(true);
  };

  // Buy Now with Validation
  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      const sizeElem = document.getElementById('size-selector-section');
      if (sizeElem) {
        sizeElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setSizeError(false);
    for (let i = 0; i < quantity; i++) {
      addToCart(productAsItem, selectedSize, config.colorName);
    }
    navigate('/checkout');
  };

  // Pincode validation
  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setPincodeStatus('invalid');
      return;
    }
    setPincodeStatus('checking');
    setTimeout(() => {
      const today = new Date();
      const estDate = new Date(today);
      estDate.setDate(today.getDate() + 4);
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      };
      setDeliveryEstimate(estDate.toLocaleDateString('en-IN', options));
      setPincodeStatus('serviceable');
    }, 400);
  };

  // Share handler
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: config.name,
          text: `${config.name} | ${config.brand}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setIsCopiedShare(true);
      setTimeout(() => setIsCopiedShare(false), 2000);
    }
  };

  // Related products: real women's tees from TeeCode catalogue
  const relatedProducts = PRODUCTS.filter(
    (p) => p.gender === 'women' && p.id !== config.id
  ).slice(0, 3);

  const isCurrentWishlisted = isWishlisted(config.id);

  return (
    <div className="bg-[#FAF7F2] text-neutral-900 font-sans min-h-screen selection:bg-neutral-900 selection:text-white">
      {/* 1. ANNOUNCEMENT BAR */}
      <div
        id="announcement-bar"
        className="bg-neutral-900 text-neutral-100 py-2 px-4 text-center text-[11px] sm:text-xs font-medium tracking-widest uppercase border-b border-neutral-800"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
          <span>FREE SHIPPING ON ORDERS ABOVE ₹999</span>
        </div>
      </div>

      {/* 2. STICKY HEADER */}
      <header
        id="teecode-gym-gear-header"
        className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-neutral-200 transition-all duration-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile Hamburger Trigger */}
            <div className="flex items-center lg:hidden">
              <button
                id="mobile-nav-toggle-btn"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-neutral-800 hover:text-black transition-colors"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo: TeeCode Active Gear */}
            <div className="flex items-center">
              <Link
                id="brand-logo-link"
                to="/"
                className="flex items-center gap-2.5 group focus:outline-none"
              >
                <div className="flex flex-col text-left">
                  <span className="font-black text-xl sm:text-2xl tracking-tighter uppercase font-display text-neutral-950 group-hover:opacity-85 transition-opacity">
                    TEECODE
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.28em] uppercase -mt-1 text-neutral-500">
                    ACTIVE GEAR
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav
              id="desktop-main-navigation"
              className="hidden lg:flex items-center space-x-7 xl:space-x-8"
            >
              <a
                id="nav-women"
                href={GENERAL_COLLECTION_URL}
                className="text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition-colors py-1"
              >
                Women
              </a>

              <Link
                id="nav-men"
                to="/shop?gender=men"
                className="text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition-colors py-1"
              >
                Men
              </Link>

              <Link
                id="nav-new-arrivals"
                to="/shop?category=new"
                className="text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition-colors py-1"
              >
                New Arrivals
              </Link>

              <a
                id="nav-active-gear"
                href={GENERAL_COLLECTION_URL}
                className="text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition-colors py-1"
              >
                Active Gear
              </a>

              <a
                id="nav-t-shirts"
                href={PRIMARY_CATEGORY_URL}
                className="text-xs font-bold uppercase tracking-wider text-neutral-950 border-b-2 border-neutral-950 py-1 transition-all"
              >
                T-Shirts
              </a>

              <a
                id="nav-graphic-tees"
                href={PRIMARY_CATEGORY_URL}
                className="text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition-colors py-1"
              >
                Graphic Tees
              </a>

              <Link
                id="nav-sale"
                to="/shop?sort=sale"
                className="text-xs font-bold uppercase tracking-wider text-rose-600 hover:text-rose-700 transition-colors py-1"
              >
                Sale
              </Link>
            </nav>

            {/* Utility Icons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                id="header-search-btn"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-neutral-700 hover:text-black transition-colors"
                title="Search"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                id="header-account-btn"
                onClick={() => setIsAccountOpen(true)}
                className="p-2 text-neutral-700 hover:text-black transition-colors"
                title="Account"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </button>

              <Link
                id="header-wishlist-btn"
                to="/wishlist"
                className="p-2 text-neutral-700 hover:text-black transition-colors relative"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isCurrentWishlisted ? 'fill-neutral-900 text-neutral-900' : ''
                  }`}
                />
              </Link>

              <button
                id="header-cart-btn"
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-neutral-700 hover:text-black transition-colors relative"
                title="Cart"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6">
        <nav
          id="product-breadcrumbs"
          className="flex items-center space-x-2 text-[11px] sm:text-xs text-neutral-500 font-medium overflow-x-auto whitespace-nowrap"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-neutral-900 transition-colors">
            Home
          </Link>
          <span className="text-neutral-300">/</span>
          <a href={GENERAL_COLLECTION_URL} className="hover:text-neutral-900 transition-colors">
            Women
          </a>
          <span className="text-neutral-300">/</span>
          <a href={PRIMARY_CATEGORY_URL} className="hover:text-neutral-900 transition-colors">
            T-Shirts
          </a>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-900 font-bold truncate">{config.name}</span>
        </nav>
      </div>

      {/* 4. MAIN PRODUCT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* LEFT: IMAGE GALLERY (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-28">
            {/* Primary Main Image Container without text/badge overlay */}
            <div
              className="relative aspect-[4/5] bg-[#F2EDE4] rounded-2xl overflow-hidden border border-neutral-200/80 shadow-xs group select-none flex items-center justify-center"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                id="main-product-image"
                src={config.images[activeImageIndex]}
                alt={`${config.name} - View ${activeImageIndex + 1}`}
                className="w-full h-full object-contain p-2 sm:p-4 transition-transform duration-300 group-hover:scale-[1.02]"
                loading={activeImageIndex === 0 ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer"
              />

              {/* Minimal Image Counter Badge */}
              <div
                id="image-counter-badge"
                className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-neutral-800 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border border-neutral-200/80 shadow-xs"
              >
                {activeImageIndex + 1} / {config.images.length}
              </div>

              {/* Zoom Trigger */}
              <button
                id="zoom-lightbox-btn"
                onClick={() => setIsLightboxOpen(true)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-neutral-800 p-2 rounded-full border border-neutral-200/80 shadow-xs hover:bg-neutral-900 hover:text-white transition-colors"
                title="Zoom image"
                aria-label="Zoom image"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {/* Prev / Next controls */}
              <button
                id="gallery-prev-btn"
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-neutral-800 flex items-center justify-center border border-neutral-200 shadow-sm hover:bg-neutral-900 hover:text-white transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                id="gallery-next-btn"
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-neutral-800 flex items-center justify-center border border-neutral-200 shadow-sm hover:bg-neutral-900 hover:text-white transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Navigation Row */}
            <div
              id="gallery-thumbnails-row"
              className="grid grid-cols-5 gap-2.5 sm:gap-3 overflow-x-auto pb-1"
            >
              {config.images.map((imgUrl, idx) => (
                <button
                  key={`thumb-${idx}`}
                  id={`thumbnail-btn-${idx}`}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-[4/5] rounded-xl overflow-hidden border-2 transition-all bg-[#F2EDE4] p-1 ${
                    activeImageIndex === idx
                      ? 'border-neutral-950 ring-2 ring-neutral-950/10 opacity-100 scale-[1.02]'
                      : 'border-neutral-200 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`View product image ${idx + 1}`}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: PRODUCT DETAILS & PURCHASE ACTIONS (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Header info */}
            <div className="border-b border-neutral-200/80 pb-5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-500">
                  {config.brand} — {config.collectionName}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleShare}
                    className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-200/60"
                    title="Share product"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(productAsItem)}
                    className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-200/60"
                    title="Save to wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isCurrentWishlisted ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-neutral-950 mb-2">
                {config.name}
              </h1>

              {/* Positioning / Tagline */}
              <p className="text-xs sm:text-sm font-medium text-neutral-600 italic tracking-wide mb-3">
                {config.tagline}
              </p>

              {/* Main Visual Price Block */}
              <div className="flex items-baseline gap-3 mb-2">
                <span
                  id="product-sale-price"
                  className="font-display font-black text-3xl sm:text-4xl text-neutral-950"
                >
                  ₹{config.price}
                </span>
                <span
                  id="product-mrp-price"
                  className="text-base sm:text-lg text-neutral-400 line-through font-medium"
                >
                  MRP ₹{config.mrp}
                </span>
                <span
                  id="product-discount-badge"
                  className="bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                >
                  {config.discountPercentage}% OFF
                </span>
              </div>

              <p className="text-xs text-neutral-500 font-mono">
                Inclusive of all taxes. Free shipping on orders above ₹999.
              </p>
            </div>

            {/* COLOR SECTION */}
            <div id="color-section" className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-neutral-900">
                  Color:{' '}
                  <span className="font-semibold text-neutral-700">{config.colorName}</span>
                </span>
                <span className="text-neutral-400 font-mono text-[11px]">Original Edition</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 p-1.5 pr-3 rounded-full border border-neutral-950 ring-2 ring-neutral-950/20 bg-white">
                  <span
                    className="w-5 h-5 rounded-full border border-black/15 shadow-inner"
                    style={{ backgroundColor: config.colorHex }}
                  />
                  <span className="text-xs font-semibold text-neutral-800">{config.colorName}</span>
                </div>
              </div>
            </div>

            {/* SIZE SELECTOR */}
            <div id="size-selector-section" className="space-y-3 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-neutral-900">
                  Select Size
                </span>
                <button
                  id="open-size-guide-modal-btn"
                  onClick={() => setIsSizeGuideModalOpen(true)}
                  className="inline-flex items-center gap-1 text-neutral-700 hover:text-black font-semibold underline underline-offset-4 transition-colors"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>

              {/* Size Buttons Grid */}
              <div className="grid grid-cols-6 gap-2">
                {config.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      id={`size-btn-${size.toLowerCase()}`}
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                      className={`py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase transition-all ${
                        isSelected
                          ? 'bg-neutral-950 text-white shadow-md ring-2 ring-neutral-950'
                          : 'bg-white text-neutral-800 border border-neutral-300 hover:border-neutral-900'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {/* Validation Warning */}
              {sizeError && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2"
                >
                  <span>⚠️ Please select a size before adding to cart.</span>
                </motion.div>
              )}
            </div>

            {/* PURCHASE CONTROLS: QUANTITY + ADD TO CART + BUY NOW */}
            <div id="purchase-controls-section" className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-neutral-300 rounded-xl bg-white p-1">
                  <button
                    id="qty-decrease-btn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-9 h-9 flex items-center justify-center font-bold text-neutral-600 hover:text-black disabled:opacity-30"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span
                    id="qty-display"
                    className="w-10 text-center font-mono font-bold text-sm text-neutral-900"
                  >
                    {quantity}
                  </span>
                  <button
                    id="qty-increase-btn"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    disabled={quantity >= 10}
                    className="w-9 h-9 flex items-center justify-center font-bold text-neutral-600 hover:text-black disabled:opacity-30"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* ADD TO CART */}
                <button
                  id="add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="flex-1 bg-neutral-950 hover:bg-neutral-800 text-white font-display font-black text-xs sm:text-sm tracking-widest uppercase py-4 px-6 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>
              </div>

              {/* BUY NOW */}
              <button
                id="buy-now-btn"
                onClick={handleBuyNow}
                className="w-full bg-white hover:bg-neutral-100 text-neutral-950 border border-neutral-300 font-display font-black text-xs sm:text-sm tracking-widest uppercase py-4 px-6 rounded-xl transition-all shadow-xs"
              >
                BUY NOW
              </button>
            </div>

            {/* PINCODE DELIVERY CHECKER */}
            <div
              id="pincode-delivery-checker"
              className="bg-white p-4 rounded-xl border border-neutral-200/90 space-y-2.5 shadow-xs"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-800">
                <MapPin className="w-4 h-4 text-neutral-500" />
                <span>Check Delivery Availability</span>
              </div>

              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  id="pincode-input"
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value.replace(/\D/g, ''));
                    setPincodeStatus('idle');
                  }}
                  className="flex-1 bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-xs font-mono tracking-wider focus:outline-none focus:border-neutral-900 text-neutral-900"
                />
                <button
                  id="pincode-check-btn"
                  type="submit"
                  className="bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase px-4 py-2 rounded-lg transition-colors"
                >
                  CHECK
                </button>
              </form>

              {pincodeStatus === 'checking' && (
                <p className="text-xs text-neutral-500 font-mono animate-pulse">
                  Verifying pincode coverage...
                </p>
              )}

              {pincodeStatus === 'serviceable' && (
                <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Deliverable to {pincode}</span>
                  </div>
                  <p className="text-[11px] text-emerald-700">
                    Standard Express Delivery expected by <strong>{deliveryEstimate}</strong>.
                    Prepaid & Cash on Delivery (COD) supported.
                  </p>
                </div>
              )}

              {pincodeStatus === 'invalid' && (
                <p className="text-xs text-rose-600 font-medium">
                  Please enter a valid 6-digit Indian postal code.
                </p>
              )}
            </div>

            {/* PRODUCT HIGHLIGHTS */}
            <div id="product-highlights-section" className="space-y-3 pt-2">
              <h3 className="font-display font-black text-xs uppercase tracking-widest text-neutral-900">
                PRODUCT HIGHLIGHTS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {config.highlights.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white p-3.5 rounded-xl border border-neutral-200/90 shadow-2xs"
                  >
                    <h4 className="font-bold text-xs text-neutral-950 mb-0.5">{item.title}</h4>
                    <p className="text-[11px] text-neutral-600 leading-snug">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FIT CARD */}
            <div
              id="product-fit-card"
              className="bg-white p-4 rounded-xl border border-neutral-200/90 space-y-1 shadow-2xs"
            >
              <span className="font-display font-black text-[10px] uppercase tracking-widest text-neutral-500">
                FIT
              </span>
              <h4 className="font-bold text-xs text-neutral-950">{config.fitCopy.title}</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {config.fitCopy.description}
              </p>
            </div>

            {/* STYLE IT YOUR WAY */}
            <div id="style-it-your-way-section" className="space-y-3 pt-2">
              <h3 className="font-display font-black text-xs uppercase tracking-widest text-neutral-900">
                STYLE IT YOUR WAY
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {config.styleItYourWay.map((look, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-white to-[#F6F1E9] p-3.5 rounded-xl border border-neutral-200/90 shadow-2xs"
                  >
                    <h4 className="font-bold text-xs text-neutral-950 mb-0.5">{look.title}</h4>
                    <p className="text-[11px] text-neutral-600 leading-snug">{look.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* PERFECT FOR */}
            <div
              id="perfect-for-section"
              className="bg-white p-4 rounded-xl border border-neutral-200/90 space-y-2 shadow-2xs"
            >
              <h3 className="font-display font-black text-xs uppercase tracking-widest text-neutral-900">
                PERFECT FOR
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {config.perfectFor.map((item, i) => (
                  <span
                    key={i}
                    className="bg-neutral-100 text-neutral-800 text-[11px] font-medium px-2.5 py-1 rounded-md"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* PRODUCT SPECIFICATIONS TABLE */}
            <div
              id="product-specifications-section"
              className="bg-white rounded-xl border border-neutral-200/90 overflow-hidden shadow-2xs"
            >
              <div className="px-4 py-3 bg-neutral-100/70 border-b border-neutral-200">
                <h3 className="font-display font-black text-xs uppercase tracking-widest text-neutral-900">
                  PRODUCT SPECIFICATIONS
                </h3>
              </div>
              <div className="divide-y divide-neutral-100 text-xs">
                {config.specifications.map((spec, i) => (
                  <div key={i} className="flex px-4 py-2.5 justify-between">
                    <span className="text-neutral-500 font-medium">{spec.label}</span>
                    <span className="text-neutral-900 font-semibold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* EXPANDABLE ACCORDIONS */}
            <div
              id="product-details-accordion"
              className="border-t border-neutral-200 divide-y divide-neutral-200 pt-1"
            >
              {/* Description */}
              <div className="py-3">
                <button
                  id="accordion-description-btn"
                  onClick={() => toggleSection('description')}
                  className="w-full flex items-center justify-between text-left py-1 text-xs font-bold uppercase tracking-wider text-neutral-900"
                >
                  <span>Description</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 transition-transform ${
                      expandedSections.description ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedSections.description && (
                  <div className="pt-2 text-xs text-neutral-600 leading-relaxed space-y-2">
                    {config.description.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Fit & Style */}
              <div className="py-3">
                <button
                  id="accordion-fit-style-btn"
                  onClick={() => toggleSection('fitAndStyle')}
                  className="w-full flex items-center justify-between text-left py-1 text-xs font-bold uppercase tracking-wider text-neutral-900"
                >
                  <span>Fit & Style</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 transition-transform ${
                      expandedSections.fitAndStyle ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedSections.fitAndStyle && (
                  <div className="pt-2 text-xs text-neutral-600 leading-relaxed space-y-2">
                    <p>
                      <strong>Fit:</strong> {config.fitCopy.title}
                    </p>
                    <p>{config.fitCopy.description}</p>
                  </div>
                )}
              </div>

              {/* Size Guide */}
              <div className="py-3">
                <button
                  id="accordion-size-guide-btn"
                  onClick={() => toggleSection('sizeGuide')}
                  className="w-full flex items-center justify-between text-left py-1 text-xs font-bold uppercase tracking-wider text-neutral-900"
                >
                  <span>Size Guide</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 transition-transform ${
                      expandedSections.sizeGuide ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedSections.sizeGuide && (
                  <div className="pt-3 text-xs text-neutral-600 space-y-3">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-neutral-200 text-left">
                        <thead>
                          <tr className="bg-neutral-100 font-bold text-neutral-900">
                            {config.sizeGuide.headers.map((h, i) => (
                              <th key={i} className="p-2 border border-neutral-200 text-[11px]">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {config.sizeGuide.rows.map((row, i) => (
                            <tr key={i} className="hover:bg-neutral-50">
                              <td className="p-2 border border-neutral-200 font-bold">
                                {row.size}
                              </td>
                              <td className="p-2 border border-neutral-200">{row.chest}</td>
                              <td className="p-2 border border-neutral-200">{row.length}</td>
                              <td className="p-2 border border-neutral-200">{row.shoulder}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[11px] text-neutral-500 italic">{config.sizeGuide.note}</p>
                  </div>
                )}
              </div>

              {/* Fabric & Care */}
              <div className="py-3">
                <button
                  id="accordion-fabric-care-btn"
                  onClick={() => toggleSection('fabricCare')}
                  className="w-full flex items-center justify-between text-left py-1 text-xs font-bold uppercase tracking-wider text-neutral-900"
                >
                  <span>Fabric & Care</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 transition-transform ${
                      expandedSections.fabricCare ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedSections.fabricCare && (
                  <ul className="pt-2 text-xs text-neutral-600 space-y-1.5 list-disc pl-4">
                    {config.accordions.fabricAndCare.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Shipping & Delivery */}
              <div className="py-3">
                <button
                  id="accordion-shipping-btn"
                  onClick={() => toggleSection('shippingDelivery')}
                  className="w-full flex items-center justify-between text-left py-1 text-xs font-bold uppercase tracking-wider text-neutral-900"
                >
                  <span>Shipping & Delivery</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 transition-transform ${
                      expandedSections.shippingDelivery ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedSections.shippingDelivery && (
                  <ul className="pt-2 text-xs text-neutral-600 space-y-1.5 list-disc pl-4">
                    {config.accordions.shippingAndDelivery.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Returns & Exchange */}
              <div className="py-3">
                <button
                  id="accordion-returns-btn"
                  onClick={() => toggleSection('returnsExchange')}
                  className="w-full flex items-center justify-between text-left py-1 text-xs font-bold uppercase tracking-wider text-neutral-900"
                >
                  <span>Returns & Exchange</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 transition-transform ${
                      expandedSections.returnsExchange ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedSections.returnsExchange && (
                  <ul className="pt-2 text-xs text-neutral-600 space-y-1.5 list-disc pl-4">
                    {config.accordions.returnsAndExchange.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 5. WOMEN'S T-SHIRTS PRIMARY CTA BANNER */}
        <section
          id="womens-tshirts-cta-banner"
          className="mt-16 sm:mt-24 bg-neutral-900 text-white rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-black opacity-85" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-neutral-400 uppercase">
              {config.brand}
            </span>

            <h2 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
              SHOP WOMEN'S T-SHIRTS
            </h2>

            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
              Discover more graphic tees and everyday styles from TeeCode Active Gear. Premium cuts,
              vintage attitude, and effortless everyday comfort.
            </p>

            <div className="pt-3">
              <a
                id="shop-womens-tshirts-btn"
                href={PRIMARY_CATEGORY_URL}
                className="inline-flex items-center gap-2 bg-white hover:bg-neutral-100 text-neutral-950 font-display font-black text-xs sm:text-sm tracking-widest uppercase px-8 py-4 rounded-full transition-all shadow-md hover:scale-105"
              >
                <span>SHOP WOMEN'S T-SHIRTS</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* 6. WOMEN'S COLLECTION SECONDARY CTA */}
        <section
          id="womens-collection-secondary-cta"
          className="mt-6 bg-[#F1EAE0] rounded-2xl p-6 sm:p-8 text-center border border-neutral-300/80 shadow-xs"
        >
          <div className="max-w-xl mx-auto space-y-2.5">
            <h3 className="font-display font-black text-lg sm:text-xl uppercase tracking-wider text-neutral-950">
              EXPLORE WOMEN'S COLLECTION
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Discover more styles from TeeCode Active Gear — engineered activewear, tennis skorts, and
              streetwear essentials.
            </p>
            <div className="pt-2">
              <a
                id="explore-womens-collection-btn"
                href={GENERAL_COLLECTION_URL}
                className="inline-flex items-center gap-2 bg-neutral-950 hover:bg-neutral-800 text-white font-display font-black text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-all"
              >
                <span>SHOP WOMEN</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* 7. RELATED PRODUCTS: YOU MAY ALSO LIKE */}
        {relatedProducts.length > 0 && (
          <section id="you-may-also-like-section" className="mt-16 sm:mt-20">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-200">
              <h3 className="font-display font-black text-lg sm:text-xl uppercase tracking-wider text-neutral-950">
                YOU MAY ALSO LIKE
              </h3>
              <a
                href={PRIMARY_CATEGORY_URL}
                className="text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black transition-colors"
              >
                View T-Shirts →
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relProduct) => {
                const relPrice = relProduct.salePrice || relProduct.price;
                const hasDiscount = Boolean(relProduct.salePrice);
                return (
                  <div
                    key={relProduct.id}
                    id={`related-product-${relProduct.id}`}
                    className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                  >
                    <Link
                      to={`/shop/${relProduct.id}`}
                      className="aspect-[4/5] bg-[#F2EDE4] overflow-hidden relative flex items-center justify-center p-2"
                    >
                      <img
                        src={relProduct.images[0]}
                        alt={relProduct.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      {relProduct.tag && (
                        <span className="absolute top-3 left-3 bg-neutral-900 text-white text-[10px] font-bold font-mono px-2 py-0.5 uppercase tracking-wider rounded-sm">
                          {relProduct.tag}
                        </span>
                      )}
                    </Link>

                    <div className="p-4 flex-1 flex flex-col justify-between text-left">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                          {relProduct.gender === 'women' ? "Women's" : 'Streetwear'}
                        </span>
                        <h4 className="font-display font-black text-sm uppercase text-neutral-900 group-hover:text-neutral-700 transition-colors mt-0.5 line-clamp-1">
                          {relProduct.name}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-100">
                        <div className="flex items-baseline gap-2">
                          <span className="font-display font-black text-base text-neutral-950">
                            ₹{relPrice}
                          </span>
                          {hasDiscount && (
                            <span className="text-xs text-neutral-400 line-through">
                              ₹{relProduct.price}
                            </span>
                          )}
                        </div>

                        <Link
                          to={`/shop/${relProduct.id}`}
                          className="text-xs font-bold uppercase tracking-wider text-neutral-900 hover:underline"
                        >
                          VIEW →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>

      {/* 8. SIZE GUIDE MODAL */}
      <AnimatePresence>
        {isSizeGuideModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeGuideModalOpen(false)}
              className="fixed inset-0 bg-black"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-neutral-200 overflow-hidden text-left"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <div>
                  <h3 className="font-display font-black text-lg uppercase tracking-tight text-neutral-950">
                    SIZE GUIDE
                  </h3>
                  <p className="text-xs text-neutral-500 font-mono">
                    {config.name} (Garment Measurements in Inches)
                  </p>
                </div>
                <button
                  id="close-size-guide-modal-btn"
                  onClick={() => setIsSizeGuideModalOpen(false)}
                  className="p-1 text-neutral-400 hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="my-6 overflow-x-auto">
                <table className="w-full border-collapse border border-neutral-200 text-left text-xs">
                  <thead>
                    <tr className="bg-neutral-100 font-bold text-neutral-900">
                      {config.sizeGuide.headers.map((h, i) => (
                        <th key={i} className="p-2.5 border border-neutral-200">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {config.sizeGuide.rows.map((row, i) => (
                      <tr key={i} className="hover:bg-neutral-50 font-mono">
                        <td className="p-2.5 border border-neutral-200 font-bold font-sans">
                          {row.size}
                        </td>
                        <td className="p-2.5 border border-neutral-200">{row.chest}</td>
                        <td className="p-2.5 border border-neutral-200">{row.length}</td>
                        <td className="p-2.5 border border-neutral-200">{row.shoulder}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-neutral-500 leading-relaxed font-sans mb-6">
                {config.sizeGuide.note}
              </p>

              <button
                onClick={() => setIsSizeGuideModalOpen(false)}
                className="w-full bg-neutral-950 text-white font-mono text-xs font-bold uppercase py-3.5 rounded-xl"
              >
                GOT IT
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 9. LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 select-none">
            <button
              id="close-lightbox-btn"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 text-white p-2 hover:opacity-75 z-20"
              aria-label="Close fullscreen view"
            >
              <X className="w-7 h-7" />
            </button>

            <button
              id="lightbox-prev-btn"
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full z-20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              id="lightbox-next-btn"
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full z-20"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.div
              key={activeImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl max-h-[85vh] relative flex items-center justify-center"
            >
              <img
                src={config.images[activeImageIndex]}
                alt={`${config.name} High Res`}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md text-white font-mono text-xs px-3 py-1 rounded-full">
              {activeImageIndex + 1} / {config.images.length}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 10. SEARCH MODAL */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 bg-black"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative z-10 w-full max-w-lg bg-white rounded-2xl p-5 shadow-2xl border border-neutral-200 text-left"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
                    setIsSearchOpen(false);
                  }
                }}
                className="flex items-center gap-2 border-b border-neutral-200 pb-3"
              >
                <Search className="w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search graphic tees, oversized, country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm font-sans focus:outline-none text-neutral-900"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 text-neutral-400 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>

              <div className="pt-4 space-y-2 text-xs">
                <span className="text-neutral-400 font-mono text-[10px] uppercase tracking-wider block">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Country Graphic Tee",
                    "Women's T-Shirts",
                    'Western Vintage',
                    'Oversized Tees',
                  ].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        navigate(`/shop?q=${encodeURIComponent(term)}`);
                        setIsSearchOpen(false);
                      }}
                      className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-3 py-1.5 rounded-full font-medium transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 11. ACCOUNT MODAL */}
      <AnimatePresence>
        {isAccountOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAccountOpen(false)}
              className="fixed inset-0 bg-black"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border border-neutral-200 text-center"
            >
              <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3 text-neutral-700">
                <User className="w-6 h-6" />
              </div>
              <h3 className="font-display font-black text-lg uppercase tracking-tight text-neutral-950">
                MY ACCOUNT
              </h3>
              <p className="text-xs text-neutral-500 font-sans mt-1 mb-6">
                Manage your orders, tracked deliveries, and saved wishlist.
              </p>

              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    setIsAccountOpen(false);
                    navigate('/track-order');
                  }}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase py-3 rounded-lg transition-colors"
                >
                  TRACK MY ORDER
                </button>
                <button
                  onClick={() => {
                    setIsAccountOpen(false);
                    navigate('/wishlist');
                  }}
                  className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-mono text-xs font-bold uppercase py-3 rounded-lg transition-colors"
                >
                  VIEW WISHLIST
                </button>
                <button
                  onClick={() => setIsAccountOpen(false)}
                  className="w-full text-neutral-400 hover:text-neutral-700 font-mono text-xs py-2 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 12. MOBILE HAMBURGER MENU DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative z-10 w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-neutral-200">
                  <div className="flex flex-col text-left">
                    <span className="font-black text-xl uppercase font-display text-neutral-950">
                      TEECODE
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase -mt-1 text-neutral-500">
                      ACTIVE GEAR
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 text-neutral-400 hover:text-black"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="mt-6 space-y-4 text-left">
                  <div className="pb-4 border-b border-neutral-100">
                    <a
                      href={PRIMARY_CATEGORY_URL}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between font-display font-black text-base uppercase text-neutral-900 py-1"
                    >
                      <span>WOMEN'S T-SHIRTS</span>
                      <span className="bg-neutral-900 text-white text-[9px] px-2 py-0.5 rounded-full font-mono">
                        NEW
                      </span>
                    </a>
                  </div>

                  <div className="space-y-3 font-semibold text-sm uppercase tracking-wide text-neutral-700">
                    <a
                      href={GENERAL_COLLECTION_URL}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block hover:text-black py-1"
                    >
                      Women's Collection
                    </a>
                    <Link
                      to="/shop?gender=men"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block hover:text-black py-1"
                    >
                      Men
                    </Link>
                    <Link
                      to="/shop?category=new"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block hover:text-black py-1"
                    >
                      New Arrivals
                    </Link>
                    <a
                      href={GENERAL_COLLECTION_URL}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block hover:text-black py-1"
                    >
                      Active Gear
                    </a>
                    <a
                      href={PRIMARY_CATEGORY_URL}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block hover:text-black py-1 text-neutral-950 font-bold"
                    >
                      Graphic Tees
                    </a>
                    <Link
                      to="/shop?sort=sale"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-rose-600 font-bold py-1"
                    >
                      Sale
                    </Link>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-6 space-y-3">
                <a
                  href={PRIMARY_CATEGORY_URL}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full bg-neutral-900 text-white text-center py-3 rounded-xl font-display font-black text-xs uppercase tracking-widest"
                >
                  SHOP ALL T-SHIRTS
                </a>
                <div className="flex justify-around text-xs font-mono text-neutral-500 pt-2">
                  <Link to="/track-order" onClick={() => setIsMobileMenuOpen(false)}>
                    Track Order
                  </Link>
                  <span>•</span>
                  <Link to="/policies" onClick={() => setIsMobileMenuOpen(false)}>
                    Returns
                  </Link>
                  <span>•</span>
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    Support
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 13. TOASTS */}
      <AnimatePresence>
        {addedToast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-neutral-700"
          >
            <Check className="w-5 h-5 text-emerald-400" />
            <div className="text-xs text-left">
              <p className="font-bold uppercase tracking-wider">Added to Bag</p>
              <p className="text-neutral-400 font-mono text-[10px]">
                {config.colorName} • Size {selectedSize} • Qty {quantity}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCopiedShare && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-50 bg-neutral-900 text-white px-4 py-2.5 rounded-lg text-xs font-mono shadow-xl border border-neutral-700"
          >
            ✓ Link copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
