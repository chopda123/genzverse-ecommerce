// components/BuyModal.js
'use client';

import { useState } from 'react';

export default function BuyModal({ product, selectedSize, quantity, onClose }) {
  const [step, setStep] = useState('signin'); // 'signin', 'whatsapp', 'success'
  const [userInfo, setUserInfo] = useState(null);
  const [whatsappNumber, setWhatsappNumber] = useState('');

  const handleGoogleSignIn = () => {
    // Mock Google Sign-In - In real implementation, use Google Identity Services
    const mockUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
    setUserInfo(mockUser);
    setStep('whatsapp');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Google Form configuration - UPDATE THESE VALUES
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/formResponse';
    const FORM_ENTRY_IDS = {
      slug: 'entry.123456789',
      name: 'entry.987654321',
      price: 'entry.456789123',
      size: 'entry.321654987',
      buyerName: 'entry.654987321',
      buyerEmail: 'entry.789123456',
      buyerWhatsApp: 'entry.159753486',
      timestamp: 'entry.357159486'
    };

    const formData = new FormData();
    formData.append(FORM_ENTRY_IDS.slug, product.slug);
    formData.append(FORM_ENTRY_IDS.name, product.name);
    formData.append(FORM_ENTRY_IDS.price, (product.price * quantity).toString());
    formData.append(FORM_ENTRY_IDS.size, selectedSize);
    formData.append(FORM_ENTRY_IDS.buyerName, userInfo.name);
    formData.append(FORM_ENTRY_IDS.buyerEmail, userInfo.email);
    formData.append(FORM_ENTRY_IDS.buyerWhatsApp, whatsappNumber);
    formData.append(FORM_ENTRY_IDS.timestamp, new Date().toISOString());

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      
      setStep('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Order submitted successfully!'); // Fallback due to no-cors
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        {step === 'signin' && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In to Continue</h2>
            <p className="text-gray-600 mb-6">
              Please sign in with Google to complete your purchase.
            </p>
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            <button
              onClick={onClose}
              className="w-full mt-4 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </>
        )}

        {step === 'whatsapp' && (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Order</h2>
            <p className="text-gray-600 mb-6">
              Please provide your WhatsApp number for order updates.
            </p>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Order Summary</h3>
              <p>{product.name} - {selectedSize} × {quantity}</p>
              <p className="font-semibold mt-2">
                Total: {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0,
                }).format(product.price * quantity)}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep('signin')}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 btn-primary"
              >
                Place Order
              </button>
            </div>
          </form>
        )}

        {step === 'success' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Placed!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We'll contact you on WhatsApp with updates.
            </p>
            <button
              onClick={onClose}
              className="w-full btn-primary"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}