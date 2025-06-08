import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {

  return (
    <main className="min-h-screen bg-[#FFFDF6] pt-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#5B3924] mb-4">Contact</h1>
          <p className="text-lg text-[#2F2F2F] mb-8">Laat uw Spaanse dromen werkelijkheid worden</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContactForm />
            <div className="space-y-4 text-slate-600">
              <p className="flex items-center group hover:text-cyan-600 transition-colors cursor-pointer">
                <FaMapMarkerAlt className="w-5 h-5 mr-3 text-orange-400 group-hover:text-cyan-600 transition-colors" />
                Bokspane 23, Berendrecht, 2040
              </p>
              <p className="flex items-center group hover:text-cyan-600 transition-colors cursor-pointer">
                <FaPhone className="w-5 h-5 mr-3 text-orange-400 group-hover:text-cyan-600 transition-colors" />
                +32 484 37 81 65
              </p>
              <p className="flex items-center group hover:text-cyan-600 transition-colors cursor-pointer">
                <FaEnvelope className="w-5 h-5 mr-3 text-orange-400 group-hover:text-cyan-600 transition-colors" />
                info@annemansautomotive.com
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
