
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
    <div className="min-h-screen bg-gradient-to-br from-siya-50 via-white to-magenta-50">
      <Navigation />
      
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-light text-transparent bg-gradient-to-r from-siya-600 via-magenta-600 to-siya-800 bg-clip-text mb-6">
              Our Collections
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our curated collections designed for the modern woman who embraces elegance and style
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-siya-500 to-magenta-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {collections.map((collection, index) => (
              <Link
                key={collection.id}
                to={`/collections/${collection.id}`}
                className="group cursor-pointer animate-fade-in hover:scale-[1.02] transition-all duration-700"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-siya-100 to-magenta-100 aspect-[4/5] mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-700">
                  <img 
                    src={collection.image} 
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-siya-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  <div className="absolute bottom-6 left-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-sm font-medium bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                      {collection.itemCount}
                    </span>
                  </div>
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-medium text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-siya-600 group-hover:to-magenta-600 group-hover:bg-clip-text transition-all duration-300">
                    {collection.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {collection.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-siya-500 to-magenta-500 rounded-3xl p-12 text-white shadow-2xl">
              <h2 className="text-3xl font-light mb-4">Crafted with Love</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Every piece in our collection is carefully designed to celebrate your unique style and confidence
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Collections;
