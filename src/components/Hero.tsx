
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-siya-50 via-magenta-50 to-siya-100 overflow-hidden pt-20 pb-10">
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-siya-200 to-magenta-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-magenta-200 to-siya-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-siya-200 to-magenta-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 animate-bounce hidden md:block">
          <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-siya-400 opacity-60" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-bounce animation-delay-1000 hidden md:block">
          <Sparkles className="h-4 w-4 md:h-6 md:w-6 text-magenta-400 opacity-60" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-bounce animation-delay-2000 hidden md:block">
          <Sparkles className="h-6 w-6 md:h-10 md:w-10 text-siya-400 opacity-60" />
        </div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Logo */}
        <div className="mb-6 md:mb-8 animate-fade-in">
          <img 
            src="/lovable-uploads/02f499e8-6cbc-48bc-848a-e0ddac0d8f22.png" 
            alt="Siyalabel" 
            className="h-24 sm:h-32 md:h-40 w-auto mx-auto mb-4 md:mb-6 drop-shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Hero text */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-light text-gray-900 mb-4 md:mb-6 animate-fade-in animation-delay-200">
          Elegance
          <span className="block text-transparent bg-gradient-to-r from-siya-600 via-magenta-600 to-siya-800 bg-clip-text font-normal">
            Redefined
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-400">
          Discover our <span className="text-siya-600 font-semibold">curated collection</span> of contemporary fashion that speaks to your unique style and sophistication.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center animate-fade-in animation-delay-600">
          <Link
            to="/collections"
            className="w-full sm:w-auto group bg-gradient-to-r from-siya-600 to-magenta-600 text-white px-6 md:px-10 py-3 md:py-5 rounded-full font-medium text-lg md:text-xl hover:from-siya-700 hover:to-magenta-700 transition-all duration-300 flex items-center justify-center space-x-3 hover:scale-105 shadow-xl"
          >
            <span>Shop Collection</span>
            <ArrowRight className="h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto border-2 border-siya-600 text-siya-600 px-6 md:px-10 py-3 md:py-5 rounded-full font-medium text-lg md:text-xl hover:bg-siya-600 hover:text-white transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Learn Our Story
          </button>
        </div>

        {/* Trust badges */}
        <div className="mt-10 md:mt-16 flex flex-wrap justify-center items-center gap-6 md:gap-8 opacity-70 animate-fade-in animation-delay-800">
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-siya-600">500+</div>
            <div className="text-xs md:text-sm text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-magenta-600">100+</div>
            <div className="text-xs md:text-sm text-gray-600">Unique Designs</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-siya-600">24/7</div>
            <div className="text-xs md:text-sm text-gray-600">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
