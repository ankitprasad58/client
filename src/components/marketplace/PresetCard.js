import React from "react";
import {
  FaVideo,
  FaCamera,
  FaMusic,
  FaPaintBrush,
  FaFilter,
  FaRupeeSign,
  FaDownload,
} from "react-icons/fa";

const getCategoryIcon = (category) => {
  switch (category) {
    case "video":
      return <FaVideo className="text-red-500" />;
    case "photo":
      return <FaCamera className="text-blue-500" />;
    case "audio":
      return <FaMusic className="text-green-500" />;
    case "graphics":
      return <FaPaintBrush className="text-purple-500" />;
    default:
      return <FaFilter className="text-gray-500" />;
  }
};

const PresetCard = ({ preset, onBuy, isPurchasing, isOwned, onDownload }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={
            preset.thumbnail ||
            preset.preview_image ||
            "https://via.placeholder.com/400x300"
          }
          alt={preset.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full text-sm">
            {getCategoryIcon(preset.category)}
            <span className="capitalize">{preset.category}</span>
          </span>
        </div>

        {/* Discount Badge */}
        {preset.original_price && preset.original_price > preset.price && (
          <div className="absolute top-3 right-3">
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {Math.round((1 - preset.price / preset.original_price) * 100)}%
              OFF
            </span>
          </div>
        )}

        {/* Owned Badge */}
        {isOwned && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Owned
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">
          {preset.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {preset.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          {preset.downloads > 0 && (
            <span className="flex items-center">
              <FaDownload className="mr-1" />
              {preset.downloads}
            </span>
          )}
          {preset.file_size && <span>{preset.file_size}</span>}
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center text-xl font-bold text-indigo-600">
              <FaRupeeSign className="text-lg" />
              {preset.price}
            </span>
            {preset.original_price && preset.original_price > preset.price && (
              <span className="text-gray-400 line-through text-sm">
                ₹{preset.original_price}
              </span>
            )}
          </div>

          {isOwned ? (
            <button
              onClick={() => onDownload(preset)}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              <FaDownload />
              <span>Download</span>
            </button>
          ) : (
            <button
              onClick={() => onBuy(preset)}
              disabled={isPurchasing}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
            >
              {isPurchasing ? (
                <span>Processing...</span>
              ) : (
                <>
                  <FaDownload />
                  <span>Buy Now</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PresetCard;
