import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaShieldAlt,
  FaGift,
  FaClock,
  FaUsers,
} from "react-icons/fa";

const CTASection = () => {
  const [counter, setCounter] = useState({
    users: 0,
    savings: 0,
    products: 0,
  });

  useEffect(() => {
    const targets = {
      users: 10467,
      savings: 42000000,
      products: 8500,
    };

    const duration = 2000;
    const steps = 100;
    const interval = duration / steps;

    const timers = Object.keys(targets).map((key) => {
      const target = targets[key];
      let current = 0;
      const step = target / steps;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounter((prev) => ({
          ...prev,
          [key]: Math.floor(current),
        }));
      }, interval);

      return timer;
    });

    return () => timers.forEach((timer) => clearInterval(timer));
  }, []);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>

      {/* Animated Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-4 text-center text-white">
        {/* Final Offer */}
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-orange-500 px-6 py-3 rounded-full mb-8 animate-pulse">
          <FaClock className="animate-spin" />
          <span className="font-bold text-lg">FINAL OFFER ENDS TONIGHT</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
          <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            DON'T PAY FULL PRICE
          </span>
          <span className="block text-3xl md:text-4xl text-gray-300 mt-4">
            Ever Again For Digital Products
          </span>
        </h2>

        {/* Social Proof Counter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
            <div className="text-4xl font-black text-yellow-400 mb-2">
              {counter.users.toLocaleString()}+
            </div>
            <div className="text-gray-300 flex items-center justify-center">
              <FaUsers className="mr-2" />
              Creators Joined
            </div>
          </div>
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
            <div className="text-4xl font-black text-green-400 mb-2">
              ₹{counter.savings.toLocaleString()}+
            </div>
            <div className="text-gray-300">Total Savings</div>
          </div>
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
            <div className="text-4xl font-black text-blue-400 mb-2">
              {counter.products.toLocaleString()}+
            </div>
            <div className="text-gray-300">Premium Products</div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="space-y-6">
          <Link
            to="/register"
            className="group relative inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black py-6 px-12 rounded-2xl text-2xl hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
            <span className="relative">🚀 GET INSTANT ACCESS (50% OFF)</span>
            <FaArrowRight className="ml-4 text-xl group-hover:translate-x-2 transition-transform" />
          </Link>

          <p className="text-gray-400 text-sm">
            🔥 Last chance! Price increases in{" "}
            <span className="text-yellow-400 font-bold">2 hours</span>
          </p>
        </div>

        {/* Security Badges */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-400">
          <div className="flex items-center">
            <FaShieldAlt className="text-green-400 mr-2" />
            <span>256-bit SSL Encryption</span>
          </div>
          <div className="flex items-center">
            <FaGift className="text-yellow-400 mr-2" />
            <span>+3 Free Bonuses</span>
          </div>
          <div className="flex items-center">
            <div className="text-xl mr-2">💳</div>
            <span>UPI • Cards • NetBanking</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
