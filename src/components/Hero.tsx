
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 overflow-hidden">
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-pink-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 animate-bounce">
          <Sparkles className="h-8 w-8 text-purple-400 opacity-60" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-bounce animation-delay-1000">
          <Sparkles className="h-6 w-6 text-pink-400 opacity-60" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-bounce animation-delay-2000">
          <Sparkles className="h-10 w-10 text-indigo-400 opacity-60" />
        </div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <img 
            src="/lovable-uploads/02f499e8-6cbc-48bc-848a-e0ddac0d8f22.png" 
            alt="Siyalabel" 
            className="h-40 w-auto mx-auto mb-6 drop-shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Hero text */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light text-gray-900 mb-6 animate-fade-in animation-delay-200">
          Elegance
          <span className="block text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text font-normal">
            Redefined
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-400">
          Discover our <span className="text-purple-600 font-semibold">curated collection</span> of contemporary fashion that speaks to your unique style and sophistication.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in animation-delay-600">
          <Link
            to="/collections"
            className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-full font-medium text-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center space-x-3 hover:scale-105 shadow-xl"
          >
            <span>Shop Collection</span>
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-purple-600 text-purple-600 px-10 py-5 rounded-full font-medium text-xl hover:bg-purple-600 hover:text-white transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Learn Our Story
          </button>
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-70 animate-fade-in animation-delay-800">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">500+</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">100+</div>
            <div className="text-sm text-gray-600">Unique Designs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">24/7</div>
            <div className="text-sm text-gray-600">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
