
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProductForm from "./ProductForm";
import InventoryManager from "./InventoryManager";

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

interface ProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingProduct: Product | null;
  onSuccess: () => void;
}

const ProductDialog = ({ isOpen, onOpenChange, editingProduct, onSuccess }: ProductDialogProps) => {
  const handleSuccess = () => {
    onSuccess();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          <DialogDescription>
            {editingProduct ? 'Update product details and manage inventory' : 'Add a new product to your inventory'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ProductForm
              editingProduct={editingProduct}
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          </div>
          <div>
            {editingProduct && (
              <InventoryManager 
                productId={editingProduct.id} 
                sizes={editingProduct.sizes}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
