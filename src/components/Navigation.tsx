
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
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/02f499e8-6cbc-48bc-848a-e0ddac0d8f22.png" 
                alt="Siyalabel" 
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium"
              >
                Home
              </button>
              <Link 
                to="/collections"
                className="text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium"
              >
                Collections
              </Link>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium"
              >
                Contact
              </button>
              
              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors duration-300"
              >
                <ShoppingBag className="h-6 w-6" />
                {state.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors duration-300"
              >
                <ShoppingBag className="h-6 w-6" />
                {state.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-purple-600 transition-colors duration-300"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-left text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium"
                >
                  Home
                </button>
                <Link 
                  to="/collections"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-left text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium"
                >
                  Collections
                </Link>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-left text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-left text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium"
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
