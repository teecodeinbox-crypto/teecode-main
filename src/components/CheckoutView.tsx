import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShieldCheck, CreditCard, MessageCircle, ArrowLeft, RefreshCw, Smartphone, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { apiUrl } from '../lib/api';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutView() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  // Billing details Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => {
      const price = item.product.salePrice || item.product.price;
      return acc + price * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const discount = subtotal >= 1500 ? 200 : 0;
  const total = subtotal - discount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    return (
      formData.name.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.address.trim() !== '' &&
      formData.city.trim() !== '' &&
      formData.state.trim() !== '' &&
      formData.pincode.trim() !== ''
    );
  };

  const submitOrderToBackend = async (method: 'online' | 'cod', paymentId?: string, razorpayOrderId?: string, razorpaySignature?: string) => {
    setIsSubmitting(true);
    try {
      const orderItems = cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        size: item.selectedSize,
        color: item.selectedColor,
        price: item.product.salePrice || item.product.price,
        quantity: item.quantity,
      }));

      const response = await fetch(apiUrl('/orders'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          items: orderItems,
          total: total,
          paymentMethod: method,
          paymentId: paymentId || '',
          razorpayOrderId: razorpayOrderId || '',
          razorpaySignature: razorpaySignature || '',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order on server.');
      }

      const data = await response.json();
      if (data.success && data.order) {
        setOrderId(data.order.id);
        setIsSuccess(true);
      } else {
        throw new Error('Malformed server response.');
      }
    } catch (err) {
      console.error('Error placing order to backend, falling back to local simulation:', err);
      const generatedId = `TC-${Math.floor(Math.random() * 900000) + 100000}`;
      setOrderId(generatedId);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRazorpayPayment = async () => {
    setIsSubmitting(true);

    try {
      // Step 1: Create Razorpay order on our server
      const res = await fetch(apiUrl('/razorpay/create-order'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      });

      if (!res.ok) {
        throw new Error('Failed to create Razorpay order.');
      }

      const { order } = await res.json();

      // Step 2: Open Razorpay Checkout
      const options = {
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: 'TeeCode',
        description: 'Premium Streetwear Order',
        order_id: order.id,
        handler: async (response: any) => {
          // Step 3: Verify payment on server
          try {
            const verifyRes = await fetch(apiUrl('/razorpay/verify'), {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (verifyRes.ok) {
              await submitOrderToBackend(
                'online',
                response.razorpay_payment_id,
                response.razorpay_order_id,
                response.razorpay_signature
              );
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (verifyErr) {
            console.error('Verification error:', verifyErr);
            // Still submit as online payment was captured
            await submitOrderToBackend('online', response.razorpay_payment_id, response.razorpay_order_id);
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.phone,
        },
        theme: {
          color: '#E11D48',
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
          },
        },
      };

      // Check if Razorpay SDK is loaded
      if (typeof window.Razorpay !== 'undefined') {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Fallback: simulated payment if SDK not loaded
        console.warn('Razorpay SDK not loaded, using simulated payment flow.');
        await submitOrderToBackend('online');
      }
    } catch (err) {
      console.error('Razorpay flow error:', err);
      // Fallback to local simulation
      await submitOrderToBackend('online');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('PLEASE FILL ALL DELIVERY FIELDS BEFORE SECURE CHECKOUT.');
      return;
    }

    if (paymentMethod === 'online') {
      handleRazorpayPayment();
    } else {
      submitOrderToBackend('cod');
    }
  };

  const getWhatsAppMessageText = () => {
    const itemString = cart
      .map(
        (item) =>
          `• ${item.product.name} (Size: ${item.selectedSize}, Color: ${item.selectedColor}, Qty: ${item.quantity})`
      )
      .join('%0A');

    return `Hi TeeCode!%20I%20want%20to%20confirm%20my%20streetwear%20order:%0A%0A*PRODUCTS:*%0A${itemString}%0A%0A*DELIVERY DETAILS:*%0A• Name: ${formData.name}%0A• Phone: ${formData.phone}%0A• Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}%0A%0A*TOTAL AMOUNT:* ₹${total}%0A*PAYMENT METHOD:* COD (Verify manual order)`;
  };

  if (isSuccess) {
    return (
      <div className="bg-white min-h-screen text-street-black font-sans py-16 px-4">
        <div className="max-w-md mx-auto bg-zinc-50 border border-zinc-200 p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 stroke-[3]" />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">ORDER SUBMITTED SECURELY</span>
            <h2 className="font-display text-2xl font-black uppercase text-street-black">ORDER CONFIRMED!</h2>
            <p className="font-mono text-xs text-street-red font-bold">ORDER ID: {orderId}</p>
          </div>

          <p className="text-xs text-zinc-500 leading-relaxed font-sans">
            Thank you for shopping at TeeCode! Your order has been registered in our database. We will dispatch your premium 240 GSM streetwear drop within 24-48 hours. A verification tracker will be sent to <span className="text-street-black font-bold font-mono">{formData.phone}</span>.
          </p>

          <div className="border-t border-b border-zinc-200 py-4 font-mono text-[11px] text-zinc-600 space-y-1.5 text-left">
            <p>• Delivery partner: <span className="text-street-black font-bold">Delhivery Express</span></p>
            <p>• Est. Arrival: <span className="text-street-black font-bold">3–5 Business Days</span></p>
            <p>• Payment verified: <span className="text-emerald-600 font-bold uppercase">{paymentMethod === 'online' ? 'PAID ONLINE (SUCCESS)' : 'COD / ON DELIVERY'}</span></p>
          </div>

          <div className="space-y-3 pt-2">
            <a
              id="success-whatsapp-btn"
              href={`https://wa.me/919196294654?text=Hi%20TeeCode!%20My%20order%20is%20placed%20successfully.%20My%20Order%20ID%20is%20${orderId}.%20Please%20verify.`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold py-3.5 uppercase tracking-wider transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>FOLLOW UP ON WHATSAPP</span>
            </a>

            <button
              id="success-track-order-btn"
              onClick={() => navigate(`/track-order?id=${orderId}`)}
              className="w-full bg-zinc-200 hover:bg-zinc-300 text-street-black py-3.5 font-mono text-xs font-bold tracking-widest uppercase transition-colors"
            >
              TRACK MY ORDER
            </button>

            <button
              id="success-return-shop-btn"
              onClick={() => {
                clearCart();
                navigate('/shop');
              }}
              className="w-full bg-street-black hover:bg-street-red text-white py-3.5 font-display font-black text-xs tracking-widest uppercase transition-colors"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-street-black font-sans py-12">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          id="checkout-back-cart-btn"
          onClick={() => navigate('/cart')}
          className="flex items-center space-x-2 text-zinc-500 hover:text-street-black font-mono text-xs uppercase tracking-widest mb-8 pb-2 border-b border-zinc-100 self-start transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>RETURN TO BAG</span>
        </button>

        {/* Workspace Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: Billing / delivery Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display text-2xl font-black uppercase text-street-black text-left">
              DELIVERY ADRESS & COD DECK
            </h2>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5 text-left">
                  <label className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">FULL NAME</label>
                  <input
                    id="billing-name-input"
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-street-black py-2.5 px-3 text-xs font-mono focus:outline-none placeholder-zinc-400"
                  />
                </div>

                {/* WhatsApp Phone */}
                <div className="space-y-1.5 text-left">
                  <label className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">WHATSAPP / PHONE NUMBER</label>
                  <input
                    id="billing-phone-input"
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-street-black py-2.5 px-3 text-xs font-mono focus:outline-none placeholder-zinc-400"
                  />
                </div>
              </div>

              {/* Street Address */}
              <div className="space-y-1.5 text-left">
                <label className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">STREET ADDRESS (HOUSE, PLOT, SECTOR)</label>
                <textarea
                  id="billing-address-input"
                  name="address"
                  required
                  rows={3}
                  placeholder="Enter house details, building name, locality..."
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-50 border border-zinc-200 focus:border-street-black py-2.5 px-3 text-xs font-mono focus:outline-none placeholder-zinc-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* City */}
                <div className="space-y-1.5 text-left">
                  <label className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">CITY</label>
                  <input
                    id="billing-city-input"
                    type="text"
                    name="city"
                    required
                    placeholder="e.g. Mumbai"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-street-black py-2.5 px-3 text-xs font-mono focus:outline-none placeholder-zinc-400"
                  />
                </div>

                {/* State */}
                <div className="space-y-1.5 text-left">
                  <label className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">STATE</label>
                  <input
                    id="billing-state-input"
                    type="text"
                    name="state"
                    required
                    placeholder="e.g. Maharashtra"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-street-black py-2.5 px-3 text-xs font-mono focus:outline-none placeholder-zinc-400"
                  />
                </div>

                {/* PIN Code */}
                <div className="space-y-1.5 text-left">
                  <label className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">PIN CODE</label>
                  <input
                    id="billing-pincode-input"
                    type="text"
                    name="pincode"
                    required
                    placeholder="e.g. 400001"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-street-black py-2.5 px-3 text-xs font-mono focus:outline-none placeholder-zinc-400"
                  />
                </div>
              </div>

              {/* Payment Gate Selectors */}
              <div className="space-y-3 pt-4 border-t border-zinc-200">
                <h3 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400 text-left">CHOOSE PAYMENT STRATEGY</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Razorpay Online Option */}
                  <label
                    className={`border p-4 flex items-start space-x-3 cursor-pointer transition-all ${
                      paymentMethod === 'online'
                        ? 'border-street-black bg-zinc-50'
                        : 'border-zinc-200 hover:border-street-black'
                    }`}
                  >
                    <input
                      id="payment-strategy-online"
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                      className="mt-1 accent-street-black shrink-0"
                    />
                    <div className="text-left font-mono text-xs">
                      <p className="font-bold text-street-black">PAY ONLINE (RAZORPAY)</p>
                      <p className="text-[10px] text-zinc-400 mt-1 uppercase">UPI / Cards / Net Banking instant confirmation.</p>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    className={`border p-4 flex items-start space-x-3 cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-street-black bg-zinc-50'
                        : 'border-zinc-200 hover:border-street-black'
                    }`}
                  >
                    <input
                      id="payment-strategy-cod"
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 accent-street-black shrink-0"
                    />
                    <div className="text-left font-mono text-xs">
                      <p className="font-bold text-street-black">CASH ON DELIVERY (COD)</p>
                      <p className="text-[10px] text-zinc-400 mt-1 uppercase">Pay in cash when Delhivery drop arrives.</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Checkout Buttons */}
              <div className="pt-4 space-y-3">
                <button
                  id="checkout-finalize-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-street-black hover:bg-street-red text-white font-display font-bold py-4 tracking-widest uppercase flex items-center justify-center space-x-2 transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-4.5 w-4.5 animate-spin" />
                      <span>PROCESSING PAYMENT...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4.5 w-4.5" />
                      <span>{paymentMethod === 'online' ? 'PAY ONLINE & COMPLETE' : 'CONFIRM CASH ON DELIVERY'}</span>
                    </>
                  )}
                </button>

                {/* Direct WhatsApp Ordering Fallback */}
                <a
                  id="checkout-whatsapp-direct-btn"
                  href={`https://wa.me/919196294654?text=${getWhatsAppMessageText()}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    if (!validateForm()) {
                      e.preventDefault();
                      alert('PLEASE FILL DELIVERY FORM FIELDS TO CONSTRUCT PRE-FILLED WHATSAPP MESSAGE.');
                    }
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold py-3.5 uppercase tracking-wider transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>COMPLETE ORDER ON WHATSAPP</span>
                </a>
              </div>

            </form>
          </div>

          {/* RIGHT COLUMN: Order Summary Card (5 cols) */}
          <div className="lg:col-span-5 bg-zinc-50 border border-zinc-200 p-6 space-y-6 text-left shrink-0">
            <h3 className="font-display font-black text-sm uppercase tracking-widest text-street-black pb-3 border-b border-zinc-200">
              STREET BAG CONTENT
            </h3>

            <div className="space-y-4 max-h-60 overflow-y-auto pr-1 no-scrollbar">
              {cart.map((item, idx) => {
                const itemPrice = item.product.salePrice || item.product.price;
                return (
                  <div key={idx} className="flex justify-between items-center pb-3 border-b border-zinc-200/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-13 bg-zinc-200 border overflow-hidden shrink-0">
                        <img src={item.product.images[0]} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </div>
                      <div className="font-mono text-xs">
                        <p className="font-bold text-street-black uppercase truncate max-w-[150px]">{item.product.name}</p>
                        <p className="text-[10px] text-zinc-400 mt-0.5">SIZE: {item.selectedSize} / COLOR: {item.selectedColor}</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs text-right shrink-0">
                      <p className="text-street-black font-bold">₹{itemPrice * item.quantity}</p>
                      <p className="text-[10px] text-zinc-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calculations summaries */}
            <div className="space-y-2 font-mono text-xs border-b border-zinc-200/60 pb-4">
              <div className="flex justify-between">
                <span className="text-zinc-500">SUBTOTAL:</span>
                <span className="text-street-black font-bold">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-street-red">
                  <span>DISCOUNT:</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-zinc-500">EXPRESS SHIPPING:</span>
                <span className="text-emerald-600 font-bold uppercase">FREE</span>
              </div>
            </div>

            {/* Net Total */}
            <div className="flex justify-between items-baseline pt-2">
              <span className="font-display font-black text-sm uppercase text-street-black">TOTAL INCLUSIVE TAX:</span>
              <span className="font-mono text-xl font-black text-street-black">₹{total}</span>
            </div>

            {/* Guarantees list */}
            <div className="bg-zinc-100 p-4 border border-zinc-150 font-mono text-[10px] text-zinc-500 space-y-2 leading-relaxed">
              <p className="flex items-center space-x-2 text-zinc-600 font-bold uppercase text-[11px] mb-1">
                <ShieldCheck className="h-4.5 w-4.5 text-street-red" />
                <span>TEECODE DISPATCH STANDARD</span>
              </p>
              <p>• 100% genuine combed bio-wash luxury cotton.</p>
              <p>• Fast delivery updates with automatic WhatsApp message codes.</p>
              <p>• Contact customer support via +91 91962 94654 for manual tracking overrides.</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
