import React from "react";

const stats = [
  { value: "10K+", label: "Happy Creators" },
  { value: "5K+", label: "Premium Presets" },
  { value: "₹50L+", label: "Creator Earnings" },
  { value: "4.9", label: "Average Rating" },
];

const StatsSection = () => {
  return (
    <section className="py-12 -mt-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
