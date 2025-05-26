
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface InventoryItem {
  id: string;
  size: string;
  quantity: number;
  is_available: boolean;
}

interface InventoryManagerProps {
  productId: string;
  sizes: string[];
}

const InventoryManager = ({ productId, sizes }: InventoryManagerProps) => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (productId && sizes.length > 0) {
      fetchInventory();
    }
  }, [productId, sizes]);

  const fetchInventory = async () => {
    try {
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .eq('product_id', productId)
        .in('size', sizes);

      if (error) throw error;

      // Create inventory entries for missing sizes
      const existingSizes = data?.map(item => item.size) || [];
      const missingSizes = sizes.filter(size => !existingSizes.includes(size));
      
      if (missingSizes.length > 0) {
        const newEntries = missingSizes.map(size => ({
          product_id: productId,
          size,
          quantity: 0,
          is_available: true
        }));

        const { data: newData, error: insertError } = await supabase
          .from('inventory')
          .insert(newEntries)
          .select();

        if (insertError) throw insertError;
        
        setInventory([...(data || []), ...(newData || [])]);
      } else {
        setInventory(data || []);
      }
    } catch (error: any) {
      console.error('Error fetching inventory:', error);
      toast({
        title: "Error loading inventory",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateInventory = async (inventoryId: string, quantity: number, isAvailable: boolean) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('inventory')
        .update({ 
          quantity,
          is_available: isAvailable,
          updated_at: new Date().toISOString()
        })
        .eq('id', inventoryId);

      if (error) throw error;

      setInventory(prev => prev.map(item => 
        item.id === inventoryId 
          ? { ...item, quantity, is_available: isAvailable }
          : item
      ));

      toast({
        title: "Inventory updated",
        description: "Stock quantity has been updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error updating inventory",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!productId) {
    return (
      <div className="text-sm text-gray-500">
        Save the product first to manage inventory
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Stock Management</Label>
      <div className="space-y-3">
        {inventory.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg">
            <div className="flex-1">
              <Label className="text-sm font-medium">Size {item.size}</Label>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-xs">Quantity:</Label>
              <Input
                type="number"
                min="0"
                value={item.quantity}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value) || 0;
                  updateInventory(item.id, newQuantity, item.is_available);
                }}
                className="w-20"
                disabled={loading}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.is_available}
                onChange={(e) => {
                  updateInventory(item.id, item.quantity, e.target.checked);
                }}
                disabled={loading}
              />
              <Label className="text-xs">Available</Label>
            </div>
          </div>
        ))}
        {inventory.length === 0 && (
          <div className="text-sm text-gray-500 text-center py-4">
            No inventory entries found. Add sizes to create inventory.
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryManager;
