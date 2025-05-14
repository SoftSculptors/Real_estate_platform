import { Property } from '@/types/property';
import { supabase } from '@/lib/supabase';
import PropertyCard from '@/components/properties/PropertyCard';

export default async function PropertiesPage({ searchParams }: { searchParams: { page?: string } }) {
  try {
    const ITEMS_PER_PAGE = 24;
    const currentPage = parseInt(searchParams.page || '1');
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE - 1;

    // Get total count
    const { count: totalCount } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true });

    // Get properties for current page
    const { data: propertiesData, error } = await supabase
      .from('properties')
      .select(`
        *,
        property_titles (language, title),
        property_descriptions (language, description),
        property_features (feature),
        property_images (url)
      `)
      .range(start, end)
      .order('id', { ascending: true });

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
            <p className="text-xl text-gray-600">
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
      <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white pt-28">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Woningen in Spanje</h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Ontdek uw droomhuis onder de Spaanse zon, van moderne appartementen aan de kust tot luxe villa's met zeezicht.
            </p>
          </div>

          <div className="flex justify-end mb-6">
            <p className="summer-tag bg-cyan-100 text-cyan-700">
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
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Woningen</h1>
        <div className="text-center py-12">
          <p className="text-xl text-red-600">
            Er is een fout opgetreden bij het laden van de woningen.
          </p>
        </div>
      </main>
    );
  }
}
