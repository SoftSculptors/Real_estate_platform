'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Image {
  id: string;
  url: string;
}

interface ImageGalleryProps {
  images: Image[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[currentImageIndex];

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl summer-card">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage.id}
            src={currentImage.url}
            alt={`${title} - Afbeelding ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            {currentImageIndex > 0 && (
              <button
                onClick={() => setCurrentImageIndex(i => i - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all hover:scale-110"
                aria-label="Vorige foto"
              >
                <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {currentImageIndex < images.length - 1 && (
              <button
                onClick={() => setCurrentImageIndex(i => i + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all hover:scale-110"
                aria-label="Volgende foto"
              >
                <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative aspect-[4/3] overflow-hidden rounded-lg transition-all ${
                index === currentImageIndex 
                  ? 'ring-2 ring-cyan-500 ring-offset-2' 
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={image.url}
                alt={`${title} - Miniatuur ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
