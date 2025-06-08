'use client';

import { useState } from 'react';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaLink } from 'react-icons/fa';

type SharePropertyProps = {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
};

export default function ShareProperty({ title, description, imageUrl, url }: SharePropertyProps) {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${url}`)}`,
  };

  // Preload the image for social media
  const preloadImage = () => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = imageUrl;
    document.head.appendChild(link);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4 text-slate-800">Delen</h2>
      <div className="flex gap-4">
        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          onClick={preloadImage}
          className="flex items-center justify-center w-10 h-10 bg-[#1877F2] text-white rounded-full hover:bg-[#166FE5] transition-colors"
          aria-label="Deel op Facebook"
        >
          <FaFacebookF className="w-5 h-5" />
        </a>
        <a
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          onClick={preloadImage}
          className="flex items-center justify-center w-10 h-10 bg-[#1DA1F2] text-white rounded-full hover:bg-[#1A91DA] transition-colors"
          aria-label="Deel op Twitter"
        >
          <FaTwitter className="w-5 h-5" />
        </a>
        <a
          href={shareUrls.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={preloadImage}
          className="flex items-center justify-center w-10 h-10 bg-[#25D366] text-white rounded-full hover:bg-[#22C35E] transition-colors"
          aria-label="Deel via WhatsApp"
        >
          <FaWhatsapp className="w-5 h-5" />
        </a>
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center w-10 h-10 bg-slate-600 text-white rounded-full hover:bg-slate-700 transition-colors relative"
          aria-label="Kopieer link"
        >
          <FaLink className="w-5 h-5" />
          {showCopied && (
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-green-600 whitespace-nowrap">
              Link gekopieerd!
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
