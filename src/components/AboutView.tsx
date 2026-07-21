import { Sparkles, Heart, Shield, Shirt, CheckCircle2, Star, UserCheck } from 'lucide-react';

export default function AboutView() {
  return (
    <div className="bg-white min-h-screen text-street-black font-sans py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-left border-b border-zinc-200 pb-6 mb-10">
          <span className="font-mono text-xs font-bold text-street-red uppercase tracking-widest">ABOUT US</span>
          <h1 className="font-display text-4xl font-black uppercase tracking-tight text-street-black">
            OUR STORY
          </h1>
          <p className="text-zinc-500 font-mono text-xs mt-1">
            Welcome to <strong className="text-street-black">TEECODE</strong>, where creativity meets comfort.
          </p>
        </div>

        {/* Brand Mission Section */}
        <div className="space-y-12 text-left">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 space-y-5">
              <h3 className="font-display text-2xl font-black uppercase text-street-black leading-tight">
                WEAR YOUR IDENTITY.<br />DEFINE YOUR STYLE.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-sans">
                At <strong className="text-street-black font-semibold">TEECODE</strong>, we believe fashion is more than just clothing—it's a reflection of your personality. Our mission is to create premium-quality T-shirts that combine modern style, exceptional comfort, and long-lasting durability.
              </p>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-sans">
                Inspired by streetwear culture, anime-inspired art, gothic aesthetics, minimalism, vintage graphics, and contemporary fashion trends, every TEECODE design is crafted to help you stand out with confidence. We focus on original artwork, premium fabrics, and attention to every detail, ensuring each T-shirt feels as good as it looks.
              </p>
            </div>
            
            <div className="md:col-span-5 bg-zinc-100 aspect-square border border-zinc-200 overflow-hidden relative group">
              <img
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop"
                alt="About TeeCode models"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-street-red/10 mix-blend-multiply"></div>
            </div>
          </div>

          {/* What We Offer Section */}
          <div className="border-t border-zinc-200 pt-10 mt-8">
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="h-5 w-5 text-street-red" />
              <h3 className="font-display text-lg font-black uppercase tracking-wider text-street-black">WHAT WE OFFER</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-zinc-50 border border-zinc-200 p-5 space-y-2">
                <div className="h-8 w-8 bg-street-black text-white flex items-center justify-center rounded-none mb-1">
                  <Shirt className="h-4 w-4" />
                </div>
                <h4 className="font-display font-bold uppercase text-xs tracking-wider text-street-black">Premium Fits</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Premium oversized and regular-fit T-shirts designed for the perfect streetwear drape.
                </p>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 p-5 space-y-2">
                <div className="h-8 w-8 bg-street-black text-white flex items-center justify-center rounded-none mb-1">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <h4 className="font-display font-bold uppercase text-xs tracking-wider text-street-black">Quality Fabrics</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Soft, breathable, and durable fabrics that keep their form and texture wash after wash.
                </p>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 p-5 space-y-2">
                <div className="h-8 w-8 bg-street-black text-white flex items-center justify-center rounded-none mb-1">
                  <Star className="h-4 w-4" />
                </div>
                <h4 className="font-display font-bold uppercase text-xs tracking-wider text-street-black">Long-Lasting Prints</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  High-quality, durable screen and high-density printing techniques built for everyday wear.
                </p>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 p-5 space-y-2">
                <div className="h-8 w-8 bg-street-black text-white flex items-center justify-center rounded-none mb-1">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h4 className="font-display font-bold uppercase text-xs tracking-wider text-street-black">Trend-Inspired</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Original, contemporary graphics merging pop-culture, retro vibes, and cyber designs.
                </p>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 p-5 space-y-2">
                <div className="h-8 w-8 bg-street-black text-white flex items-center justify-center rounded-none mb-1">
                  <Heart className="h-4 w-4" />
                </div>
                <h4 className="font-display font-bold uppercase text-xs tracking-wider text-street-black">Everyday Comfort</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Engineered with comfortable, unisex fits ready for whatever your day brings.
                </p>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 p-5 space-y-2">
                <div className="h-8 w-8 bg-street-black text-white flex items-center justify-center rounded-none mb-1">
                  <Shield className="h-4 w-4" />
                </div>
                <h4 className="font-display font-bold uppercase text-xs tracking-wider text-street-black">Secure Support</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Secure online shopping experience with prompt, reliable, and dedicated customer support.
                </p>
              </div>
            </div>
          </div>

          {/* Our Promise Section */}
          <div className="border-t border-zinc-200 pt-10">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-5 w-5 text-street-red" />
              <h3 className="font-display text-lg font-black uppercase tracking-wider text-street-black">OUR PROMISE</h3>
            </div>
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-sans">
                Every product is carefully designed with quality and comfort in mind. From selecting premium materials to ensuring excellent print quality and finishing, we strive to deliver T-shirts you'll love to wear again and again.
              </p>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-sans">
                Whether you're into bold streetwear, minimalist fashion, gothic vibes, or artistic graphics, TEECODE offers styles that let you express yourself without saying a word.
              </p>
            </div>
          </div>

          {/* Community Thank You / Manifesto Banner */}
          <div className="bg-street-black text-white p-8 border border-zinc-800 text-center space-y-4">
            <span className="font-mono text-xs font-bold text-street-red uppercase tracking-widest">JOIN THE COMMUNITY</span>
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight max-w-xl mx-auto leading-tight">
              &ldquo;WEAR YOUR IDENTITY. DEFINE YOUR STYLE.&rdquo;
            </h3>
            <p className="text-xs text-zinc-400 font-sans max-w-lg mx-auto">
              Thank you for being part of the TEECODE community. We're here to help you wear your individuality with confidence.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
