import { Truck, ShieldCheck, RefreshCw, MessageCircle } from 'lucide-react';

export default function PolicyView() {
  return (
    <div className="bg-white min-h-screen text-street-black font-sans py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-left border-b border-zinc-200 pb-6 mb-10">
          <span className="font-mono text-xs font-bold text-street-red uppercase tracking-widest">TRANSACTION ETHICS</span>
          <h1 className="font-display text-4xl font-black uppercase tracking-tight text-street-black">
            RETURN & SHIPPING POLICY
          </h1>
          <p className="text-zinc-500 font-mono text-xs mt-1">
            Read details about shipping durations, 7-day hassle-free exchanges, and security guarantees.
          </p>
        </div>

        {/* Content columns */}
        <div className="space-y-10 text-left">
          
          {/* Section 1: Shipping Policy */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 text-street-red">
              <Truck className="h-5 w-5" />
              <h3 className="font-display font-black text-lg uppercase text-street-black">SHIPPING & DISPATCH LOGISTICS</h3>
            </div>
            <div className="font-mono text-xs text-zinc-600 space-y-3 leading-relaxed">
              <p>
                • <span className="text-street-black font-bold">Free Shipping:</span> We offer 100% free shipping across all serviceable PIN codes in India. No minimum order limit is required. This applies to both pre-paid orders (Razorpay/UPI) and Cash-On-Delivery (COD).
              </p>
              <p>
                • <span className="text-street-black font-bold">Dispatch Timelines:</span> All products displayed are stocked in-house in our fulfillment centers. Orders are packed and dispatched within 24–48 hours of order confirmation.
              </p>
              <p>
                • <span className="text-street-black font-bold">Estimated Delivery:</span> Delivery usually takes 3–5 business days for major Tier-1 cities (Bangalore, Mumbai, Delhi, Chennai, Kolkata, Pune) and 5–7 business days for other regions. Tracking numbers are sent automatically via SMS and WhatsApp.
              </p>
            </div>
          </div>

          {/* Section 2: Returns & Exchanges Policy */}
          <div className="space-y-4 pt-4 border-t border-zinc-150">
            <div className="flex items-center space-x-2.5 text-street-red">
              <RefreshCw className="h-5 w-5" />
              <h3 className="font-display font-black text-lg uppercase text-street-black">7-DAY HASSLE-FREE EXCHANGES</h3>
            </div>
            <div className="font-mono text-xs text-zinc-600 space-y-3 leading-relaxed">
              <p>
                • <span className="text-street-black font-bold">Eligibility Period:</span> We offer a hassle-free exchange or replacement window within 7 days of order delivery. The items must be in original condition, unwashed, unworn, and with all paper tags and labels intact.
              </p>
              <p>
                • <span className="text-street-black font-bold">Process of Exchange:</span> If you ordered the wrong size or wish to swap for another graphic deck, click our WhatsApp support trigger. Our concierge team will schedule a reverse pickup at your doorstep. Once the reverse package passes inspection, your new product is dispatched instantly.
              </p>
              <p>
                • <span className="text-street-black font-bold">Cancellations & Refunds:</span> Orders can be cancelled anytime before dispatch. If pre-paid online, refunds are automatically settled back to your source account (Cards/UPI) within 3-5 business days of cancellation. If the product is delivered, we offer exchanges or store vouchers.
              </p>
            </div>
          </div>

          {/* Section 3: COD Ethics */}
          <div className="space-y-4 pt-4 border-t border-zinc-150">
            <div className="flex items-center space-x-2.5 text-street-red">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="font-display font-black text-lg uppercase text-street-black">CASH ON DELIVERY (COD) FAIR USE</h3>
            </div>
            <div className="font-mono text-xs text-zinc-600 space-y-3 leading-relaxed">
              <p>
                To maintain free shipping for the entire street culture community, we pay forward delivery charges. We kindly ask our customers to only place Cash-on-delivery orders if they intend to accept them.
              </p>
              <p>
                Please verify your delivery details and phone number before checkout. High cancellation ratios or fake addresses may lead to a block of your PIN code for future premium drops.
              </p>
            </div>
          </div>

          {/* WhatsApp Direct helper block */}
          <div className="bg-zinc-50 p-6 border border-zinc-200 mt-6 text-left space-y-3 font-mono text-xs">
            <p className="font-bold text-street-black uppercase flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse shrink-0" />
              <span>Need manual delivery verification?</span>
            </p>
            <p className="text-zinc-500 leading-relaxed">
              If your tracking number is silent or your pin code is flagged as non-serviceable by automatic tools, please contact us on WhatsApp immediately. We can manually book your order via alternative high-speed logistics (DTDC, SpeedPost).
            </p>
            <a
              id="policy-whatsapp-btn"
              href="https://wa.me/919196294654?text=Hi%20TeeCode!%20My%20PIN%20code%20is%20not%20displaying%20correctly.%20Can%20you%20help%20verify?"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase text-[10px] py-2 px-4 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>BOOK VIA WHATSAPP CONCIERGE</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
