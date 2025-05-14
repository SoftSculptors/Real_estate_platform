import Link from 'next/link';
import { FaSearch, FaMapMarkerAlt, FaBed, FaBath, FaRuler } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

interface PropertyTitle {
  language: string;
  title: string;
}

interface PropertyImage {
  url: string;
}

interface Property {
  id: string;
  title: string;
  image: string;
  new_build: boolean;
  town: string;
  province: string;
  beds: number;
  baths: number;
  built_area: number;
  price: number;
  property_titles: PropertyTitle[];
  property_images: PropertyImage[];
}

type RawProperty = Omit<Property, 'title' | 'image'> & {
  property_titles: PropertyTitle[];
  property_images: PropertyImage[];
};

async function getFeaturedProperties(): Promise<Property[]> {
  try {
    console.log('Fetching featured properties...');
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        property_titles (language, title),
        property_images (url)
      `)
      .eq('featured', true)
      .limit(6);

    if (error) {
      console.error('Supabase error:', error);
      return [];
    }

    console.log('Fetched data:', data);
    if (!data) return [];

    return data.map((property: RawProperty) => ({
      ...property,
      title: property.property_titles?.find((t: PropertyTitle) => t.language === 'nl')?.title || 
             property.property_titles?.find((t: PropertyTitle) => t.language === 'en')?.title || '',
      image: property.property_images?.[0]?.url || ''
    }));
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

export default async function Home() {
  const properties = await getFeaturedProperties();

  return (
    <main className="min-h-screen flex-grow pt-28">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-cover bg-center" 
               style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=2080)' }}>
        <div className="absolute inset-0 bg-slate-900/50"></div>
        <div className="relative text-center text-white space-y-6 px-4">
          <h1 className="text-5xl md:text-6xl font-bold">
            Vind Uw Droomhuis in Spanje
          </h1>
          <p className="text-xl md:text-2xl text-sky-100">
            Ontdek prachtige woningen aan de Spaanse kust
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mt-8">
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
              <form className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <FaSearch className="absolute left-4 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Zoek op locatie of type woning..."
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-cyan-600 text-white px-8 py-3 rounded-lg hover:bg-cyan-700 transition-colors font-medium md:w-auto w-full"
                >
                  Zoeken
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gradient-to-b from-sky-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Uitgelichte Woningen</h2>
            <p className="text-lg text-slate-600">Ontdek onze selectie van de mooiste properties in Spanje</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Link 
                href={`/properties/${property.id}`} 
                key={property.id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative aspect-[4/3] rounded-t-xl overflow-hidden">
                  <img
                    src={property.image || '/placeholder.jpg'}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {property.new_build && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Nieuwbouw
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 group-hover:text-cyan-600 transition-colors mb-2">
                    {property.title}
                  </h3>
                  <p className="flex items-center text-slate-600 mb-4">
                    <FaMapMarkerAlt className="w-4 h-4 text-orange-400 mr-2" />
                    {property.town}, {property.province}
                  </p>
                  <div className="flex items-center justify-between text-slate-600">
                    <div className="flex space-x-4">
                      <span className="flex items-center">
                        <FaBed className="w-4 h-4 mr-2 text-cyan-500" />
                        {property.beds}
                      </span>
                      <span className="flex items-center">
                        <FaBath className="w-4 h-4 mr-2 text-cyan-500" />
                        {property.baths}
                      </span>
                      <span className="flex items-center">
                        <FaRuler className="w-4 h-4 mr-2 text-cyan-500" />
                        {property.built_area}m²
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-2xl font-semibold text-cyan-600">
                      €{property.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/properties"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors font-medium"
            >
              Bekijk Alle Woningen
            </Link>
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                <svg className="w-8 h-8 text-orange-500 group-hover:text-cyan-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Uitgebreid Aanbod</h3>
              <p className="text-slate-600">Ruime selectie van woningen in de meest gewilde regio's van Spanje</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                <svg className="w-8 h-8 text-orange-500 group-hover:text-cyan-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Veilig & Betrouwbaar</h3>
              <p className="text-slate-600">Professionele begeleiding bij elke stap van het aankoopproces</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                <svg className="w-8 h-8 text-orange-500 group-hover:text-cyan-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Persoonlijk Contact</h3>
              <p className="text-slate-600">Direct contact met onze lokale experts in Spanje</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Klaar om uw Spaanse droom waar te maken?</h2>
          <p className="text-xl text-cyan-100 mb-8">Neem contact met ons op voor een persoonlijk gesprek</p>
          <Link 
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white text-cyan-600 hover:bg-cyan-50 transition-colors font-medium"
          >
            Neem Contact Op
          </Link>
        </div>
      </section>
    </main>
  );
}

export const metadata = {
  title: 'Spaanse Droomhuizen - Uw Partner voor Vastgoed in Spanje',
  description: 'Ontdek uw droomhuis in Spanje met onze uitgebreide selectie van woningen. Van appartementen aan de kust tot villa\'s in het binnenland.'
};
