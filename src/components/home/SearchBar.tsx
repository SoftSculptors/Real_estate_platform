'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/properties?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <form className="flex flex-col md:flex-row gap-4" onSubmit={handleSearch}>
      <div className="flex-1">
        <div className="relative">
          <FaSearch className="absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Zoek op locatie of type woning..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#F5C242] focus:border-[#F5C242] transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-[#F5C242] text-[#5B3924] px-8 py-3 rounded-lg hover:bg-[#E6D4A8] transition-colors font-medium md:w-auto w-full"
      >
        Zoeken
      </button>
    </form>
  );
}
