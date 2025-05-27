
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface AssetTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const ASSET_TYPES = [
  { value: "background", label: "Background Image" },
  { value: "hero-image", label: "Hero Image" },
  { value: "category-image", label: "Category Image" },
  { value: "banner", label: "Banner" },
  { value: "logo", label: "Logo" }
];

const AssetTypeSelector = ({ value, onChange }: AssetTypeSelectorProps) => {
  return (
    <div>
      <Label htmlFor="asset_type">Asset Type</Label>
      <Select value={value} onValueChange={onChange}>
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
  );
};

export default AssetTypeSelector;
