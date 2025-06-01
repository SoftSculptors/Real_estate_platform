type PropertyType = {
  id: string;
  type: string;
  town: string;
  province: string;
  titles: {
    [key: string]: string;
  };
};

// Synoniemen voor verschillende woningtypes
const propertyTypeSynonyms: { [key: string]: string[] } = {
  'appartement': ['flat', 'studio', 'penthouse', 'apartment'],
  'villa': ['huis', 'woning', 'house', 'chalet', 'bungalow'],
  'penthouse': ['luxe appartement', 'dakappartement', 'luxury apartment'],
  'studio': ['kleine woning', 'small apartment'],
  'duplex': ['maisonette', 'two-floor apartment', 'twee verdiepingen'],
  'nieuwbouw': ['new build', 'nieuw', 'new construction', 'new development'],
};

// Locatie synoniemen en alternatieve schrijfwijzen
const locationSynonyms: { [key: string]: string[] } = {
  'alicante': ['allicante', 'alicant'],
  'torrevieja': ['torre vieja', 'torreveija'],
  'murcia': ['mursia', 'murcía'],
  'costa blanca': ['costablanca', 'witte kust'],
  'costa calida': ['costa cálida', 'costacalida', 'warme kust'],
};

// Bereken Levenshtein afstand voor fuzzy matching
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + substitutionCost
      );
    }
  }

  return matrix[b.length][a.length];
}

// Normaliseer tekst voor vergelijking
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '');
}

// Check of een woord overeenkomt met synoniemen
function matchesSynonyms(word: string, synonyms: string[]): boolean {
  const normalizedWord = normalizeText(word);
  return synonyms.some(synonym => {
    const normalizedSynonym = normalizeText(synonym);
    // Sta kleine typfouten toe (max 2 karakters verschil)
    return levenshteinDistance(normalizedWord, normalizedSynonym) <= 2;
  });
}

// Hoofdfunctie voor zoeken
export function searchProperties(query: string, properties: PropertyType[]): PropertyType[] {
  const normalizedQuery = normalizeText(query);
  const searchTerms = normalizedQuery.split(/\s+/);

  return properties.filter(property => {
    const propertyText = normalizeText([
      property.type,
      property.town,
      property.province,
      Object.values(property.titles).join(' ')
    ].join(' '));

    // Check elk zoekwoord
    return searchTerms.every(term => {
      // Check directe match met property tekst
      if (propertyText.includes(term)) return true;

      // Check property type synoniemen
      for (const [type, synonyms] of Object.entries(propertyTypeSynonyms)) {
        if (matchesSynonyms(term, synonyms) && propertyText.includes(normalizeText(type))) {
          return true;
        }
      }

      // Check locatie synoniemen
      for (const [location, synonyms] of Object.entries(locationSynonyms)) {
        if (matchesSynonyms(term, synonyms) && propertyText.includes(normalizeText(location))) {
          return true;
        }
      }

      // Fuzzy matching voor langere woorden (>3 karakters)
      if (term.length > 3) {
        const words = propertyText.split(/\s+/);
        return words.some(word => levenshteinDistance(term, word) <= 2);
      }

      return false;
    });
  });
}
