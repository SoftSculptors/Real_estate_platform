'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt } from 'react-icons/fa';
import type { Property, CurrencyType } from '@/types/property';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number, currency: CurrencyType = 'EUR') => {
    const currencyLocale = {
      EUR: 'nl-NL',
      USD: 'en-US',
      GBP: 'en-GB'
    };

    return new Intl.NumberFormat(currencyLocale[currency], {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const title = property.titles['nl'] || property.titles['en'] || '';
  const mainImage = property.images[0]?.url || '/images/placeholder.jpg';
  const priceLabel = property.price_freq === 'sale' ? 'Te Koop' : 
    property.price_freq === 'month' ? 'Per Maand' : 'Per Week';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="summer-card group"
    >
      <Link href={`/properties/${property.id}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-lg">
          <img
            src={mainImage}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 z-10">
            <span className="summer-tag bg-cyan-500 text-white">
              {priceLabel}
            </span>
          </div>
          {property.new_build && (
            <div className="absolute top-4 left-4 z-10">
              <span className="summer-tag bg-orange-400 text-white">
                Nieuwbouw
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-slate-800 group-hover:text-cyan-600 transition-colors">
            {title}
          </h3>
          
          <p className="text-2xl font-bold text-cyan-600 mb-4">
            {formatPrice(property.price, property.currency)}
          </p>
          
          <p className="text-slate-600 mb-4 flex items-center">
            <FaMapMarkerAlt className="w-4 h-4 mr-2 text-orange-400" />
            {property.town}, {property.province}
          </p>

          <div className="flex items-center justify-between text-slate-600 bg-slate-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <FaBed className="w-4 h-4 text-cyan-500" />
              <span>{property.beds}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaBath className="w-4 h-4 text-cyan-500" />
              <span>{property.baths}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaRuler className="w-4 h-4 text-cyan-500" />
              <span>{property.built_area}m²</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
