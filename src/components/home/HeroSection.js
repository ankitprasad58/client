import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheckCircle, FaPlay } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto py-16 md:py-24">
        {/* Limited Time Offer Banner */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full text-sm animate-bounce">
            🔥 LIMITED TIME: 50% OFF on All Presets! Ends Soon
          </span>
        </div>

        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            Transform Your
            <span className="block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
              Creative Vision
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Professional presets used by{" "}
            <strong>10,000+ Indian creators</strong>. Save hours of editing time
            and create stunning content.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/marketplace"
              className="group inline-flex items-center justify-center bg-white text-purple-900 font-bold py-4 px-8 rounded-full text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <span>Shop Now - 50% OFF</span>
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="inline-flex items-center justify-center border-2 border-white/30 text-white font-semibold py-4 px-8 rounded-full text-lg hover:bg-white/10 transition-all duration-300">
              <FaPlay className="mr-2" />
              Watch Demo
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-purple-200">
            <div className="flex items-center">
              <FaCheckCircle className="text-green-400 mr-2 text-xl" />
              <span>Secure UPI & Card Payment</span>
            </div>
            <div className="flex items-center">
              <FaCheckCircle className="text-green-400 mr-2 text-xl" />
              <span>Instant Download</span>
            </div>
            <div className="flex items-center">
              <FaCheckCircle className="text-green-400 mr-2 text-xl" />
              <span>Lifetime Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
