import React from "react";
import { Link } from "react-router-dom";
import {
  FaVideo,
  FaMusic,
  FaLaptopCode,
  FaBook,
  FaGamepad,
  FaFilm,
  FaMobile,
  FaPaintBrush,
} from "react-icons/fa";

const categories = [
  {
    id: "video-presets",
    title: "Video Presets",
    description: "LUTs, Transitions, Templates",
    count: "1,200+ Items",
    icon: <FaVideo className="text-5xl" />,
    gradient: "from-purple-600 to-pink-600",
    tag: "🔥 HOT",
    popular: true,
  },
  {
    id: "software",
    title: "Premium Software",
    description: "Cracked & Licensed Tools",
    count: "500+ Tools",
    icon: <FaLaptopCode className="text-5xl" />,
    gradient: "from-blue-600 to-cyan-600",
    tag: "💎 EXCLUSIVE",
    popular: true,
  },
  {
    id: "audio",
    title: "Audio Presets",
    description: "VSTs, Samples, Sound Packs",
    count: "800+ Packs",
    icon: <FaMusic className="text-5xl" />,
    gradient: "from-orange-500 to-red-600",
    tag: "🎵 TRENDING",
  },
  {
    id: "digital-assets",
    title: "Digital Assets",
    description: "3D Models, Textures, Fonts",
    count: "2,500+ Assets",
    icon: <FaPaintBrush className="text-5xl" />,
    gradient: "from-green-500 to-teal-500",
    tag: "🆕 NEW",
  },
  {
    id: "study-notes",
    title: "Study Notes",
    description: "PDFs, Cheat Sheets, Courses",
    count: "1,500+ Notes",
    icon: <FaBook className="text-5xl" />,
    gradient: "from-yellow-500 to-orange-500",
    tag: "📚 POPULAR",
  },
  {
    id: "game-assets",
    title: "Game Assets",
    description: "Unity, Unreal Engine Assets",
    count: "900+ Assets",
    icon: <FaGamepad className="text-5xl" />,
    gradient: "from-red-500 to-pink-500",
    tag: "🎮 GAMING",
  },
  {
    id: "templates",
    title: "Templates",
    description: "Website, Figma, Canva",
    count: "3,000+ Templates",
    icon: <FaFilm className="text-5xl" />,
    gradient: "from-indigo-500 to-purple-500",
    tag: "⚡ FAST",
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    description: "Android, iOS Premium Apps",
    count: "400+ Apps",
    icon: <FaMobile className="text-5xl" />,
    gradient: "from-cyan-500 to-blue-500",
    tag: "📱 MOBILE",
  },
];

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/marketplace?category=${category.id}`}
      className="group relative h-64 rounded-3xl overflow-hidden transform hover:-translate-y-2 transition-all duration-500"
    >
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${category.gradient} transition-transform duration-500 group-hover:scale-110`}
      ></div>

      {/* Overlay Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

      {/* Tag */}
      {category.tag && (
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
          {category.tag}
        </div>
      )}

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
        <div className="mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">
          {category.icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-center">{category.title}</h3>
        <p className="text-white/80 text-center text-sm mb-3">
          {category.description}
        </p>
        <div className="flex items-center justify-center mt-2">
          <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
            {category.count}
          </span>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Link>
  );
};

const CategoriesSection = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-4">
            🎯 ONE-STOP DIGITAL MARKET
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Find{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Anything
            </span>{" "}
            Digital
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From premium software to study notes - we've got everything creators
            need to succeed
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link
            to="/marketplace"
            className="inline-flex items-center justify-center bg-gradient-to-r from-gray-900 to-black text-white font-bold py-4 px-8 rounded-2xl hover:shadow-2xl transition-all duration-300 group"
          >
            <span>
              Explore All{" "}
              {categories.reduce((sum, cat) => sum + parseInt(cat.count), 0)}+
              Items
            </span>
            <svg
              className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
