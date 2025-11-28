


// components/HomeClient.js
'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';

export default function HomeClient({ products }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/banner/banner-2.jpg', 
      title: 'SHIBUYA ARC',
      subtitle: 'VOL. 01 / STREETWEAR COLLECTION',
      cta: 'SHOP DROP',
    },
    {
      image: '/banner/banner-3.jpg',
      title: 'CURSED ENERGY',
      subtitle: 'PREMIUM OVERSIZED TEES',
      cta: 'EXPLORE',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <main className="flex-1 bg-black">
      {/* Cinematic Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Image with Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
            
            {/* Content */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end pb-20 px-6 md:px-12 max-w-7xl mx-auto">
              <div className={`transition-all duration-700 delay-300 transform ${
                index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <p className="text-red-500 font-bold tracking-[0.2em] mb-4 text-sm md:text-base">
                  {slide.subtitle}
                </p>
                <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8 italic">
                  {slide.title}
                </h1>
                <Link
                  href="/products"
                  className="inline-block bg-white text-black hover:bg-red-600 hover:text-white px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 right-8 z-30 flex space-x-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1 transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-red-600' : 'w-4 bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Marquee Separator */}
      <div className="bg-red-600 text-white overflow-hidden py-3">
        <div className="whitespace-nowrap animate-marquee flex space-x-8">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-sm font-bold uppercase tracking-widest mx-4">
              NEW SEASON DROP • FREE SHIPPING ON ORDERS ABOVE ₹999 • LIMITED EDITION
            </span>
          ))}
        </div>
      </div>

      {/* Categories / Featured */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight italic">
              Latest Drops
            </h2>
          </div>
          <Link href="/products" className="hidden md:block text-sm font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest">
            View All →
          </Link>
        </div>

        {/* 2-Column Grid on Mobile, 4-Column on Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
           <Link href="/products" className="inline-block border border-white/20 text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
            View All Products
          </Link>
        </div>
      </section>

      {/* TRUST & GENESIS SECTION (ADDED) */}
      <section className="border-t border-white/10 bg-zinc-950">
        
        {/* The Genesis Brief */}
        <div className="py-20 px-4 text-center border-b border-white/10">
          <p className="text-red-600 font-bold tracking-[0.3em] uppercase text-sm mb-6 animate-pulse">
            Est. 2016 // Akola, India
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-tight mb-6">
            The <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">Genesis</span>
          </h2>
          <p className="text-gray-400 font-medium tracking-wide uppercase max-w-xl mx-auto leading-relaxed text-sm md:text-base">
            We didn't start in a boardroom. We started with a obsession for anime culture and a refusal to wear boring clothes.
          </p>
          <div className="mt-8">
            <Link href="/about" className="text-sm font-bold text-white underline decoration-red-600 underline-offset-4 hover:text-red-500 uppercase tracking-widest">
              Read our full story
            </Link>
          </div>
        </div>

        {/* Stats Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border-white/10">
          {[
            { label: 'Years Active', value: '08' },
            { label: 'Drops Released', value: '50+' },
            { label: 'Community', value: '10K' },
            { label: 'Craftsmanship', value: '100%' },
          ].map((stat, i) => (
            <div key={i} className="p-8 text-center group hover:bg-zinc-900 transition-colors duration-300">
              <div className="text-3xl md:text-5xl font-black text-white italic mb-2 group-hover:text-red-600 transition-colors">
                {stat.value}
              </div>
              <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}