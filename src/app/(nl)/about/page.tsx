import { FaAward, FaHandshake, FaHeart } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12 pt-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Over Ons</h1>
          <p className="text-lg text-slate-600 mb-8">Uw partner voor het vinden van uw droomhuis onder de Spaanse zon</p>
          
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Onze Missie</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Bij Spaanse Droomhuizen zijn we gepassioneerd over het helpen van mensen bij het vinden van hun perfecte woning in Spanje. 
                We begrijpen dat het kopen van een woning in het buitenland een grote stap is, en daarom staan we klaar om u te begeleiden 
                bij elke stap van het proces.
              </p>
              <p>
                Met onze jarenlange ervaring en grondige kennis van de Spaanse vastgoedmarkt, kunnen we u het beste advies geven en 
                de mooiste woningen laten zien die binnen uw wensen en budget passen.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Waarom Kiezen voor Ons?</h2>
            <ul className="space-y-6">
              <li className="flex items-start group">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-400 group-hover:bg-cyan-500 flex items-center justify-center mt-1 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-800 group-hover:text-cyan-600 transition-colors">Lokale Expertise</h3>
                  <p className="text-slate-600">Ons team heeft uitgebreide kennis van de lokale vastgoedmarkt en wetgeving.</p>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-400 group-hover:bg-cyan-500 flex items-center justify-center mt-1 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-800 group-hover:text-cyan-600 transition-colors">Persoonlijke Begeleiding</h3>
                  <p className="text-slate-600">We bieden ondersteuning op maat en staan altijd klaar voor al uw vragen.</p>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-400 group-hover:bg-cyan-500 flex items-center justify-center mt-1 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-800 group-hover:text-cyan-600 transition-colors">Uitgebreid Netwerk</h3>
                  <p className="text-slate-600">We werken samen met betrouwbare partners voor een zorgeloze aankoop.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Ons Team</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Ons team bestaat uit ervaren professionals die de Spaanse vastgoedmarkt door en door kennen. 
              We spreken Nederlands, Engels en Spaans, waardoor we u optimaal kunnen begeleiden tijdens het hele proces.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <div className="relative mb-4 rounded-xl overflow-hidden">
                  <img 
                    src="/team-member-1.jpg" 
                    alt="Team member" 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-lg font-medium text-slate-800 group-hover:text-cyan-600 transition-colors">Jan de Vries</h3>
                <p className="text-orange-500 font-medium">Oprichter & Makelaar</p>
              </div>
              <div className="group">
                <div className="relative mb-4 rounded-xl overflow-hidden">
                  <img 
                    src="/team-member-2.jpg" 
                    alt="Team member" 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-lg font-medium text-slate-800 group-hover:text-cyan-600 transition-colors">Maria Garcia</h3>
                <p className="text-orange-500 font-medium">Lokaal Expert</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export const metadata = {
  title: 'Over Ons - Spaanse Droomhuizen',
  description: 'Leer meer over ons team en onze missie om u te helpen bij het vinden van uw droomhuis in Spanje.'
};
