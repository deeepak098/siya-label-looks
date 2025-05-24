
import { useState } from "react";
import { ShoppingBag, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [isLiked, setIsLiked] = useState(false);
  const { dispatch } = useCart();
  const { toast } = useToast();
  
  const sizes = ["XS", "S", "M", "L", "XL"];

  const handleAddToCart = () => {
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

  return (
    <div 
      className="group cursor-pointer animate-fade-in"
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
              onClick={() => setIsLiked(!isLiked)}
              className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              <Heart className={`h-5 w-5 transition-colors duration-300 ${isLiked ? 'fill-siya-500 text-siya-500' : 'text-white'}`} />
            </button>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 mb-3 border border-white/20">
              <p className="text-sm font-medium text-gray-700 mb-3">Size:</p>
              <div className="flex space-x-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-all duration-200 ${
                      selectedSize === size
                        ? 'bg-gradient-to-r from-siya-500 to-magenta-500 text-white shadow-md scale-110'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-siya-500 to-magenta-500 text-white py-3 px-4 rounded-xl font-medium hover:from-siya-600 hover:to-magenta-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-siya-600 group-hover:to-magenta-600 group-hover:bg-clip-text transition-all duration-300">
          {product.name}
        </h3>
        <p className="text-transparent bg-gradient-to-r from-siya-600 to-magenta-600 bg-clip-text font-semibold text-lg">₹{product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductCard;
