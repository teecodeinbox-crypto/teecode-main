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
  Truck,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Search,
  User,
  Menu,
  Ruler,
  MapPin,
  ExternalLink,
  Share2
} from 'lucide-react';
import {
  TENNIS_SKORT_CONFIG,
  TENNIS_SKORT_AS_PRODUCT,
  WOMENS_COLLECTION_CLEAN_URL
} from '../data/tennisSkortProduct';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function WomensTennisSkortView() {
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  // Product configuration
  const config = TENNIS_SKORT_CONFIG;
  const productAsItem: Product = TENNIS_SKORT_AS_PRODUCT;

  // State
  const [selectedColor, setSelectedColor] = useState<string>(config.defaultColor);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Modals & Panels
  const [isSizeGuideModalOpen, setIsSizeGuideModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCopiedShare, setIsCopiedShare] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  // Expandable accordions
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    description: true,
    sizeGuide: false,
    fabricCare: false,
    shippingDelivery: false,
    returnsExchange: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Pincode checker state
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<
    'idle' | 'checking' | 'serviceable' | 'invalid'
  >('idle');
  const [deliveryEstimate, setDeliveryEstimate] = useState<string>('');

  // Active gallery images based on selected color
  const currentImages = config.imagesByColor[selectedColor] || config.imagesByColor.Black;

  // Reset image index when color changes
  const prevColorRef = useRef(selectedColor);
  useEffect(() => {
    if (prevColorRef.current !== selectedColor) {
      setActiveImageIndex(0);
      prevColorRef.current = selectedColor;
    }
  }, [selectedColor]);

  // Preload first Black Hero Image
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = config.imagesByColor.Black[0];
    // @ts-ignore
    link.fetchPriority = 'high';
    document.head.appendChild(link);

    // Update document title and meta description
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

  // Gallery Navigation
  const handlePrevImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
  }, [currentImages.length]);

  const handleNextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));
  }, [currentImages.length]);

  // Keyboard navigation for Lightbox
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

  // Touch swipe support for mobile gallery
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

  // Add to cart with validation
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
      addToCart(productAsItem, selectedSize, selectedColor);
    }
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
    setIsCartOpen(true);
  };

  // Buy now with validation
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
      addToCart(productAsItem, selectedSize, selectedColor);
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
      // Calculate estimated delivery: 3 to 5 business days from today
      const today = new Date();
      const estDate = new Date(today);
      estDate.setDate(today.getDate() + 4);
      const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
      setDeliveryEstimate(estDate.toLocaleDateString('en-IN', options));
      setPincodeStatus('serviceable');
    }, 400);
  };

  // Share handler
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: config.name,
        text: `${config.name} | ${config.brand}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setIsCopiedShare(true);
      setTimeout(() => setIsCopiedShare(false), 2000);
    }
  };

  // Related products from TeeCode catalog (real women's products)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.gender === 'women' && p.id !== config.id
  ).slice(0, 3);

  const isCurrentWishlisted = isWishlisted(config.id);

  return (
    <div className="bg-[#FAF9F6] text-neutral-900 font-sans min-h-screen selection:bg-neutral-900 selection:text-white">
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

      {/* 2. WEBSITE HEADER */}
      <header
        id="teecode-gym-gear-header"
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-all duration-200"
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

            {/* Brand Logo: TeeCode Gym Gear */}
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
                    GYM GEAR
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav
              id="desktop-main-navigation"
              className="hidden lg:flex items-center space-x-7 xl:space-x-8"
            >
              {/* Women link directly to the clean women's collection URL */}
              <a
                id="nav-women"
                href={WOMENS_COLLECTION_CLEAN_URL}
                className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-900 py-1 transition-all"
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
                id="nav-gym-gear"
                href={WOMENS_COLLECTION_CLEAN_URL}
                className="text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition-colors py-1"
              >
                Gym Gear
              </a>


              <Link
                id="nav-sale"
                to="/shop?sort=sale"
                className="text-xs font-bold uppercase tracking-wider text-rose-600 hover:text-rose-700 transition-colors py-1"
              >
                Sale
              </Link>
            </nav>

            {/* Utility Icons (Search, Account, Wishlist, Cart) */}
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
                <Heart className={`w-5 h-5 ${isCurrentWishlisted ? 'fill-neutral-900 text-neutral-900' : ''}`} />
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

      {/* 3. WOMEN'S COLLECTION PROMINENT ENTRY */}
      <section
        id="womens-collection-entry-banner"
        className="bg-neutral-100/80 border-b border-neutral-200 py-3.5 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-neutral-950">
                WOMEN'S COLLECTION
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-neutral-400" />
              <span className="text-[10px] sm:text-xs font-semibold text-neutral-600 uppercase tracking-widest">
                TeeCode Gym Gear
              </span>
            </div>
            <p className="text-neutral-500 text-[11px] sm:text-xs tracking-wide">
              Performance. Comfort. Everyday movement.
            </p>
          </div>

          <a
            id="entry-shop-women-btn"
            href={WOMENS_COLLECTION_CLEAN_URL}
            className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all shrink-0 shadow-sm"
          >
            <span>SHOP WOMEN</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 4. MAIN PRODUCT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* BREADCRUMB */}
        <nav
          id="product-breadcrumbs"
          className="flex items-center space-x-2 text-[11px] sm:text-xs text-neutral-500 mb-6 sm:mb-8 font-medium overflow-x-auto whitespace-nowrap"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-neutral-900 transition-colors">
            Home
          </Link>
          <span className="text-neutral-300">/</span>
          <a
            href={WOMENS_COLLECTION_CLEAN_URL}
            className="hover:text-neutral-900 transition-colors"
          >
            Women
          </a>
          <span className="text-neutral-300">/</span>
          <a
            href={WOMENS_COLLECTION_CLEAN_URL}
            className="hover:text-neutral-900 transition-colors"
          >
            Gym Gear
          </a>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-900 font-bold truncate">
            {config.name}
          </span>
        </nav>

        {/* PRODUCT LAYOUT: 2-COLUMN (DESKTOP) / 1-COLUMN (MOBILE) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* LEFT: IMAGE GALLERY (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-28">
            {/* Main Stage */}
            <div
              className="relative aspect-[3/4] sm:aspect-[4/5] bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200 shadow-sm group select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                id="main-product-image"
                src={currentImages[activeImageIndex]}
                alt={`${config.name} - ${selectedColor} View ${activeImageIndex + 1}`}
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {/* Image Counter Badge */}
              <div
                id="image-counter-badge"
                className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-neutral-800 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border border-neutral-200/80 shadow-sm"
              >
                {activeImageIndex + 1} / {currentImages.length}
              </div>

              {/* Zoom & Lightbox Trigger */}
              <button
                id="zoom-lightbox-btn"
                onClick={() => setIsLightboxOpen(true)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-neutral-800 p-2 rounded-full border border-neutral-200/80 shadow-sm hover:bg-neutral-900 hover:text-white transition-colors"
                title="Zoom image"
                aria-label="Zoom image"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {/* Navigation Arrows */}
              <button
                id="gallery-prev-btn"
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-neutral-800 flex items-center justify-center border border-neutral-200 shadow-md hover:bg-neutral-900 hover:text-white transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                id="gallery-next-btn"
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-neutral-800 flex items-center justify-center border border-neutral-200 shadow-md hover:bg-neutral-900 hover:text-white transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnails Row */}
            <div
              id="gallery-thumbnails-row"
              className="grid grid-cols-6 gap-2.5 sm:gap-3 overflow-x-auto pb-1"
            >
              {currentImages.map((imgUrl, idx) => (
                <button
                  key={`${selectedColor}-thumb-${idx}`}
                  id={`thumbnail-btn-${idx}`}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all relative ${
                    activeImageIndex === idx
                      ? 'border-neutral-900 ring-2 ring-neutral-900/10 opacity-100 scale-[1.02]'
                      : 'border-neutral-200 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`Select image ${idx + 1}`}
                >
                  <img
                    src={imgUrl}
                    alt={`${selectedColor} Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO & PURCHASE CONTROLS (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header / Brand / Title / Rating */}
            <div className="border-b border-neutral-200 pb-5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                  {config.brand} — {config.collectionName}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleShare}
                    className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-100"
                    title="Share product"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(productAsItem)}
                    className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-100"
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

              <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-neutral-950 mb-2.5">
                {selectedColor !== 'Black'
                  ? `${selectedColor} Pleated Tennis Skort`
                  : config.name}
              </h1>

              {/* Visual Stars */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-base">★</span>
                  ))}
                </div>
                <span className="text-xs font-semibold text-neutral-700">5.0</span>
                <span className="text-neutral-300 text-xs">•</span>
                <span className="text-xs text-neutral-500">Verified Activewear</span>
              </div>

              {/* Price Block */}
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
                Inclusive of all taxes. Free express shipping above ₹999.
              </p>

              {/* Short Description */}
              <p className="mt-4 text-sm text-neutral-700 font-medium leading-relaxed">
                {config.shortDescription}
              </p>
            </div>

            {/* COLOR SELECTOR */}
            <div id="color-selector-section" className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-neutral-900">
                  Color:{' '}
                  <span className="font-semibold text-neutral-700">
                    {selectedColor}
                  </span>
                </span>
                <span className="text-neutral-400 font-mono text-[11px]">
                  {config.colors.length} Available Colors
                </span>
              </div>

              <div className="flex items-center gap-3">
                {config.colors.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      id={`color-swatch-${c.name.toLowerCase()}`}
                      onClick={() => setSelectedColor(c.name)}
                      className={`group relative flex items-center gap-2 p-1.5 rounded-full border transition-all ${
                        isSelected
                          ? 'border-neutral-950 ring-2 ring-neutral-950/20 bg-neutral-100'
                          : 'border-neutral-200 hover:border-neutral-400 bg-white'
                      }`}
                      aria-label={`Select ${c.name} color`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full border border-black/15 shadow-inner flex items-center justify-center`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {isSelected && (
                          <Check
                            className={`w-3.5 h-3.5 ${
                              c.name === 'White' ? 'text-black' : 'text-white'
                            }`}
                          />
                        )}
                      </span>
                      <span className="text-xs font-semibold pr-2 text-neutral-800">
                        {c.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SIZE SELECTOR */}
            <div id="size-selector-section" className="space-y-3 pt-2">
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
                      className={`py-3.5 rounded-lg font-mono text-xs sm:text-sm font-bold uppercase transition-all ${
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

              {/* Size Selection Required Validation Error */}
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

            {/* PURCHASE SECTION: QUANTITY, ADD TO CART, BUY NOW */}
            <div id="purchase-controls-section" className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-neutral-300 rounded-lg bg-white p-1">
                  <button
                    id="qty-decrease-btn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-9 h-9 flex items-center justify-center font-bold text-neutral-600 hover:text-black disabled:opacity-30"
                    aria-label="Decrease quantity"
                  >
                    -
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
                  className="flex-1 bg-neutral-950 hover:bg-neutral-800 text-white font-display font-black text-xs sm:text-sm tracking-widest uppercase py-3.5 px-6 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>
              </div>

              {/* BUY NOW */}
              <button
                id="buy-now-btn"
                onClick={handleBuyNow}
                className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-950 border border-neutral-300 font-display font-black text-xs sm:text-sm tracking-widest uppercase py-3.5 px-6 rounded-lg transition-all"
              >
                BUY NOW
              </button>
            </div>

            {/* PINCODE DELIVERY CHECKER */}
            <div
              id="pincode-delivery-checker"
              className="bg-white p-4 rounded-xl border border-neutral-200 space-y-2.5 shadow-sm"
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
                    Standard Express Delivery expected by{' '}
                    <strong>{deliveryEstimate}</strong>. Cash on Delivery (COD) available.
                  </p>
                </div>
              )}

              {pincodeStatus === 'invalid' && (
                <p className="text-xs text-rose-600 font-medium">
                  Please enter a valid 6-digit Indian postal code.
                </p>
              )}
            </div>

            {/* KEY FEATURES LIST */}
            <div id="key-features-section" className="space-y-3 pt-2">
              <h3 className="font-display font-black text-xs uppercase tracking-widest text-neutral-900">
                KEY FEATURES
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {config.keyFeatures.map((feat, i) => (
                  <div
                    key={i}
                    className="bg-white p-3 rounded-lg border border-neutral-200/90 text-left shadow-xs"
                  >
                    <h4 className="font-bold text-xs text-neutral-950 mb-0.5">
                      {feat.title}
                    </h4>
                    <p className="text-[11px] text-neutral-600 leading-snug">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* STYLE IT YOUR WAY */}
            <div
              id="style-it-your-way-card"
              className="bg-gradient-to-r from-neutral-100 to-neutral-50 p-4 rounded-xl border border-neutral-200 text-left"
            >
              <span className="font-display font-black text-[10px] uppercase tracking-widest text-neutral-500 block mb-1">
                STYLE IT YOUR WAY
              </span>
              <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                {config.styleItYourWay}
              </p>
            </div>

            {/* EXPANDABLE ACCORDION SECTIONS */}
            <div id="product-details-accordion" className="border-t border-neutral-200 divide-y divide-neutral-200">
              
              {/* 1. Description */}
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
                    {config.descriptionParagraphs.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Size Guide */}
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
                              <td className="p-2 border border-neutral-200">{row.waist}</td>
                              <td className="p-2 border border-neutral-200">{row.hip}</td>
                              <td className="p-2 border border-neutral-200">{row.length}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[11px] text-neutral-500 italic">
                      {config.sizeGuide.note}
                    </p>
                  </div>
                )}
              </div>

              {/* 3. Fabric & Care */}
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
                    {config.detailsAccordion.fabricAndCare.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* 4. Shipping & Delivery */}
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
                    {config.detailsAccordion.shippingAndDelivery.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* 5. Returns & Exchange */}
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
                    {config.detailsAccordion.returnsAndExchange.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* 5. WOMEN'S COLLECTION LINK SECTION AT BOTTOM */}
        <section
          id="bottom-womens-collection-section"
          className="mt-16 sm:mt-24 bg-neutral-900 text-white rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl"
        >
          {/* Subtle Background Radial Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-black opacity-80" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-neutral-400 uppercase">
              TEECODE GYM GEAR
            </span>

            <h2 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
              SHOP THE WOMEN'S COLLECTION
            </h2>

            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
              Discover more from TeeCode Gym Gear Women's Collection. Engineered activewear designed for movement, shape, and all-day endurance.
            </p>

            <div className="pt-3">
              <a
                id="bottom-shop-women-cta-btn"
                href={WOMENS_COLLECTION_CLEAN_URL}
                className="inline-flex items-center gap-2 bg-white hover:bg-neutral-100 text-neutral-950 font-display font-black text-xs sm:text-sm tracking-widest uppercase px-8 py-4 rounded-full transition-all shadow-md hover:scale-105"
              >
                <span>SHOP WOMEN</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* 6. RELATED PRODUCTS: YOU MAY ALSO LIKE */}
        <section id="you-may-also-like-section" className="mt-16 sm:mt-20">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-200">
            <h3 className="font-display font-black text-lg sm:text-xl uppercase tracking-wider text-neutral-950">
              YOU MAY ALSO LIKE
            </h3>
            <a
              href={WOMENS_COLLECTION_CLEAN_URL}
              className="text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black transition-colors"
            >
              View All →
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
                  className="group bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                >
                  <Link
                    to={`/shop/${relProduct.id}`}
                    className="aspect-[3/4] bg-neutral-100 overflow-hidden relative"
                  >
                    <img
                      src={relProduct.images[0]}
                      alt={relProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    {relProduct.tag && (
                      <span className="absolute top-3 left-3 bg-neutral-900 text-white text-[10px] font-bold font-mono px-2 py-0.5 uppercase tracking-wider rounded-sm">
                        {relProduct.tag}
                      </span>
                    )}
                  </Link>

                  <div className="p-4 flex-1 flex flex-col justify-between">
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

      </main>

      {/* 7. SIZE GUIDE MODAL */}
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
              className="relative z-10 w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-neutral-200 overflow-hidden"
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
                        <td className="p-2.5 border border-neutral-200">{row.waist}</td>
                        <td className="p-2.5 border border-neutral-200">{row.hip}</td>
                        <td className="p-2.5 border border-neutral-200">{row.length}</td>
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
                className="w-full bg-neutral-950 text-white font-mono text-xs font-bold uppercase py-3 rounded-lg"
              >
                GOT IT
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 8. LIGHTBOX MODAL */}
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
                src={currentImages[activeImageIndex]}
                alt={`${config.name} High Res`}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md text-white font-mono text-xs px-3 py-1 rounded-full">
              {activeImageIndex + 1} / {currentImages.length} • {selectedColor}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 9. SEARCH MODAL */}
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
              className="relative z-10 w-full max-w-lg bg-white rounded-2xl p-5 shadow-2xl border border-neutral-200"
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
                  placeholder="Search skorts, activewear, tees..."
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
                  Quick Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Tennis Skort',
                    "Women's Gym Gear",
                    'Activewear',
                    'Oversized Tees'
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

      {/* 10. ACCOUNT MODAL */}
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
                Manage your orders, saved activewear wishlist, and quick checkout details.
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

      {/* 11. MOBILE HAMBURGER MENU DRAWER */}
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
                      GYM GEAR
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 text-neutral-400 hover:text-black"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="mt-6 space-y-4 text-left">
                  <div className="pb-4 border-b border-neutral-100">
                    <a
                      href={WOMENS_COLLECTION_CLEAN_URL}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between font-display font-black text-base uppercase text-neutral-900 py-1"
                    >
                      <span>WOMEN'S COLLECTION</span>
                      <span className="bg-neutral-900 text-white text-[9px] px-2 py-0.5 rounded-full font-mono">
                        HOT
                      </span>
                    </a>
                  </div>

                  <div className="space-y-3 font-semibold text-sm uppercase tracking-wide text-neutral-700">
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
                      href={WOMENS_COLLECTION_CLEAN_URL}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block hover:text-black py-1"
                    >
                      Gym Gear
                    </a>
                    <Link
                      to="/shop?sort=sale"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-rose-600 font-bold py-1"
                    >
                      Sale (Up to 60% Off)
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Drawer Actions */}
              <div className="border-t border-neutral-200 pt-6 space-y-3">
                <a
                  href={WOMENS_COLLECTION_CLEAN_URL}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full bg-neutral-900 text-white text-center py-3 rounded-lg font-display font-black text-xs uppercase tracking-widest"
                >
                  SHOP WOMEN'S GYM GEAR
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

      {/* 12. TOASTS */}
      <AnimatePresence>
        {addedToast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-neutral-700"
          >
            <Check className="w-5 h-5 text-emerald-400" />
            <div className="text-xs">
              <p className="font-bold uppercase tracking-wider">Added to Bag</p>
              <p className="text-neutral-400 font-mono text-[10px]">
                {selectedColor} • Size {selectedSize} • Qty {quantity}
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
