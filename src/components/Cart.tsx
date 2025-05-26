
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import CheckoutForm from "./CheckoutForm";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const { state, dispatch } = useCart();
  const { toast } = useToast();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    } else {
      dispatch({ 
        type: 'UPDATE_QUANTITY', 
        payload: { id, quantity: newQuantity } 
      });
    }
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500">Add some beautiful items to get started!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {state.items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">Size: {item.size}</p>
                        <p className="text-sm font-semibold text-purple-600">₹{item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-sm font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t p-6 space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total: </span>
                  <span className="text-purple-600">₹{state.total.toLocaleString()}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <CheckoutForm 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </>
  );
};

export default Cart;
