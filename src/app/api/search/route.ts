import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  console.log('Search query:', query);

  if (!query) {
    return NextResponse.json({ properties: [] });
  }

  try {
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
    const propertyTypeMatch = findPropertyTypeMatch(query);
    console.log('Property type match:', propertyTypeMatch);
    
    // Base query
    let dbQuery = supabase
      .from('properties')
      .select(`
        *,
        property_titles (language, title),
        property_images (url)
      `);

    // Apply search filter
    if (propertyTypeMatch) {
      // If it matches a property type, search by that type
      console.log('Searching by type:', propertyTypeMatch);
      dbQuery = dbQuery.eq('type', propertyTypeMatch);
    } else {
      // Otherwise search in location fields (case-insensitive)
      const searchTerm = query.toLowerCase();
      console.log('Searching by location:', searchTerm);
      // Use separate or conditions
      dbQuery = dbQuery
        .or('town.ilike.%' + searchTerm + '%')
        .or('province.ilike.%' + searchTerm + '%')
        .or('costa.ilike.%' + searchTerm + '%');
    }

    const { data: properties, error } = await dbQuery
      .order('created_at', { ascending: false });
      
    console.log('Found properties:', properties?.length);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Error fetching properties' }, { status: 500 });
    }

    const formattedProperties = properties.map((property: any) => ({
      ...property,
      title: property.property_titles?.find((t: any) => t.language === 'nl')?.title || 
             property.property_titles?.find((t: any) => t.language === 'en')?.title || '',
      image: property.property_images?.[0]?.url || ''
    }));

    return NextResponse.json({ properties: formattedProperties });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
