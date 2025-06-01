'use client';

import { FaHandshake, FaUserFriends, FaPlane, FaShieldAlt } from 'react-icons/fa';

export default function WhyOleWonen() {
  return (
    <section className="py-16 bg-[#FFFDF6]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#5B3924] mb-4">
            Olé Wonen – De juiste makelaar voor jouw woning in Spanje
          </h2>
          <p className="text-lg text-[#2F2F2F] mb-8">
            Olé Wonen is geen makelaar, maar een onafhankelijke consultant die jou helpt bij het vinden van de juiste makelaar in Spanje. 
            Persoonlijk, betrouwbaar en zonder verkooppraatjes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-[#F5C242] mb-4">
              <FaHandshake className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-[#5B3924] mb-3">Onafhankelijk advies</h3>
            <p className="text-[#2F2F2F]">
              Wij zoeken en selecteren een betrouwbare makelaar die past bij jouw wensen en regio.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-[#F5C242] mb-4">
              <FaUserFriends className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-[#5B3924] mb-3">Makelaar op maat</h3>
            <p className="text-[#2F2F2F]">
              Geen standaardlijsten, maar een zorgvuldige koppeling aan een makelaar die bij jou én je budget past.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-[#F5C242] mb-4">
              <FaPlane className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-[#5B3924] mb-3">Reiskosten terug bij aankoop</h3>
            <p className="text-[#2F2F2F]">
              Koop je via de door ons aangestelde makelaar een woning? Dan betalen wij jouw vliegtickets en hotelovernachting terug.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-[#F5C242] mb-4">
              <FaShieldAlt className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-[#5B3924] mb-3">Geen verkoopdruk</h3>
            <p className="text-[#2F2F2F]">
              Wij hebben geen belang bij de verkoop van een woning. Onze enige taak is jou koppelen aan de juiste makelaar.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl font-medium text-[#5B3924]">
            Olé Wonen – Jouw eerste stap naar zorgeloos kopen in Spanje begint bij de juiste makelaar.
          </p>
        </div>
      </div>
    </section>
  );
}
