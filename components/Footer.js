

// components/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-black italic uppercase mb-6">
              GENZ<span className="text-red-600">VERSE</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Engineered in Akola. Redefining street culture through premium anime aesthetics.
            </p>
            <div className="flex space-x-4">
              {['instagram', 'twitter', 'facebook'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-current" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-widest mb-6 text-sm">Shop</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/products" className="hover:text-red-500 transition-colors">New Arrivals</Link></li>
              <li><Link href="/products" className="hover:text-red-500 transition-colors">Best Sellers</Link></li>
              <li><Link href="/products" className="hover:text-red-500 transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-widest mb-6 text-sm">Support</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-red-500 transition-colors">Track Order</Link></li>
              <li><Link href="#" className="hover:text-red-500 transition-colors">Returns</Link></li>
              <li><Link href="#" className="hover:text-red-500 transition-colors">Shipping Info</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-widest mb-6 text-sm">Stay in the loop</h3>
            <form className="space-y-4">
              <input 
                type="email" 
                placeholder="ENTER EMAIL" 
                className="w-full bg-transparent border-b border-zinc-700 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors"
              />
              <button className="w-full bg-white text-black font-bold uppercase py-3 text-xs tracking-widest hover:bg-red-600 hover:text-white transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-wider">
          <p>© 2024 GENZVERSE. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}