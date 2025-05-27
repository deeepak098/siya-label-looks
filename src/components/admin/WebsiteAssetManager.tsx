
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AssetFormDialog from "./AssetFormDialog";
import AssetTable from "./AssetTable";

interface WebsiteAsset {
  id: string;
  asset_type: string;
  asset_name: string;
  file_url: string;
  is_active: boolean;
  created_at: string;
}

const WebsiteAssetManager = () => {
  const [assets, setAssets] = useState<WebsiteAsset[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<WebsiteAsset | null>(null);
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
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingAsset(null);
    setIsDialogOpen(true);
  };

  const handleAssetSaved = () => {
    fetchAssets();
    setEditingAsset(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Website Assets</CardTitle>
            <CardDescription>Manage website images and backgrounds</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={handleAddNew} className="bg-gradient-to-r from-siya-500 to-magenta-500">
                <Plus className="h-4 w-4 mr-2" />
                Upload Asset
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <AssetTable
          assets={assets}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </CardContent>
      
      <AssetFormDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingAsset={editingAsset}
        onAssetSaved={handleAssetSaved}
      />
    </Card>
  );
};

export default WebsiteAssetManager;
