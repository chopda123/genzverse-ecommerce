


// // components/ProductClient.js
// 'use client';

// import { useState } from 'react';
// import { useCart } from './CartContext';
// import Link from 'next/link';

// export default function ProductClient({ product }) {
//   const [selectedSize, setSelectedSize] = useState('');
//   const [currentImage, setCurrentImage] = useState(0);
//   const { addToCart } = useCart();

//   const formattedPrice = new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     maximumFractionDigits: 0,
//   }).format(product.price);

//   return (
//     <main className="flex-1 bg-black pt-24 pb-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
//           <div className="space-y-4">
//             <div className="aspect-[4/5] w-full bg-zinc-900 overflow-hidden relative group">
//               <img 
//                 src={product.images[currentImage]} 
//                 alt={product.name} 
//                 className="w-full h-full object-cover"
//               />
//               {product.badge && (
//                 <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-widest">
//                   {product.badge}
//                 </span>
//               )}
//             </div>
//             <div className="grid grid-cols-4 gap-4">
//               {product.images.map((img, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setCurrentImage(idx)}
//                   className={`aspect-square overflow-hidden border-2 transition-colors ${
//                     currentImage === idx ? 'border-red-600' : 'border-transparent hover:border-white/50'
//                   }`}
//                 >
//                   <img src={img} alt="" className="w-full h-full object-cover" />
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="flex flex-col justify-center">
//             <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight italic mb-2">
//               {product.name}
//             </h1>
            
//             <div className="flex items-center gap-4 mb-8">
//               <span className="text-2xl font-bold text-red-500">{formattedPrice}</span>
//               <span className="text-sm text-gray-500 uppercase tracking-widest">Tax included</span>
//             </div>

//             <p className="text-gray-400 leading-relaxed mb-8 border-l-2 border-red-600 pl-4">
//               {product.description}
//             </p>

//             <div className="mb-8">
//               <div className="flex justify-between items-center mb-4">
//                 <span className="text-sm font-bold text-white uppercase tracking-widest">Select Size</span>
//                 <button className="text-xs text-gray-400 underline hover:text-white">Size Guide</button>
//               </div>
//               <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
//                 {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`py-3 text-sm font-bold border transition-all ${
//                       selectedSize === size
//                         ? 'bg-white text-black border-white'
//                         : 'bg-transparent text-gray-400 border-zinc-800 hover:border-white hover:text-white'
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-4">
//               <button
//                 onClick={() => {
//                   if (!selectedSize) {
//                     alert('PLEASE SELECT A SIZE');
//                     return;
//                   }
//                   addToCart(product, selectedSize, 1);
//                 }}
//                 className="w-full bg-white text-black py-4 font-black uppercase tracking-widest hover:bg-gray-200 transition-colors"
//               >
//                 Add to Cart
//               </button>
              
//               <Link
//                 href="/checkout"
//                 className="block w-full text-center bg-red-600 text-white py-4 font-black uppercase tracking-widest hover:bg-red-700 transition-colors"
//               >
//                 Buy Now
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// components/ProductClient.js
'use client';

import { useState } from 'react';
import { useCart } from './CartContext';
import { useRouter } from 'next/navigation';

export default function ProductClient({ product }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const { addToCart } = useCart();
  const router = useRouter();

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price);

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('PLEASE SELECT A SIZE');
      return;
    }

    addToCart(product, selectedSize, 1);
    router.push('/checkout');
  };

  return (
    <main className="flex-1 bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          <div className="space-y-4">
            <div className="aspect-[4/5] w-full bg-zinc-900 overflow-hidden relative group">
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-widest">
                  {product.badge}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`aspect-square overflow-hidden border-2 transition-colors ${
                    currentImage === idx ? 'border-red-600' : 'border-transparent hover:border-white/50'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight italic mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-2xl font-bold text-red-500">{formattedPrice}</span>
              <span className="text-sm text-gray-500 uppercase tracking-widest">Tax included</span>
            </div>

            <p className="text-gray-400 leading-relaxed mb-8 border-l-2 border-red-600 pl-4">
              {product.description}
            </p>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-white uppercase tracking-widest">Select Size</span>
                <button className="text-xs text-gray-400 underline hover:text-white">Size Guide</button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm font-bold border transition-all ${
                      selectedSize === size
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-gray-400 border-zinc-800 hover:border-white hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  if (!selectedSize) {
                    alert('PLEASE SELECT A SIZE');
                    return;
                  }
                  addToCart(product, selectedSize, 1);
                }}
                className="w-full bg-white text-black py-4 font-black uppercase tracking-widest hover:bg-gray-200 transition-colors"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-red-600 text-white py-4 font-black uppercase tracking-widest hover:bg-red-700 transition-colors"
              >
                Buy Now
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
