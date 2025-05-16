import { Property } from '@/types/property';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import PropertyCard from '@/components/properties/PropertyCard';
import Filters from '@/components/properties/Filters';

const PROPERTY_TYPES = [
  'Apartment',
  'Bungalow',
  'Penthouse',
  'Quad House',
  'Town House',
  'Villa'
] as const;

// Dutch translations for property types
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

export default async function PropertiesPage({ 
  searchParams 
}: { 
  searchParams: { 
    page?: string, 
    q?: string,
    type?: string,
    province?: string,
    costa?: string,
    minPrice?: string,
    maxPrice?: string,
    minBeds?: string,
    maxBeds?: string,
    maxBeachDistance?: string,
    sortBy?: string
  } 
}) {
  try {
    const ITEMS_PER_PAGE = 24;
    const currentPage = parseInt(searchParams.page || '1');
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE - 1;

    // Get total count and unique locations
    const [countResult, locationsResult] = await Promise.all([
      supabase
        .from('properties')
        .select('id', { count: 'exact', head: true }),
      supabase
        .from('properties')
        .select('province, costa')
        .limit(1000)
    ]);

    const totalCount = countResult.count;
    const uniqueLocations = locationsResult.data;

    // Get properties for current page with pagination

    // Build the query
    let query = supabase
      .from('properties')
      .select(`
        *,
        property_titles (language, title),
        property_descriptions (language, description),
        property_images (url)
      `);

    // Apply filters
    if (searchParams.type) {
      query = query.eq('type', searchParams.type);
    }
    if (searchParams.province) {
      query = query.eq('province', searchParams.province);
    }
    if (searchParams.costa) {
      query = query.eq('costa', searchParams.costa);
    }
    if (searchParams.minPrice) {
      query = query.gte('price', parseInt(searchParams.minPrice));
    }
    if (searchParams.maxPrice) {
      query = query.lte('price', parseInt(searchParams.maxPrice));
    }
    if (searchParams.minBeds) {
      query = query.gte('beds', parseInt(searchParams.minBeds));
    }
    if (searchParams.maxBeds) {
      query = query.lte('beds', parseInt(searchParams.maxBeds));
    }
    // Beach distance filtering removed until column is added

    // Apply sorting
    if (searchParams.sortBy) {
      switch (searchParams.sortBy) {
        case 'price_asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price_desc':
          query = query.order('price', { ascending: false });
          break;
        case 'beds_asc':
          query = query.order('beds', { ascending: true });
          break;
        case 'beds_desc':
          query = query.order('beds', { ascending: false });
          break;
        // Beach distance sorting removed until column is added
        default:
          query = query.order('created_at', { ascending: false });
      }
    } else {
      // Default sorting: newest first
      query = query.order('created_at', { ascending: false });
    }

    // Apply search filter if search query exists
    if (searchParams.q) {
      const searchQuery = searchParams.q;
      console.log('\n=== Search Query ===');
      console.log('Original search query:', searchQuery);
      
      // Function to find closest property type match
      const findPropertyTypeMatch = (input: string): string | null => {
        const normalizedInput = input.toLowerCase().trim();
        
        // First try Dutch translation
        const translatedType = DUTCH_TRANSLATIONS[normalizedInput];
        if (translatedType) return translatedType;

        // Then try exact match (case-insensitive)
        const exactMatch = PROPERTY_TYPES.find(
          type => type.toLowerCase() === normalizedInput
        );
        if (exactMatch) return exactMatch;

        // Then try matching with spaces removed
        const noSpaceInput = normalizedInput.replace(/\s+/g, '');
        // Check Dutch translations without spaces
        const translatedNoSpace = Object.entries(DUTCH_TRANSLATIONS).find(
          ([dutch]) => dutch.replace(/\s+/g, '') === noSpaceInput
        );
        if (translatedNoSpace) return translatedNoSpace[1];
        
        // Try English without spaces
        const noSpaceMatch = PROPERTY_TYPES.find(
          type => type.toLowerCase().replace(/\s+/g, '') === noSpaceInput
        );
        if (noSpaceMatch) return noSpaceMatch;

        // Try prefix match in both languages
        for (const [dutch, english] of Object.entries(DUTCH_TRANSLATIONS)) {
          if (dutch.startsWith(normalizedInput)) return english;
        }
        
        const prefixMatches = PROPERTY_TYPES.filter(type => {
          const words = type.toLowerCase().split(' ');
          return words[0] === normalizedInput;
        });
        if (prefixMatches.length === 1) return prefixMatches[0];

        return null;
      };

      // Try to find a property type match
      const propertyTypeMatch = findPropertyTypeMatch(searchQuery);
      console.log('Property type match:', propertyTypeMatch);
      
      if (propertyTypeMatch) {
        // If it matches a property type, search by that type
        console.log('Searching by type:', propertyTypeMatch);
        query = query.eq('type', propertyTypeMatch);
      } else {
        // Otherwise search in location fields (case-insensitive)
        const searchTerm = searchQuery.toLowerCase();
        console.log('Searching by location:', searchTerm);
        query = query
          .or('town.ilike.%' + searchTerm + '%')
          .or('province.ilike.%' + searchTerm + '%')
          .or('costa.ilike.%' + searchTerm + '%');
      }
      
      // Log the final query config
      console.log('Final query config:', {
        searchTerm: searchQuery,
        propertyTypeMatch,
        filter: propertyTypeMatch ? `type = ${propertyTypeMatch}` : `town/province/costa ilike %${searchQuery.toLowerCase()}%`
      });
    }

    // Log the full query for debugging
    console.log('Query:', query.toString());

    const { data: propertiesData, error } = await query
      .range(start, end)
      .order('id', { ascending: true });

    console.log('Query result:', { propertiesData, error });
    if (error) {
      console.error('Database error:', error);
    } else {
      console.log('Number of properties found:', propertiesData?.length || 0);
      if (propertiesData && propertiesData.length > 0) {
        console.log('First property:', {
          town: propertiesData[0].town,
          province: propertiesData[0].province,
          costa: propertiesData[0].costa,
          type: propertiesData[0].type
        });
      }
    }

    if (error) {
      console.error('Error fetching properties:', error);
      return (
        <main className="container mx-auto px-4 py-8 pt-20">
          <h1 className="text-3xl font-bold mb-8">Woningen</h1>
          <div className="text-center py-12">
            <p className="text-xl text-red-600">
              Er is een fout opgetreden bij het laden van de woningen.
            </p>
          </div>
        </main>
      );
    }

    if (!propertiesData || propertiesData.length === 0) {
      return (
        <main className="container mx-auto px-4 py-8 pt-20">
          <h1 className="text-3xl font-bold mb-8">Woningen</h1>
          <div className="text-center py-12">
            <p className="text-lg text-[#2F2F2F]">
              Geen woningen gevonden
            </p>
          </div>
        </main>
      );
    }

    type PropertyTitle = { language: string; title: string };
    type PropertyDescription = { language: string; description: string };
    type PropertyFeature = { feature: string };
    type PropertyImage = { url: string };

    const properties = propertiesData.map(p => ({
      ...p,
      titles: p.property_titles?.reduce((acc: Record<string, string>, t: PropertyTitle) => 
        ({ ...acc, [t.language]: t.title }), {}),
      descriptions: p.property_descriptions?.reduce((acc: Record<string, string>, d: PropertyDescription) => 
        ({ ...acc, [d.language]: d.description }), {}),
      features: p.property_features?.map((f: PropertyFeature) => f.feature) || [],
      images: p.property_images?.map((i: PropertyImage) => ({ id: i.url, url: i.url })) || []
    }));

    const totalPages = Math.ceil((totalCount || 0) / ITEMS_PER_PAGE);
    const showingStart = start + 1;
    const showingEnd = Math.min(end + 1, totalCount || 0);

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
              locations={uniqueLocations || []}
            />
          </div>

          <div className="flex justify-end mb-6">
            <p className="summer-tag bg-[#E6D4A8] text-[#5B3924]">
              {showingStart}-{showingEnd} van {totalCount} woningen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property as Property} />
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
    // Get unique locations for filters
    const { data: locations } = await supabase
      .from('properties')
      .select('province, costa')
      .limit(1000);

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Woningen</h1>
        
        {/* Filters */}
        <Filters
          propertyTypes={Array.from(PROPERTY_TYPES)}
          locations={locations || []}
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
