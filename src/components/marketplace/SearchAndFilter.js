import React from "react";
import {
  FaSearch,
  FaFilter,
  FaVideo,
  FaCamera,
  FaMusic,
  FaPaintBrush,
} from "react-icons/fa";

const categories = [
  { id: "all", name: "All", icon: <FaFilter /> },
  { id: "video", name: "Video", icon: <FaVideo /> },
  { id: "photo", name: "Photo", icon: <FaCamera /> },
  { id: "audio", name: "Audio", icon: <FaMusic /> },
  { id: "graphics", name: "Graphics", icon: <FaPaintBrush /> },
];

const SearchAndFilter = ({ searchTerm, setSearchTerm, filter, setFilter }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* Search Input */}
      <div className="relative flex-1">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search presets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
        />
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
              filter === cat.id
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {cat.icon}
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilter;
