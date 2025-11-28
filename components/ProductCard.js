


// components/ProductCard.js
'use client';

import Link from 'next/link';

export default function ProductCard({ product }) {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative bg-zinc-900 overflow-hidden">
        
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale-0 group-hover:grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.badge && (
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="bg-white text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                -{discount}%
              </span>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="w-full bg-white text-black font-bold uppercase py-3 text-sm tracking-widest hover:bg-red-600 hover:text-white transition-colors">
              View Details
            </button>
          </div>
        </div>

        {/* Minimalist Info */}
        <div className="pt-4 pb-2">
          <h3 className="text-sm font-bold text-white uppercase tracking-wide truncate group-hover:text-red-500 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-gray-300">{formattedPrice}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-600 line-through decoration-red-500">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}