

// app/checkout/page.js
'use client';

import { useState } from 'react';
import { useCart } from '../../components/CartContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

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
      formPayload.append(FORM_ENTRY_IDS[key], value);
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
      setOrderSuccess(true);
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  /** ----------------------------
   * EMPTY CART PAGE
   * ---------------------------- */
  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <Link
              href="/"
              className="px-6 py-3 bg-navy text-white rounded-xl font-medium hover:bg-navy/90"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  /** ----------------------------
   * ORDER SUCCESS PAGE
   * ---------------------------- */
  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              We'll contact you on WhatsApp with shipping updates soon.
            </p>
            <Link
              href="/"
              className="px-6 py-3 bg-navy text-white rounded-xl font-medium hover:bg-navy/90"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  /** ----------------------------
   * MAIN CHECKOUT PAGE
   * ---------------------------- */
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-1 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* TITLE */}
          <h1 className="text-3xl font-bold text-gray-900 mb-10">Checkout</h1>

          {/* GRID: ORDER SUMMARY + FORM */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* --------------------------------------
             * LEFT: ORDER SUMMARY (PREMIUM)
             * -------------------------------------- */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Order Summary
              </h2>

              <div className="space-y-5">
                {cart.map((item) => (
                  <div
                    key={item.cartId}
                    className="flex items-start gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all"
                  >
                    {/* IMAGE - NO GREY BOX, FULL PREMIUM */}
                    <div className="w-28 h-28 rounded-xl overflow-hidden shadow-md flex-shrink-0 bg-white">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* PRODUCT DETAILS */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Size: <span className="font-medium">{item.size}</span> • Qty:{' '}
                        <span className="font-medium">{item.quantity}</span>
                      </p>

                      <p className="text-base font-bold text-gray-900 mt-3">
                        {formattedPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* TOTAL BOX */}
              <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total Amount:</span>
                  <span className="text-navy">{formattedPrice(getTotalPrice())}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Free Shipping Included
                </p>
              </div>
            </div>

            {/* --------------------------------------
             * RIGHT: CUSTOMER FORM (PREMIUM)
             * -------------------------------------- */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Customer Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* INPUT FIELDS */}
                {[
                  { name: 'name', label: 'Full Name *', type: 'text', placeholder: 'Enter your full name' },
                  { name: 'email', label: 'Email Address *', type: 'email', placeholder: 'your.email@example.com' },
                  { name: 'whatsapp', label: 'WhatsApp Number *', type: 'tel', placeholder: '+91 98765 43210' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      required
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-navy focus:outline-none"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}

                {/* ADDRESS BOX */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shipping Address *
                  </label>
                  <textarea
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-navy focus:outline-none"
                    placeholder="Full address with landmark"
                  />
                </div>

                {/* CITY + PINCODE */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-navy"
                      placeholder="Your city"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode *
                    </label>
                    <input
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-navy"
                      placeholder="6-digit pincode"
                    />
                  </div>
                </div>

                {/* STATE */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-navy"
                    placeholder="Your state"
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-navy text-white font-semibold hover:bg-navy/90 transition disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Submitting Order...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  After submitting, please check Google Form responses to confirm.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
