'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="fixed w-full bg-[#FFFDF6]/90 backdrop-blur-sm shadow-sm z-50 border-b border-[#E6D4A8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center h-24">
          <Link href="/" className="flex items-center justify-center w-full sm:w-auto sm:justify-start">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Image
                src="/images/ole-wonen-logo.png"
                alt="Olé Wonen - Uw betrouwbare partner voor het kopen van een huis in Spanje"
                width={800}
                height={266}
                className="h-28 w-auto"
              />
            </motion.div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/properties" className="text-[#2F2F2F] hover:text-[#F5C242] transition-colors">
              Woningen
            </Link>
            <Link href="/about" className="text-[#2F2F2F] hover:text-[#F5C242] transition-colors">
              Over Ons
            </Link>
            <Link href="/contact" className="text-[#2F2F2F] hover:text-[#F5C242] transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:+32484378165" className="flex items-center space-x-2 text-[#2F2F2F] hover:text-[#F5C242]">
              <FaPhone className="h-4 w-4" />
              <span>+32 484 37 81 65</span>
            </a>
            <a href="mailto:info@annemansautomotive.com" className="flex items-center space-x-2 text-[#2F2F2F] hover:text-[#F5C242]">
              <FaEnvelope className="h-4 w-4" />
              <span>info@annemansautomotive.com</span>
            </a>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[#E6D4A8] hover:text-[#D4B87D] hover:bg-gray-100/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#E6D4A8]"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#E6D4A8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
        </div>
      </div>
    </header>
  );
}
