
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-light text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
            404
          </h1>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Oops! The page you're looking for seems to have wandered off. 
          Let's get you back to discovering beautiful fashion.
        </p>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105"
          >
            <Home className="h-5 w-5" />
            <span>Go Home</span>
          </Link>
          
          <div className="block">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
