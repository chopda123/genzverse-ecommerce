



// components/Navbar.js
'use client';

import { useState } from 'react';
import { useCart } from './CartContext';
import Logo from './Logo';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems, setIsOpen } = useCart();

  return (
    <nav className="bg-navy text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Logo size="large" showText={true} />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-white hover:text-gold transition-colors duration-200 font-medium">
              Home
            </a>
            <a href="/about" className="text-white hover:text-gold transition-colors duration-200 font-medium">
              About Us
            </a>
            <a href="#products" className="text-white hover:text-gold transition-colors duration-200 font-medium">
              Collection
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-navy/80 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
              <div className="absolute right-3 top-2.5">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Cart */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-white hover:text-gold transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-peach text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-gold transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-600 pt-4 pb-2">
          <div className="flex space-x-6">
            <a href="/" className="text-white hover:text-gold transition-colors text-sm font-medium">
              Home
            </a>
            <a href="/about" className="text-white hover:text-gold transition-colors text-sm font-medium">
              About Us
            </a>
            <a href="#products" className="text-white hover:text-gold transition-colors text-sm font-medium">
              Collection
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}