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
          <h2 className="text-3xl font-bold text-[#5B3924] text-center mb-6">
            Uitgelichte Woningen in Spanje
          </h2>
          <p className="text-lg text-[#2F2F2F] text-center max-w-3xl mx-auto mb-12">
            Ontdek ons zorgvuldig geselecteerde aanbod van Spaanse woningen. Van moderne appartementen aan de Costa Blanca tot luxe villa's aan de Costa Cálida - wij helpen u de perfecte woning te vinden.
          </p>
          
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
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Juridische Zekerheid</h3>
              <p className="text-slate-600">Betrouwbare advocaten die u begeleiden bij het veilig kopen van uw Spaanse woning.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-summer-100 transition-colors">
                <svg className="w-8 h-8 text-orange-500 group-hover:text-summer-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Betrouwbare Makelaars</h3>
              <p className="text-slate-600">Zorgvuldig geselecteerde makelaars in Spanje die u professioneel begeleiden bij de aankoop.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-summer-100 transition-colors">
                <svg className="w-8 h-8 text-orange-500 group-hover:text-summer-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Persoonlijke Aanpak</h3>
              <p className="text-slate-600">Direct contact met lokale experts die u helpen uw droomhuis in Spanje te vinden.</p>
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
  title: 'Huis Kopen in Spanje - Uw Droomhuis vinden met Olé Wonen',
  description: 'Olé Wonen helpt Vlamingen en Nederlanders hun droomhuis in Spanje te vinden. Persoonlijke begeleiding, onafhankelijk advies en een betrouwbaar makelaarsnetwerk – start hier uw zoektocht!',
  alternates: {
    canonical: 'https://www.olewonen.be/'
  }
};

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Olé Wonen',
  image: 'https://www.olewonen.be/images/ole-wonen-logo.png',
  '@id': 'https://www.olewonen.be',
  url: 'https://www.olewonen.be',
  telephone: '+32484378165',
  email: 'info@annemansautomotive.com',
  description: 'Olé Wonen is uw betrouwbare partner voor het vinden en kopen van uw droomhuis in Spanje. Gespecialiseerd in vastgoed in Costa Blanca Zuid, Costa Blanca Noord en Costa Cálida.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BE',
    addressLocality: 'België'
  },
  areaServed: [
    {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 38.3452,
        longitude: -0.4815
      },
      description: 'Costa Blanca Zuid'
    },
    {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 38.8167,
        longitude: 0.1167
      },
      description: 'Costa Blanca Noord'
    },
    {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 37.9892,
        longitude: -1.1305
      },
      description: 'Costa Cálida'
    }
  ],
  sameAs: [
    'https://www.facebook.com/olewonen',
    'https://www.instagram.com/olewonen'
  ]
};
