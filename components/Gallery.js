
// components/Gallery.js
'use client';

import { useState } from 'react';

export default function Gallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={images[selectedImage]}
          alt={`Product view ${selectedImage + 1}`}
          className="w-full h-full object-contain p-8"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square overflow-hidden rounded-lg border-2 bg-gray-50 ${
              selectedImage === index ? 'border-navy' : 'border-transparent'
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-contain p-2 hover:opacity-80 transition-opacity"
            />
          </button>
        ))}
      </div>
    </div>
  );
}