
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";

interface WebsiteAsset {
  id: string;
  asset_type: string;
  asset_name: string;
  file_url: string;
  is_active: boolean;
  created_at: string;
}

interface AssetTableProps {
  assets: WebsiteAsset[];
  onEdit: (asset: WebsiteAsset) => void;
  onDelete: (id: string) => void;
}

const AssetTable = ({ assets, onEdit, onDelete }: AssetTableProps) => {
  return (
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
                <Button size="sm" variant="outline" onClick={() => onEdit(asset)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => onDelete(asset.id)}>
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
  );
};

export default AssetTable;
