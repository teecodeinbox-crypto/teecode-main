import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQView() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first item open by default

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-white min-h-screen text-street-black font-sans py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-left border-b border-zinc-200 pb-6 mb-10">
          <span className="font-mono text-xs font-bold text-street-red uppercase tracking-widest">HELP DESK</span>
          <h1 className="font-display text-4xl font-black uppercase tracking-tight text-street-black">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-zinc-500 font-mono text-xs mt-1">
            Find immediate answers regarding 240 GSM drops, sizing metrics, and WhatsApp concierge.
          </p>
        </div>

        {/* FAQs list */}
        <div className="space-y-4 text-left">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-zinc-200 hover:border-street-black transition-colors bg-zinc-50"
              >
                <button
                  id={`faq-btn-${idx}`}
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 flex items-center justify-between font-display font-bold text-sm tracking-wider uppercase text-street-black text-left"
                >
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="h-4.5 w-4.5 text-street-red shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-zinc-500 shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-zinc-500 shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 border-t border-zinc-200 font-mono text-xs text-zinc-600 leading-relaxed bg-white">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support Call-Out */}
        <div className="bg-zinc-950 text-white p-8 mt-12 bg-grid-pattern border border-zinc-800 text-center space-y-4">
          <span className="font-mono text-xs font-bold text-street-red uppercase tracking-widest">CONCIERGE HOTLINE</span>
          <h3 className="font-display text-2xl font-black uppercase tracking-tight">STILL HAVE QUESTIONS?</h3>
          <p className="font-mono text-xs text-zinc-400 max-w-md mx-auto">
            Connect directly with TeeCode human support over WhatsApp to clarify size queries, shipping timelines, or customize print options.
          </p>
          <div className="pt-2">
            <a
              id="faq-whatsapp-btn"
              href="https://wa.me/919196294654?text=Hi%20TeeCode!%20I%20have%20a%20few%20questions%20regarding%20the%20sizing%20or%20delivery."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>CHAT WITH TEECODE SUPPORT</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
