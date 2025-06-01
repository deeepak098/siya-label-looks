
import { useState, useEffect } from "react";
import { ShoppingBag, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
}

interface ProductCardProps {
  product: Product;
  index: number;
}

interface InventoryItem {
  size: string;
  quantity: number;
  is_available: boolean;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const { dispatch } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    fetchInventory();
    // Check if product is in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsLiked(favorites.includes(product.id));
  }, [product.id]);

  useEffect(() => {
    // Set available sizes based on inventory
    const available = inventory
      .filter(item => item.is_available && item.quantity > 0)
      .map(item => item.size);
    setAvailableSizes(available);
    
    // Set default selected size to first available size
    if (available.length > 0 && !selectedSize) {
      setSelectedSize(available[0]);
    }
  }, [inventory, selectedSize]);

  const fetchInventory = async () => {
    try {
      const { data, error } = await supabase
        .from('inventory')
        .select('size, quantity, is_available')
        .eq('product_id', product.id);

      if (error) throw error;
      setInventory(data || []);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product detail
    e.stopPropagation();
    
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    const selectedInventory = inventory.find(item => item.size === selectedSize);
    if (!selectedInventory || !selectedInventory.is_available || selectedInventory.quantity === 0) {
      toast({
        title: "Size not available",
        description: "This size is currently out of stock.",
        variant: "destructive",
      });
      return;
    }

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        category: product.category
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedSize}) has been added to your cart.`,
    });
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product detail
    e.stopPropagation();
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    
    if (isLiked) {
      newFavorites = favorites.filter((id: string) => id !== product.id);
    } else {
      newFavorites = [...favorites, product.id];
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsLiked(!isLiked);
    
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: `${product.name} has been ${isLiked ? 'removed from' : 'added to'} your favorites.`,
    });
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group cursor-pointer animate-fade-in block"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-siya-50 to-magenta-50 aspect-[4/5] mb-4 group-hover:scale-105 transition-all duration-700 shadow-lg group-hover:shadow-2xl">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-siya-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-4 right-4">
            <button 
              onClick={toggleFavorite}
              className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              <Heart className={`h-4 w-4 md:h-5 md:w-5 transition-colors duration-300 ${isLiked ? 'fill-siya-500 text-siya-500' : 'text-white'}`} />
            </button>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 md:p-4 mb-3 border border-white/20">
              <p className="text-xs md:text-sm font-medium text-gray-700 mb-2 md:mb-3">Size:</p>
              <div className="flex space-x-1 md:space-x-2">
                {product.sizes.map((size) => {
                  const isAvailable = availableSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isAvailable) setSelectedSize(size);
                      }}
                      disabled={!isAvailable}
                      className={`w-6 h-6 md:w-8 md:h-8 rounded-lg text-xs font-medium transition-all duration-200 ${
                        selectedSize === size && isAvailable
                          ? 'bg-gradient-to-r from-siya-500 to-magenta-500 text-white shadow-md scale-110'
                          : isAvailable
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-siya-500 to-magenta-500 text-white py-2 md:py-3 px-3 md:px-4 rounded-xl font-medium text-sm md:text-base hover:from-siya-600 hover:to-magenta-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <ShoppingBag className="h-4 w-4 md:h-5 md:w-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="text-center px-2">
        <h3 className="text-base md:text-lg font-medium text-gray-900 mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-siya-600 group-hover:to-magenta-600 group-hover:bg-clip-text transition-all duration-300">
          {product.name}
        </h3>
        <p className="text-transparent bg-gradient-to-r from-siya-600 to-magenta-600 bg-clip-text font-semibold text-base md:text-lg">₹{product.price.toLocaleString()}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
