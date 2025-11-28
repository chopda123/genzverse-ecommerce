



// components/Navbar.js
'use client';

import { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems, setIsOpen } = useCart();

  // Detect scroll to make navbar solid
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Drops', href: '/products' },
    { name: 'Collection', href: '/products' },
    { name: 'About', href: '/about' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-2 hover:bg-white/10 rounded-sm transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M4 6h16M4 12h8m-8 6h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Center/Left: Logo */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <Link href="/" className="group">
                <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase italic">
                  GENZ<span className="text-red-600">VERSE</span>
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href} 
                  className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right: Cart & Search */}
            <div className="flex items-center gap-4">
              <button className="text-white hover:text-red-500 transition-colors p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <button 
                onClick={() => setIsOpen(true)}
                className="relative text-white hover:text-red-500 transition-colors p-2 group"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute top-1 right-0 w-4 h-4 bg-red-600 text-[10px] font-bold text-white flex items-center justify-center rounded-sm">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-transform duration-300 md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {[...navLinks, { name: 'Account', href: '#' }].map((item) => (
            <Link 
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-black uppercase tracking-wider text-white hover:text-red-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}