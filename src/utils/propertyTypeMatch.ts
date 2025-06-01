export const PROPERTY_TYPES = [
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

// Dutch translations for property types
export const DUTCH_TRANSLATIONS: Record<string, string> = {
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

export function findPropertyTypeMatch(input: string): string | null {
  const normalizedInput = input.toLowerCase().trim();
  
  // Direct match in translations
  if (normalizedInput in DUTCH_TRANSLATIONS) {
    return DUTCH_TRANSLATIONS[normalizedInput];
  }
  
  // Direct match in property types
  const directMatch = PROPERTY_TYPES.find(
    type => type.toLowerCase() === normalizedInput
  );
  if (directMatch) return directMatch;
  
  // Fuzzy match in translations
  for (const [dutch, english] of Object.entries(DUTCH_TRANSLATIONS)) {
    if (dutch.toLowerCase().includes(normalizedInput) ||
        english.toLowerCase().includes(normalizedInput)) {
      return english;
    }
  }
  
  // Fuzzy match in property types
  for (const type of PROPERTY_TYPES) {
    if (type.toLowerCase().includes(normalizedInput)) {
      return type;
    }
  }
  
  return null;
}
