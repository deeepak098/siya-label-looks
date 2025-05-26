
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { X } from "lucide-react";

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutForm = ({ isOpen, onClose }: CheckoutFormProps) => {
  const { state, dispatch } = useCart();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedDiscountCode, setAppliedDiscountCode] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const applyDiscountCode = async () => {
    if (!discountCode.trim()) return;

    try {
      const { data, error } = await supabase
        .from('discount_codes')
        .select('*')
        .eq('code', discountCode.toUpperCase())
        .eq('is_active', true)
        .single();

      if (error || !data) {
        toast({
          title: "Invalid discount code",
          description: "The discount code you entered is not valid or has expired.",
          variant: "destructive",
        });
        return;
      }

      // Check if minimum order amount is met
      if (data.min_order_amount && state.total < data.min_order_amount) {
        toast({
          title: "Minimum order amount not met",
          description: `This discount code requires a minimum order of ₹${data.min_order_amount}`,
          variant: "destructive",
        });
        return;
      }

      // Check usage limit
      if (data.usage_limit && data.used_count >= data.usage_limit) {
        toast({
          title: "Discount code limit reached",
          description: "This discount code has reached its usage limit.",
          variant: "destructive",
        });
        return;
      }

      // Calculate discount
      let discountAmount = 0;
      if (data.type === 'percentage') {
        discountAmount = (state.total * data.value) / 100;
      } else {
        discountAmount = data.value;
      }

      // Ensure discount doesn't exceed total
      discountAmount = Math.min(discountAmount, state.total);

      setDiscount(discountAmount);
      setAppliedDiscountCode(data.code);
      toast({
        title: "Discount applied",
        description: `You saved ₹${discountAmount.toFixed(2)}!`,
      });
    } catch (error: any) {
      toast({
        title: "Error applying discount",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const removeDiscount = () => {
    setDiscount(0);
    setAppliedDiscountCode("");
    setDiscountCode("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{
          customer_email: formData.email,
          total_amount: state.total - discount,
          items: state.items,
          status: 'pending'
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create customer order details
      const { error: customerError } = await supabase
        .from('customer_orders')
        .insert([{
          order_id: orderData.id,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          shipping_address: {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode
          },
          discount_code: appliedDiscountCode,
          discount_amount: discount
        }]);

      if (customerError) throw customerError;

      // Update discount code usage if applied
      if (appliedDiscountCode) {
        await supabase.rpc('increment', {
          table_name: 'discount_codes',
          column_name: 'used_count',
          row_id: appliedDiscountCode,
          increment_by: 1
        });
      }

      // Clear cart
      dispatch({ type: 'CLEAR_CART' });

      toast({
        title: "Order placed successfully!",
        description: `Order ID: ${orderData.id.slice(0, 8)}...`,
      });

      onClose();
    } catch (error: any) {
      toast({
        title: "Error placing order",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const finalTotal = state.total - discount;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Checkout</CardTitle>
                <CardDescription>Complete your order</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Customer Details */}
              <div className="space-y-4">
                <h3 className="font-semibold">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4">
                <h3 className="font-semibold">Shipping Address</h3>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Discount Code */}
              <div className="space-y-4">
                <h3 className="font-semibold">Discount Code</h3>
                {!appliedDiscountCode ? (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter discount code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <Button type="button" variant="outline" onClick={applyDiscountCode}>
                      Apply
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                    <span className="text-green-800">
                      Discount applied: {appliedDiscountCode} (-₹{discount.toFixed(2)})
                    </span>
                    <Button type="button" variant="ghost" size="sm" onClick={removeDiscount}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{state.total.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutForm;
