import React from "react";
import {
  FaUsers,
  FaDownload,
  FaRupeeSign,
  FaStar,
  FaHeart,
  FaRocket,
} from "react-icons/fa";

const StatsSection = () => {
  const stats = [
    {
      value: "10,467+",
      label: "Active Creators",
      icon: <FaUsers className="text-3xl" />,
      color: "from-blue-500 to-cyan-500",
      description: "Trusted Community",
    },
    {
      value: "2.8M+",
      label: "Downloads",
      icon: <FaDownload className="text-3xl" />,
      color: "from-green-500 to-emerald-500",
      description: "Satisfied Customers",
    },
    {
      value: "₹4.2Cr+",
      label: "Paid to Creators",
      icon: <FaRupeeSign className="text-3xl" />,
      color: "from-yellow-500 to-orange-500",
      description: "Creator Earnings",
    },
    {
      value: "4.92/5",
      label: "Average Rating",
      icon: <FaStar className="text-3xl" />,
      color: "from-purple-500 to-pink-500",
      description: "Based on Reviews",
    },
    {
      value: "98.7%",
      label: "Satisfaction",
      icon: <FaHeart className="text-3xl" />,
      color: "from-red-500 to-pink-500",
      description: "Happy Customers",
    },
    {
      value: "24/7",
      label: "Support",
      icon: <FaRocket className="text-3xl" />,
      color: "from-indigo-500 to-blue-500",
      description: "Instant Help",
    },
  ];

  return (
    <section className="py-12 -mt-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl p-8 grid grid-cols-2 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${
                  stat.color
                } mb-4 group-hover:shadow-lg group-hover:shadow-${
                  stat.color.split("-")[1]
                }-500/30`}
              >
                <div className="text-white">{stat.icon}</div>
              </div>
              <div className="text-3xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-gray-300 font-semibold mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-gray-500">{stat.description}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StatsSection;
