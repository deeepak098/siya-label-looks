
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Upload, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ImageUpload from "./ImageUpload";

interface WebsiteAsset {
  id: string;
  asset_type: string;
  asset_name: string;
  file_url: string;
  is_active: boolean;
  created_at: string;
}

const ASSET_TYPES = [
  { value: "background", label: "Background Image" },
  { value: "hero-image", label: "Hero Image" },
  { value: "category-image", label: "Category Image" },
  { value: "banner", label: "Banner" },
  { value: "logo", label: "Logo" }
];

const WebsiteAssetManager = () => {
  const [assets, setAssets] = useState<WebsiteAsset[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<WebsiteAsset | null>(null);
  const [formData, setFormData] = useState({
    asset_type: "",
    asset_name: "",
    file_url: "",
    is_active: true
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const { data, error } = await supabase
        .from('website_assets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAssets(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching assets",
        description: error.message,
        variant: "destructive",
      });
    }
  };

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
      setIsDialogOpen(false);
      setEditingAsset(null);
      fetchAssets();
    } catch (error: any) {
      toast({
        title: "Error saving asset",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('website_assets')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({ title: "Asset deleted successfully" });
      fetchAssets();
    } catch (error: any) {
      toast({
        title: "Error deleting asset",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (asset: WebsiteAsset) => {
    setEditingAsset(asset);
    setFormData({
      asset_type: asset.asset_type,
      asset_name: asset.asset_name,
      file_url: asset.file_url,
      is_active: asset.is_active
    });
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingAsset(null);
    setFormData({ asset_type: "", asset_name: "", file_url: "", is_active: true });
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Website Assets</CardTitle>
            <CardDescription>Manage website images and backgrounds</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddNew} className="bg-gradient-to-r from-siya-500 to-magenta-500">
                <Plus className="h-4 w-4 mr-2" />
                Upload Asset
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingAsset ? 'Edit Asset' : 'Upload New Asset'}</DialogTitle>
                <DialogDescription>
                  {editingAsset ? 'Update asset details' : 'Upload a new website asset'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="asset_type">Asset Type</Label>
                    <Select value={formData.asset_type} onValueChange={(value) => setFormData({ ...formData, asset_type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select asset type" />
                      </SelectTrigger>
                      <SelectContent>
                        {ASSET_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
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
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Preview</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>
                  <img 
                    src={asset.file_url} 
                    alt={asset.asset_name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{asset.asset_name}</TableCell>
                <TableCell>
                  <span className="capitalize">{asset.asset_type.replace('-', ' ')}</span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${asset.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {asset.is_active ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(asset.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(asset)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(asset.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {assets.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                  No assets found. Upload your first website asset to get started!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default WebsiteAssetManager;
