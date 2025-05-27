
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, Search, User, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Cart from "./Cart";
import { useCart } from "@/contexts/CartContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const { state } = useCart();
  const location = useLocation();

  useEffect(() => {
    // Update favorite count when favorites change
    const updateFavoriteCount = () => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavoriteCount(favorites.length);
    };

    updateFavoriteCount();
    
    // Listen for storage changes
    window.addEventListener('storage', updateFavoriteCount);
    
    // Also listen for custom events when favorites are updated
    const handleFavoriteUpdate = () => updateFavoriteCount();
    window.addEventListener('favoriteUpdated', handleFavoriteUpdate);

    return () => {
      window.removeEventListener('storage', updateFavoriteCount);
      window.removeEventListener('favoriteUpdated', handleFavoriteUpdate);
    };
  }, []);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "About", path: "#about" },
    { name: "Contact", path: "#contact" },
  ];

  const handleNavClick = (path: string) => {
    if (path.startsWith('#')) {
      // Handle anchor links - navigate to home first if not already there
      if (location.pathname !== '/') {
        window.location.href = '/' + path;
      } else {
        const element = document.querySelector(path);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-siya-600 to-magenta-600 bg-clip-text text-transparent">
                Siya
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                item.path.startsWith('#') ? (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.path)}
                    className="text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-siya-600 hover:to-magenta-600 hover:bg-clip-text transition-all duration-300 font-medium"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-siya-600 hover:to-magenta-600 hover:bg-clip-text transition-all duration-300 font-medium ${
                      location.pathname === item.path ? 'text-transparent bg-gradient-to-r from-siya-600 to-magenta-600 bg-clip-text' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-gray-700 hover:text-siya-600 transition-colors">
                <Search className="h-5 w-5" />
              </button>
              
              <Link 
                to="/favorites"
                className="relative text-gray-700 hover:text-siya-600 transition-colors"
              >
                <Heart className="h-5 w-5" />
                {favoriteCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-siya-500 to-magenta-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                    {favoriteCount}
                  </span>
                )}
              </Link>

              <button className="text-gray-700 hover:text-siya-600 transition-colors">
                <User className="h-5 w-5" />
              </button>

              <button 
                onClick={() => setShowCart(true)}
                className="relative text-gray-700 hover:text-siya-600 transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-siya-500 to-magenta-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center space-x-4">
              <Link 
                to="/favorites"
                className="relative text-gray-700 hover:text-siya-600 transition-colors"
              >
                <Heart className="h-5 w-5" />
                {favoriteCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-siya-500 to-magenta-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                    {favoriteCount}
                  </span>
                )}
              </Link>

              <button 
                onClick={() => setShowCart(true)}
                className="relative text-gray-700 hover:text-siya-600 transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-siya-500 to-magenta-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-siya-600 transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-gray-200/20 bg-white/95 backdrop-blur-md">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  item.path.startsWith('#') ? (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.path)}
                      className="text-left text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-siya-600 hover:to-magenta-600 hover:bg-clip-text transition-all duration-300 font-medium px-4 py-2"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-siya-600 hover:to-magenta-600 hover:bg-clip-text transition-all duration-300 font-medium px-4 py-2 ${
                        location.pathname === item.path ? 'text-transparent bg-gradient-to-r from-siya-600 to-magenta-600 bg-clip-text' : ''
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
                
                <div className="flex items-center space-x-6 px-4 py-2">
                  <button className="text-gray-700 hover:text-siya-600 transition-colors">
                    <Search className="h-5 w-5" />
                  </button>
                  <button className="text-gray-700 hover:text-siya-600 transition-colors">
                    <User className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  );
};

export default Navigation;
