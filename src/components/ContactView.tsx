import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, Check } from 'lucide-react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderId: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', orderId: '', message: '' });
    }, 4000);
  };

  return (
    <div className="bg-white min-h-screen text-street-black font-sans py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-left border-b border-zinc-200 pb-6 mb-10">
          <span className="font-mono text-xs font-bold text-street-red uppercase tracking-widest">GET IN TOUCH</span>
          <h1 className="font-display text-4xl font-black uppercase tracking-tight text-street-black">
            CONTACT TEECODE
          </h1>
          <p className="text-zinc-500 font-mono text-xs mt-1">
            Connect directly with the street crew. We resolve tracking issues, size swaps, or design customizations.
          </p>
        </div>

        {/* Content Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Contact Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            <div className="space-y-4">
              <h3 className="font-display font-black text-xl uppercase tracking-tight text-street-black">COMMUNICATION LINES</h3>
              <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                TeeCode runs a fast-response desk. Click any line below to connect instantly. Standard turnaround for email is under 12 hours.
              </p>
            </div>

            {/* Coordinates Cards */}
            <div className="space-y-4 font-mono text-xs text-zinc-600">
              
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/919196294654"
                target="_blank"
                rel="noreferrer"
                className="flex items-start space-x-4 p-4 border border-zinc-200 hover:border-street-black hover:bg-zinc-50 transition-all block text-left"
              >
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-none shrink-0 border border-emerald-200">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-black text-xs text-street-black uppercase tracking-wider">WHATSAPP Support</h4>
                  <p className="mt-1 font-bold text-street-black">+91 91962 94654</p>
                  <p className="text-[10px] text-zinc-400 mt-1 uppercase">Recommended for instant tracking verification.</p>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:support@teecode.store"
                className="flex items-start space-x-4 p-4 border border-zinc-200 hover:border-street-black hover:bg-zinc-50 transition-all block text-left"
              >
                <div className="p-3 bg-rose-50 text-street-red rounded-none shrink-0 border border-rose-200">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-black text-xs text-street-black uppercase tracking-wider">EMAIL CORRESPONDENCE</h4>
                  <p className="mt-1 font-bold text-street-black">support@teecode.store</p>
                  <p className="text-[10px] text-zinc-400 mt-1 uppercase">For business queries or bulk orders deck.</p>
                </div>
              </a>

              {/* Headquarters Location */}
              <div className="flex items-start space-x-4 p-4 border border-zinc-200">
                <div className="p-3 bg-zinc-100 text-street-black rounded-none shrink-0 border border-zinc-200">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-black text-xs text-street-black uppercase tracking-wider">fulfillment headquarters</h4>
                  <p className="mt-1 font-bold text-street-black">TEECODE HUSTLE BLOCK</p>
                  <p className="text-[11px]">No. 24, Street Culture Lane, Indiranagar, Bangalore, KA, India - 560038</p>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT: Contact Us Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-50 border border-zinc-200 p-6 sm:p-8">
            <h3 className="font-display font-black text-lg uppercase text-street-black mb-6 text-left">
              SEND SECURE MESSAGE
            </h3>

            {submitted ? (
              <div className="bg-white border border-zinc-200 p-8 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="h-6 w-6 stroke-[3]" />
                </div>
                <h4 className="font-display font-bold text-base text-street-black uppercase">MESSAGE REGISTERED</h4>
                <p className="font-mono text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
                  We have logged your query. Our street representative will review your message and reply to your contact details within 12 hours. Thank you!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">YOUR NAME</label>
                    <input
                      id="contact-name-input"
                      type="text"
                      required
                      placeholder="e.g. Karan Malhotra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-zinc-200 focus:border-street-black py-2.5 px-3 text-xs font-mono focus:outline-none placeholder-zinc-400"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">EMAIL ADDRESS</label>
                    <input
                      id="contact-email-input"
                      type="email"
                      required
                      placeholder="e.g. karan@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-zinc-200 focus:border-street-black py-2.5 px-3 text-xs font-mono focus:outline-none placeholder-zinc-400"
                    />
                  </div>
                </div>

                {/* Optional Order ID */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">ORDER ID (OPTIONAL)</label>
                  <input
                    id="contact-order-id-input"
                    type="text"
                    placeholder="e.g. TC-123456"
                    value={formData.orderId}
                    onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                    className="w-full bg-white border border-zinc-200 focus:border-street-black py-2.5 px-3 text-xs font-mono focus:outline-none placeholder-zinc-400"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">MESSAGE CONTENT</label>
                  <textarea
                    id="contact-message-input"
                    required
                    rows={4}
                    placeholder="Enter your tracking query or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-zinc-200 focus:border-street-black py-2.5 px-3 text-xs font-mono focus:outline-none placeholder-zinc-400 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="w-full bg-street-black hover:bg-street-red text-white font-display font-bold py-4 tracking-widest uppercase flex items-center justify-center space-x-2.5 transition-all duration-300"
                >
                  <Send className="h-4 w-4" />
                  <span>SEND CREW MESSAGE</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
