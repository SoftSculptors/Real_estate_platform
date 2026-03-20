import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#5B3924] text-[#FFFDF6] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Olé Wonen</h3>
            <p className="text-[#E6D4A8]">
              Uw betrouwbare partner in vastgoed. Wij helpen u bij het vinden van uw droomhuis.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@annemansautomotive.com" className="text-[#E6D4A8] hover:text-white transition-colors">
                  info@annemansautomotive.com
                </a>
              </li>
              <li>
                <Link href="/about" className="text-[#E6D4A8] hover:text-[#FFFDF6] transition-colors">
                  Over Ons
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#E6D4A8] hover:text-[#FFFDF6] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Bokspane 23, Berendrecht, 2040</li>
              <li>Tel: +32 484 37 81 65</li>
              <li>Email: info@annemansautomotive.com</li>
              <li>BTW: BE0767 391 051</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Volg Ons</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1aaXqSeHe4/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Olé Wonen. Alle rechten voorbehouden.</p>
          <p className="mt-2">
            <a 
              href="https://lynova.be" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              Website ontwikkeld door Lynova
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
