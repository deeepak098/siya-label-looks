
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <img 
            src="/lovable-uploads/02f499e8-6cbc-48bc-848a-e0ddac0d8f22.png" 
            alt="Siyalabel" 
            className="h-32 w-auto mx-auto mb-6"
          />
        </div>

        {/* Hero text */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-gray-900 mb-6 animate-fade-in animation-delay-200">
          Elegance
          <span className="block text-purple-600 font-normal">Redefined</span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in animation-delay-400">
          Discover our curated collection of contemporary fashion that speaks to your unique style and sophistication.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animation-delay-600">
          <button className="group bg-purple-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-purple-700 transition-all duration-300 flex items-center space-x-2 hover:scale-105">
            <span>Shop Collection</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          
          <button className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full font-medium text-lg hover:bg-purple-600 hover:text-white transition-all duration-300 hover:scale-105">
            Learn Our Story
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
