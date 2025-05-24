
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
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/5] mb-4 group-hover:scale-105 transition-transform duration-700">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-4 right-4">
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-purple-600 transition-colors duration-300">
              <Heart className="h-5 w-5" />
            </button>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 mb-3">
              <p className="text-sm font-medium text-gray-700 mb-2">Size:</p>
              <div className="flex space-x-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-8 h-8 rounded-md text-xs font-medium transition-colors duration-200 ${
                      selectedSize === size
                        ? 'bg-purple-600 text-white'
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
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-1 group-hover:text-purple-600 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-purple-600 font-semibold">₹{product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductCard;
