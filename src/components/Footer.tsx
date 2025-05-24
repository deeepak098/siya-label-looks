
import { Heart, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <img 
              src="/lovable-uploads/02f499e8-6cbc-48bc-848a-e0ddac0d8f22.png" 
              alt="Siyalabel" 
              className="h-12 w-auto mb-4 filter brightness-0 invert"
            />
            <p className="text-gray-300 mb-6 max-w-md">
              Redefining elegance through contemporary fashion that celebrates the modern woman's spirit and style.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
                  Collections
                </Link>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Collections</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/collections/frocks" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
                  Frocks
                </Link>
              </li>
              <li>
                <Link to="/collections/dresses" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
                  Dresses
                </Link>
              </li>
              <li>
                <Link to="/collections/sarees" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
                  Sarees
                </Link>
              </li>
              <li>
                <Link to="/collections/coord-sets" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
                  Co-ord Sets
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center space-x-2">
            <span>© 2024 Siyalabel. Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>for fashion lovers</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
