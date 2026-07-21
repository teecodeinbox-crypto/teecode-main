import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, Search, RefreshCw, Grid, Star, Eye, MessageCircle, AlertTriangle, Clock, Sparkles, ArrowLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS, SIZES, TSHIRT_TYPES, NAV_CATEGORIES, getCollectionFilterValue } from '../data';
import { Product } from '../types';

export default function ShopView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';
  const typeFromUrl = searchParams.get('type') || null;
  const genderFromUrl = searchParams.get('gender') || null;
  const comingSoon = searchParams.get('coming-soon') === 'true';
  const categoryFromUrl = searchParams.get('category') || null;
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);
  const [localSearch, setLocalSearch] = useState(queryFromUrl);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const [selectedFit, setSelectedFit] = useState<string | null>(null);
  const [selectedTshirtType, setSelectedTshirtType] = useState<string | null>(typeFromUrl);
  const [maxPrice, setMaxPrice] = useState<number>(9999); // max price range for all products
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const genderLabel = genderFromUrl === 'men' ? 'MEN' : genderFromUrl === 'women' ? 'WOMEN' : null;

  // Sync URL params when they change
  useEffect(() => {
    setLocalSearch(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    setSelectedTshirtType(typeFromUrl);
  }, [typeFromUrl]);

  useEffect(() => {
    let result = [...PRODUCTS];

    // 0. Gender Filter
    if (genderFromUrl === 'women') {
      result = result.filter((p) => p.gender === 'women');
    } else if (genderFromUrl) {
      result = result.filter((p) => p.gender === genderFromUrl || p.gender === 'unisex');
    }

    // 1. Search Query Filter
    if (localSearch) {
      const q = localSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.graphicDesc.toLowerCase().includes(q)
      );
    }

    // 2. Size Filter
    if (selectedSize) {
      result = result.filter((p) => p.sizes.includes(selectedSize));
    }



    // 3.5. Fit Filter
    if (selectedFit) {
      result = result.filter((p) => p.fitType === selectedFit);
    }

    // 3.8. T-Shirt Type Filter (supports multi-category via additionalTypes)
    if (selectedTshirtType) {
      result = result.filter((p) => p.tshirtType === selectedTshirtType || p.additionalTypes?.includes(selectedTshirtType));
    }

    // 3.9. Category/Subcategory Filter (e.g. T-Shirts = all collections under that subcategory)
    if (categoryFromUrl && genderFromUrl) {
      const genderCat = NAV_CATEGORIES.find(c => c.id === genderFromUrl);
      const subcatMatch = genderCat?.subcategories.find(s => s.id === categoryFromUrl);
      if (subcatMatch && subcatMatch.collections.length > 0) {
        const filterValues = subcatMatch.collections.map(col => getCollectionFilterValue(col));
        result = result.filter((p) => filterValues.includes(p.tshirtType) || p.additionalTypes?.some(t => filterValues.includes(t)));
      } else if (subcatMatch && subcatMatch.collections.length === 0) {
        // Exclude products that belong to other subcategories' collections
        const otherCollections = genderCat?.subcategories
          .filter(s => s.id !== categoryFromUrl && s.collections.length > 0)
          .flatMap(s => s.collections.map(col => getCollectionFilterValue(col))) || [];
        if (otherCollections.length > 0) {
          result = result.filter((p) => !otherCollections.includes(p.tshirtType) && !p.additionalTypes?.some(t => otherCollections.includes(t)));
        }
      }
    }

    // 4. Price Filter
    result = result.filter((p) => {
      const currentPrice = p.salePrice || p.price;
      return currentPrice <= maxPrice;
    });

    // 5. Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => {
        const pa = a.salePrice || a.price;
        const pb = b.salePrice || b.price;
        return pa - pb;
      });
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => {
        const pa = a.salePrice || a.price;
        const pb = b.salePrice || b.price;
        return pb - pa;
      });
    } else if (sortBy === 'newest') {
      // simulate newest by product ids/index
      result = result.filter(p => p.tag === 'NEW DROP' || p.category === 'new').concat(
        result.filter(p => p.tag !== 'NEW DROP' && p.category !== 'new')
      );
    }

    setFilteredProducts(result);
  }, [localSearch, selectedSize, selectedFit, selectedTshirtType, maxPrice, sortBy, genderFromUrl, categoryFromUrl]);

  // Open filter panel if a t-shirt type is selected from home
  useEffect(() => {
    if (selectedTshirtType) {
      setIsFilterPanelOpen(true);
    }
  }, [selectedTshirtType]);

  const handleResetFilters = () => {
    setLocalSearch('');
    setSelectedSize(null);

    setSelectedFit(null);
    setSelectedTshirtType(null);
    setMaxPrice(9999);
    setSortBy('featured');
  };

  return (
    <div className="bg-white min-h-screen text-street-black font-sans py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title area */}
        <div className="text-left border-b border-zinc-200 pb-6 mb-8">
          <span className="font-mono text-xs font-bold text-street-red uppercase tracking-widest">
            {genderLabel ? `${genderLabel}'S COLLECTION` : 'DECK OF DROPS'}
          </span>

          {/* Breadcrumb when inside a subcategory */}
          {categoryFromUrl && genderFromUrl && (() => {
            const genderCat = NAV_CATEGORIES.find(c => c.id === genderFromUrl);
            const subcatMatch = genderCat?.subcategories.find(s => s.id === categoryFromUrl);
            if (!subcatMatch) return null;
            return (
              <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400 uppercase tracking-widest mt-2 mb-1">
                <button onClick={() => navigate(`/shop?gender=${genderFromUrl}`)} className="hover:text-street-black transition-colors">
                  {genderCat?.name}
                </button>
                <ChevronRight className="h-3 w-3 text-zinc-300" />
                <span className="text-street-black font-bold">{subcatMatch.name}</span>
              </div>
            );
          })()}

          <h1 className="font-display text-4xl font-black uppercase tracking-tight text-street-black">
            {(() => {
              if (categoryFromUrl && genderFromUrl) {
                const gc = NAV_CATEGORIES.find(c => c.id === genderFromUrl);
                const sc = gc?.subcategories.find(s => s.id === categoryFromUrl);
                if (sc) return sc.name;
              }
              return genderLabel ? `${genderLabel}'S CATALOGUE` : 'STREET CATALOGUE';
            })()}
          </h1>
          <p className="text-zinc-500 font-mono text-xs mt-1">
            {genderLabel
              ? `Browse our premium ${genderLabel.toLowerCase()}'s streetwear collection across multiple custom cuts and fits.`
              : 'Browse our limited collection of premium streetwear tees across multiple custom cuts and fits.'}
          </p>
        </div>

        {/* Subcategory Cards — show when viewing a gender category (but NOT when a specific subcategory is selected) */}
        {genderFromUrl && !comingSoon && !categoryFromUrl && (() => {
          const genderCat = NAV_CATEGORIES.find(c => c.id === genderFromUrl);
          if (!genderCat) return null;

          return (
            <div className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-lg font-black uppercase tracking-wider text-street-black">
                  SHOP BY CATEGORY
                </h3>
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                  {genderCat.subcategories.length} CATEGORIES
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {genderCat.subcategories.map((subcat) => {
                  const subcatLink = subcat.comingSoon
                    ? `/shop?gender=${genderFromUrl}&category=${subcat.id}&coming-soon=true`
                    : `/shop?gender=${genderFromUrl}&category=${subcat.id}`;

                  // Pick the first matching collection's image from TSHIRT_TYPES, or fallback
                  const matchedType = subcat.collections.length > 0
                    ? TSHIRT_TYPES.find(t => t.name === subcat.collections[0])
                    : null;

                  const subcatColors: Record<string, string> = {
                    'T-Shirts': 'from-red-900/80',
                    'Shirts': 'from-amber-900/80',
                    'Polos': 'from-blue-900/80',
                    'Bottoms': 'from-emerald-900/80',
                    'Hoodies': 'from-purple-900/80',
                    'TeeCode Gym Gear': 'from-orange-900/80',
                    'Anime Code': 'from-pink-900/80',
                  };
                  const gradientFrom = subcatColors[subcat.name] || 'from-zinc-900/80';

                  // Use subcat.image if provided, otherwise fall back to first collection's image
                  const subcatImage = (subcat as any).image || matchedType?.image || null;

                  return (
                    <Link key={subcat.id} to={subcatLink} className="block">
                      <motion.div
                        whileHover={{ y: -4, scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="group relative cursor-pointer overflow-hidden border border-zinc-200 hover:border-street-black bg-zinc-50 aspect-[4/3] flex flex-col justify-end transition-colors"
                      >
                        {/* Background image or gradient */}
                        {subcatImage ? (
                          <div className="absolute inset-0 z-0">
                            <img
                              src={subcatImage}
                              alt={`${genderCat?.name || ''}'s ${subcat.name} Collection by TeeCode`}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                          </div>
                        ) : (
                          <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} to-zinc-900`} />
                        )}

                        {/* Content */}
                        <div className="relative z-10 p-4 text-left space-y-1">
                          <h4 className="font-display font-black text-base sm:text-lg uppercase tracking-tight text-white group-hover:text-street-red transition-colors">
                            {subcat.name}
                          </h4>
                          {subcat.comingSoon ? (
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3 w-3 text-zinc-400" />
                              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">Coming Soon</span>
                            </div>
                          ) : (
                            <span className="font-mono text-[10px] text-zinc-300 uppercase tracking-wider">
                              Explore →
                            </span>
                          )}
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Coming Soon Page — for empty subcategories */}
        {comingSoon && categoryFromUrl && (() => {
          // Resolve the category name from NAV_CATEGORIES
          const genderCat = NAV_CATEGORIES.find(c => c.id === genderFromUrl);
          const subcatMatch = genderCat?.subcategories.find(s => s.id === categoryFromUrl);
          const subcatName = subcatMatch?.name || categoryFromUrl;
          const parentName = genderCat?.name || '';

          return (
            <div className="flex flex-col items-center justify-center py-24 sm:py-32 text-center relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-street-red/5 rounded-full blur-3xl" />
              <div className="absolute top-10 right-10 w-64 h-64 bg-zinc-100/80 rounded-full blur-3xl" />

              <div className="relative z-10 max-w-lg mx-auto space-y-6">
                {/* Animated icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-50 border-2 border-zinc-200 mx-auto">
                  <Clock className="h-8 w-8 text-street-red animate-pulse" />
                </div>

                {/* Breadcrumb */}
                <div className="flex items-center justify-center gap-2 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                  <span>{parentName}</span>
                  <span className="text-zinc-300">→</span>
                  <span className="text-street-red font-bold">{subcatName}</span>
                </div>

                <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-street-black">
                  COMING SOON
                </h2>

                <p className="text-zinc-500 font-mono text-sm leading-relaxed max-w-md mx-auto">
                  We're crafting something exceptional for <span className="text-street-black font-bold">{parentName}'s {subcatName}</span>. Premium designs are in the works — drop lands soon.
                </p>

                {/* Animated dots */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-street-red"
                      style={{
                        animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => navigate(`/shop?gender=${genderFromUrl || 'men'}`)}
                    className="inline-flex items-center gap-2 bg-street-black hover:bg-street-red text-white px-6 py-3 font-display font-black text-xs tracking-widest uppercase transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    BROWSE {parentName}'S COLLECTION
                  </button>
                  <a
                    href="https://www.instagram.com/teecode_apparel/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-zinc-200 hover:border-street-black text-street-black px-6 py-3 font-mono text-xs font-bold tracking-wider uppercase transition-colors"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    FOLLOW FOR UPDATES
                  </a>
                </div>
              </div>
            </div>
          );
        })()}


        {/* Show filters and products when NOT coming soon */}
        {!comingSoon && (<>

        {/* Toolbar Grid (Search, Filter Toggle, Sorters) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          
          {/* Left: Search input */}
          <div className="relative flex-1 max-w-md">
            <input
              id="shop-search-bar"
              type="text"
              placeholder="Filter by keyword (e.g. glitch, drift, earth)..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-street-black py-2.5 pl-10 pr-4 text-xs font-mono focus:outline-none placeholder-zinc-400"
            />
            <Search className="h-4 w-4 absolute left-3.5 top-3.5 text-zinc-400" />
            {localSearch && (
              <button
                id="clear-search-btn"
                onClick={() => setLocalSearch('')}
                className="absolute right-3 top-3 text-xs text-zinc-400 hover:text-street-black font-mono"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3 self-end lg:self-auto">
            
            {/* Filter Toggle */}
            <button
              id="filter-toggle-btn"
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className={`flex items-center space-x-2 border px-4 py-2.5 font-mono text-xs font-semibold tracking-wider uppercase transition-all ${
                isFilterPanelOpen || selectedSize || selectedFit || selectedTshirtType || maxPrice < 9999
                  ? 'border-street-red text-street-red bg-rose-50/50'
                  : 'border-zinc-200 text-street-black hover:border-street-black'
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>FILTERS { (selectedSize || selectedFit || selectedTshirtType || maxPrice < 9999) ? '(ACTIVE)' : '' }</span>
            </button>

            {/* Sorter Selector */}
            <select
              id="shop-sorting-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-zinc-200 hover:border-street-black px-3 py-2.5 font-mono text-xs font-semibold tracking-wider uppercase focus:outline-none cursor-pointer"
            >
              <option value="featured">🔥 FEATURED DECK</option>
              <option value="newest">⚡ NEWEST RELEASES</option>
              <option value="price-low">📉 PRICE: LOW TO HIGH</option>
              <option value="price-high">📈 PRICE: HIGH TO LOW</option>
            </select>

            {/* Reset button */}
            {(localSearch || selectedSize || selectedFit || selectedTshirtType || maxPrice < 9999) && (
              <button
                id="reset-all-filters-btn"
                onClick={handleResetFilters}
                className="p-2.5 border border-zinc-200 hover:border-street-red text-zinc-400 hover:text-street-red transition-all"
                title="Reset Filters"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            )}

          </div>
        </div>

        {/* Filter Expandable Area */}
        <AnimatePresence>
          {isFilterPanelOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border border-zinc-200 bg-zinc-50 p-6 mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                


                {/* 1. Size Filter */}
                <div className="space-y-3">
                  <h4 className="font-display font-black text-xs uppercase tracking-widest text-zinc-400">FILTER BY SIZE</h4>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map((size) => (
                      <button
                        id={`filter-size-${size}`}
                        key={size}
                        onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                        className={`w-10 h-10 font-mono text-xs font-bold transition-all border ${
                          selectedSize === size
                            ? 'bg-street-black text-white border-street-black'
                            : 'bg-white text-street-black border-zinc-200 hover:border-street-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>



                {/* 2.5. Fit Filter */}
                <div className="space-y-3">
                  <h4 className="font-display font-black text-xs uppercase tracking-widest text-zinc-400">FILTER BY FIT</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Oversized', 'Regular', 'Slim', 'Crop'].map((fit) => (
                      <button
                        id={`filter-fit-${fit.toLowerCase()}`}
                        key={fit}
                        onClick={() => setSelectedFit(selectedFit === fit ? null : fit)}
                        className={`px-3 py-1.5 border text-[11px] font-mono font-bold uppercase transition-all ${
                          selectedFit === fit
                            ? 'bg-street-black text-white border-street-black'
                            : 'bg-white text-street-black border-zinc-200 hover:border-street-black'
                        }`}
                      >
                        {fit}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Price Filter */}
                <div className="space-y-3">
                  <h4 className="font-display font-black text-xs uppercase tracking-widest text-zinc-400">MAX PRICE: ₹{maxPrice}</h4>
                  <div className="space-y-1">
                    <input
                      id="price-range-slider"
                      type="range"
                      min="299"
                      max="9999"
                      step="50"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-street-black cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[10px] text-zinc-400">
                      <span>₹299</span>
                      <span>₹9999</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Listing Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="group bg-white border border-zinc-200 overflow-hidden relative cursor-pointer flex flex-col justify-between hover:border-street-black transition-colors"
                onClick={() => navigate(`/shop/${product.id}`)}
              >
                {/* Upper tag / banner */}
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-street-black text-white text-[9px] font-mono font-bold px-2 py-0.5 z-10 tracking-wider uppercase border border-zinc-800">
                    {product.tag}
                  </span>
                )}

                <span className="absolute top-3 right-3 bg-street-red text-white text-[9px] font-mono font-bold px-2 py-0.5 z-10 tracking-wider uppercase">
                  {product.gsm} GSM
                </span>

                {/* Image Container */}
                <div className="aspect-[3/4] bg-zinc-50 overflow-hidden relative border-b border-zinc-100">
                  <img
                    src={product.images[0]}
                    alt={`TeeCode ${product.name} ${product.tshirtType || 'streetwear'} product image`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  {/* Street culture print desc bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-street-black/85 backdrop-blur-xs border-t border-zinc-800 py-1.5 px-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-[9px] font-mono text-zinc-300 truncate uppercase tracking-widest text-left">
                      🎨 Print: {product.graphicDesc}
                    </p>
                  </div>
                </div>

                {/* Details Area */}
                <div className="p-4 space-y-2 text-left bg-white">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-base font-black tracking-tight text-street-black uppercase group-hover:text-street-red transition-colors duration-200 leading-tight">
                      {product.name}
                    </h3>
                    <div className="flex flex-col items-end shrink-0">
                      {product.salePrice ? (
                        <>
                          <span className="font-mono text-sm font-bold text-street-red">₹{product.salePrice}</span>
                          <span className="font-mono text-[10px] text-zinc-400 line-through">₹{product.price}</span>
                        </>
                      ) : (
                        <span className="font-mono text-sm font-bold text-street-black">₹{product.price}</span>
                      )}
                    </div>
                  </div>

                  {/* Specification pills */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 font-mono text-[9px] text-zinc-500">
                    <span className="bg-zinc-100 px-1.5 py-0.5">
                      {product.gsm >= 220 ? 'HEAVYWEIGHT' : product.gsm >= 200 ? 'MIDWEIGHT' : 'LIGHTWEIGHT'}
                    </span>
                    <span className="bg-zinc-100 px-1.5 py-0.5">UNISEX</span>
                    <span className="bg-zinc-100 px-1.5 py-0.5">{product.fitType.toUpperCase()} FIT</span>
                  </div>

                  {/* Size and Color overview indicators */}
                  <div className="flex items-center justify-between pt-2 text-[10px] text-zinc-400 font-mono">
                    <span className="truncate max-w-[130px]">Sizes: {product.sizes.join(', ')}</span>
                    <div className="flex -space-x-1 shrink-0">
                      {product.colors.map((c) => (
                        <span
                          key={c.name}
                          className="w-2.5 h-2.5 rounded-full border border-white"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Action CTAs */}
                  <div className="pt-3 grid grid-cols-2 gap-2 border-t border-zinc-100">
                    <button
                      id={`shop-view-btn-${product.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/shop/${product.id}`);
                      }}
                      className="w-full bg-street-black hover:bg-street-red text-white py-2 font-display font-black text-[10px] tracking-widest uppercase flex items-center justify-center space-x-1 transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>VIEW DETAILS</span>
                    </button>

                    <a
                      id={`shop-wa-btn-${product.id}`}
                      href={`https://wa.me/919196294654?text=Hi%20TeeCode!%20I%20want%20to%20order%20the%20"${product.name}"%20(${product.fitType}%20Fit)%20T-shirt.`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full bg-zinc-100 hover:bg-emerald-50 text-street-black hover:text-emerald-700 py-2 font-mono text-[9px] font-bold tracking-wider uppercase flex items-center justify-center space-x-1 border border-zinc-200 transition-colors"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>ORDER WA</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-zinc-50 border border-zinc-200 rounded-none max-w-lg mx-auto">
            <AlertTriangle className="h-8 w-8 text-zinc-400 mx-auto mb-4" />
            <h3 className="font-display font-bold uppercase tracking-wider text-sm">NO DROPS MATCH SEARCH</h3>
            <p className="text-xs text-zinc-500 font-mono mt-2 px-6">
              We couldn&apos;t find any T-shirts fitting size/color parameters or the keyword &ldquo;{localSearch}&rdquo;.
            </p>
            <button
              id="clear-filters-error-btn"
              onClick={handleResetFilters}
              className="mt-6 bg-street-black hover:bg-street-red text-white font-mono text-xs font-bold uppercase tracking-widest py-3 px-6 transition-colors"
            >
              CLEAR ALL FILTERS
            </button>
          </div>
        )}
      </>)}
      </div>
    </div>
  );
}
