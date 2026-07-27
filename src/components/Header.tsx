import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, X, Menu, Heart, Package, ChevronDown, ChevronRight, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { NAV_CATEGORIES, getCollectionFilterValue } from '../data';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItemsCount, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const megaMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mobile accordion state
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const [expandedMobileSubcat, setExpandedMobileSubcat] = useState<string | null>(null);

  const tickers = [
    '💥 OVERSIZED DROP IS LIVE | USE CODE "STREET20" FOR ₹200 OFF',
    '🚚 FREE COD & EXPRESS SHIPPING ACROSS INDIA',
    '⚡ 240 GSM HEAVYWEIGHT COTTON — UNISEX STREETWEAR SHAPES',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickers.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [tickers.length]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
    setIsSearchActive(false);
  };

  // Main desktop nav tabs
  const mainNavItems: {id: string, path: string, label: string}[] = [];

  // Secondary links for mobile drawer
  const secondaryNavItems = [
    { id: 'home', path: '/', label: 'Home' },
    { id: 'about', path: '/about', label: 'About TeeCode' },
    { id: 'size-guide', path: '/size-guide', label: 'Size Guide' },
    { id: 'faq', path: '/faq', label: 'FAQ' },
    { id: 'policies', path: '/policies', label: 'Shipping & Returns' },
    { id: 'contact', path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Mega menu hover handlers with delay
  const handleMegaMenuEnter = (categoryId: string) => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
      megaMenuTimeoutRef.current = null;
    }
    setActiveMegaMenu(categoryId);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  // Close mega menu on navigation
  useEffect(() => {
    setActiveMegaMenu(null);
    setIsMenuOpen(false);
  }, [location]);

  // Build subcategory link
  const getSubcatLink = (gender: string, subcat: { id: string; comingSoon?: boolean }) => {
    if (gender === 'women' && subcat.id === 'women-tshirts') {
      return '/women/t-shirts';
    }
    if (subcat.comingSoon) {
      return `/shop?gender=${gender}&category=${subcat.id}&coming-soon=true`;
    }
    return `/shop?gender=${gender}&category=${subcat.id}`;
  };

  // Build collection link (maps display name → filter value, e.g. 'Dark Void' → 'Graphic Universe')
  const getCollectionLink = (gender: string, collectionName: string) => {
    const filterValue = getCollectionFilterValue(collectionName);
    return `/shop?gender=${gender}&type=${encodeURIComponent(filterValue)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-street-black text-white border-b border-zinc-800">
      {/* Top Banner Ticker */}
      <div className="bg-street-red py-1.5 text-center text-xs font-mono font-bold tracking-widest text-white uppercase overflow-hidden relative h-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={tickerIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {tickers[tickerIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-zinc-300 hover:text-white"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              id="header-logo"
              to="/"
              className="group flex items-center space-x-1"
            >
              <span className="font-display text-2xl font-black tracking-tighter uppercase">
                TEE<span className="text-street-red font-extrabold group-hover:text-white transition-colors duration-200">CODE</span>
              </span>
              <span className="hidden sm:inline-block font-mono text-[9px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-700 tracking-wider">
                TEECODE.STORE
              </span>
            </Link>
          </div>

          {/* Desktop Navigation with Mega Menu */}
          <nav className="hidden lg:flex items-center space-x-6">
            {/* MEN / WOMEN with Mega Menu Dropdowns */}
            {NAV_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="relative"
                onMouseEnter={() => handleMegaMenuEnter(cat.id)}
                onMouseLeave={handleMegaMenuLeave}
              >
                <Link
                  id={`nav-${cat.id}`}
                  to={`/shop?gender=${cat.id}`}
                  className={`font-display text-base font-bold tracking-wider uppercase transition-colors relative py-2 flex items-center gap-1 ${
                    location.search.includes(`gender=${cat.id}`) ? 'text-street-red' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {cat.name}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeMegaMenu === cat.id ? 'rotate-180 text-street-red' : ''}`} />
                  {location.search.includes(`gender=${cat.id}`) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-street-red"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {activeMegaMenu === cat.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                      onMouseEnter={() => handleMegaMenuEnter(cat.id)}
                      onMouseLeave={handleMegaMenuLeave}
                    >
                      <div className="bg-zinc-950 border border-zinc-800 shadow-2xl shadow-black/40 min-w-[520px] p-0 overflow-hidden">
                        {/* Category header */}
                        <div className="bg-zinc-900/80 px-6 py-3 border-b border-zinc-800 flex items-center justify-between">
                          <span className="font-display text-xs font-black uppercase tracking-widest text-white">
                            {cat.name}'S COLLECTION
                          </span>
                          <Link
                            to={`/shop?gender=${cat.id}`}
                            className="font-mono text-[10px] text-street-red hover:text-white transition-colors tracking-wider uppercase"
                          >
                            VIEW ALL →
                          </Link>
                        </div>

                        {/* Subcategories grid */}
                        <div className="grid grid-cols-2 gap-0 divide-x divide-zinc-800">
                          {cat.subcategories.map((subcat) => (
                            <div key={subcat.id} className="p-5 space-y-3 hover:bg-zinc-900/50 transition-colors">
                              {/* Subcategory header */}
                              <Link
                                id={`mega-${subcat.id}`}
                                to={getSubcatLink(cat.id, subcat)}
                                className="flex items-center gap-2 group/sub"
                              >
                                <span className="font-display text-sm font-bold uppercase tracking-wider text-white group-hover/sub:text-street-red transition-colors">
                                  {subcat.name}
                                </span>
                                {subcat.comingSoon && (
                                  <span className="inline-flex items-center gap-1 bg-zinc-800 border border-zinc-700 text-zinc-400 text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                                    <Clock className="h-2.5 w-2.5" />
                                    SOON
                                  </span>
                                )}
                                <ChevronRight className="h-3 w-3 text-zinc-600 group-hover/sub:text-street-red group-hover/sub:translate-x-0.5 transition-all" />
                              </Link>

                              {/* Coming soon message for empty subcats */}
                              {subcat.comingSoon && (
                                <p className="font-mono text-[10px] text-zinc-600 italic pl-0.5">
                                  Launching soon — stay tuned
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Sale */}
            {mainNavItems.map((item) => (
              <Link
                id={`nav-${item.id}`}
                key={item.id}
                to={item.path}
                className={`font-display text-sm font-semibold tracking-wider uppercase transition-colors relative py-2 ${
                  item.id === 'sale' ? 'text-emerald-400 hover:text-emerald-300' : 'text-zinc-300 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Utility Icons (Search, Wishlist, Cart, WhatsApp) */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Search Bar Inline (Desktop) */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
              <input
                id="desktop-search-input"
                type="text"
                placeholder="Search streetwear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 xl:w-60 bg-zinc-900 border border-zinc-800 focus:border-zinc-700 rounded-none py-1.5 pl-3 pr-8 text-xs font-mono tracking-wide focus:outline-none transition-all placeholder-zinc-500 text-white"
              />
              <button id="desktop-search-submit" type="submit" className="absolute right-2 text-zinc-400 hover:text-white">
                <Search className="h-4 w-4" />
              </button>
            </form>

            {/* Search Toggle (Mobile) */}
            <button
              id="mobile-search-toggle"
              onClick={() => setIsSearchActive(!isSearchActive)}
              className="md:hidden p-2 text-zinc-300 hover:text-white"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <Link
              id="wishlist-toggle-btn"
              to="/wishlist"
              className="p-2 relative text-zinc-300 hover:text-white flex items-center"
            >
              <Heart className="h-5 w-5 sm:h-5 sm:w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-street-red text-white font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border border-street-black shadow-lg">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Track Order */}
            <Link
              id="track-order-btn"
              to="/track-order"
              className="hidden sm:flex p-2 text-zinc-300 hover:text-white"
              title="Track Order"
            >
              <Package className="h-5 w-5" />
            </Link>

            {/* Cart Trigger */}
            <button
              id="cart-toggle-btn"
              onClick={() => setIsCartOpen(true)}
              className="p-2 relative text-zinc-300 hover:text-white flex items-center"
            >
              <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-street-red text-white font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border border-street-black shadow-lg">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Action */}
            <a
              id="header-whatsapp"
              href="https://wa.me/919196294654?text=Hi%20TeeCode!%20I%20want%20to%20explore%20your%20oversized%20streetwear%20T-shirts%20collection."
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center space-x-1.5 bg-zinc-900 border border-zinc-800 hover:border-street-red transition-all px-3 py-1.5 text-xs font-mono text-zinc-300 hover:text-white"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>ORDER ON WHATSAPP</span>
            </a>

          </div>
        </div>
      </div>

      {/* Expandable Mobile Search */}
      <AnimatePresence>
        {isSearchActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden w-full bg-zinc-900 border-t border-zinc-800 overflow-hidden"
          >
            <form onSubmit={handleSearchSubmit} className="p-4 flex items-center space-x-2">
              <input
                id="mobile-search-input"
                type="text"
                placeholder="Search designs, sizes, colors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-street-black border border-zinc-800 rounded-none py-2 px-3 text-sm font-mono focus:outline-none focus:border-zinc-700 text-white"
              />
              <button id="mobile-search-submit" type="submit" className="bg-street-red text-white py-2 px-4 font-mono text-sm tracking-widest font-bold">
                GO
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0.1, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-street-black border-r border-zinc-800 p-6 z-50 flex flex-col justify-between lg:hidden overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                  <span className="font-display text-xl font-black tracking-tighter uppercase">
                    TEE<span className="text-street-red">CODE</span>
                  </span>
                  <button
                    id="close-menu-btn"
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-zinc-400 hover:text-white"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Primary: MEN / WOMEN Accordion */}
                <div className="mt-6 space-y-0">
                  {NAV_CATEGORIES.map((cat) => (
                    <div key={cat.id} className="border-b border-zinc-800">
                      {/* Category top-level toggle */}
                      <button
                        id={`drawer-cat-${cat.id}`}
                        onClick={() => {
                          setExpandedMobileCategory(expandedMobileCategory === cat.id ? null : cat.id);
                          setExpandedMobileSubcat(null);
                        }}
                        className="w-full text-left font-display text-lg font-bold tracking-widest uppercase flex items-center justify-between py-4 text-zinc-300 hover:text-white transition-colors"
                      >
                        <span>{cat.name}</span>
                        <ChevronDown className={`h-4 w-4 text-zinc-600 transition-transform duration-200 ${expandedMobileCategory === cat.id ? 'rotate-180 text-street-red' : ''}`} />
                      </button>

                      {/* Expanded subcategories */}
                      <AnimatePresence>
                        {expandedMobileCategory === cat.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-4 pl-4 space-y-0">
                              {cat.subcategories.map((subcat) => (
                                <div key={subcat.id}>
                                  {/* Subcategory row — direct link */}
                                  <Link
                                    id={`drawer-subcat-${subcat.id}`}
                                    to={getSubcatLink(cat.id, subcat)}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-full text-left flex items-center justify-between py-3 group"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0" />
                                      <span className="font-display text-sm font-bold tracking-wider uppercase text-zinc-400 group-hover:text-white transition-colors">
                                        {subcat.name}
                                      </span>
                                      {subcat.comingSoon && (
                                        <span className="text-[9px] font-mono bg-zinc-800 border border-zinc-700 text-zinc-500 px-1.5 py-0.5 uppercase tracking-wider">
                                          SOON
                                        </span>
                                      )}
                                    </div>
                                    <ChevronRight className="h-3 w-3 text-zinc-700" />
                                  </Link>
                                </div>
                              ))}

                              {/* View All link */}
                              <Link
                                to={`/shop?gender=${cat.id}`}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-2 pt-2 pb-1 text-street-red hover:text-white transition-colors"
                              >
                                <span className="font-mono text-[11px] font-bold tracking-wider uppercase">VIEW ALL {cat.name}</span>
                                <ChevronRight className="h-3 w-3" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  {/* Sale link */}
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full text-left font-display text-lg font-bold tracking-widest uppercase flex items-center justify-between py-4 border-b border-zinc-800 text-emerald-400"
                    >
                      <span>{item.label}</span>
                      <span className="text-xs font-mono text-zinc-600">→</span>
                    </Link>
                  ))}
                </div>

                {/* Secondary links (Home, About, etc.) */}
                <div className="mt-6 pt-4 border-t border-zinc-800 space-y-3">
                  {secondaryNavItems.map((item) => (
                    <Link
                      id={`drawer-nav-${item.id}`}
                      key={item.id}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full text-left font-display text-base font-bold tracking-widest uppercase flex items-center justify-between py-2 text-zinc-400 hover:text-white"
                    >
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <Link
                    to="/track-order"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-left font-display text-base font-bold tracking-widest uppercase flex items-center justify-between py-2 text-zinc-400 hover:text-white"
                  >
                    <span>Track Order</span>
                    <span className="text-xs font-mono text-zinc-600">📦</span>
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-left font-display text-base font-bold tracking-widest uppercase flex items-center justify-between py-2 text-zinc-400 hover:text-white"
                  >
                    <span>Wishlist</span>
                    <span className="text-xs font-mono text-zinc-600">❤️</span>
                  </Link>
                </div>
              </div>

              {/* Drawer Footer Contact */}
              <div className="pt-6 border-t border-zinc-800 font-mono text-xs text-zinc-400 space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-street-red"></span>
                  <span className="tracking-widest">TEECODE.STORE</span>
                </div>
                <p className="text-zinc-500">Premium oversized streetwear designed for street culture.</p>
                <a
                  id="drawer-whatsapp"
                  href="https://wa.me/919196294654"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 font-bold tracking-wider"
                >
                  <span>WHATSAPP SUPPORT</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
