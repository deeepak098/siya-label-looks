
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CollectionInfo {
  id: number;
  title: string;
  description: string;
  image: string;
  items: string;
  slug: string;
}

const FeaturedCollections = () => {
  const [collections, setCollections] = useState<CollectionInfo[]>([
    {
      id: 1,
      title: "Frocks",
      description: "Elegant frocks for every occasion",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop",
      items: "0 pieces",
      slug: "frocks"
    },
    {
      id: 2,
      title: "Dresses",
      description: "Sophisticated dresses for modern women",
      image: "https://images.unsplash.com/photo-1566479179817-c925b5318bf5?w=800&h=1000&fit=crop",
      items: "0 pieces",
      slug: "dresses"
    },
    {
      id: 3,
      title: "Sarees",
      description: "Traditional sarees with contemporary touch",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1000&fit=crop",
      items: "0 pieces",
      slug: "sarees"
    },
    {
      id: 4,
      title: "Co-ord Sets",
      description: "Matching sets for effortless style",
      image: "https://images.unsplash.com/photo-1571513722275-4b19c8f3e3ea?w=800&h=1000&fit=crop",
      items: "0 pieces",
      slug: "coord-sets"
    }
  ]);

  useEffect(() => {
    fetchProductCounts();
  }, []);

  const fetchProductCounts = async () => {
    try {
      // Get counts for each category
      const categories = ['frocks', 'dresses', 'sarees', 'coord-sets'];
      
      const updatedCollections = await Promise.all(
        collections.map(async (collection) => {
          const { count, error } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('category', collection.slug)
            .eq('in_stock', true);

          if (error) {
            console.error(`Error fetching count for ${collection.slug}:`, error);
            return collection;
          }

          return {
            ...collection,
            items: `${count || 0} piece${count !== 1 ? 's' : ''}`
          };
        })
      );

      setCollections(updatedCollections);
    } catch (error) {
      console.error('Error fetching product counts:', error);
    }
  };

  return (
    <section id="collections" className="py-12 md:py-20 bg-gradient-to-br from-white via-siya-50/30 to-magenta-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-transparent bg-gradient-to-r from-siya-600 via-magenta-600 to-siya-800 bg-clip-text mb-4 md:mb-6">
            Featured Collections
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Carefully curated pieces that define modern sophistication and timeless style
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-siya-500 to-magenta-500 mx-auto mt-4 md:mt-6 rounded-full"></div>
        </div>

        {/* Collections grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              to={`/collections/${collection.slug}`}
              className="group cursor-pointer animate-fade-in hover:scale-105 transition-all duration-700"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-siya-100 to-magenta-100 aspect-[4/5] mb-4 md:mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-700">
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-siya-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <span className="text-xs md:text-sm font-medium bg-white/20 backdrop-blur-md px-3 py-2 rounded-full border border-white/30">
                    {collection.items}
                  </span>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="text-center px-2">
                <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-siya-600 group-hover:to-magenta-600 group-hover:bg-clip-text transition-all duration-300">
                  {collection.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {collection.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-16">
          <Link
            to="/collections"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-siya-500 to-magenta-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium text-base md:text-lg hover:from-siya-600 hover:to-magenta-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>Explore All Collections</span>
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
