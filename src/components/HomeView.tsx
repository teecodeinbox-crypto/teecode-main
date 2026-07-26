import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ShoppingBag, Eye, Star, Check, Sparkles, MessageCircle, Heart, Instagram, Facebook, Volume2, VolumeX } from 'lucide-react';
import { PRODUCTS, LOOKBOOK, REVIEWS } from '../data';
import { Product } from '../types';

export default function HomeView() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };
  
  const getCategoryProducts = (cat: 'featured' | 'new' | 'bestseller') => {
    return PRODUCTS.filter(p => p.category === cat).slice(0, 3);
  };

  const featured = getCategoryProducts('featured');
  const newArrivals = getCategoryProducts('new');
  const bestSellers = getCategoryProducts('bestseller');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const titleContainerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1]
      } 
    }
  };

  const renderWords = (text: string, customClass: string = "") => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block mr-[0.2em] whitespace-nowrap">
        <motion.span
          variants={wordVariants}
          className={`inline-block ${customClass}`}
        >
          {word}
        </motion.span>
      </span>
    ));
  };

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">

      {/* 0. Video Hero Banner */}
      <section id="video-hero-section" className="relative bg-street-black overflow-hidden">
        {/* Text Above Video */}
        <div className="relative z-10 text-center pt-10 pb-6 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-display text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase text-white leading-tight"
          >
            Streetwear Tees Built for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-street-red to-red-400">
              Street Culture
            </span>
          </motion.h2>
        </div>

        {/* Video */}
        <div className="relative w-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto object-cover"
          >
            <source src="https://res.cloudinary.com/dtzyjynai/video/upload/v1783878656/Timeline_1_wjp0o0.mp4" type="video/mp4" />
          </video>
          {/* Subtle gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-street-black/60 via-transparent to-street-black/40 pointer-events-none"></div>
          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 z-20 bg-black/60 hover:bg-black/80 border border-zinc-600 hover:border-street-red text-white p-2.5 rounded-full backdrop-blur-sm transition-all duration-200"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>

        {/* Text Below Video */}
        <div className="relative z-10 text-center py-8 px-4 space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-white"
          >
            TEE<span className="text-street-red">CODE</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-mono text-xs sm:text-sm text-zinc-400 tracking-[0.3em] uppercase"
          >
            TEECODE.STORE
          </motion.p>
        </div>
      </section>
      
      {/* 1. Hero Section */}
      <section id="hero-section" aria-label="Hero Section" className="relative bg-street-black text-white min-h-[90vh] md:min-h-[85vh] flex items-center bg-grid-pattern overflow-hidden py-16">
        {/* Background glow effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-street-red/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-zinc-800/25 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-3.5 py-1 text-xs font-mono text-street-red uppercase tracking-widest rounded-full shadow-inner">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>THE 240 GSM DROP IS LIVE</span>
            </div>

            <motion.h1
              variants={titleContainerVariants}
              initial="hidden"
              animate="show"
              className="font-display text-4xl sm:text-6xl xl:text-7xl font-black tracking-tighter uppercase leading-[0.95] text-white"
            >
              {renderWords("WEAR THE CODE.")} <br />
              <span className="inline-block">
                {renderWords("OWN THE STREET.", "text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-street-red")}
              </span>
            </motion.h1>

            <p className="text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed font-sans">
              Premium oversized graphic T-shirts designed for creators, gamers, anime lovers, and streetwear enthusiasts. Crafted for comfort, built for everyday style.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                id="hero-shop-now-cta"
                onClick={() => navigate('/shop')}
                className="group flex items-center justify-center space-x-2.5 bg-white text-street-black font-display font-bold px-8 py-4 tracking-widest uppercase hover:bg-street-red hover:text-white transition-all duration-300 shadow-xl rounded-full"
              >
                <span>SHOP COLLECTION</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                id="hero-new-arrivals-cta"
                onClick={() => navigate('/shop?sort=newest')}
                className="flex items-center justify-center space-x-2 bg-zinc-900 border border-zinc-700 text-white hover:border-street-red hover:bg-zinc-800 px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest transition-all rounded-full"
              >
                <span>EXPLORE NEW ARRIVALS</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-zinc-900 font-mono text-left">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">240 GSM</h3>
                <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest">Ultra Heavyweight</p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">100%</h3>
                <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest">Organic Cotton</p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">4.9 ★</h3>
                <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest">10,000+ Reviews</p>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[380px] aspect-[3/4] bg-zinc-900 border-2 border-zinc-800 p-2 shadow-2xl rounded-2xl overflow-hidden group">
              <div className="absolute top-4 left-4 bg-street-red text-white text-[10px] font-mono px-2.5 py-1 z-10 tracking-widest uppercase font-bold rounded-md">
                LIMITED DROP
              </div>
              <img
                src="https://res.cloudinary.com/dtzyjynai/image/upload/v1783110775/6b74de01-cb81-40b9-b680-892ffead5342_plu2g1.png"
                alt="TeeCode Oversized Streetwear Model"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 rounded-xl"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-street-black/90 backdrop-blur-md text-white border border-zinc-700/80 p-4 font-display font-black text-xs uppercase tracking-tight shadow-xl flex items-center justify-between rounded-xl">
                <div>
                  <p className="text-white font-bold text-sm">CYBER ARCHIVE TEE</p>
                  <p className="text-zinc-400 font-mono text-[10px] tracking-widest">240 GSM HEAVYWEIGHT</p>
                </div>
                <span className="text-street-red font-mono text-base font-bold">₹799</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Promotional Banner Section */}
      <section aria-label="Promotional Offer" className="bg-gradient-to-r from-zinc-950 via-street-black to-zinc-950 py-10 border-y border-zinc-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-street-red/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1.5">
            <span className="inline-block bg-street-red text-white text-[10px] font-mono font-bold px-2.5 py-0.5 uppercase tracking-widest rounded-md">
              LIMITED-TIME OFFER
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight">
              GET UP TO <span className="text-street-red">30% OFF</span> ON SELECTED COLLECTIONS
            </h2>
            <p className="text-zinc-400 font-mono text-xs">
              Free express shipping across India on qualifying orders. Use code <span className="text-white font-bold border-b border-street-red">STREET30</span> at checkout.
            </p>
          </div>
          <button
            onClick={() => navigate('/shop?sort=sale')}
            className="shrink-0 bg-street-red hover:bg-red-600 text-white font-display font-bold px-8 py-3.5 tracking-widest uppercase text-xs transition-all shadow-lg hover:shadow-street-red/20 rounded-full"
          >
            CLAIM OFFER NOW
          </button>
        </div>
      </section>

      {/* 3. Feature Cards Grid */}
      <section aria-label="Feature Cards" className="bg-zinc-900 text-white py-16 border-b border-zinc-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-12">
            <span className="font-mono text-xs text-street-red uppercase tracking-widest font-bold">CRAFTED FOR THE STREETS</span>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              WHY CHOOSE TEECODE?
            </h2>
            <p className="text-zinc-400 font-mono text-xs max-w-xl mx-auto">
              Engineered with heavyweight organic fabrics, precision boxy silhouettes, and high-density street graphic prints.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Premium Heavyweight Cotton',
                desc: '240 GSM pre-shrunk, 100% combed organic cotton built for structure, durability, and a premium boxy drape.',
                icon: Check,
              },
              {
                title: 'Oversized Streetwear Fit',
                desc: 'Custom drop-shoulder tailoring designed to provide an effortless, high-fashion urban silhouette.',
                icon: Check,
              },
              {
                title: 'High-Quality Graphic Prints',
                desc: 'High-density screen and DTG prints engineered to resist cracking and fading over endless washes.',
                icon: Check,
              },
              {
                title: 'Comfortable All-Day Wear',
                desc: 'Breathable weave crafted for all-day comfort, active street movement, and humidity resistance.',
                icon: Check,
              },
              {
                title: 'Fast Shipping Across India',
                desc: 'Dispatched within 24-48 hours with real-time SMS & WhatsApp door-to-door tracking notifications.',
                icon: Check,
              },
              {
                title: 'Secure Checkout',
                desc: 'Encrypted pre-paid UPI, credit/debit cards, and hassle-free Cash On Delivery (COD) options.',
                icon: Check,
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="bg-zinc-950/80 border border-zinc-800 hover:border-street-red p-6 text-left space-y-3 rounded-xl transition-all shadow-md hover:shadow-xl hover:shadow-street-red/5 backdrop-blur-md"
              >
                <div className="w-9 h-9 rounded-full bg-street-red/10 border border-street-red/30 flex items-center justify-center text-street-red">
                  <feature.icon className="h-5 w-5 stroke-[2.5]" />
                </div>
                <h3 className="font-display font-black text-lg uppercase tracking-tight text-white">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 font-sans text-xs leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Trending Collections Grid */}
      <section aria-label="Trending Collections" className="bg-white py-16 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-12">
            <span className="font-mono text-xs text-street-red uppercase tracking-widest font-bold">CURATED CATEGORIES</span>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-street-black">
              TRENDING COLLECTIONS
            </h2>
            <p className="text-zinc-500 font-mono text-xs max-w-lg mx-auto">
              Explore specialized oversized graphic drops tailored for your personal street identity.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Anime Collection', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80', query: 'anime' },
              { name: 'Gothic Collection', image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&auto=format&fit=crop&q=80', query: 'gothic' },
              { name: 'Minimal Collection', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80', query: 'minimal' },
              { name: 'Oversized Essentials', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80', query: 'oversized' },
              { name: 'Graphic Tees', image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80', query: 'graphic' },
            ].map((col, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate(`/shop?category=${col.query}`)}
                className="group relative aspect-[3/4] bg-zinc-900 rounded-xl overflow-hidden cursor-pointer border border-zinc-200 shadow-md hover:shadow-xl"
              >
                <img
                  src={col.image}
                  alt={`TeeCode ${col.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-street-black via-street-black/40 to-transparent p-4 flex flex-col justify-end text-left">
                  <h3 className="font-display font-black text-sm sm:text-base text-white uppercase tracking-tight group-hover:text-street-red transition-colors">
                    {col.name}
                  </h3>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest flex items-center space-x-1 pt-1">
                    <span>EXPLORE DROP</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Customer Trust Section */}
      <section aria-label="Customer Trust" className="bg-zinc-50 py-12 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-zinc-200 rounded-2xl p-8 sm:p-12 shadow-sm text-center space-y-6">
            <div className="flex justify-center items-center space-x-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-500" />
              ))}
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-street-black">
              TRUSTED BY THOUSANDS OF STREETWEAR ENTHUSIASTS
            </h2>
            <p className="text-zinc-500 font-mono text-xs max-w-xl mx-auto leading-relaxed">
              Join 10,000+ creators, gamers, and streetwear lovers who trust TeeCode for heavyweight 240 GSM street apparel.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-zinc-150 font-mono text-xs">
              <div className="space-y-1">
                <span className="font-bold text-street-black block uppercase text-sm">PREMIUM QUALITY</span>
                <span className="text-zinc-500 text-[11px]">240 GSM Combed Organic Cotton</span>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-street-black block uppercase text-sm">EASY RETURNS</span>
                <span className="text-zinc-500 text-[11px]">7-Day Hassle-Free Exchange</span>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-street-black block uppercase text-sm">SECURE PAYMENTS</span>
                <span className="text-zinc-500 text-[11px]">Razorpay & COD Available</span>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-street-black block uppercase text-sm">EXPRESS DISPATCH</span>
                <span className="text-zinc-500 text-[11px]">Shipped Within 24-48 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Value Highlights */}
      <section id="why-teecode-section" className="bg-zinc-50 py-16 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight uppercase text-street-black">
              WHY TEECODE STREETWEAR?
            </h2>
            <div className="h-1 w-12 bg-street-red mx-auto"></div>
            <p className="text-zinc-500 font-mono text-xs max-w-lg mx-auto">
              We don&apos;t build basic tees. We design heavyweight armor for the concrete grid.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 border border-zinc-200 shadow-sm relative">
              <span className="absolute top-4 right-4 text-xs font-mono font-bold text-zinc-300">01</span>
              <div className="w-10 h-10 bg-street-black text-white flex items-center justify-center font-bold font-mono text-sm mb-4">240</div>
              <h4 className="font-display font-bold uppercase text-sm tracking-wider text-street-black">240 GSM Heavyweight</h4>
              <p className="text-xs text-zinc-500 mt-2 font-sans leading-relaxed">
                Thick, durable luxury cotton that provides that perfect boxy fall. Holds structure wash after wash.
              </p>
            </div>

            <div className="bg-white p-6 border border-zinc-200 shadow-sm relative">
              <span className="absolute top-4 right-4 text-xs font-mono font-bold text-zinc-300">02</span>
              <div className="w-10 h-10 bg-street-black text-white flex items-center justify-center font-bold font-mono text-sm mb-4">FIT</div>
              <h4 className="font-display font-bold uppercase text-sm tracking-wider text-street-black">Dropped Shoulders</h4>
              <p className="text-xs text-zinc-500 mt-2 font-sans leading-relaxed">
                Meticulously engineered shoulder slips that give a natural, laid-back oversized streetwear silhouette.
              </p>
            </div>

            <div className="bg-white p-6 border border-zinc-200 shadow-sm relative">
              <span className="absolute top-4 right-4 text-xs font-mono font-bold text-zinc-300">03</span>
              <div className="w-10 h-10 bg-street-black text-white flex items-center justify-center font-bold font-mono text-sm mb-4">UNI</div>
              <h4 className="font-display font-bold uppercase text-sm tracking-wider text-street-black">Unisex Sizing</h4>
              <p className="text-xs text-zinc-500 mt-2 font-sans leading-relaxed">
                Crafted to fit all bodies perfectly. Premium boxy streetwear drape built for both men and women.
              </p>
            </div>

            <div className="bg-white p-6 border border-zinc-200 shadow-sm relative">
              <span className="absolute top-4 right-4 text-xs font-mono font-bold text-zinc-300">04</span>
              <div className="w-10 h-10 bg-street-black text-white flex items-center justify-center font-bold font-mono text-sm mb-4">RAW</div>
              <h4 className="font-display font-bold uppercase text-sm tracking-wider text-street-black">High-Density Prints</h4>
              <p className="text-xs text-zinc-500 mt-2 font-sans leading-relaxed">
                Rich frontend artwork print, plain clean back. Built for high impact style, high durability wear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. New Arrivals Drop */}
      <section id="new-arrivals-section" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div className="text-left space-y-2">
              <span className="font-mono text-xs font-bold text-street-red uppercase tracking-widest">JUST RELEASED</span>
              <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight uppercase text-street-black">
                NEW ARRIVALS
              </h2>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="group font-display text-xs font-bold tracking-widest text-street-black hover:text-street-red uppercase flex items-center space-x-1.5"
            >
              <span>VIEW FULL DECK</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Mid-banner Promo */}
      <section id="banner-middle" className="bg-street-black text-white py-24 relative overflow-hidden bg-grid-pattern border-y border-zinc-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-street-red/5 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto text-center px-4 space-y-6 relative z-10">
          <span className="font-mono text-xs tracking-widest text-street-red font-bold uppercase">COMMUNITY CHOICE</span>
          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight uppercase leading-none">
            SKIP CHECKOUT. <br />
            ORDER DIRECTLY VIA WHATSAPP.
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono max-w-xl mx-auto">
            Choose your oversized T-shirt, select size and color, click one button. Get automated chat delivery validation within minutes.
          </p>
          <div className="pt-2">
            <a
              id="middle-banner-whatsapp-cta"
              href="https://wa.me/919196294654?text=Hi%20TeeCode!%20I%20want%20to%20order%20premium%20streetwear%20T-shirts%20instantly%20without%20credit%20cards."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold uppercase tracking-widest px-8 py-4 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>SEND MANUAL WHATSAPP ORDER</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. Best Sellers Section */}
      <section id="best-sellers-section" className="py-20 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div className="text-left space-y-2">
              <span className="font-mono text-xs font-bold text-street-red uppercase tracking-widest">HIGH DEMAND</span>
              <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight uppercase text-street-black">
                BEST SELLERS
              </h2>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="group font-display text-xs font-bold tracking-widest text-street-black hover:text-street-red uppercase flex items-center space-x-1.5"
            >
              <span>FILTER DESIGNS</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Instagram Style Lookbook */}
      <section id="instagram-lookbook" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                id="instagram-brand-link"
                href="https://www.instagram.com/teecode_apparel/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 text-street-red hover:text-street-black font-mono text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer group bg-zinc-50 hover:bg-zinc-100 px-4 py-2 border border-zinc-200"
              >
                <Instagram className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Instagram: @teecode_apparel</span>
              </a>
              <a
                id="facebook-brand-link"
                href="https://www.facebook.com/profile.php?id=61590684009463"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-street-black font-mono text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer group bg-zinc-50 hover:bg-zinc-100 px-4 py-2 border border-zinc-200"
              >
                <Facebook className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Facebook: TeeCode</span>
              </a>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight uppercase text-street-black">
              STREETLOOK LOOKBOOK
            </h2>
            <div className="h-1 w-12 bg-street-red mx-auto"></div>
            <p className="text-zinc-500 font-mono text-xs max-w-lg mx-auto">
              Real community street style. Click below to view on Instagram or Facebook.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {LOOKBOOK.map((item, idx) => (
              <div
                id={`lookbook-card-${item.id}`}
                key={item.id}
                className="group relative aspect-[3/4] bg-zinc-100 overflow-hidden border border-zinc-200 block"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-street-black/95 via-street-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-[9px] font-mono font-bold text-street-red tracking-wider uppercase bg-zinc-900 border border-zinc-800 px-2 py-0.5 self-start mb-1.5">{item.tag}</span>
                  <h4 className="font-display text-xs sm:text-sm font-black tracking-tight text-white uppercase leading-tight">{item.title}</h4>
                  <p className="text-[10px] font-mono text-zinc-400 mt-1">#teecode #oversized</p>
                  
                  {/* Action buttons */}
                  <div className="grid grid-cols-1 gap-2 mt-3 pt-3 border-t border-zinc-800">
                    <a
                      href={item.instaUrl || "https://www.instagram.com/teecode_apparel/"}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[9px] font-mono text-white bg-street-red hover:bg-street-red/80 px-2 py-1.5 text-center font-bold uppercase tracking-wider flex items-center justify-center transition-colors gap-1.5"
                    >
                      <Instagram className="h-3 w-3" />
                      <span>ON INSTAGRAM</span>
                    </a>
                    <a
                      href={item.facebookUrl || "https://www.facebook.com/profile.php?id=61590684009463"}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[9px] font-mono text-white bg-blue-700 hover:bg-blue-600 px-2 py-1.5 text-center font-bold uppercase tracking-wider flex items-center justify-center transition-colors gap-1.5"
                    >
                      <Facebook className="h-3 w-3" />
                      <span>ON FACEBOOK</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Featured Drop (Closer Look) */}
      <section id="featured-closer-look" className="bg-zinc-100 py-20 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="font-mono text-xs font-bold text-street-red uppercase tracking-widest">LIMITED ARCHIVE</span>
            <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight uppercase text-street-black">
              FEATURED ARTWORK DECK
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Customer Reviews */}
      <section id="customer-reviews" className="py-20 bg-street-black text-white bg-grid-pattern relative border-t border-zinc-800">
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-zinc-900/40 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-3 mb-16">
            <span className="font-mono text-xs font-bold text-street-red uppercase tracking-widest">VERIFIED WORDS</span>
            <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight uppercase text-white">
              STREETWEAR COMMUNITY REVIEWS
            </h2>
            <div className="h-1 w-12 bg-street-red mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-zinc-950 p-6 border border-zinc-900 relative">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 rounded-full ${review.avatarColor} flex items-center justify-center text-white font-display font-extrabold text-sm uppercase`}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-white uppercase">{review.name}</h4>
                    <div className="flex items-center space-x-1.5 mt-0.5">
                      <div className="flex text-amber-500">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-amber-500" />
                        ))}
                      </div>
                      {review.verified && (
                        <span className="inline-flex items-center space-x-0.5 bg-zinc-900 text-emerald-400 font-mono text-[9px] px-1.5 py-0.5 border border-zinc-800">
                          <Check className="h-2 w-2" />
                          <span>VERIFIED ORDER</span>
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="ml-auto font-mono text-[10px] text-zinc-500">{review.date}</span>
                </div>
                <p className="text-zinc-400 text-xs font-mono leading-relaxed italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

/* Reusable Compact Product Card */
interface ProductCardProps {
  key?: string;
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group bg-white border border-zinc-200 overflow-hidden relative cursor-pointer flex flex-col justify-between"
      onClick={() => navigate(`/shop/${product.id}`)}
    >
      {/* Upper tag / banner */}
      {product.tag && (
        <span className="absolute top-3 left-3 bg-street-black text-white text-[9px] font-mono font-bold px-2 py-0.5 z-10 tracking-wider uppercase border border-zinc-800">
          {product.tag}
        </span>
      )}

      {/* Secondary Quick-Add / Info Tag */}
      <span className="absolute top-3 right-3 bg-street-red text-white text-[9px] font-mono font-bold px-2 py-0.5 z-10 tracking-wider uppercase">
        240 GSM
      </span>

      {/* Image Container */}
      <div className="aspect-[3/4] bg-zinc-100 overflow-hidden relative border-b border-zinc-100">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        />
        
        {/* Street culture print desc bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-street-black/85 backdrop-blur-xs border-t border-zinc-800 py-1.5 px-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-[9px] font-mono text-zinc-300 truncate uppercase tracking-widest text-left">
            🎨 Print: {product.graphicDesc}
          </p>
        </div>
      </div>

      {/* Details Area */}
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

        {/* Short specs list */}
        <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-zinc-500">
          <span className="bg-zinc-100 px-1.5 py-0.5">UNISEX</span>
          <span className="bg-zinc-100 px-1.5 py-0.5">OVERSIZED FIT</span>
        </div>

        {/* Action CTAs */}
        <div className="pt-3 grid grid-cols-2 gap-2 border-t border-zinc-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/shop/${product.id}`);
            }}
            className="w-full bg-street-black hover:bg-street-red text-white py-2 font-display font-black text-[10px] tracking-widest uppercase flex items-center justify-center space-x-1 transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>VIEW DECK</span>
          </button>

          <a
            href={`https://wa.me/919196294654?text=Hi%20TeeCode!%20I%20want%20to%20order%20the%20"${product.name}"%20oversized%20T-shirt.`}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-zinc-100 hover:bg-emerald-50 text-street-black hover:text-emerald-700 py-2 font-mono text-[9px] font-bold tracking-wider uppercase flex items-center justify-center space-x-1 border border-zinc-200 transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>ORDER WA</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
