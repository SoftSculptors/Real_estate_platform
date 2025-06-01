import Services from '@/components/about/Services';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF6] py-12 pt-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Over Ons</h1>
          <p className="text-lg text-slate-600 mb-8">Uw partner voor het vinden van uw droomhuis onder de Spaanse zon</p>
          
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Onze Missie</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Bij Olé Wonen zijn we gepassioneerd over het helpen van mensen bij het vinden van hun perfecte woning in Spanje. 
                We begrijpen dat het kopen van een woning in het buitenland een grote stap is, en daarom staan we klaar om u te begeleiden 
                bij elke stap van het proces.
              </p>
              <p>
                Met onze jarenlange ervaring en grondige kennis van de Spaanse vastgoedmarkt, kunnen we u het beste advies geven en 
                zorgen dat u gekoppeld wordt aan de juiste makelaar die past bij uw wensen en budget.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Onze Werkwijze</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Bij Olé Wonen werken we anders dan traditionele makelaars. Wij zijn een onafhankelijke consultant die u helpt bij het vinden van de juiste makelaar in Spanje.
                We focussen ons op Costa Blanca Zuid, Costa Blanca Noord en Costa Cálida, waar we een uitgebreid netwerk van betrouwbare partners hebben opgebouwd.
              </p>
              <p>
                Door onze jarenlange ervaring weten we precies welke makelaar het beste bij uw wensen en situatie past. We zorgen ervoor dat u gekoppeld wordt
                aan een professional die niet alleen de juiste expertise heeft, maar ook dezelfde taal spreekt en begrijpt wat u zoekt.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <Services />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow mt-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Onze Garantie</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              We zijn zo overtuigd van onze dienstverlening en het netwerk dat we hebben opgebouwd, dat we u een unieke garantie bieden:
              wanneer u via een door ons geselecteerde makelaar een woning koopt, betalen wij uw vliegtickets en hotelovernachting terug.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Dit doen we omdat we geloven in langdurige relaties en tevreden klanten. Het feit dat veel van onze klanten via aanbevelingen
              bij ons komen, bevestigt deze aanpak.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export const metadata = {
  title: 'Over Ons - Olé Wonen',
  description: 'Ontdek hoe Olé Wonen u helpt bij het vinden van de juiste makelaar voor uw droomhuis in Spanje.'
};
