
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ImageUpload from "./ImageUpload";
import AssetTypeSelector from "./AssetTypeSelector";

interface WebsiteAsset {
  id: string;
  asset_type: string;
  asset_name: string;
  file_url: string;
  is_active: boolean;
  created_at: string;
}

interface AssetFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingAsset: WebsiteAsset | null;
  onAssetSaved: () => void;
}

const AssetFormDialog = ({ isOpen, onOpenChange, editingAsset, onAssetSaved }: AssetFormDialogProps) => {
  const [formData, setFormData] = useState({
    asset_type: editingAsset?.asset_type || "",
    asset_name: editingAsset?.asset_name || "",
    file_url: editingAsset?.file_url || "",
    is_active: editingAsset?.is_active ?? true
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.asset_type || !formData.asset_name) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!editingAsset && !formData.file_url) {
      toast({
        title: "Image required",
        description: "Please upload an image",
        variant: "destructive",
      });
      return;
    }

    try {
      const assetData = {
        asset_type: formData.asset_type,
        asset_name: formData.asset_name,
        file_url: formData.file_url,
        is_active: formData.is_active
      };

      if (editingAsset) {
        const { error } = await supabase
          .from('website_assets')
          .update(assetData)
          .eq('id', editingAsset.id);

        if (error) throw error;
        toast({ title: "Asset updated successfully" });
      } else {
        const { error } = await supabase
          .from('website_assets')
          .insert([assetData]);

        if (error) throw error;
        toast({ title: "Asset uploaded successfully" });
      }

      setFormData({ asset_type: "", asset_name: "", file_url: "", is_active: true });
      onOpenChange(false);
      onAssetSaved();
    } catch (error: any) {
      toast({
        title: "Error saving asset",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editingAsset ? 'Edit Asset' : 'Upload New Asset'}</DialogTitle>
          <DialogDescription>
            {editingAsset ? 'Update asset details' : 'Upload a new website asset'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <AssetTypeSelector
              value={formData.asset_type}
              onChange={(value) => setFormData({ ...formData, asset_type: value })}
            />
            <div>
              <Label htmlFor="asset_name">Asset Name</Label>
              <Input
                id="asset_name"
                value={formData.asset_name}
                onChange={(e) => setFormData({ ...formData, asset_name: e.target.value })}
                placeholder="e.g., Homepage Hero Background"
                required
              />
            </div>
          </div>

          <ImageUpload
            imageUrl={formData.file_url}
            onImageChange={(url) => setFormData({ ...formData, file_url: url })}
            bucketName="website-assets"
            folder={formData.asset_type || "general"}
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
            />
            <Label htmlFor="is_active">Active</Label>
          </div>

          <Button type="submit" className="w-full">
            <ImageIcon className="h-4 w-4 mr-2" />
            {editingAsset ? 'Update Asset' : 'Upload Asset'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AssetFormDialog;
