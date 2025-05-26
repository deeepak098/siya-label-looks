
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface InventoryItem {
  id: string;
  product_id: string;
  size: string;
  quantity: number;
  is_available: boolean;
  product: {
    name: string;
    image: string;
  };
}

const InventoryManagement = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [editingQuantity, setEditingQuantity] = useState<{ [key: string]: number }>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const { data, error } = await supabase
        .from('inventory')
        .select(`
          *,
          product:products(name, image)
        `)
        .order('product_id');

      if (error) throw error;
      setInventory(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching inventory",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (inventoryId: string, newQuantity: number) => {
    try {
      const { error } = await supabase
        .from('inventory')
        .update({ quantity: newQuantity })
        .eq('id', inventoryId);

      if (error) throw error;

      toast({
        title: "Quantity updated",
        description: "Inventory quantity has been updated successfully",
      });

      fetchInventory();
    } catch (error: any) {
      toast({
        title: "Error updating quantity",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateAvailability = async (inventoryId: string, isAvailable: boolean) => {
    try {
      const { error } = await supabase
        .from('inventory')
        .update({ is_available: isAvailable })
        .eq('id', inventoryId);

      if (error) throw error;

      toast({
        title: "Availability updated",
        description: `Size has been marked as ${isAvailable ? 'available' : 'unavailable'}`,
      });

      fetchInventory();
    } catch (error: any) {
      toast({
        title: "Error updating availability",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleQuantityChange = (inventoryId: string, value: string) => {
    const quantity = parseInt(value) || 0;
    setEditingQuantity({ ...editingQuantity, [inventoryId]: quantity });
  };

  const saveQuantity = (inventoryId: string) => {
    const newQuantity = editingQuantity[inventoryId];
    if (newQuantity !== undefined) {
      updateQuantity(inventoryId, newQuantity);
      const { [inventoryId]: _, ...rest } = editingQuantity;
      setEditingQuantity(rest);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Management</CardTitle>
        <CardDescription>Manage stock quantities and availability for all products by size</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Current Quantity</TableHead>
              <TableHead>Update Quantity</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="flex items-center space-x-3">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span>{item.product.name}</span>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">{item.size}</span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.quantity > 10 ? 'bg-green-100 text-green-800' : 
                    item.quantity > 0 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.quantity}
                  </span>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder={item.quantity.toString()}
                    value={editingQuantity[item.id] ?? ''}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    className="w-20"
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={item.is_available}
                    onCheckedChange={(checked) => updateAvailability(item.id, checked)}
                  />
                </TableCell>
                <TableCell>
                  <Button 
                    size="sm" 
                    onClick={() => saveQuantity(item.id)}
                    disabled={editingQuantity[item.id] === undefined}
                  >
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {inventory.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                  No inventory found. Add products first to manage inventory.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default InventoryManagement;
