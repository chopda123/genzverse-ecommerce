// components/Logo.js
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Logo({ size = 'medium', showText = true, href = '/' }) {
  const [logoError, setLogoError] = useState(false);

  const sizes = {
    small: 'h-10 w-10',
    medium: 'h-17 w-17',
    large: 'h-24 w-24'
  };

  const textSizes = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl'
  };

  return (
    <Link href={href} className="flex items-center space-x-3">
      <div className="flex items-center justify-center">
        {!logoError ? (
          <img 
            src="/logo/logo.png" 
            alt="GenZverse" 
            className={`${sizes[size]} object-contain rounded-full`}
            onError={() => setLogoError(true)}
          />
        ) : (
          <div className={`${sizes[size]} bg-gradient-to-br from-gold to-peach rounded-full flex items-center justify-center shadow-lg`}>
            <span className="text-navy font-bold text-sm">GZ</span>
          </div>
        )}
      </div>
      {showText && (
        <div className="hidden sm:block">
          <h1 className={`${textSizes[size]} font-bold text-gold`}>GenZverse</h1>
        </div>
      )}
    </Link>
  );
}