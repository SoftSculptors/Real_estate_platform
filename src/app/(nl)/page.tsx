import Link from 'next/link';
import { FaMapMarkerAlt, FaBed, FaBath, FaRuler } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import SearchBar from '@/components/home/SearchBar';
import WhyOleWonen from '@/components/home/WhyOleWonen';
import { Property } from '@/types/property';
import VideoHero from '@/components/home/VideoHero';
import { ScaleIcon } from '@heroicons/react/24/outline';

async function getFeaturedProperties(): Promise<Property[]> {
  try {
    const { data, error } = await supabase
      .from('property_search_view')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6);

    if (error) {
      console.error('Supabase error:', error);
      return [];
    }

    if (!data) return [];

    return data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

export default async function Home() {
  const properties = await getFeaturedProperties();

  return (
    <main className="min-h-screen flex-grow pt-28 bg-[#FFFDF6]">
      <VideoHero />

      {/* Featured Properties */}
      <section className="py-16 bg-[#FFFDF6]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#5B3924] text-center mb-12">
            Uitgelichte Woningen
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Link href={`/properties/${property.id}`} key={property.id} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative pt-[66.67%] overflow-hidden">
                    <img
                      src={property.images[0]?.url || '/placeholder.jpg'}
                      alt={property.titles['nl'] || property.titles['en'] || ''}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {property.new_build && (
                      <span className="absolute top-4 right-4 bg-[#F5C242] text-[#5B3924] px-3 py-1 rounded-full text-sm font-medium">
                        Nieuwbouw
                      </span>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#5B3924] mb-2 group-hover:text-[#F5C242] transition-colors">
                      {property.titles['nl'] || property.titles['en'] || ''}
                    </h3>
                    
                    <div className="flex items-center text-slate-600 mb-4">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{property.town}, {property.province}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-slate-600 mb-4">
                      <div className="flex items-center">
                        <FaBed className="mr-2" />
                        <span>{property.beds}</span>
                      </div>
                      <div className="flex items-center">
                        <FaBath className="mr-2" />
                        <span>{property.baths}</span>
                      </div>
                      <div className="flex items-center">
                        <FaRuler className="mr-2" />
                        <span>{property.built_area}m²</span>
                      </div>
                    </div>
                    
                    <div className="text-xl font-bold text-[#5B3924]">
                      €{property.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-summer-100 transition-colors">
                <ScaleIcon className="w-8 h-8 text-orange-500 group-hover:text-summer-600 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Juridisch Advies</h3>
              <p className="text-slate-600">Toegang tot ervaren, onafhankelijke advocaten gekend door de makelaar.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-summer-100 transition-colors">
                <svg className="w-8 h-8 text-orange-500 group-hover:text-summer-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Veilig & Betrouwbaar</h3>
              <p className="text-slate-600">Professionele begeleiding bij elke stap van het aankoopproces</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-summer-100 transition-colors">
                <svg className="w-8 h-8 text-orange-500 group-hover:text-summer-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Persoonlijk Contact</h3>
              <p className="text-slate-600">Direct contact met onze lokale experts in Spanje</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Ole Wonen Section */}
      <WhyOleWonen />

      {/* CTA Section */}
      <section className="py-16 bg-[#F5C242] text-[#5B3924]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Klaar om uw Spaanse droom waar te maken?</h2>
          <p className="text-xl text-[#5B3924] mb-8">Neem contact met ons op voor een persoonlijk gesprek</p>
          <Link 
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-[#FFFDF6] text-[#5B3924] hover:bg-[#E6D4A8] transition-colors font-medium"
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
