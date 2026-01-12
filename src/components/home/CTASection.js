import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaShieldAlt } from "react-icons/fa";

const CTASection = () => {
  return (
    <section className="py-20 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to Level Up Your
          <span className="block text-purple-600">Creative Game?</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join 10,000+ creators. Get instant access to premium presets.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-10 rounded-full text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-xl"
          >
            Get Started Free
            <FaArrowRight className="ml-2" />
          </Link>
          <Link
            to="/marketplace"
            className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 font-semibold py-4 px-10 rounded-full text-lg hover:border-purple-600 hover:text-purple-600 transition-all"
          >
            Browse Presets
          </Link>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-8 inline-flex items-center text-gray-500">
          <FaShieldAlt className="text-green-500 mr-2" />
          <span>30-Day Money Back Guarantee</span>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
