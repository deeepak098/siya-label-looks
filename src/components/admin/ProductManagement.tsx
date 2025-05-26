
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SizeSelector from "./SizeSelector";
import ImageUpload from "./ImageUpload";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  sizes: string[];
  in_stock: boolean;
  created_at: string;
}

const CATEGORIES = [
  { value: "frocks", label: "Frocks" },
  { value: "dresses", label: "Dresses" },
  { value: "sarees", label: "Sarees" },
  { value: "coord-sets", label: "Co-ord Sets" }
];

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    sizes: [] as string[],
    in_stock: true
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching products",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const createInventoryEntries = async (productId: string, sizes: string[]) => {
    const inventoryEntries = sizes.map(size => ({
      product_id: productId,
      size: size,
      quantity: 0,
      is_available: true
    }));

    const { error } = await supabase
      .from('inventory')
      .insert(inventoryEntries);

    if (error) {
      console.error('Error creating inventory entries:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category) {
      toast({
        title: "Category required",
        description: "Please select a category for the product",
        variant: "destructive",
      });
      return;
    }

    if (formData.sizes.length === 0) {
      toast({
        title: "Sizes required",
        description: "Please select at least one size for the product",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        image: formData.image,
        sizes: formData.sizes,
        in_stock: formData.in_stock
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;

        // Update inventory entries for new sizes
        const { data: existingInventory } = await supabase
          .from('inventory')
          .select('size')
          .eq('product_id', editingProduct.id);

        const existingSizes = existingInventory?.map(inv => inv.size) || [];
        const newSizes = formData.sizes.filter(size => !existingSizes.includes(size));
        
        if (newSizes.length > 0) {
          await createInventoryEntries(editingProduct.id, newSizes);
        }

        toast({ title: "Product updated successfully" });
      } else {
        const { data: product, error } = await supabase
          .from('products')
          .insert([productData])
          .select()
          .single();

        if (error) throw error;

        // Create inventory entries for all sizes
        await createInventoryEntries(product.id, formData.sizes);

        toast({ title: "Product added successfully" });
      }

      setFormData({ name: "", price: "", category: "", image: "", sizes: [], in_stock: true });
      setIsAddDialogOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Error saving product",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({ title: "Product deleted successfully" });
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Error deleting product",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      sizes: product.sizes,
      in_stock: product.in_stock
    });
    setIsAddDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setFormData({ name: "", price: "", category: "", image: "", sizes: [], in_stock: true });
    setIsAddDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Product Management</CardTitle>
            <CardDescription>Manage your clothing inventory</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddNew} className="bg-gradient-to-r from-siya-500 to-magenta-500">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                <DialogDescription>
                  {editingProduct ? 'Update product details' : 'Add a new product to your inventory'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <ImageUpload
                  imageUrl={formData.image}
                  onImageChange={(url) => setFormData({ ...formData, image: url })}
                />

                <SizeSelector
                  selectedSizes={formData.sizes}
                  onSizesChange={(sizes) => setFormData({ ...formData, sizes })}
                />

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="in_stock"
                    checked={formData.in_stock}
                    onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
                  />
                  <Label htmlFor="in_stock">In Stock</Label>
                </div>
                <Button type="submit" className="w-full">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Sizes</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>₹{product.price}</TableCell>
                <TableCell>
                  <span className="capitalize">{product.category.replace('-', ' ')}</span>
                </TableCell>
                <TableCell>{product.sizes.join(', ')}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${product.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                  No products found. Add your first product to get started!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProductManagement;
