import React from "react";
import { FaBolt, FaShieldAlt, FaHeart, FaCheckCircle } from "react-icons/fa";

const benefits = [
  {
    icon: <FaBolt className="text-2xl" />,
    title: "Instant Download",
    description: "Get your presets immediately after purchase",
  },
  {
    icon: <FaShieldAlt className="text-2xl" />,
    title: "Secure Payment",
    description: "100% secure checkout with Razorpay",
  },
  {
    icon: <FaHeart className="text-2xl" />,
    title: "Lifetime Access",
    description: "Download anytime, use forever",
  },
  {
    icon: <FaCheckCircle className="text-2xl" />,
    title: "Quality Guaranteed",
    description: "Handpicked by professional creators",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose PresetHub?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            India's most trusted marketplace for creative presets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow text-center"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
