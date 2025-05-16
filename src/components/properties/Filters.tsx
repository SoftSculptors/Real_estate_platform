'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, AdjustmentsHorizontalIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';

interface FiltersProps {
  propertyTypes: string[];
  locations: {
    province: string;
    costa: string;
  }[];
}

export default function Filters({ propertyTypes, locations }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State for filter values
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    province: searchParams.get('province') || '',
    costa: searchParams.get('costa') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minBeds: searchParams.get('minBeds') || '',
    maxBeds: searchParams.get('maxBeds') || '',
    maxBeachDistance: searchParams.get('maxBeachDistance') || '',
    sortBy: searchParams.get('sortBy') || 'newest'
  });

  // Get unique provinces and costas
  const provinces = [...new Set(locations.map(l => l.province))].sort();
  const costas = [...new Set(locations.map(l => l.costa))].sort();

  // Handle filter changes
  const handleFilterChange = (name: string, value: string) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    
    // Build query string
    const params = new URLSearchParams();
    // Copy current search params
    for (const [key, val] of Array.from(searchParams.entries())) {
      if (key !== name) { // Don't copy the parameter we're updating
        params.set(key, val);
      }
    }
    // Update with new value
    if (value) {
      params.set(name, value);
    }
    
    // Update URL
    router.push(`/properties?${params.toString()}`);
  };

  // Handle reset filters
  const handleReset = () => {
    // Reset local state
    setFilters({
      type: '',
      province: '',
      costa: '',
      minPrice: '',
      maxPrice: '',
      minBeds: '',
      maxBeds: '',
      maxBeachDistance: '',
      sortBy: 'newest'
    });
    
    // Reset URL parameters
    const params = new URLSearchParams();
    params.set('page', '1');
    router.push(`/properties?${params.toString()}`);
  };

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <div className="bg-[#FFFDF6] border-b border-[#E6D4A8]">
      <div className="container mx-auto px-4 py-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Filters Dropdown */}
          <div className="flex-1">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="w-full flex items-center justify-between bg-white border-2 border-[#E6D4A8] rounded-lg p-3 text-[#5B3924] hover:border-[#8B573C] transition-colors group"
            >
              <div className="flex items-center gap-2">
                <AdjustmentsHorizontalIcon className="w-5 h-5 text-[#8B573C]" />
                <span>Filters</span>
              </div>
              {isFiltersOpen ? (
                <ChevronUpIcon className="w-5 h-5 text-[#8B573C]" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-[#8B573C]" />
              )}
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="w-full sm:w-72">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="w-full flex items-center justify-between bg-white border-2 border-[#E6D4A8] rounded-lg p-3 text-[#5B3924] hover:border-[#8B573C] transition-colors group"
            >
              <div className="flex items-center gap-2">
                <ArrowsUpDownIcon className="w-5 h-5 text-[#8B573C]" />
                <span>Sorteren op</span>
              </div>
              {isSortOpen ? (
                <ChevronUpIcon className="w-5 h-5 text-[#8B573C]" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-[#8B573C]" />
              )}
            </button>

            {/* Sort Options */}
            {isSortOpen && (
              <div className="absolute z-50 mt-2 w-72 bg-white border-2 border-[#E6D4A8] rounded-lg shadow-lg overflow-hidden">
                <div className="p-2">
                  {[
                    { value: 'newest', label: 'Nieuwste eerst' },
                    { value: 'price_asc', label: 'Prijs laag naar hoog' },
                    { value: 'price_desc', label: 'Prijs hoog naar laag' },
                    { value: 'beds_asc', label: 'Slaapkamers oplopend' },
                    { value: 'beds_desc', label: 'Slaapkamers aflopend' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        handleFilterChange('sortBy', option.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm rounded-md hover:bg-[#FFFDF6] ${filters.sortBy === option.value ? 'text-[#8B573C] font-medium' : 'text-[#5B3924]'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reset Filters */}
        {(filters.type || filters.province || filters.costa || filters.minPrice || filters.maxPrice || filters.minBeds || filters.maxBeds || filters.maxBeachDistance) && (
          <div className="flex justify-end">
            <button
              onClick={handleReset}
              className="text-sm text-[#8B573C] hover:text-[#5B3924] underline"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Filter Options */}
        {isFiltersOpen && (
          <div className="pt-4 border-t border-[#E6D4A8] space-y-8">
            {/* Location Group */}
            <div>
              <h3 className="text-[15px] font-medium text-[#8B573C] mb-4">Locatie</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {/* Province */}
                <div>
                  <label className="block text-sm text-[#5B3924] mb-2">Provincie</label>
                  <select
                    value={filters.province}
                    onChange={(e) => handleFilterChange('province', e.target.value)}
                    className="w-full bg-white border-2 border-[#E6D4A8] rounded-lg p-2.5 text-[#5B3924] focus:border-[#8B573C] focus:ring-[#8B573C] transition-colors"
                  >
                    <option value="">Alle provincies</option>
                    {provinces.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                </div>

                {/* Costa */}
                <div>
                  <label className="block text-sm text-[#5B3924] mb-2">Costa</label>
                  <select
                    value={filters.costa}
                    onChange={(e) => handleFilterChange('costa', e.target.value)}
                    className="w-full bg-white border-2 border-[#E6D4A8] rounded-lg p-2.5 text-[#5B3924] focus:border-[#8B573C] focus:ring-[#8B573C] transition-colors"
                  >
                    <option value="">Alle costas</option>
                    {costas.map(costa => (
                      <option key={costa} value={costa}>{costa}</option>
                    ))}
                  </select>
                </div>

                {/* Beach Distance */}
                <div>
                  <label className="block text-sm text-[#5B3924] mb-2">Max. afstand tot strand</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Maximum afstand"
                      value={filters.maxBeachDistance}
                      onChange={(e) => handleFilterChange('maxBeachDistance', e.target.value)}
                      className="w-full bg-white border-2 border-[#E6D4A8] rounded-lg p-2.5 pr-12 text-[#5B3924] focus:border-[#8B573C] focus:ring-[#8B573C] transition-colors"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B573C]">km</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Details Group */}
            <div>
              <h3 className="text-[15px] font-medium text-[#8B573C] mb-4">Woning details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Property Type */}
                <div>
                  <label className="block text-sm text-[#5B3924] mb-2">Type woning</label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full bg-white border-2 border-[#E6D4A8] rounded-lg p-2.5 text-[#5B3924] focus:border-[#8B573C] focus:ring-[#8B573C] transition-colors"
                  >
                    <option value="">Alle types</option>
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm text-[#5B3924] mb-2">Prijs range</label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B573C]">€</span>
                      <input
                        type="number"
                        placeholder="Minimum"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        className="w-full pl-7 bg-white border-2 border-[#E6D4A8] rounded-lg p-2.5 text-[#5B3924] focus:border-[#8B573C] focus:ring-[#8B573C] transition-colors"
                      />
                    </div>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B573C]">€</span>
                      <input
                        type="number"
                        placeholder="Maximum"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        className="w-full pl-7 bg-white border-2 border-[#E6D4A8] rounded-lg p-2.5 text-[#5B3924] focus:border-[#8B573C] focus:ring-[#8B573C] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm text-[#5B3924] mb-2">Slaapkamers</label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      placeholder="Minimum"
                      value={filters.minBeds}
                      onChange={(e) => handleFilterChange('minBeds', e.target.value)}
                      className="flex-1 bg-white border-2 border-[#E6D4A8] rounded-lg p-2.5 text-[#5B3924] focus:border-[#8B573C] focus:ring-[#8B573C] transition-colors"
                    />
                    <input
                      type="number"
                      placeholder="Maximum"
                      value={filters.maxBeds}
                      onChange={(e) => handleFilterChange('maxBeds', e.target.value)}
                      className="flex-1 bg-white border-2 border-[#E6D4A8] rounded-lg p-2.5 text-[#5B3924] focus:border-[#8B573C] focus:ring-[#8B573C] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
