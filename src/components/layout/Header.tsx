'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-gray-900"
            >
              Real Estate NL
            </motion.div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/properties" className="text-gray-700 hover:text-gray-900 transition-colors">
              Woningen
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 transition-colors">
              Over Ons
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:+31612345678" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
              <FaPhone className="h-4 w-4" />
              <span>+31 6 1234 5678</span>
            </a>
            <a href="mailto:info@realestate.nl" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
              <FaEnvelope className="h-4 w-4" />
              <span>info@realestate.nl</span>
            </a>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
        </div>
      </div>
    </header>
  );
}
