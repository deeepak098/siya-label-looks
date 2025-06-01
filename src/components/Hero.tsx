
import { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Hero = () => {
  const [heroImageUrl, setHeroImageUrl] = useState<string>("");

  useEffect(() => {
    fetchHeroSettings();
  }, []);

  const fetchHeroSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('hero_image_url')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      
      if (data?.hero_image_url) {
        setHeroImageUrl(data.hero_image_url);
      }
    } catch (error) {
      console.error('Error fetching hero settings:', error);
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10"
      style={{
        backgroundImage: heroImageUrl ? `url(${heroImageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability when background image is present */}
      {heroImageUrl && (
        <div className="absolute inset-0 bg-black/40"></div>
      )}
      
      {/* Fallback gradient background when no hero image */}
      {!heroImageUrl && (
        <div className="absolute inset-0 bg-gradient-to-br from-siya-50 via-magenta-50 to-siya-100"></div>
      )}

      {/* Enhanced Background decoration - only show when no hero image */}
      {!heroImageUrl && (
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
      )}

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Logo */}
        <div className="mb-6 md:mb-8 animate-fade-in">
          <img 
            src="/lovable-uploads/02f499e8-6cbc-48bc-848a-e0ddac0d8f22.png" 
            alt="Siyalabel" 
            className="h-24 sm:h-32 md:h-40 w-auto mx-auto mb-4 md:mb-6 drop-shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

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
            className={`w-full sm:w-auto border-2 px-6 md:px-10 py-3 md:py-5 rounded-full font-medium text-lg md:text-xl transition-all duration-300 hover:scale-105 shadow-lg ${
              heroImageUrl 
                ? 'border-white text-white hover:bg-white hover:text-gray-900' 
                : 'border-siya-600 text-siya-600 hover:bg-siya-600 hover:text-white'
            }`}
          >
            Learn Our Story
          </button>
        </div>

        {/* Trust badges */}
        <div className="mt-10 md:mt-16 flex flex-wrap justify-center items-center gap-6 md:gap-8 opacity-70 animate-fade-in animation-delay-800">
          <div className="text-center">
            <div className={`text-xl md:text-2xl font-bold ${heroImageUrl ? 'text-white' : 'text-siya-600'}`}>500+</div>
            <div className={`text-xs md:text-sm ${heroImageUrl ? 'text-gray-200' : 'text-gray-600'}`}>Happy Customers</div>
          </div>
          <div className="text-center">
            <div className={`text-xl md:text-2xl font-bold ${heroImageUrl ? 'text-white' : 'text-magenta-600'}`}>100+</div>
            <div className={`text-xs md:text-sm ${heroImageUrl ? 'text-gray-200' : 'text-gray-600'}`}>Unique Designs</div>
          </div>
          <div className="text-center">
            <div className={`text-xl md:text-2xl font-bold ${heroImageUrl ? 'text-white' : 'text-siya-600'}`}>24/7</div>
            <div className={`text-xs md:text-sm ${heroImageUrl ? 'text-gray-200' : 'text-gray-600'}`}>Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
