
const FeaturedCollections = () => {
  const collections = [
    {
      id: 1,
      title: "Summer Essentials",
      description: "Light, breathable fabrics perfect for warm weather",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=1000&fit=crop",
      items: "24 pieces"
    },
    {
      id: 2,
      title: "Urban Elegance",
      description: "Sophisticated pieces for the modern professional",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=1000&fit=crop",
      items: "18 pieces"
    },
    {
      id: 3,
      title: "Weekend Comfort",
      description: "Casual luxury for your downtime",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=1000&fit=crop",
      items: "32 pieces"
    }
  ];

  return (
    <section id="collections" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-light text-gray-900 mb-4">
            Featured Collections
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Carefully curated pieces that define modern sophistication and timeless style
          </p>
        </div>

        {/* Collections grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div 
              key={collection.id} 
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
                    {collection.items}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
