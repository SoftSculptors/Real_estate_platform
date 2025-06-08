import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { FormEvent, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID', // Je moet dit vervangen met je emailjs service ID
        'YOUR_TEMPLATE_ID', // Je moet dit vervangen met je template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          from_phone: formData.phone,
          message: formData.message,
          to_name: 'Olé Wonen',
          to_email: 'info@annemansautomotive.com'
        },
        'YOUR_PUBLIC_KEY' // Je moet dit vervangen met je emailjs public key
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFDF6] pt-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#5B3924] mb-4">Contact</h1>
          <p className="text-lg text-[#2F2F2F] mb-8">Laat uw Spaanse dromen werkelijkheid worden</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold text-[#5B3924] mb-6">Stuur ons een bericht</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#2F2F2F] mb-1">Naam</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-[#E6D4A8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5C242] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#2F2F2F] mb-1">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-[#E6D4A8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5C242] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#2F2F2F] mb-1">Telefoon</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-[#E6D4A8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5C242] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#2F2F2F] mb-1">Bericht</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border border-[#E6D4A8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5C242] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#5B3924] text-white py-2 px-6 rounded-md hover:bg-[#4A2E1C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Verzenden...' : 'Verstuur bericht'}
                </button>
                {submitStatus === 'success' && (
                  <p className="text-green-600 mt-2">Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-600 mt-2">Er is iets misgegaan. Probeer het later opnieuw of neem telefonisch contact op.</p>
                )}
              </form>
            </div>
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
