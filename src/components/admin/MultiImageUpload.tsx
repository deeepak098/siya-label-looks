
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, X, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProductImage {
  id?: string;
  image_url: string;
  is_primary: boolean;
  display_order: number;
}

interface MultiImageUploadProps {
  productId?: string;
  images: ProductImage[];
  onImagesChange: (images: ProductImage[]) => void;
}

const MultiImageUpload = ({ productId, images, onImagesChange }: MultiImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setUploading(true);

    try {
      const uploadPromises = files.map(async (file, index) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`File ${file.name} is not an image`);
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`File ${file.name} is too large (max 5MB)`);
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        return {
          image_url: data.publicUrl,
          is_primary: images.length === 0 && index === 0,
          display_order: images.length + index
        };
      });

      const newImages = await Promise.all(uploadPromises);
      const updatedImages = [...images, ...newImages];
      onImagesChange(updatedImages);
      
      toast({
        title: "Images uploaded successfully",
        description: `${files.length} image(s) have been uploaded`,
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    // If we removed the primary image, make the first remaining image primary
    if (images[index].is_primary && updatedImages.length > 0) {
      updatedImages[0].is_primary = true;
    }
    onImagesChange(updatedImages);
  };

  const setPrimaryImage = (index: number) => {
    const updatedImages = images.map((img, i) => ({
      ...img,
      is_primary: i === index
    }));
    onImagesChange(updatedImages);
  };

  const reorderImages = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    
    // Update display order
    updatedImages.forEach((img, index) => {
      img.display_order = index;
    });
    
    onImagesChange(updatedImages);
  };

  return (
    <div className="space-y-4">
      <Label>Product Images</Label>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img 
              src={image.image_url} 
              alt={`Product image ${index + 1}`} 
              className="w-full h-32 object-cover rounded-lg border"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setPrimaryImage(index)}
                className={`h-8 w-8 p-0 ${image.is_primary ? 'bg-yellow-500' : ''}`}
                title="Set as primary image"
              >
                <Star className={`h-4 w-4 ${image.is_primary ? 'fill-current' : ''}`} />
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => removeImage(index)}
                title="Remove image"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {image.is_primary && (
              <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                Primary
              </div>
            )}
          </div>
        ))}
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <p className="text-xs text-gray-500 mb-2">Add more images</p>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            disabled={uploading}
            className="text-xs"
          />
        </div>
      </div>

      {uploading && (
        <p className="text-sm text-blue-600">Uploading images...</p>
      )}

      <div className="text-xs text-gray-500">
        Supported formats: JPG, PNG, GIF. Max size: 5MB per image. Click star to set primary image.
      </div>
    </div>
  );
};

export default MultiImageUpload;
