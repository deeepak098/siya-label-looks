
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const CollectionDetail = () => {
  const { category } = useParams();

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

  const generateProducts = (category: string, count: number = 12) => {
    const baseImages = {
      frocks: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop"
      ],
      dresses: [
        "https://images.unsplash.com/photo-1566479179817-c925b5318bf5?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop"
      ],
      sarees: [
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1631987324582-ddadff01c7ed?w=400&h=500&fit=crop"
      ],
      "coord-sets": [
        "https://images.unsplash.com/photo-1571513722275-4b19c8f3e3ea?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1559582927-47108e2fb9d4?w=400&h=500&fit=crop"
      ]
    };

    const categoryImages = baseImages[category as keyof typeof baseImages] || baseImages.dresses;
    
    return Array.from({ length: count }, (_, i) => ({
      id: `${category}-${i + 1}`,
      name: `${getCollectionInfo(category).title.split(' ')[1]} ${i + 1}`,
      price: Math.floor(Math.random() * 5000) + 1500,
      image: categoryImages[i % categoryImages.length],
      category: category
    }));
  };

  const collectionInfo = getCollectionInfo(category || "");
  const products = generateProducts(category || "", 12);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CollectionDetail;
