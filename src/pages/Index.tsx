
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import FeaturedCollections from "@/components/FeaturedCollections";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <FeaturedCollections />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
