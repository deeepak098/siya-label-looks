
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Collections = () => {
  const collections = [
    {
      id: "frocks",
      title: "Frocks",
      description: "Elegant frocks for every occasion",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop",
      itemCount: "24 pieces"
    },
    {
      id: "dresses",
      title: "Dresses", 
      description: "Sophisticated dresses for modern women",
      image: "https://images.unsplash.com/photo-1566479179817-c925b5318bf5?w=800&h=1000&fit=crop",
      itemCount: "32 pieces"
    },
    {
      id: "sarees",
      title: "Sarees",
      description: "Traditional sarees with contemporary touch",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1000&fit=crop",
      itemCount: "18 pieces"
    },
    {
      id: "coord-sets",
      title: "Co-ord Sets",
      description: "Matching sets for effortless style",
      image: "https://images.unsplash.com/photo-1571513722275-4b19c8f3e3ea?w=800&h=1000&fit=crop",
      itemCount: "28 pieces"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-light text-gray-900 mb-4">
              Our Collections
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our curated collections designed for the modern woman
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {collections.map((collection, index) => (
              <Link
                key={collection.id}
                to={`/collections/${collection.id}`}
                className="group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/5] mb-6 group-hover:scale-105 transition-transform duration-700">
                  <img 
                    src={collection.image} 
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      {collection.itemCount}
                    </span>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-medium text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                    {collection.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {collection.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Collections;
