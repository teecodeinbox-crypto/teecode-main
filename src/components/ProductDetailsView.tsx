import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Ruler, ShieldCheck, Heart, ShoppingBag, MessageCircle, ArrowLeft, RefreshCw, Star, Info, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { SIZE_CHARTS, PRODUCTS } from '../data';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductDetailsView() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const product = PRODUCTS.find((p) => p.id === productId);

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

  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Black');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAddedNotify, setIsAddedNotify] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Use color-specific images if available, otherwise fall back to product.images
  const displayImages = product.colorImages?.[selectedColor] || product.images;

  // Reset active image index when color changes
  const prevColorRef = useRef(selectedColor);
  useEffect(() => {
    if (prevColorRef.current !== selectedColor) {
      setActiveImageIndex(0);
      prevColorRef.current = selectedColor;
    }
  }, [selectedColor]);

  const currentPrice = product.salePrice || product.price;
  const selectedChart = SIZE_CHARTS[product.fitType || 'Oversized'];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor);
    }
    setIsAddedNotify(true);
    setTimeout(() => {
      setIsAddedNotify(false);
    }, 3000);
  };

  const handleWhatsAppBuy = () => {
    const text = `Hi TeeCode!%20I%20want%20to%20buy%20the%20following%20streetwear%20T-shirt:%0A%0A*PRODUCT:*%20${product.name}%0A*FIT:*%20${product.fitType || 'Oversized'}%0A*SIZE:*%20${selectedSize}%0A*COLOR:*%20${selectedColor}%0A*PRICE:*%20₹${currentPrice}%0A%0Ateecode.store`;
    window.open(`https://wa.me/919196294654?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen text-street-black font-sans py-12">
      
      {/* Toast Notification for Add To Cart */}
      <AnimatePresence>
        {isAddedNotify && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-28 left-1/2 transform -translate-x-1/2 z-50 bg-street-black text-white px-6 py-4 border border-zinc-800 shadow-2xl flex items-center space-x-3 rounded-none font-mono text-xs tracking-wider uppercase"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-street-red animate-ping" />
            <span>ADDED {quantity}x {product.name} ({selectedSize} / {selectedColor}) TO CART</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          id="product-back-btn"
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-zinc-500 hover:text-street-black font-mono text-xs uppercase tracking-widest mb-8 pb-2 border-b border-zinc-100 self-start transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>BACK TO DECK</span>
        </button>

        {/* Product Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Image Gallery Column (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Primary Display */}
            <div className="bg-zinc-100 border border-zinc-200 aspect-[3/4] overflow-hidden relative">
              <img
                src={displayImages[activeImageIndex]}
                alt={`TeeCode ${product.name} ${selectedColor} ${activeImageIndex === 0 ? 'front view' : activeImageIndex === 1 ? 'side view' : activeImageIndex === 2 ? 'back view' : 'detail view'}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500"
              />
              {product.tag && (
                <span className="absolute top-4 left-4 bg-street-black text-white text-[10px] font-mono font-bold px-3 py-1 tracking-widest uppercase border border-zinc-800">
                  {product.tag}
                </span>
              )}
              <span className="absolute top-4 right-4 bg-street-red text-white text-[10px] font-mono font-bold px-3 py-1 tracking-widest uppercase">
                {product.gsm} GSM COTTON
              </span>
            </div>

            {/* Thumbnails list */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {displayImages.map((img, idx) => (
                <button
                  id={`thumbnail-img-${idx}`}
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-[3/4] bg-zinc-100 border overflow-hidden ${
                    activeImageIndex === idx ? 'border-street-black ring-1 ring-street-black' : 'border-zinc-200'
                  }`}
                >
                  <img src={img} alt={`TeeCode ${product.name} ${selectedColor} view ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
              {/* Extra placeholder info thumb */}
              <div className="hidden sm:flex flex-col items-center justify-center border border-dashed border-zinc-200 aspect-[3/4] p-2 bg-zinc-50 font-mono text-[9px] text-zinc-400 text-center">
                <Sparkles className="h-4 w-4 text-street-red mb-1" />
                <span>UNISEX SILHOUETTE</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Ordering Options Column (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Breadcrumb / Category */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
              <span>TEECODE.STORE</span>
              <span>/</span>
              <span>STREETWEAR CATALOG</span>
              {product.tshirtType && (
                <>
                  <span>/</span>
                  <span className="text-street-red font-bold">{product.tshirtType.toUpperCase()}</span>
                </>
              )}
              <span>/</span>
              <span className="text-street-black font-bold">{product.fitType.toUpperCase()} COLLECTION</span>
            </div>

            {/* Product Title and Price */}
            <div className="space-y-2">
              <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-street-black">
                {product.name}
              </h1>
              
              <div className="flex items-baseline space-x-3">
                {product.salePrice ? (
                  <>
                    <span className="font-mono text-2xl font-black text-street-red">₹{product.salePrice}</span>
                    <span className="font-mono text-sm text-zinc-400 line-through">₹{product.price}</span>
                    <span className="bg-rose-100 text-street-red font-mono font-black text-[10px] px-2 py-0.5 tracking-wider uppercase">
                      SAVE {Math.round((1 - (product.salePrice / product.price)) * 100)}% OFF
                    </span>
                  </>
                ) : (
                  <span className="font-mono text-2xl font-black text-street-black">₹{product.price}</span>
                )}
              </div>
            </div>

            {/* Specifications checklist (GSM, Material, Fit etc) */}
            <div className="bg-zinc-50 border border-zinc-200 p-4 font-mono text-xs space-y-2 text-zinc-600">
              {product.tshirtType && (
                <p className="flex justify-between border-b border-zinc-150 pb-1.5">
                  <span className="text-zinc-400 uppercase">Streetwear Vibe:</span>
                  <span className="text-street-red font-black uppercase tracking-wider">{product.tshirtType}</span>
                </p>
              )}
              <p className="flex justify-between border-b border-zinc-150 pb-1.5">
                <span className="text-zinc-400 uppercase">Fit Silhouette:</span>
                <span className="text-street-black font-bold uppercase">{product.fit}</span>
              </p>
              <p className="flex justify-between border-b border-zinc-150 pb-1.5">
                <span className="text-zinc-400 uppercase">Fabric Density:</span>
                <span className="text-street-black font-bold uppercase">{product.gsm} GSM Premium</span>
              </p>
              <p className="flex justify-between border-b border-zinc-150 pb-1.5">
                <span className="text-zinc-400 uppercase">Material Composition:</span>
                <span className="text-street-black font-bold uppercase">{product.material}</span>
              </p>
              <p className="flex justify-between border-b border-zinc-150 pb-1.5">
                <span className="text-zinc-400 uppercase">Graphic Spec:</span>
                <span className="text-street-black font-bold uppercase text-right max-w-[200px] truncate">{product.printFront}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-zinc-400 uppercase">Back side:</span>
                <span className="text-street-black font-bold uppercase">{product.printBack}</span>
              </p>
            </div>

            {/* Description */}
            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400">SELECT STREET SIZE</span>
                <button
                  id="size-chart-trigger"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center space-x-1 font-mono text-[11px] text-street-red hover:underline uppercase"
                >
                  <Ruler className="h-3.5 w-3.5" />
                  <span>{product.sizeChartImage ? 'SIZE CHART' : 'INTERACTIVE SIZE CHART'}</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    id={`detail-size-btn-${size}`}
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 font-mono text-xs font-bold transition-all border ${
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

            {/* Color Selector */}
            <div className="space-y-3">
              <span className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400 block">SELECT SHADE: {selectedColor}</span>
              
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    id={`detail-color-btn-${color.name}`}
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`inline-flex items-center space-x-2 border py-1.5 px-3 font-mono text-[11px] transition-all ${
                      selectedColor === color.name
                        ? 'bg-street-black text-white border-street-black'
                        : 'bg-white text-street-black border-zinc-200 hover:border-street-black'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 border border-zinc-300 rounded-full inline-block shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="uppercase">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <span className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400 block">QUANTITY</span>
              <div className="flex items-center space-x-3">
                <button
                  id="qty-decrease-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={`w-10 h-10 border font-mono text-lg font-bold transition-all ${
                    quantity <= 1
                      ? 'bg-zinc-50 text-zinc-300 border-zinc-200 cursor-not-allowed'
                      : 'bg-white text-street-black border-zinc-200 hover:border-street-black'
                  }`}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="font-mono text-lg font-black text-street-black w-10 text-center">{quantity}</span>
                <button
                  id="qty-increase-btn"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className={`w-10 h-10 border font-mono text-lg font-bold transition-all ${
                    quantity >= 10
                      ? 'bg-zinc-50 text-zinc-300 border-zinc-200 cursor-not-allowed'
                      : 'bg-white text-street-black border-zinc-200 hover:border-street-black'
                  }`}
                  disabled={quantity >= 10}
                >
                  +
                </button>
                {product.salePrice && (
                  <span className="font-mono text-xs text-zinc-400 ml-2">Total: <span className="text-street-red font-bold">₹{(product.salePrice) * quantity}</span></span>
                )}
              </div>
            </div>

            {/* Action Buttons (Add to Cart / Buy WhatsApp) */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Add to Cart */}
              <button
                id="add-to-cart-action-btn"
                onClick={handleAddToCart}
                className="group w-full flex items-center justify-center space-x-2.5 bg-street-black hover:bg-street-red text-white font-display font-bold py-4 tracking-widest uppercase transition-all duration-300"
              >
                <ShoppingBag className="h-4.5 w-4.5" />
                <span>ADD TO BAG</span>
              </button>

              {/* Buy on WhatsApp */}
              <button
                id="buy-whatsapp-action-btn"
                onClick={handleWhatsAppBuy}
                className="w-full flex items-center justify-center space-x-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold py-4 tracking-widest uppercase transition-colors"
              >
                <MessageCircle className="h-4.5 w-4.5" />
                <span>BUY ON WHATSAPP</span>
              </button>

            </div>

            {/* Wishlist Button */}
            <button
              id="wishlist-toggle-pdp"
              onClick={() => toggleWishlist(product)}
              className={`w-full flex items-center justify-center space-x-2 py-3 font-mono text-xs font-bold uppercase tracking-widest transition-colors border ${
                isWishlisted(product.id)
                  ? 'bg-rose-50 text-street-red border-street-red'
                  : 'bg-white text-zinc-500 border-zinc-200 hover:border-street-red hover:text-street-red'
              }`}
            >
              <Heart className={`h-4 w-4 ${isWishlisted(product.id) ? 'fill-street-red' : ''}`} />
              <span>{isWishlisted(product.id) ? 'SAVED TO WISHLIST' : 'ADD TO WISHLIST'}</span>
            </button>

            {/* Direct Order Trust message */}
            <p className="text-zinc-400 font-mono text-[10px] text-center leading-relaxed">
              🔒 Checkout is Razorpay/Cashfree ready. WhatsApp orders are verified by support.
            </p>

            {/* Washing Instructions Card */}
            <div className="border-t border-zinc-200 pt-6 mt-6 space-y-3">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-street-black">WASHING & CARE INSTRUCTIONS</h4>
              <ul className="font-mono text-[11px] text-zinc-500 space-y-1.5 list-disc pl-4 leading-relaxed">
                {product.washingInstructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>

      {/* Size Chart Modal Backdrop & Drawer */}
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
              <div className="max-w-3xl mx-auto space-y-6">
                
                {/* Modal Title bar */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                  <div className="text-left">
                    <span className="font-mono text-xs font-bold text-street-red uppercase tracking-wider">TEECODE SIZE SPECS</span>
                    <h3 className="font-display text-2xl font-black uppercase text-street-black">{product.sizeChartImage ? 'SIZE CHART' : `${product.fitType} FIT SIZE CHART`}</h3>
                  </div>
                  <button
                    id="close-size-chart-btn"
                    onClick={() => setIsSizeGuideOpen(false)}
                    className="p-2 border border-zinc-200 hover:border-street-black font-mono text-xs uppercase"
                  >
                    CLOSE
                  </button>
                </div>

                {product.sizeChartImage ? (
                  /* Static Size Chart Image */
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
                    {/* Sizing Table */}
                    <div className="overflow-x-auto border border-zinc-200 bg-zinc-50">
                      <table className="w-full text-left font-mono text-xs border-collapse">
                        <thead>
                          <tr className="bg-street-black text-white border-b border-zinc-700 font-bold uppercase text-[10px] tracking-wider">
                            {selectedChart.columns.map((col, idx) => (
                              <th key={idx} className="p-3 text-center sm:p-4">{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {selectedChart.rows.map((row, idx) => (
                            <tr
                              key={idx}
                              className={`border-b border-zinc-200 hover:bg-zinc-100 transition-colors text-center ${
                                row.size === selectedSize ? 'bg-rose-50 font-bold text-street-red' : ''
                              }`}
                            >
                              <td className="p-3 font-bold border-r border-zinc-200 bg-zinc-100 sm:p-4">{row.size}</td>
                              <td className="p-3 sm:p-4">{row.chest} inches</td>
                              <td className="p-3 sm:p-4">{row.length} inches</td>
                              <td className="p-3 sm:p-4">{row.sleeve} inches</td>
                              <td className="p-3 sm:p-4">{row.shoulder} inches</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Size tips */}
                    <div className="bg-zinc-100 p-4 border border-zinc-200 font-mono text-[11px] text-zinc-600 leading-relaxed text-left flex items-start space-x-3">
                      <Info className="h-5 w-5 text-street-red shrink-0" />
                      <div>
                        <p className="font-bold text-street-black uppercase mb-1">{product.fitType} Fit Silhouettes:</p>
                        <p>{selectedChart.instructions}</p>
                      </div>
                    </div>
                  </>
                )}

                {/* Confirm fit button */}
                <button
                  id="confirm-size-fit-btn"
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="w-full bg-street-black hover:bg-street-red text-white py-4 font-display font-black text-xs tracking-widest uppercase transition-colors"
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
