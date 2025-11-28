



// app/checkout/page.js
'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../../components/CartContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    address: '',
    city: '',
    pincode: '',
    state: '',
  });

  const formattedPrice = (price) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderDetails = cart
      .map(
        (item) =>
          `${item.name} (Size: ${item.size}) x ${item.quantity} - ${formattedPrice(
            item.price * item.quantity
          )}`
      )
      .join('\n');

    const GOOGLE_FORM_URL =
      'https://docs.google.com/forms/d/e/1FAIpQLSeTHAG9ok1dZdLOAI6D95Vc3CbN6OQqqdnwkbvG6rEpkXv2Qg/formResponse';

    const FORM_ENTRY_IDS = {
      name: 'entry.177269583',
      email: 'entry.813093736',
      whatsapp: 'entry.557793667',
      address: 'entry.296257999',
      city: 'entry.1033840332',
      pincode: 'entry.751240157',
      state: 'entry.826179235',
      orderDetails: 'entry.774842190',
      totalAmount: 'entry.1962467478',
    };

    const formPayload = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      if (FORM_ENTRY_IDS[key]) {
        formPayload.append(FORM_ENTRY_IDS[key], value);
      }
    });
    formPayload.append(FORM_ENTRY_IDS.orderDetails, orderDetails);
    formPayload.append(FORM_ENTRY_IDS.totalAmount, getTotalPrice().toString());

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formPayload,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        mode: 'no-cors',
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setOrderSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Order Error:', error);
      setOrderSuccess(true);
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return <div className="min-h-screen bg-black" />;

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white selection:bg-red-600 selection:text-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-zinc-950 border border-white/10 p-8 md:p-12 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-2 h-2 bg-red-600" />
             <div className="absolute top-0 right-0 w-2 h-2 bg-red-600" />
             <div className="absolute bottom-0 left-0 w-2 h-2 bg-red-600" />
             <div className="absolute bottom-0 right-0 w-2 h-2 bg-red-600" />

            <div className="w-20 h-20 bg-red-600 flex items-center justify-center mx-auto mb-8 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
              Order Locked In
            </h1>
            <p className="text-gray-400 mb-8 uppercase tracking-widest text-xs md:text-sm">
              Your gear is secured. We'll hit you up on WhatsApp with the tracking details.
            </p>
            
            <Link
              href="/"
              className="inline-block bg-white text-black px-10 py-4 font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300"
            >
              Back to Archive
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic mb-6">
              Cart is <span className="text-red-600">Empty</span>
            </h1>
            <p className="text-gray-500 mb-8 uppercase tracking-widest text-sm">
              You haven't copped anything yet.
            </p>
            <Link
              href="/products"
              className="inline-block bg-white text-black px-8 py-3 font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
            >
              View Collection
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-red-600 selection:text-white">
      <Navbar />

      <div className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-12 border-b border-white/10 pb-6">
            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
              Secure <span className="text-red-600">Checkout</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* LEFT: CUSTOMER FORM */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <form onSubmit={handleSubmit} className="space-y-12">
                
                <div className="space-y-6">
                  <h3 className="text-xl font-black uppercase italic border-l-4 border-red-600 pl-4">
                    Identity
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder-gray-600 rounded-none"
                        placeholder="ENTER NAME"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder-gray-600 rounded-none"
                          placeholder="ENTER EMAIL"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                          WhatsApp <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="whatsapp"
                          required
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder-gray-600 rounded-none"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-black uppercase italic border-l-4 border-red-600 pl-4">
                    Coordinates
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                        Street Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder-gray-600 rounded-none resize-none"
                        placeholder="FLAT / BUILDING / STREET"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all rounded-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                          State <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all rounded-none"
                        />
                      </div>

                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                          Pincode <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="pincode"
                          required
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all rounded-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:hidden pt-6 border-t border-white/10">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 text-white py-4 font-black uppercase tracking-[0.2em] hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? 'PROCESSING...' : `PAY ${formattedPrice(getTotalPrice())}`}
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT: ORDER SUMMARY (Sticky) */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="sticky top-24 bg-zinc-950 border border-white/10 p-6 md:p-8">
                <h2 className="text-xl font-black uppercase italic mb-8 flex justify-between items-center text-white">
                  <span>Drop Cart</span>
                  <span className="text-xs font-normal text-gray-500 not-italic tracking-wide bg-zinc-900 px-2 py-1 rounded-sm">
                    {cart.length} ITEMS
                  </span>
                </h2>

                <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div
                      key={item.cartId}
                      className="flex gap-4 group"
                    >
                      <div className="w-20 h-24 bg-zinc-900 flex-shrink-0 overflow-hidden relative border border-white/5">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-0 right-0 bg-red-600 w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white">
                          {item.quantity}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm uppercase text-gray-200 leading-tight mb-1 truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                          Size: <span className="text-gray-300">{item.size}</span>
                        </p>
                        <p className="text-sm font-bold text-red-500">
                          {formattedPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 border-t border-white/10 pt-6">
                  <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>{formattedPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                    <span>Shipping</span>
                    <span className="text-white">Free</span>
                  </div>
                  
                  <div className="flex justify-between items-end pt-4 border-t border-white/10 mt-4">
                    <span className="text-lg font-black uppercase italic text-white">Total</span>
                    <div className="text-right">
                       <span className="text-2xl font-black text-red-600 tracking-tight">
                        {formattedPrice(getTotalPrice())}
                      </span>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Tax included</p>
                    </div>
                  </div>
                </div>

                {/* Desktop Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="hidden lg:flex w-full mt-8 bg-white text-black py-4 font-black uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    'PROCESSING...'
                  ) : (
                    <>
                      CONFIRM DROP 
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}


























// // app/checkout/page.js
// 'use client';

// import { useState, useEffect } from 'react';
// import { useCart } from '../../components/CartContext';
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';
// import Link from 'next/link';

// export default function CheckoutPage() {
//   const { cart, getTotalPrice, clearCart } = useCart();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [orderSuccess, setOrderSuccess] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   const [paymentMethod, setPaymentMethod] = useState("COD");

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     whatsapp: '',
//     address: '',
//     city: '',
//     pincode: '',
//     state: '',
//   });

//   const formattedPrice = (price) =>
//     new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0,
//     }).format(price);

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const orderDetails = cart
//       .map(
//         (item) =>
//           `${item.name} (Size: ${item.size}) x ${item.quantity} - ${formattedPrice(
//             item.price * item.quantity
//           )}`
//       )
//       .join('\n');

//     const GOOGLE_FORM_URL =
//       'https://docs.google.com/forms/d/e/1FAIpQLSeTHAG9ok1dZdLOAI6D95Vc3CbN6OQqqdnwkbvG6rEpkXv2Qg/formResponse';

//     const FORM_ENTRY_IDS = {
//       name: 'entry.177269583',
//       email: 'entry.813093736',
//       whatsapp: 'entry.557793667',
//       address: 'entry.296257999',
//       city: 'entry.1033840332',
//       pincode: 'entry.751240157',
//       state: 'entry.826179235',
//       orderDetails: 'entry.774842190',
//       totalAmount: 'entry.1962467478',
//     };

//     const formPayload = new URLSearchParams();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (FORM_ENTRY_IDS[key]) {
//         formPayload.append(FORM_ENTRY_IDS[key], value);
//       }
//     });
//     formPayload.append(FORM_ENTRY_IDS.orderDetails, orderDetails);
//     formPayload.append(FORM_ENTRY_IDS.totalAmount, getTotalPrice().toString());
//     formPayload.append("entry.payment", paymentMethod);

//     await fetch(GOOGLE_FORM_URL, {
//       method: 'POST',
//       body: formPayload,
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       mode: 'no-cors',
//     });

//     await new Promise((r) => setTimeout(r, 2000));

//     setOrderSuccess(true);
//     clearCart();
//     setIsSubmitting(false);
//   };

//   if (!mounted) return <div className="min-h-screen bg-black" />;

//   if (orderSuccess) {
//     return (
//       <div className="min-h-screen flex flex-col bg-black text-white">
//         <Navbar />

//         <div className="flex-1 flex items-center justify-center p-4">
//           <div className="w-full max-w-2xl bg-zinc-950 border border-white/10 p-10 text-center">

//             <div className="w-20 h-20 bg-red-600 flex items-center justify-center mx-auto mb-8">
//               <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>

//             <h1 className="text-4xl md:text-5xl font-black uppercase italic mb-4">
//               Order Locked In
//             </h1>

//             {paymentMethod === "COD" ? (
//               <p className="text-gray-400 mb-8 uppercase tracking-widest">
//                 Your COD order is confirmed. We’ll send your tracking details on WhatsApp.
//               </p>
//             ) : (
//               <p className="text-gray-400 mb-8 uppercase tracking-widest">
//                 Your order is recorded. Our team will reach out to you shortly for payment.
//               </p>
//             )}

//             <Link
//               href="/"
//               className="inline-block bg-white text-black px-10 py-4 font-black uppercase hover:bg-red-600 hover:text-white transition-all"
//             >
//               Back Home
//             </Link>

//           </div>
//         </div>

//         <Footer />
//       </div>
//     );
//   }

//   if (cart.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col bg-black text-white">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center">
//           <div className="text-center">
//             <h1 className="text-4xl font-black uppercase italic">Cart Empty</h1>
//             <Link href="/products" className="mt-6 inline-block bg-white text-black px-6 py-3 font-bold">
//               Shop Now
//             </Link>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-black text-white">
//       <Navbar />

//       <div className="flex-1 pt-24 pb-20 max-w-7xl mx-auto px-4">

//         <h1 className="text-5xl font-black uppercase italic mb-12">
//           Secure <span className="text-red-600">Checkout</span>
//         </h1>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

//           {/* LEFT */}
//           <div className="lg:col-span-7">

//             <form onSubmit={handleSubmit} className="space-y-12">

//               {/* PAYMENT METHOD */}
//               <div className="space-y-4">
//                 <h3 className="text-xl font-black uppercase italic border-l-4 border-red-600 pl-4">
//                   Payment Method
//                 </h3>

//                 <div className="flex flex-col gap-3">

//                   <label className="flex items-center gap-3 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="payment"
//                       checked={paymentMethod === "COD"}
//                       onChange={() => setPaymentMethod("COD")}
//                     />
//                     <span className="text-white font-bold uppercase">Cash on Delivery</span>
//                   </label>

//                   <label className="flex items-center gap-3 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="payment"
//                       checked={paymentMethod === "Prepaid"}
//                       onChange={() => setPaymentMethod("Prepaid")}
//                     />
//                     <span className="text-white font-bold uppercase">Prepaid</span>
//                   </label>

//                 </div>
//               </div>

//               {/* CUSTOMER INFO */}
//               <div className="space-y-6">
//                 <h3 className="text-xl font-black uppercase italic border-l-4 border-red-600 pl-4">
//                   Identity
//                 </h3>

//                 <input
//                   type="text"
//                   name="name"
//                   required
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="FULL NAME"
//                   className="w-full bg-zinc-900 border border-zinc-800 text-white p-4"
//                 />

//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   placeholder="EMAIL"
//                   className="w-full bg-zinc-900 border border-zinc-800 text-white p-4"
//                 />

//                 <input
//                   type="tel"
//                   name="whatsapp"
//                   required
//                   value={formData.whatsapp}
//                   onChange={handleInputChange}
//                   placeholder="WHATSAPP"
//                   className="w-full bg-zinc-900 border border-zinc-800 text-white p-4"
//                 />

//                 <textarea
//                   name="address"
//                   required
//                   rows={3}
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   placeholder="ADDRESS"
//                   className="w-full bg-zinc-900 border border-zinc-800 text-white p-4"
//                 />

//                 <div className="grid grid-cols-3 gap-4">
//                   <input
//                     name="city"
//                     required
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     placeholder="CITY"
//                     className="bg-zinc-900 border border-zinc-800 text-white p-4"
//                   />

//                   <input
//                     name="state"
//                     required
//                     value={formData.state}
//                     onChange={handleInputChange}
//                     placeholder="STATE"
//                     className="bg-zinc-900 border border-zinc-800 text-white p-4"
//                   />

//                   <input
//                     name="pincode"
//                     required
//                     value={formData.pincode}
//                     onChange={handleInputChange}
//                     placeholder="PINCODE"
//                     className="bg-zinc-900 border border-zinc-800 text-white p-4"
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-red-600 text-white py-4 font-black uppercase tracking-widest hover:bg-red-700 transition"
//               >
//                 {isSubmitting ? 'PROCESSING...' : `Place Order (${formattedPrice(getTotalPrice())})`}
//               </button>

//             </form>
//           </div>

//           {/* RIGHT (Summary) */}
//           <div className="lg:col-span-5">
//             <div className="bg-zinc-950 p-6 border border-white/10 sticky top-24">

//               <h2 className="text-xl font-black uppercase italic mb-8">Order Summary</h2>

//               <div className="space-y-6 mb-8">
//                 {cart.map((item) => (
//                   <div key={item.cartId} className="flex gap-4">
//                     <img src={item.images[0]} className="w-20 h-24 object-cover bg-zinc-900" />
//                     <div>
//                       <h3 className="font-bold text-white text-sm">{item.name}</h3>
//                       <p className="text-gray-400 text-xs">Size: {item.size}</p>
//                       <p className="text-red-500 font-bold">{formattedPrice(item.price)}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="text-right">
//                 <p className="text-gray-400 text-sm">Subtotal</p>
//                 <p className="text-xl font-black text-red-600">{formattedPrice(getTotalPrice())}</p>
//               </div>

//             </div>
//           </div>

//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }
