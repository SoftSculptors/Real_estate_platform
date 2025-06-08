'use client';

import { 
  FaUserFriends, 
  FaBalanceScale, 
  FaEuroSign, 
  FaExchangeAlt, 
  FaCouch, 
  FaKey, 
  FaTools 
} from 'react-icons/fa';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

function ServiceCard({ icon, title, items }: ServiceCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="text-[#F5C242] mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-[#5B3924] mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start text-[#2F2F2F]">
            <span className="text-[#F5C242] mr-2 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Services() {
  const services = [
    {
      icon: <FaUserFriends className="w-12 h-12" />,
      title: "Persoonlijke begeleiding",
      items: [
        "Hulp bij elke stap van het aankoopproces",
        "Ondersteuning ook ná de aankoop – zolang je ons nodig hebt",
        "Veel klanten komen via aanbevelingen van anderen"
      ]
    },
    {
      icon: <FaBalanceScale className="w-12 h-12" />,
      title: "Juridisch advies",
      items: [
        "Toegang tot ervaren, onafhankelijke advocaten",
        "Hulp bij belangrijke keuzes, zoals op wiens naam je koopt",
        "Advies in je eigen taal"
      ]
    },
    {
      icon: <FaEuroSign className="w-12 h-12" />,
      title: "Financiële hulp",
      items: [
        "Begeleiding bij het openen van een Spaanse bankrekening",
        "Contact met banken die Nederlands of Engels spreken"
      ]
    },
    {
      icon: <FaExchangeAlt className="w-12 h-12" />,
      title: "Geld omwisselen (valutawissel)",
      items: [
        "Betrouwbare partners voor het omwisselen van geld naar euro's",
        "Lage kosten en goede wisselkoersen"
      ]
    },
    {
      icon: <FaCouch className="w-12 h-12" />,
      title: "Inrichting van je woning",
      items: [
        "Advies en hulp bij meubels en interieur",
        "Betrouwbare contacten voor complete inrichting of kleine aanpassingen"
      ]
    },
    {
      icon: <FaKey className="w-12 h-12" />,
      title: "Verhuurservice",
      items: [
        "Koppeling aan verhuurmakelaars met schoonmaak- en beheeropties",
        "Ideaal als je jouw woning ook wil verhuren"
      ]
    },
    {
      icon: <FaTools className="w-12 h-12" />,
      title: "Bouw en verbouwing",
      items: [
        "Aannemers voor kleine én grote klussen",
        "Alles geregeld: van schilderwerk tot complete renovatie",
        "Ook hulp bij vergunningen en contact met de gemeente"
      ]
    }
  ];

  return (
    <section className="py-16 bg-[#FFFDF6]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#5B3924] mb-6">
            Diensten via de makelaar die Olé Wonen voor jou selecteert
          </h2>
          <p className="text-lg text-[#2F2F2F] mb-4">
            Bij Olé Wonen zoeken wij de beste makelaar voor jouw situatie in Costa Blanca Zuid, Costa Blanca Noord en Costa Cálida. 
            Deze makelaar helpt je niet alleen bij het kopen van een woning, maar biedt ook uitgebreide service ervoor én erna. 
            Hieronder zie je wat je allemaal kunt verwachten:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              items={service.items}
            />
          ))}
        </div>

        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-lg text-[#2F2F2F] italic">
            Olé Wonen levert deze diensten niet zelf, maar zorgt ervoor dat je in contact komt met betrouwbare en professionele partijen 
            in Costa Blanca Zuid, Costa Blanca Noord en Costa Cálida die hun werk goed doen.
          </p>
        </div>
      </div>
    </section>
  );
}
