import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12 pt-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Contact</h1>
          <p className="text-lg text-slate-600 mb-8">Laat uw Spaanse dromen werkelijkheid worden</p>
          
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Neem contact met ons op</h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Naam
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  E-mailadres
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                  Bericht
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-cyan-600 text-white py-3 px-4 rounded-lg hover:bg-cyan-700 transition-colors font-medium"
              >
                Verstuur bericht
              </button>
            </form>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Contactgegevens</h2>
            
            <div className="space-y-4 text-slate-600">
              <p className="flex items-center group hover:text-cyan-600 transition-colors cursor-pointer">
                <FaMapMarkerAlt className="w-5 h-5 mr-3 text-orange-400 group-hover:text-cyan-600 transition-colors" />
                Zonnestraat 123, 1234 AB Amsterdam
              </p>
              <p className="flex items-center group hover:text-cyan-600 transition-colors cursor-pointer">
                <FaPhone className="w-5 h-5 mr-3 text-orange-400 group-hover:text-cyan-600 transition-colors" />
                +31 (0)20 123 4567
              </p>
              <p className="flex items-center group hover:text-cyan-600 transition-colors cursor-pointer">
                <FaEnvelope className="w-5 h-5 mr-3 text-orange-400 group-hover:text-cyan-600 transition-colors" />
                info@spaanse-droomhuizen.nl
              </p>
              <p className="flex items-center">
                <FaClock className="w-5 h-5 mr-3 text-orange-400" />
                <span>
                  <span className="block font-medium text-slate-700">Openingstijden</span>
                  <span className="block text-sm">Maandag t/m Vrijdag: 9:00 - 17:00</span>
                  <span className="block text-sm text-orange-500">(Spaanse tijd)</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export const metadata = {
  title: 'Contact - Spaanse Droomhuizen',
  description: 'Neem contact met ons op voor meer informatie over onze diensten en beschikbare woningen in Spanje.'
};
