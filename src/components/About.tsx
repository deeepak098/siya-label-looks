
import { Heart, Sparkles, Users } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion for Quality",
      description: "Every piece is crafted with meticulous attention to detail and premium materials"
    },
    {
      icon: Sparkles,
      title: "Timeless Design",
      description: "Creating elegant pieces that transcend seasonal trends and remain stylish forever"
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building a community of confident individuals who express themselves through fashion"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl sm:text-5xl font-light text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Siyalabel was born from a vision to create clothing that empowers individuals to express their unique style with confidence. We believe that fashion should be more than just clothing—it should be a form of self-expression that makes you feel extraordinary.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our commitment to sustainability, quality craftsmanship, and inclusive design drives everything we do. Each piece in our collection is thoughtfully designed to celebrate the beauty of individuality while maintaining the highest standards of comfort and style.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-6">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-4 animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=1000&fit=crop" 
                alt="About Siyalabel" 
                className="w-full h-96 lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600 mb-1">10K+</p>
                <p className="text-gray-600 text-sm">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
