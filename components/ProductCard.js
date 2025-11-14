

// components/ProductCard.js
'use client';

import Link from 'next/link';

export default function ProductCard({ product }) {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">

        {/* 90% IMAGE FOCUS */}
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {product.badge && (
            <span className="absolute top-4 left-4 bg-amber-300 text-black px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
              {product.badge}
            </span>
          )}
        </div>

        {/* COMPACT CONTENT SECTION */}
        <div className="px-4 py-4">
          <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
            {product.name}
          </h3>

          <p className="text-gray-600 text-xs mb-2 line-clamp-1">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xl font-bold text-gray-900">
              {formattedPrice}
            </span>

            <span className="text-xs text-green-600 font-medium">
              Free Shipping
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}
