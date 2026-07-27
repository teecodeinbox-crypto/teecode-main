import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Trash2 } from 'lucide-react';

import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ShopView from './components/ShopView';
import ProductDetailsView from './components/ProductDetailsView';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import SizeGuideView from './components/SizeGuideView';
import AboutView from './components/AboutView';
import FAQView from './components/FAQView';
import PolicyView from './components/PolicyView';
import ContactView from './components/ContactView';
import OrderTrackingView from './components/OrderTrackingView';
import WishlistView from './components/WishlistView';

import { PRODUCTS } from './data';

// Scroll to top on every route/search change
function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, search]);
  return null;
}

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, cartTotal, cartItemsCount, isCartOpen, setIsCartOpen, removeItem } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-white text-street-black font-sans selection:bg-street-red selection:text-white relative">
      
      {/* Scroll to top on navigation */}
      <ScrollToTop />

      {/* Header */}
      <Header />

      {/* Main Viewport Content with transition layouts */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomeView />} />
              <Route path="/shop" element={<ShopView />} />
              <Route path="/women/t-shirts" element={<ShopView />} />
              <Route path="/shop/:productId" element={<ProductDetailsView />} />
              <Route path="/cart" element={<CartView />} />
              <Route path="/checkout" element={<CheckoutView />} />
              <Route path="/about" element={<AboutView />} />
              <Route path="/size-guide" element={<SizeGuideView />} />
              <Route path="/faq" element={<FAQView />} />
              <Route path="/policies" element={<PolicyView />} />
              <Route path="/contact" element={<ContactView />} />
              <Route path="/track-order" element={<OrderTrackingView />} />
              <Route path="/wishlist" element={<WishlistView />} />
              {/* Fallback to home */}
              <Route path="*" element={<HomeView />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Right Hand Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-55"
            />

            {/* Sidebar drawer content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-white border-l border-zinc-200 p-6 z-55 flex flex-col justify-between shadow-2xl"
            >
              <div>
                {/* Header of Drawer */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="h-5 w-5 text-street-red" />
                    <span className="font-display text-sm font-black uppercase tracking-wider">YOUR BAG ({cartItemsCount})</span>
                  </div>
                  <button
                    id="close-cart-drawer-btn"
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 text-zinc-400 hover:text-street-black transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Items loop */}
                <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1 no-scrollbar text-left">
                  {cart.length > 0 ? (
                    cart.map((item, idx) => {
                      const price = item.product.salePrice || item.product.price;
                      return (
                        <div key={idx} className="flex bg-zinc-50 border border-zinc-200 p-3 relative">
                          <div className="w-16 aspect-[3/4] bg-zinc-200 overflow-hidden shrink-0">
                            <img src={item.product.images[0]} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                          </div>

                          <div className="ml-3 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start gap-1">
                                <h4 className="font-display font-black text-xs uppercase tracking-tight text-street-black truncate max-w-[170px]">{item.product.name}</h4>
                                <button
                                  id={`remove-drawer-item-${idx}`}
                                  onClick={() => removeItem(idx)}
                                  className="text-zinc-400 hover:text-street-red transition-colors"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              <p className="font-mono text-[9px] text-zinc-400 mt-0.5 uppercase">
                                SIZE: {item.selectedSize} / COLOR: {item.selectedColor}
                              </p>
                            </div>

                            <div className="flex justify-between items-center mt-2">
                              <span className="font-mono text-xs font-bold text-street-black">₹{price * item.quantity}</span>
                              <span className="font-mono text-[10px] text-zinc-400">Qty: {item.quantity}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-16 text-zinc-400 font-mono text-xs">
                      <ShoppingBag className="h-8 w-8 mx-auto mb-3 text-zinc-300" />
                      <p>Your streetwear bag is empty.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Subtotal and checkout controls */}
              <div className="border-t border-zinc-200 pt-5 space-y-4 text-left">
                <div className="flex justify-between items-baseline font-mono text-sm">
                  <span className="text-zinc-500 uppercase">SUBTOTAL (EX SHIPPING):</span>
                  <span className="font-black text-street-black font-display text-lg">₹{cartTotal}</span>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-2">
                  <button
                    id="drawer-view-bag-btn"
                    disabled={cart.length === 0}
                    onClick={() => {
                      navigate('/cart');
                      setIsCartOpen(false);
                    }}
                    className="w-full bg-street-black hover:bg-street-red text-white py-3.5 font-display font-black text-xs tracking-widest uppercase transition-colors disabled:opacity-50"
                  >
                    VIEW FULL BAG
                  </button>

                  <button
                    id="drawer-checkout-btn"
                    disabled={cart.length === 0}
                    onClick={() => {
                      navigate('/checkout');
                      setIsCartOpen(false);
                    }}
                    className="w-full bg-zinc-100 hover:bg-zinc-200 text-street-black py-3.5 font-mono text-xs font-bold tracking-wider uppercase transition-colors border border-zinc-200 disabled:opacity-50"
                  >
                    SECURE CHECKOUT
                  </button>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <AppLayout />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
