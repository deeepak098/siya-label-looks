
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Cart from "./Cart";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { state } = useCart();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-siya-100 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img 
                src="/lovable-uploads/02f499e8-6cbc-48bc-848a-e0ddac0d8f22.png" 
                alt="Siyalabel" 
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-siya-600 transition-all duration-300 font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-siya-500 after:to-magenta-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </button>
              <Link 
                to="/collections"
                className="text-gray-700 hover:text-siya-600 transition-all duration-300 font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-siya-500 after:to-magenta-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Collections
              </Link>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-siya-600 transition-all duration-300 font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-siya-500 after:to-magenta-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-siya-600 transition-all duration-300 font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-siya-500 after:to-magenta-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Contact
              </button>
              
              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 text-gray-700 hover:text-siya-600 transition-all duration-300 hover:bg-siya-50 rounded-full group"
              >
                <ShoppingBag className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                {state.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-siya-500 to-magenta-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-siya-600 transition-colors duration-300"
              >
                <ShoppingBag className="h-6 w-6" />
                {state.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-siya-500 to-magenta-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-siya-600 transition-colors duration-300"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-siya-100 bg-white/95 backdrop-blur-md">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-left text-gray-700 hover:text-siya-600 transition-colors duration-300 font-medium py-2"
                >
                  Home
                </button>
                <Link 
                  to="/collections"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-left text-gray-700 hover:text-siya-600 transition-colors duration-300 font-medium py-2"
                >
                  Collections
                </Link>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-left text-gray-700 hover:text-siya-600 transition-colors duration-300 font-medium py-2"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-left text-gray-700 hover:text-siya-600 transition-colors duration-300 font-medium py-2"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navigation;
