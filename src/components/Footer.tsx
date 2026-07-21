import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {

  return (
    <footer id="main-footer" className="bg-street-black text-white border-t border-zinc-900 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Promise Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-zinc-900">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-zinc-900 rounded-none border border-zinc-800 text-street-red">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display font-bold uppercase tracking-wider text-sm">Express Shipping</h4>
              <p className="text-xs text-zinc-400 mt-1 font-mono">Dispatched within 24-48 hours. Free COD available across India.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-zinc-900 rounded-none border border-zinc-800 text-street-red">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display font-bold uppercase tracking-wider text-sm">Premium 240 GSM</h4>
              <p className="text-xs text-zinc-400 mt-1 font-mono">Heavyweight, pre-shrunk, combed organic cotton tailored for streetwear.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-3 bg-zinc-900 rounded-none border border-zinc-800 text-street-red">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display font-bold uppercase tracking-wider text-sm">Hassle-free Exchange</h4>
              <p className="text-xs text-zinc-400 mt-1 font-mono">Simple 7-day exchange and replacement window for tags-on products.</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10 py-12">
          
          {/* Main Statement */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            <Link to="/" className="font-display text-3xl font-black tracking-tighter uppercase">
              TEE<span className="text-street-red">CODE</span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              TeeCode — Premium oversized streetwear for bold everyday fashion. Built for the street culture, engineered with heavyweight 240 GSM cotton.
            </p>
            <div className="pt-2 font-mono text-xs text-zinc-500 space-y-1.5">
              <p>Domain: <span className="text-white">teecode.store</span></p>
              <p>Email: <a href="mailto:teecodeinbox@gmail.com" className="text-street-red hover:underline">teecodeinbox@gmail.com</a></p>
              <p>Support WhatsApp: <a href="https://wa.me/919196294654" target="_blank" rel="noreferrer" className="text-street-red hover:underline">+91 91962 94654</a></p>
            </div>
          </div>

          {/* SHOP */}
          <div className="md:col-span-2 space-y-4">
            <h5 className="font-display font-bold uppercase tracking-widest text-xs text-zinc-300">SHOP</h5>
            <ul className="space-y-2.5 text-xs font-mono text-zinc-400">
              <li>
                <Link to="/shop?gender=men" className="hover:text-white transition-colors">Men's Collection</Link>
              </li>
              <li>
                <Link to="/shop?gender=men&category=men-tshirts" className="hover:text-white transition-colors">Men's T-Shirts</Link>
              </li>
              <li>
                <Link to="/shop?gender=men&type=Classic+Polo" className="hover:text-white transition-colors">Men's Polos</Link>
              </li>
              <li>
                <Link to="/shop?gender=women" className="hover:text-white transition-colors">Women's Collection</Link>
              </li>
              <li>
                <Link to="/shop?sort=sale" className="hover:text-white transition-colors">Sale</Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div className="md:col-span-2 space-y-4">
            <h5 className="font-display font-bold uppercase tracking-widest text-xs text-zinc-300">COMPANY</h5>
            <ul className="space-y-2.5 text-xs font-mono text-zinc-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About TeeCode</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-white transition-colors">Track Order</Link>
              </li>
              <li>
                <Link to="/policies" className="hover:text-white transition-colors">Return & Exchange Policy</Link>
              </li>
            </ul>
          </div>

          {/* HELP */}
          <div className="md:col-span-2 space-y-4">
            <h5 className="font-display font-bold uppercase tracking-widest text-xs text-zinc-300">HELP</h5>
            <ul className="space-y-2.5 text-xs font-mono text-zinc-400">
              <li>
                <Link to="/policies" className="hover:text-white transition-colors">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/policies" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/policies" className="hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/size-guide" className="hover:text-white transition-colors">Size Guide</Link>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div className="col-span-2 md:col-span-2 space-y-4">
            <h5 className="font-display font-bold uppercase tracking-widest text-xs text-zinc-300">SOCIAL</h5>
            <ul className="space-y-2.5 text-xs font-mono text-zinc-400">
              <li>
                <a
                  href="https://www.instagram.com/teecode_apparel/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61590684009463"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Youtube className="h-4 w-4" />
                  <span>YouTube</span>
                </a>
              </li>
            </ul>

            {/* WhatsApp Box */}
            <div className="mt-4 bg-zinc-950 p-4 border border-zinc-900 rounded-none">
              <p className="text-[10px] text-zinc-400 font-mono mb-2 uppercase tracking-wider">Order via WhatsApp</p>
              <a
                id="footer-whatsapp-btn"
                href="https://wa.me/919196294654?text=Hi%20TeeCode!%20I%20want%20to%20order%20premium%20oversized%20T-shirts."
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[11px] font-bold py-2.5 uppercase tracking-widest transition-colors"
              >
                WHATSAPP ORDER
              </a>
            </div>
          </div>

        </div>

        {/* Copyright and Legal disclaimer */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between text-zinc-500 text-[11px] font-mono">
          <div className="text-center md:text-left">
            <p>© {new Date().getFullYear()} TEECODE.STORE. All Rights Reserved.</p>
            <p className="mt-1 text-zinc-600">Streetwear culture curated in heavy 240 GSM organic fabrics.</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <span className="hover:text-white cursor-default">SECURE PAYMENTS READY</span>
            <span className="text-zinc-700">|</span>
            <span className="hover:text-white cursor-default">DESIGNED FOR UNISEX COMFORT</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
