import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { Property } from '@/types/property';
import { supabase } from '@/lib/supabase';
import PropertyCard from '@/components/properties/PropertyCard';
import Filters from '@/components/properties/Filters';
import { FaBed, FaBath, FaRulerCombined, FaEuroSign } from 'react-icons/fa';

export const metadata = {
  title: 'Woningen te koop in Spanje - Costa Blanca & Costa Cálida | Olé Wonen',
  description: 'Blader door meer dan 1.000 woningen te koop in Spanje (Costa Blanca Noord/Zuid en Costa Cálida). Van moderne appartementen aan de kust tot luxe villa\'s met zeezicht – vind uw droomhuis via Olé Wonen.'
};

const ITEMS_PER_PAGE = 24;

const PROPERTY_TYPES = [
  'Apartment',
  'Bungalow',
  'Commercial',
  'Detached Villa',
  'Penthouse',
  'Quad House',
  'Semi-Detached',
  'Town House',
  'Townhouse',
  'Villa'
] as const;

const DUTCH_TRANSLATIONS: Record<string, string> = {
  'appartement': 'Apartment',
  'apartment': 'Apartment',
  'bungalow': 'Bungalow',
  'penthouse': 'Penthouse',
  'quad': 'Quad House',
  'quadhouse': 'Quad House',
  'quad woning': 'Quad House',
  'townhouse': 'Town House',
  'town house': 'Town House',
  'stadswoning': 'Town House',
  'villa': 'Villa'
};

type SearchParams = {
  page?: string;
  q?: string;
  type?: string;
  province?: string;
  costa?: string;
  minPrice?: string;
  maxPrice?: string;
  beds?: string;
  sortBy?: string;
};

type ViewProperty = {
  id: string;
  price: number;
  price_freq: 'sale' | 'month' | 'week';
  type: string;
  town: string;
  province: string;
  costa: string;
  beds: number;
  baths: number;
  built_area: number;
  property_titles: { language: string; title: string }[];
  property_images: { url: string }[];
};

type QueryResult = {
  propertiesData: ViewProperty[];
  totalProperties?: number;
  error: Error | null;
  locations: {
    provinces: string[];
    costas: string[];
  };
};



type ExtendedProperty = Property & {
  titles: { language: string; title: string }[];
  descriptions: { language: string; description: string }[];
  features: { feature: string }[];
  images: { url: string }[];
};

// Helper function to find property type matches
function getPropertyTypeMatches(searchTerms: string[]): string[] {
  return searchTerms
    .map((term: string) => {
      const normalizedTerm = term.toLowerCase().trim();
      
      // Direct match in translations
      if (normalizedTerm in DUTCH_TRANSLATIONS) {
        return DUTCH_TRANSLATIONS[normalizedTerm];
      }
      
      // Direct match in property types
      const directMatch = PROPERTY_TYPES.find(
        type => type.toLowerCase() === normalizedTerm
      );
      if (directMatch) return directMatch;
      
      // Fuzzy match in translations
      for (const [dutch, english] of Object.entries(DUTCH_TRANSLATIONS)) {
        if (dutch.toLowerCase().includes(normalizedTerm) ||
            english.toLowerCase().includes(normalizedTerm)) {
          return english;
        }
      }
      
      // Fuzzy match in property types
      for (const type of PROPERTY_TYPES) {
        if (type.toLowerCase().includes(normalizedTerm)) {
          return type;
        }
      }
      
      return null;
    })
    .filter((type): type is string => type !== null);
}

// Helper function to get properties with filters
async function getProperties(params: SearchParams): Promise<QueryResult> {
  try {
    // First get unique locations
    const { data: provinces } = await supabase
      .from('properties')
      .select('province')
      .not('province', 'is', null)
      .limit(100);

    const { data: costas } = await supabase
      .from('properties')
      .select('costa')
      .not('costa', 'is', null)
      .limit(100);

    // Then get properties with filters
    let query = supabase
      .from('properties')
      .select(`
        id,
        price,
        price_freq,
        type,
        town,
        province,
        costa,
        beds,
        baths,
        built_area,
        property_titles (language, title),
        property_images (url)
      `)
      .limit(100);

    // Add filters based on search params
    if (params.province) {
      query = query.eq('province', params.province);
    }

    if (params.costa) {
      query = query.eq('costa', params.costa);
    }

    if (params.minPrice) {
      query = query.gte('price', parseInt(params.minPrice));
    }

    if (params.maxPrice) {
      query = query.lte('price', parseInt(params.maxPrice));
    }

    if (params.beds) {
      query = query.eq('beds', parseInt(params.beds));
    }

    if (params.type) {
      query = query.eq('type', params.type);
    }

    // Add location search if provided
    if (params.q?.trim()) {
      const searchTerm = params.q.trim().toLowerCase();
      query = query.or(`province.ilike.%${searchTerm}%,costa.ilike.%${searchTerm}%,town.ilike.%${searchTerm}%`);
    }

    const { data, error } = await query;
    if (error) throw error;

    const uniqueProvinces = [...new Set(provinces?.map(p => p.province))];
    const uniqueCostas = [...new Set(costas?.map(c => c.costa))];

    return {
      propertiesData: data || [],
      totalProperties: data?.length || 0,
      error: null,
      locations: {
        provinces: uniqueProvinces || [],
        costas: uniqueCostas || []
      }
    };
  } catch (error) {
    console.error('Error fetching properties:', error);
    return {
      propertiesData: [],
      totalProperties: 0,
      error: error instanceof Error ? error : new Error('Unknown error'),
      locations: {
        provinces: [],
        costas: []
      }
    };
  }
}

export default async function PropertiesPage({ searchParams }: { searchParams: SearchParams }) {
  try {
    // Get properties with filters and pagination
    const { propertiesData, totalProperties, error, locations } = await getProperties(searchParams);
    
    if (error) throw error;

    // No need to process property data anymore since we're using BasicProperty
    const properties = propertiesData;

    const currentPage = parseInt(searchParams.page || '1');
    const totalPages = Math.ceil((totalProperties || 0) / ITEMS_PER_PAGE);
    const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(start + ITEMS_PER_PAGE - 1, totalProperties || 0);

    return (
      <main className="min-h-screen bg-[#FFFDF6] pt-28">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#5B3924] mb-4">
              {searchParams.q
                ? `Zoekresultaten voor "${searchParams.q}"`
                : 'Woningen in Spanje'
              }
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              {searchParams.q
                ? `Bekijk de gevonden woningen die overeenkomen met uw zoekopdracht.`
                : `Ontdek uw droomhuis onder de Spaanse zon, van moderne appartementen aan de kust tot luxe villa's met zeezicht.`
              }
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <Filters
              propertyTypes={Array.from(PROPERTY_TYPES)}
              locations={locations}
            />
          </div>

          <div className="flex justify-end mb-6">
            <p className="summer-tag bg-[#E6D4A8] text-[#5B3924]">
              {start}-{end} van {totalProperties} woningen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {properties.map((property) => (
              <Link 
                href={`/properties/${property.id}`} 
                key={property.id} 
                className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 hover:border-[#F5E6CC] border-2 border-transparent cursor-pointer"
              >
                <div className="relative h-48">
                  <img
                    src={property.property_images?.[0]?.url || '/images/placeholder.jpg'}
                    alt={property.property_titles?.find(t => t.language === 'nl')?.title || 
                         property.property_titles?.find(t => t.language === 'en')?.title || ''}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-[#E9B649] text-white px-3 py-1 m-2 rounded">
                    {property.price_freq === 'sale' ? 'Te Koop' :
                     property.price_freq === 'month' ? 'Per Maand' : 'Per Week'}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {property.property_titles?.find(t => t.language === 'nl')?.title || 
                     property.property_titles?.find(t => t.language === 'en')?.title || 'Geen titel'}
                  </h3>
                  <p className="text-[#E9B649] text-xl font-bold mb-2 flex items-center gap-2">
                    <FaEuroSign className="h-5 w-5" />
                    €{property.price.toLocaleString()}
                  </p>
                  <p className="text-gray-600 mb-2">{property.province}, {property.costa}</p>
                  <div className="grid grid-cols-3 gap-2 text-gray-600 text-sm mt-4 border-t pt-4">
                    <div className="flex items-center gap-2">
                      <FaBed className="h-5 w-5 text-[#E9B649]" />
                      <span>{property.beds} kamers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBath className="h-5 w-5 text-[#E9B649]" />
                      <span>{property.baths} baden</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaRulerCombined className="h-5 w-5 text-[#E9B649]" />
                      <span>{property.built_area}m²</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-3 py-4">
              {currentPage > 1 && (
                <a
                  href={`/properties?page=${currentPage - 1}`}
                  className="summer-button bg-cyan-600 hover:bg-cyan-500"
                >
                  Vorige
                </a>
              )}
              
              <span className="px-6 py-3 bg-white rounded-lg shadow-sm text-slate-700 font-medium">
                Pagina {currentPage} van {totalPages}
              </span>

              {currentPage < totalPages && (
                <a
                  href={`/properties?page=${currentPage + 1}`}
                  className="summer-button bg-cyan-600 hover:bg-cyan-500"
                >
                  Volgende
                </a>
              )}
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error in PropertiesPage:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Woningen</h1>
        
        {/* Filters */}
        <Filters
          propertyTypes={Array.from(PROPERTY_TYPES)}
          locations={{
            provinces: [],
            costas: []
          }}
        />
        <div className="text-center py-12">
          <p className="text-xl text-red-600">
            Er is een fout opgetreden bij het laden van de woningen.
          </p>
        </div>
      </div>
    );
  }
}
