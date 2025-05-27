import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
}

const CollectionDetail = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (category) {
      fetchProducts();
    }
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, image, category, sizes')
        .eq('category', category)
        .eq('in_stock', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error loading products",
        description: "Failed to load products. Please try again.",
        variant: "destructive",
      });
      // Fallback to empty array if there's an error
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const getCollectionInfo = (cat: string) => {
    switch (cat) {
      case "frocks":
        return {
          title: "Elegant Frocks",
          description: "Graceful frocks for every occasion, from casual outings to special events",
          image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1200&h=600&fit=crop"
        };
      case "dresses":
        return {
          title: "Sophisticated Dresses", 
          description: "Contemporary dresses that blend comfort with style for the modern woman",
          image: "https://images.unsplash.com/photo-1566479179817-c925b5318bf5?w=1200&h=600&fit=crop"
        };
      case "sarees":
        return {
          title: "Traditional Sarees",
          description: "Timeless sarees with a contemporary touch for the discerning woman",
          image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&h=600&fit=crop"
        };
      case "coord-sets":
        return {
          title: "Coordinated Sets",
          description: "Perfectly matched sets for effortless style and sophistication",
          image: "https://images.unsplash.com/photo-1571513722275-4b19c8f3e3ea?w=1200&h=600&fit=crop"
        };
      default:
        return {
          title: "Collection",
          description: "Discover our curated fashion collection",
          image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1200&h=600&fit=crop"
        };
    }
  };

  const collectionInfo = getCollectionInfo(category || "");

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url(${collectionInfo.image})` }}
        ></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-6xl font-light mb-4">
            {collectionInfo.title}
          </h1>
          <p className="text-xl sm:text-2xl max-w-2xl mx-auto opacity-90">
            {collectionInfo.description}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-siya-500"></div>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">No Products Found</h3>
                <p className="text-gray-500 mb-6">
                  We're working on adding amazing products to this collection. Check back soon!
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-siya-500 to-magenta-500 mx-auto rounded-full"></div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CollectionDetail;
