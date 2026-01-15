import React from "react";
import { FaBolt, FaLock, FaGift } from "react-icons/fa";

const benefits = [
  {
    icon: <FaBolt className="text-3xl" />,
    title: "Instant Access",
    description: "Download immediately. No waiting, no delays.",
    highlight: "⏱️ 30-second delivery",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: <FaLock className="text-3xl" />,
    title: "100% Secure",
    description: "Encrypted payments. Your data stays private.",
    highlight: "🔒 Bank-level security",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <FaGift className="text-3xl" />,
    title: "Free Bonuses",
    description: "Extra gifts with every purchase.",
    highlight: "🎁 Surprise bonuses",
    color: "from-pink-500 to-rose-500",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Why{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Market Station
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've removed every possible friction point to make your digital
            journey seamless
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-gray-50 group-hover:to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="text-white">{benefit.icon}</div>
                </div>

                {/* Content */}
                <h3 className="font-bold text-xl mb-3 text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-4">{benefit.description}</p>

                {/* Highlight */}
                <div className="inline-flex items-center text-sm font-semibold bg-gray-100 text-gray-800 px-4 py-2 rounded-full">
                  {benefit.highlight}
                </div>

                {/* Hover Effect Line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
