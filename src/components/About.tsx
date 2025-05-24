
import { Sparkles, Heart, Users } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-light text-gray-900 mb-4">
            About <span className="text-purple-600 font-normal">Siyalabel</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Born from a passion for empowering women through fashion, Siyalabel creates pieces that celebrate individuality and confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Craftsmanship</h3>
            <p className="text-gray-600 leading-relaxed">
              Every piece is meticulously crafted with attention to detail and premium materials.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Made with Love</h3>
            <p className="text-gray-600 leading-relaxed">
              Each design is created with passion and care to make you feel beautiful and confident.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Community First</h3>
            <p className="text-gray-600 leading-relaxed">
              We believe in building a community of confident women who support each other.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-light text-gray-900 mb-6">
                Our Story
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Founded with the vision to redefine elegance, Siyalabel started as a dream to create clothing that speaks to the modern woman's soul. We believe that fashion is not just about looking good, but feeling empowered and confident in your own skin.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From our carefully curated collections of frocks and dresses to our sophisticated sarees and coordinated sets, every piece tells a story of craftsmanship, quality, and timeless style.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=400&fit=crop"
                alt="Our Story"
                className="rounded-2xl shadow-lg w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
