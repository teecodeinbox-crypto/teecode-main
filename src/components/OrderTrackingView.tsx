import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, AlertCircle } from 'lucide-react';
import { apiUrl } from '../lib/api';

interface OrderData {
  id: string;
  customerName: string;
  phone: string;
  status: string;
  total: number;
  paymentMethod: string;
  createdAt: string;
  items: { name: string; size: string; color: string; quantity: number; price: number }[];
}

const STATUS_STEPS = [
  { key: 'PENDING', label: 'Order Placed', icon: Clock, description: 'Your order has been received and is being processed.' },
  { key: 'DISPATCHED', label: 'Dispatched', icon: Package, description: 'Your order has been dispatched from our warehouse.' },
  { key: 'IN_TRANSIT', label: 'In Transit', icon: Truck, description: 'Your order is on its way via Delhivery Express.' },
  { key: 'DELIVERED', label: 'Delivered', icon: CheckCircle, description: 'Your order has been delivered successfully!' },
];

export default function OrderTrackingView() {
  const [searchParams] = useSearchParams();
  const initialOrderId = searchParams.get('id') || '';

  const [orderId, setOrderId] = useState(initialOrderId);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const response = await fetch(apiUrl(`/orders/${encodeURIComponent(orderId.trim())}`));
      if (!response.ok) {
        throw new Error('Order not found.');
      }
      const data = await response.json();
      if (data.success && data.order) {
        setOrder(data.order);
      } else {
        throw new Error('Order not found.');
      }
    } catch (err) {
      setError('Order not found. Please check your Order ID and try again.');
      setOrder(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIndex = (status: string) => {
    return STATUS_STEPS.findIndex((s) => s.key === status);
  };

  const currentStepIndex = order ? getStatusIndex(order.status) : -1;

  return (
    <div className="bg-white min-h-screen text-street-black font-sans py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-left border-b border-zinc-200 pb-6 mb-8">
          <span className="font-mono text-xs font-bold text-street-red uppercase tracking-widest">REAL-TIME TRACKER</span>
          <h1 className="font-display text-4xl font-black uppercase tracking-tight text-street-black">
            TRACK YOUR ORDER
          </h1>
          <p className="text-zinc-500 font-mono text-xs mt-1">
            Enter your TeeCode Order ID (e.g. TC-123456) to check the delivery status.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleTrackOrder} className="flex space-x-3 mb-10">
          <div className="relative flex-1">
            <input
              id="track-order-input"
              type="text"
              placeholder="Enter Order ID (e.g. TC-123456)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-street-black py-3 pl-10 pr-4 text-sm font-mono focus:outline-none placeholder-zinc-400"
            />
            <Search className="h-4 w-4 absolute left-3.5 top-4 text-zinc-400" />
          </div>
          <button
            id="track-order-submit"
            type="submit"
            disabled={isLoading}
            className="bg-street-black hover:bg-street-red text-white px-6 py-3 font-display font-bold text-xs tracking-widest uppercase transition-colors disabled:opacity-50"
          >
            {isLoading ? 'SEARCHING...' : 'TRACK'}
          </button>
        </form>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-rose-50 border border-rose-200 p-4 flex items-start space-x-3"
          >
            <AlertCircle className="h-5 w-5 text-street-red shrink-0 mt-0.5" />
            <div className="font-mono text-xs text-street-red">
              <p className="font-bold uppercase">ORDER NOT FOUND</p>
              <p className="mt-1 text-zinc-500">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Order Result */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Order Header */}
            <div className="bg-zinc-50 border border-zinc-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">ORDER ID</span>
                  <h2 className="font-display text-xl font-black text-street-black uppercase">{order.id}</h2>
                </div>
                <div className={`px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest border ${
                  order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                  order.status === 'CANCELLED' ? 'bg-rose-50 text-street-red border-rose-200' :
                  'bg-amber-50 text-amber-600 border-amber-200'
                }`}>
                  {order.status}
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-zinc-200 font-mono text-[11px]">
                <div>
                  <span className="text-zinc-400 uppercase block">Customer</span>
                  <span className="text-street-black font-bold">{order.customerName}</span>
                </div>
                <div>
                  <span className="text-zinc-400 uppercase block">Total</span>
                  <span className="text-street-black font-bold">₹{order.total}</span>
                </div>
                <div>
                  <span className="text-zinc-400 uppercase block">Payment</span>
                  <span className="text-street-black font-bold uppercase">{order.paymentMethod}</span>
                </div>
                <div>
                  <span className="text-zinc-400 uppercase block">Placed</span>
                  <span className="text-street-black font-bold">{new Date(order.createdAt).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="bg-white border border-zinc-200 p-6">
              <h3 className="font-display font-black text-sm uppercase tracking-widest text-street-black pb-4 border-b border-zinc-200 mb-6">
                DELIVERY TIMELINE
              </h3>

              <div className="space-y-0">
                {STATUS_STEPS.map((step, idx) => {
                  const isCompleted = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;
                  const StepIcon = step.icon;

                  return (
                    <div key={step.key} className="flex items-start relative">
                      {/* Vertical line */}
                      {idx < STATUS_STEPS.length - 1 && (
                        <div className={`absolute left-5 top-10 w-0.5 h-12 ${
                          idx < currentStepIndex ? 'bg-emerald-500' : 'bg-zinc-200'
                        }`} />
                      )}

                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${
                        isCompleted
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'bg-white border-zinc-200 text-zinc-400'
                      }`}>
                        <StepIcon className="h-4 w-4" />
                      </div>

                      {/* Text */}
                      <div className={`ml-4 pb-8 ${isCurrent ? '' : ''}`}>
                        <h4 className={`font-display font-bold text-sm uppercase tracking-wider ${
                          isCompleted ? 'text-street-black' : 'text-zinc-400'
                        }`}>
                          {step.label}
                        </h4>
                        <p className={`font-mono text-[11px] mt-1 ${
                          isCompleted ? 'text-zinc-500' : 'text-zinc-300'
                        }`}>
                          {step.description}
                        </p>
                        {isCurrent && (
                          <span className="inline-block mt-2 bg-emerald-50 text-emerald-600 font-mono text-[9px] font-bold px-2 py-0.5 border border-emerald-200 uppercase tracking-widest">
                            ● CURRENT STATUS
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items */}
            {order.items && order.items.length > 0 && (
              <div className="bg-zinc-50 border border-zinc-200 p-6">
                <h3 className="font-display font-black text-sm uppercase tracking-widest text-street-black pb-3 border-b border-zinc-200 mb-4">
                  ITEMS IN THIS ORDER
                </h3>
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center font-mono text-xs pb-2 border-b border-zinc-200/50">
                      <div>
                        <p className="font-bold text-street-black uppercase">{item.name}</p>
                        <p className="text-[10px] text-zinc-400 mt-0.5">SIZE: {item.size} / COLOR: {item.color} / QTY: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-street-black">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WhatsApp Support */}
            <a
              href={`https://wa.me/919196294654?text=Hi%20TeeCode!%20I%20need%20an%20update%20on%20my%20order%20${order.id}.`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold py-3.5 uppercase tracking-wider transition-colors"
            >
              <MapPin className="h-4 w-4" />
              <span>CONTACT SUPPORT ON WHATSAPP</span>
            </a>
          </motion.div>
        )}

        {/* Empty state if no search yet */}
        {!order && !error && !hasSearched && (
          <div className="text-center py-16 bg-zinc-50 border border-zinc-200 max-w-md mx-auto">
            <Package className="h-10 w-10 text-zinc-300 mx-auto mb-4" />
            <h3 className="font-display font-bold uppercase tracking-wider text-sm">ENTER YOUR ORDER ID</h3>
            <p className="text-xs text-zinc-500 font-mono mt-2 px-6">
              Your Order ID was sent via WhatsApp after placing your order. It starts with "TC-".
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
