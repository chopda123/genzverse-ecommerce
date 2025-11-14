

// components/ProductClient.js
'use client';

import { useState } from 'react';
import Gallery from './Gallery';
import { useCart } from './CartContext';
import Link from 'next/link';

export default function ProductClient({ product }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize, quantity);
  };

  return (
    <>
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Gallery */}
            <div>
              <Gallery images={product.images} />
            </div>

            {/* Product Info */}
            <div className="lg:pl-8">
              {product.badge && (
                <span className="inline-block bg-gold text-navy px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {product.badge}
                </span>
              )}
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <p className="text-2xl font-bold text-navy mb-6">
                {formattedPrice}
              </p>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Size</h3>
                <div className="flex gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 border-2 rounded-lg font-medium transition-all duration-200 ${
                        selectedSize === size
                          ? 'border-navy bg-navy text-white'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-white border-2 border-navy text-navy px-8 py-4 rounded-lg font-medium hover:bg-navy hover:text-white transition-colors duration-200"
                >
                  Add to Cart
                </button>
                <Link 
                  href="/checkout"
                  onClick={() => {
                    if (!selectedSize) {
                      alert('Please select a size');
                      return;
                    }
                    addToCart(product, selectedSize, quantity);
                  }}
                  className="flex-1 btn-primary text-center py-4 block"
                >
                  Buy Now
                </Link>
              </div>

              {/* Shipping Info */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free shipping on all orders
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Delivery within 3-5 business days
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}