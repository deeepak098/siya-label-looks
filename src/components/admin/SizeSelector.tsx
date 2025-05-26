
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface SizeSelectorProps {
  selectedSizes: string[];
  onSizesChange: (sizes: string[]) => void;
}

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const SizeSelector = ({ selectedSizes, onSizesChange }: SizeSelectorProps) => {
  const [customSize, setCustomSize] = useState("");

  const handleSizeToggle = (size: string) => {
    if (selectedSizes.includes(size)) {
      onSizesChange(selectedSizes.filter(s => s !== size));
    } else {
      onSizesChange([...selectedSizes, size]);
    }
  };

  const addCustomSize = () => {
    if (customSize.trim() && !selectedSizes.includes(customSize.trim())) {
      onSizesChange([...selectedSizes, customSize.trim()]);
      setCustomSize("");
    }
  };

  const removeSize = (size: string) => {
    onSizesChange(selectedSizes.filter(s => s !== size));
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Available Sizes</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {AVAILABLE_SIZES.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={size}
                checked={selectedSizes.includes(size)}
                onCheckedChange={() => handleSizeToggle(size)}
              />
              <Label htmlFor={size} className="text-sm">{size}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Add Custom Size</Label>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Enter custom size"
            value={customSize}
            onChange={(e) => setCustomSize(e.target.value)}
            className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm"
            onKeyPress={(e) => e.key === 'Enter' && addCustomSize()}
          />
          <Button type="button" size="sm" onClick={addCustomSize}>
            Add
          </Button>
        </div>
      </div>

      {selectedSizes.length > 0 && (
        <div>
          <Label className="text-sm font-medium">Selected Sizes</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedSizes.map((size) => (
              <Badge key={size} variant="secondary" className="flex items-center gap-1">
                {size}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => removeSize(size)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SizeSelector;
