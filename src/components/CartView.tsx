import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft, Plus, Minus, MessageCircle, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartView() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeItem } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => {
      const price = item.product.salePrice || item.product.price;
      return acc + price * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const delivery = subtotal > 0 ? 0 : 0; // Free delivery as per banner
  const total = Math.max(0, subtotal - discount + delivery);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'STREET20') {
      setDiscount(200);
      setPromoApplied(true);
    } else {
      setPromoError('INVALID PROMO CODE. TRY "STREET20"');
    }
  };

  return (
    <div className="bg-white min-h-screen text-street-black font-sans py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-left border-b border-zinc-200 pb-6 mb-8">
          <span className="font-mono text-xs font-bold text-street-red uppercase tracking-widest">YOUR STREET BAG</span>
          <h1 className="font-display text-4xl font-black uppercase tracking-tight text-street-black">
            SHOPPING CART
          </h1>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: Items List (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {cart.map((item, idx) => {
                const itemPrice = item.product.salePrice || item.product.price;
                return (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                    className="flex bg-white border border-zinc-200 p-4 relative"
                  >
                    {/* Item Image */}
                    <div className="w-20 sm:w-24 aspect-[3/4] bg-zinc-100 border border-zinc-200 overflow-hidden shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>

                    {/* Details */}
                    <div className="ml-4 flex-1 flex flex-col justify-between text-left">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display font-black text-sm uppercase tracking-tight text-street-black leading-tight">
                            {item.product.name}
                          </h3>
                          <button
                            id={`remove-cart-item-${idx}`}
                            onClick={() => removeItem(idx)}
                            className="p-1 text-zinc-400 hover:text-street-red transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Specs row */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] text-zinc-400 mt-1 uppercase">
                          <p>Size: <span className="text-street-black font-bold">{item.selectedSize}</span></p>
                          <p>Color: <span className="text-street-black font-bold">{item.selectedColor}</span></p>
                          <p>GSM: <span className="text-zinc-600 font-bold">240</span></p>
                        </div>
                      </div>

                      {/* Quantity Selector and Price */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-100">
                        {/* Selector */}
                        <div className="flex items-center border border-zinc-200 bg-zinc-50">
                          <button
                            id={`qty-minus-${idx}`}
                            disabled={item.quantity <= 1}
                            onClick={() => updateQuantity(idx, item.quantity - 1)}
                            className="p-1.5 hover:bg-zinc-200 disabled:opacity-50 transition-colors"
                          >
                            <Minus className="h-3 w-3 text-street-black" />
                          </button>
                          <span className="px-3 font-mono text-xs font-bold text-street-black">{item.quantity}</span>
                          <button
                            id={`qty-plus-${idx}`}
                            onClick={() => updateQuantity(idx, item.quantity + 1)}
                            className="p-1.5 hover:bg-zinc-200 transition-colors"
                          >
                            <Plus className="h-3 w-3 text-street-black" />
                          </button>
                        </div>

                        {/* Total Price */}
                        <div className="text-right">
                          <span className="font-mono text-sm font-black text-street-black">
                            ₹{itemPrice * item.quantity}
                          </span>
                          {item.quantity > 1 && (
                            <span className="block font-mono text-[10px] text-zinc-400">
                              ₹{itemPrice} each
                            </span>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}

              {/* Continue shopping btn */}
              <button
                id="cart-continue-shopping-btn"
                onClick={() => navigate('/shop')}
                className="flex items-center space-x-2 text-zinc-500 hover:text-street-black font-mono text-xs uppercase tracking-widest pt-4"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>CONTINUE EXPLORING</span>
              </button>
            </div>

            {/* RIGHT: Price summary (5 cols) */}
            <div className="lg:col-span-5 bg-zinc-50 border border-zinc-200 p-6 space-y-6 text-left">
              <h3 className="font-display font-black text-sm uppercase tracking-widest text-street-black pb-3 border-b border-zinc-200">
                ORDER VALUE SUMMARY
              </h3>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">PROMO COUPON</label>
                <div className="flex space-x-2">
                  <input
                    id="promo-code-input"
                    type="text"
                    placeholder="e.g. STREET20"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                    className="flex-1 bg-white border border-zinc-200 focus:border-street-black py-2 px-3 text-xs font-mono uppercase focus:outline-none placeholder-zinc-400 disabled:bg-zinc-100 disabled:text-zinc-400"
                  />
                  <button
                    id="apply-promo-btn"
                    type="submit"
                    disabled={promoApplied}
                    className="bg-street-black text-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest disabled:opacity-50 hover:bg-street-red transition-colors"
                  >
                    APPLY
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-emerald-600 font-mono text-[10px] font-bold">✓ STREET20 APPLIED: ₹200 DISCOUNT RECEIVED!</p>
                )}
                {promoError && (
                  <p className="text-street-red font-mono text-[10px] font-bold">✗ {promoError}</p>
                )}
              </form>

              {/* Price Calculations */}
              <div className="space-y-2.5 font-mono text-xs border-t border-b border-zinc-200/60 py-4">
                <div className="flex justify-between">
                  <span className="text-zinc-500">BAG SUBTOTAL:</span>
                  <span className="text-street-black font-bold">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-street-red">
                    <span>COUPON DISCOUNT:</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-zinc-500">SHIPPING FEE:</span>
                  <span className="text-emerald-600 font-bold uppercase">FREE SHIPPING (COD & ON)</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex justify-between items-baseline pt-2">
                <span className="font-display font-black text-sm uppercase text-street-black">NET TOTAL DUE:</span>
                <span className="font-mono text-xl font-black text-street-black">₹{total}</span>
              </div>

              {/* Action Proceed */}
              <div className="space-y-3 pt-2">
                <button
                  id="cart-checkout-proceed-btn"
                  onClick={() => navigate('/checkout')}
                  className="group w-full bg-street-black hover:bg-street-red text-white font-display font-bold py-4 tracking-widest uppercase flex items-center justify-center space-x-2 transition-all duration-300"
                >
                  <CreditCard className="h-4.5 w-4.5" />
                  <span>PROCEED TO SECURE PAY</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Direct WhatsApp Ordering Alternative */}
                <a
                  id="cart-whatsapp-proceed-btn"
                  href={`https://wa.me/919196294654?text=Hi%20TeeCode!%20I%20want%20to%20order%20the%20following%20streetwear%20T-shirts%20directly:%20${encodeURIComponent(
                    cart.map(item => `${item.product.name} (Size: ${item.selectedSize}, Color: ${item.selectedColor}, Qty: ${item.quantity})`).join(', ')
                  )}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold py-3.5 uppercase tracking-wider transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>ORDER DIRECTLY VIA WHATSAPP</span>
                </a>
              </div>

            </div>

          </div>
        ) : (
          <div className="text-center py-24 bg-zinc-50 border border-zinc-200 rounded-none max-w-md mx-auto">
            <ShoppingBag className="h-10 w-10 text-zinc-300 mx-auto mb-4" />
            <h3 className="font-display font-bold uppercase tracking-wider text-sm">YOUR BAG IS EMPTY</h3>
            <p className="text-xs text-zinc-500 font-mono mt-2 px-6">
              Looks like you haven&apos;t added any premium oversized streetwear to your cart yet.
            </p>
            <button
              id="empty-cart-back-shop-btn"
              onClick={() => navigate('/shop')}
              className="mt-6 bg-street-black hover:bg-street-red text-white font-mono text-xs font-bold uppercase tracking-widest py-3 px-6 transition-colors"
            >
              SHOP NEW ARRIVALS
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
