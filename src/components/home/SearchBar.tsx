'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { searchProperties } from '@/utils/search';

type Suggestion = {
  text: string;
  type: 'location' | 'property';
};

export default function SearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      window.location.href = `/properties?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const getSuggestions = useCallback((query: string) => {
    // Simuleer suggesties op basis van de query
    // In een echte implementatie zou dit data van de API gebruiken
    const locationSuggestions = ['Alicante', 'Torrevieja', 'Murcia', 'Costa Blanca', 'Costa Cálida']
      .filter(loc => loc.toLowerCase().includes(query.toLowerCase()))
      .map(text => ({ text, type: 'location' as const }));

    const propertySuggestions = ['Villa', 'Appartement', 'Penthouse', 'Studio', 'Duplex', 'Nieuwbouw']
      .filter(type => type.toLowerCase().includes(query.toLowerCase()))
      .map(text => ({ text, type: 'property' as const }));

    return [...locationSuggestions, ...propertySuggestions].slice(0, 5);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const newSuggestions = getSuggestions(searchQuery);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, getSuggestions]);

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
    window.location.href = `/properties?q=${encodeURIComponent(suggestion.text)}`;
  };

  return (
    <div className="relative w-full">
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
              onFocus={() => setShowSuggestions(true)}
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

      {/* Suggesties dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.type}-${index}`}
              className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {suggestion.type === 'location' ? '📍' : '🏠'}
              </span>
              <span>{suggestion.text}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
