import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Property, CurrencyType } from '@/types/property';
import { FaBed, FaBath, FaRuler, FaCheck } from 'react-icons/fa';
import ImageGallery from '@/components/properties/ImageGallery';

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const { data: propertyData, error } = await supabase
    .from('properties')
    .select(`
      *,
      property_titles (language, title),
      property_descriptions (language, description),
      property_features (feature),
      property_images (url)
    `)
    .eq('id', params.id)
    .single();

  if (error || !propertyData) {
    console.error('Error fetching property:', error);
    notFound();
  }

  type PropertyTitle = { language: string; title: string };
  type PropertyDescription = { language: string; description: string };
  type PropertyFeature = { feature: string };
  type PropertyImage = { url: string };

  const property = {
    ...propertyData,
    titles: propertyData.property_titles?.reduce((acc: Record<string, string>, t: PropertyTitle) => 
      ({ ...acc, [t.language]: t.title }), {}),
    descriptions: propertyData.property_descriptions?.reduce((acc: Record<string, string>, d: PropertyDescription) => 
      ({ ...acc, [d.language]: d.description }), {}),
    features: propertyData.property_features?.map((f: PropertyFeature) => f.feature) || [],
    images: propertyData.property_images?.map((i: PropertyImage) => ({ id: i.url, url: i.url })) || []
  } as Property;
  const title = property.titles['nl'] || property.titles['en'] || '';
  const description = property.descriptions['nl'] || property.descriptions['en'] || '';

  const formatPrice = (price: number, currency: CurrencyType = 'EUR') => {
    const currencyLocale = {
      EUR: 'nl-NL',
      USD: 'en-US',
      GBP: 'en-GB'
    };

    return new Intl.NumberFormat(currencyLocale[currency], {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const priceLabel = property.price_freq === 'sale' ? 'Te Koop' : 'Te Huur';

  return (
    <main className="min-h-screen bg-[#FFFDF6] py-8 pt-28">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image section */}
            <div className="lg:sticky lg:top-8 h-fit">
              <ImageGallery images={property.images} title={title} />
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-[#5B3924] mb-4">
                  {title}
                </h1>
                <p className="text-2xl font-semibold text-[#F5C242] mb-2">
                  {formatPrice(property.price, property.currency)}
                </p>
                <p className="text-lg text-orange-500 font-medium">
                  {priceLabel}
                  {property.new_build && ' • Nieuwbouw'}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-[#2F2F2F]">
                <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center mb-2">
                    <FaBed className="w-6 h-6 text-cyan-500" />
                  </div>
                  <div className="text-sm text-slate-600">Slaapkamers</div>
                  <div className="text-lg font-semibold text-slate-800">{property.beds}</div>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center mb-2">
                    <FaBath className="w-6 h-6 text-cyan-500" />
                  </div>
                  <div className="text-sm text-slate-600">Badkamers</div>
                  <div className="text-lg font-semibold text-slate-800">{property.baths}</div>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center mb-2">
                    <FaRuler className="w-6 h-6 text-cyan-500" />
                  </div>
                  <div className="text-sm text-slate-600">Oppervlakte</div>
                  <div className="text-lg font-semibold text-slate-800">{property.built_area}m²</div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-semibold mb-4 text-slate-800">Beschrijving</h2>
                <div className="text-slate-600 leading-relaxed">
                  {description}
                </div>
              </div>

              {property.features && property.features.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-semibold mb-6 text-slate-800">Kenmerken</h2>
                  <ul className="grid grid-cols-2 gap-y-4 gap-x-8">
                    {property.features.map((feature) => (
                      <li key={feature} className="flex items-center text-slate-600">
                        <FaCheck className="w-5 h-5 text-orange-400 mr-3 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-800">Locatie</h2>
                <div className="text-slate-600 space-y-2">
                  <p>{property.location_detail}, {property.town}</p>
                  <p>{property.province}, {property.country}</p>
                  {property.distance_to_beach_m && (
                    <p className="flex items-center text-cyan-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      Afstand tot strand: {Math.round(property.distance_to_beach_m / 100) / 10} km
                    </p>
                  )}
                </div>
              </div>

              {(property.energy_rating_consumption || property.energy_rating_emissions) && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-semibold mb-4 text-slate-800">Energielabel</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {property.energy_rating_consumption && (
                      <div className="p-4 bg-slate-50 rounded-lg text-center">
                        <p className="text-sm text-slate-600 mb-2">Verbruik</p>
                        <span className="text-lg font-semibold text-slate-800">
                          Label {property.energy_rating_consumption}
                        </span>
                      </div>
                    )}
                    {property.energy_rating_emissions && (
                      <div className="p-4 bg-slate-50 rounded-lg text-center">
                        <p className="text-sm text-slate-600 mb-2">Uitstoot</p>
                        <span className="text-lg font-semibold text-slate-800">
                          Label {property.energy_rating_emissions}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
