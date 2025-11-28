


// components/CartDrawer.js
'use client';

import { useCart } from './CartContext';
import Link from 'next/link';

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    isOpen,
    setIsOpen
  } = useCart();

  const formattedPrice = (price) => 
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-zinc-950 shadow-2xl z-50 transform transition-transform duration-300 border-l border-white/10 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full text-white">
          
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-xl font-black uppercase tracking-wider italic">Your Cart</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <p className="text-gray-500 font-medium uppercase tracking-widest">Your cart is empty</p>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-red-500 hover:text-white underline text-sm uppercase tracking-wide"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.cartId} className="flex gap-4">
                    <div className="w-24 h-32 bg-zinc-900 flex-shrink-0 overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-sm uppercase leading-tight pr-4">
                            {item.name}
                          </h3>
                          <p className="font-bold text-sm">{formattedPrice(item.price)}</p>
                        </div>
                        <p className="text-gray-400 text-xs mt-1 uppercase">Size: {item.size}</p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-zinc-700">
                          <button
                            onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-xs text-gray-500 hover:text-red-500 uppercase tracking-wider underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-white/10 p-6 bg-zinc-950">
              <div className="flex justify-between text-lg font-black uppercase italic mb-6">
                <span>Total</span>
                <span className="text-red-500">{formattedPrice(getTotalPrice())}</span>
              </div>
              <Link 
                href="/checkout" 
                onClick={() => setIsOpen(false)}
                className="block w-full bg-white text-black py-4 text-center font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}