
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const CollectionDetail = () => {
  const { category } = useParams();

  const collections = {
    frocks: {
      title: "Frocks",
      description: "Elegant frocks for every occasion",
      products: [
        {
          id: "frock-1",
          name: "Floral Summer Frock",
          price: 2499,
          image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop",
          category: "frocks"
        },
        {
          id: "frock-2", 
          name: "Cotton Casual Frock",
          price: 1899,
          image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1000&fit=crop",
          category: "frocks"
        },
        {
          id: "frock-3",
          name: "Designer Party Frock",
          price: 3999,
          image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop",
          category: "frocks"
        },
        {
          id: "frock-4",
          name: "Elegant Evening Frock",
          price: 4599,
          image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d4e?w=800&h=1000&fit=crop",
          category: "frocks"
        }
      ]
    },
    dresses: {
      title: "Dresses",
      description: "Sophisticated dresses for modern women",
      products: [
        {
          id: "dress-1",
          name: "Silk Midi Dress",
          price: 3299,
          image: "https://images.unsplash.com/photo-1566479179817-c925b5318bf5?w=800&h=1000&fit=crop",
          category: "dresses"
        },
        {
          id: "dress-2",
          name: "Office Wear Dress",
          price: 2799,
          image: "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=800&h=1000&fit=crop",
          category: "dresses"
        },
        {
          id: "dress-3",
          name: "Cocktail Dress",
          price: 4999,
          image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&h=1000&fit=crop",
          category: "dresses"
        },
        {
          id: "dress-4",
          name: "Maxi Dress",
          price: 3599,
          image: "https://images.unsplash.com/photo-1551515637-774c739b5721?w=800&h=1000&fit=crop",
          category: "dresses"
        }
      ]
    },
    sarees: {
      title: "Sarees",
      description: "Traditional sarees with contemporary touch",
      products: [
        {
          id: "saree-1",
          name: "Silk Embroidered Saree",
          price: 5999,
          image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1000&fit=crop",
          category: "sarees"
        },
        {
          id: "saree-2",
          name: "Cotton Traditional Saree",
          price: 2999,
          image: "https://images.unsplash.com/photo-1583846715135-062e5b632bf0?w=800&h=1000&fit=crop",
          category: "sarees"
        },
        {
          id: "saree-3",
          name: "Designer Wedding Saree",
          price: 8999,
          image: "https://images.unsplash.com/photo-1631542336330-9a09814ba0b4?w=800&h=1000&fit=crop",
          category: "sarees"
        },
        {
          id: "saree-4",
          name: "Georgette Party Saree",
          price: 4599,
          image: "https://images.unsplash.com/photo-1594736797933-d0413ba8e884?w=800&h=1000&fit=crop",
          category: "sarees"
        }
      ]
    },
    "coord-sets": {
      title: "Co-ord Sets",
      description: "Matching sets for effortless style",
      products: [
        {
          id: "coord-1",
          name: "Two Piece Crop Set",
          price: 2799,
          image: "https://images.unsplash.com/photo-1571513722275-4b19c8f3e3ea?w=800&h=1000&fit=crop",
          category: "coord-sets"
        },
        {
          id: "coord-2",
          name: "Formal Co-ord Set",
          price: 3499,
          image: "https://images.unsplash.com/photo-1506629905851-f855b4c8eb1b?w=800&h=1000&fit=crop",
          category: "coord-sets"
        },
        {
          id: "coord-3",
          name: "Casual Summer Set",
          price: 2299,
          image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&h=1000&fit=crop",
          category: "coord-sets"
        },
        {
          id: "coord-4",
          name: "Party Co-ord Set",
          price: 4199,
          image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1000&fit=crop",
          category: "coord-sets"
        }
      ]
    }
  };

  const currentCollection = collections[category as keyof typeof collections];

  if (!currentCollection) {
    return <div>Collection not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-light text-gray-900 mb-4">
              {currentCollection.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {currentCollection.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {currentCollection.products.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CollectionDetail;
