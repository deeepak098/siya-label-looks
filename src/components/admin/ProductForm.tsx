
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SizeSelector from "./SizeSelector";
import MultiImageUpload from "./MultiImageUpload";

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

interface ProductImage {
  id?: string;
  image_url: string;
  is_primary: boolean;
  display_order: number;
}

interface ProductFormProps {
  editingProduct: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const CATEGORIES = [
  { value: "frocks", label: "Frocks" },
  { value: "dresses", label: "Dresses" },
  { value: "sarees", label: "Sarees" },
  { value: "coord-sets", label: "Co-ord Sets" }
];

const ProductForm = ({ editingProduct, onSuccess, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: editingProduct?.name || "",
    price: editingProduct?.price.toString() || "",
    category: editingProduct?.category || "",
    sizes: editingProduct?.sizes || [],
    in_stock: editingProduct?.in_stock ?? true
  });
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const { toast } = useToast();

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

  const saveProductImages = async (productId: string, images: ProductImage[]) => {
    // Delete existing images for this product
    if (editingProduct) {
      await supabase
        .from('product_images')
        .delete()
        .eq('product_id', productId);
    }

    // Insert new images
    if (images.length > 0) {
      const imageEntries = images.map(image => ({
        product_id: productId,
        image_url: image.image_url,
        is_primary: image.is_primary,
        display_order: image.display_order
      }));

      const { error } = await supabase
        .from('product_images')
        .insert(imageEntries);

      if (error) {
        console.error('Error saving product images:', error);
      }
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

    if (productImages.length === 0) {
      toast({
        title: "Images required",
        description: "Please upload at least one image for the product",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const primaryImage = productImages.find(img => img.is_primary) || productImages[0];
      
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        image: primaryImage.image_url,
        sizes: formData.sizes,
        in_stock: formData.in_stock
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;

        await saveProductImages(editingProduct.id, productImages);

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

        await saveProductImages(product.id, productImages);
        await createInventoryEntries(product.id, formData.sizes);

        toast({ title: "Product added successfully" });
      }

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error saving product",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
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

      <MultiImageUpload
        productId={editingProduct?.id}
        images={productImages}
        onImagesChange={setProductImages}
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

      <div className="flex gap-4">
        <Button type="submit" className="flex-1">
          {editingProduct ? 'Update Product' : 'Add Product'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
