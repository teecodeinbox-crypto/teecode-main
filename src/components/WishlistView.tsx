import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Trash2, Eye, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function WishlistView() {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleQuickAdd = (product: any) => {
    addToCart(product, 'M', product.colors[0]?.name || 'Black');
  };

  return (
    <div className="bg-white min-h-screen text-street-black font-sans py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-left border-b border-zinc-200 pb-6 mb-8">
          <span className="font-mono text-xs font-bold text-street-red uppercase tracking-widest">YOUR SAVED DROPS</span>
          <h1 className="font-display text-4xl font-black uppercase tracking-tight text-street-black">
            MY WISHLIST
          </h1>
          <p className="text-zinc-500 font-mono text-xs mt-1">
            {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved
          </p>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((product) => {
              const currentPrice = product.salePrice || product.price;
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="group bg-white border border-zinc-200 overflow-hidden relative cursor-pointer flex flex-col justify-between hover:border-street-black transition-colors"
                  onClick={() => navigate(`/shop/${product.id}`)}
                >
                  {/* Tag */}
                  {product.tag && (
                    <span className="absolute top-3 left-3 bg-street-black text-white text-[9px] font-mono font-bold px-2 py-0.5 z-10 tracking-wider uppercase border border-zinc-800">
                      {product.tag}
                    </span>
                  )}

                  {/* Wishlist remove button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className="absolute top-3 right-3 z-10 bg-white/90 border border-zinc-200 p-1.5 hover:bg-rose-50 hover:border-street-red transition-colors"
                    title="Remove from wishlist"
                  >
                    <Heart className="h-4 w-4 text-street-red fill-street-red" />
                  </button>

                  {/* Image */}
                  <div className="aspect-[3/4] bg-zinc-100 overflow-hidden relative border-b border-zinc-100">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Details */}
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

                    <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-zinc-500">
                      <span className="bg-zinc-100 px-1.5 py-0.5">UNISEX</span>
                      <span className="bg-zinc-100 px-1.5 py-0.5">{product.fitType.toUpperCase()} FIT</span>
                    </div>

                    {/* Action CTAs */}
                    <div className="pt-3 grid grid-cols-2 gap-2 border-t border-zinc-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickAdd(product);
                        }}
                        className="w-full bg-street-black hover:bg-street-red text-white py-2 font-display font-black text-[10px] tracking-widest uppercase flex items-center justify-center space-x-1 transition-colors"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        <span>ADD TO BAG</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/shop/${product.id}`);
                        }}
                        className="w-full bg-zinc-100 hover:bg-zinc-200 text-street-black py-2 font-mono text-[9px] font-bold tracking-wider uppercase flex items-center justify-center space-x-1 border border-zinc-200 transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>VIEW DETAILS</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 bg-zinc-50 border border-zinc-200 max-w-md mx-auto">
            <Heart className="h-10 w-10 text-zinc-300 mx-auto mb-4" />
            <h3 className="font-display font-bold uppercase tracking-wider text-sm">YOUR WISHLIST IS EMPTY</h3>
            <p className="text-xs text-zinc-500 font-mono mt-2 px-6">
              Browse our collection and tap the heart icon to save your favorite streetwear drops.
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="mt-6 inline-flex items-center space-x-2 bg-street-black hover:bg-street-red text-white font-mono text-xs font-bold uppercase tracking-widest py-3 px-6 transition-colors"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
