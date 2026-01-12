import React from "react";
import { Link } from "react-router-dom";
import { FaVideo, FaImage, FaMusic } from "react-icons/fa";

const categories = [
  {
    id: "video",
    title: "Video Presets",
    description: "LUTs, Color Grades, Effects",
    count: "200+ Presets",
    icon: <FaVideo className="text-5xl" />,
    gradient: "from-purple-600 to-pink-600",
  },
  {
    id: "photo",
    title: "Photo Presets",
    description: "Lightroom, Photoshop, Mobile",
    count: "300+ Presets",
    icon: <FaImage className="text-5xl" />,
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    id: "audio",
    title: "Audio Presets",
    description: "Mixing, Mastering, Effects",
    count: "150+ Presets",
    icon: <FaMusic className="text-5xl" />,
    gradient: "from-orange-500 to-red-600",
  },
];

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/marketplace?category=${category.id}`}
      className="group relative h-64 rounded-2xl overflow-hidden"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`}
      ></div>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
      <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
        <div className="mb-4 group-hover:scale-110 transition-transform">
          {category.icon}
        </div>
        <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
        <p className="text-white/80 text-center">{category.description}</p>
        <span className="mt-4 bg-white/20 px-4 py-1 rounded-full text-sm">
          {category.count}
        </span>
      </div>
    </Link>
  );
};

const CategoriesSection = () => {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Browse by Category
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
