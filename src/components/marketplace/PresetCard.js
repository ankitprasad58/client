import { useState } from "react";
import {
  FaDownload,
  FaRupeeSign,
  FaStar,
  FaFire,
  FaShoppingCart,
} from "react-icons/fa";

const PresetCard = ({ preset, onBuy, isPurchasing, isOwned, onDownload }) => {
  const [setIsHovered] = useState(false);

  const discount = preset.original_price
    ? Math.round((1 - preset.price / preset.original_price) * 100)
    : 0;

  // Format category for display
  const formatCategory = (category) => {
    if (!category) return "Digital";
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div
      className="relative bg-white rounded-3xl shadow-lg overflow-hidden group transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            -{discount}% OFF
          </span>
        </div>
      )}

      {/* Owned Badge */}
      {isOwned && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            <FaDownload className="inline mr-1" />
            Owned
          </span>
        </div>
      )}

      {/* Hot Badge for popular items */}
      {preset.downloads > 1000 && !isOwned && (
        <div className="absolute top-12 left-4 z-10">
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <FaFire className="text-xs" />
            HOT
          </span>
        </div>
      )}

      {/* Image/Preview Container */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-700">
        {preset.thumbnail || preset.preview_image ? (
          <img
            src={preset.thumbnail || preset.preview_image}
            alt={preset.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-4xl text-white/40">
              {preset.category === "video-presets" && "🎬"}
              {preset.category === "audio" && "🎵"}
              {preset.category === "software" && "💻"}
              {preset.category === "study-notes" && "📚"}
              {preset.category === "game-assets" && "🎮"}
              {preset.category === "digital-assets" && "💎"}
              {preset.category === "templates" && "📄"}
              {preset.category === "mobile-apps" && "📱"}
              {!preset.category && "📦"}
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {/* Category & Downloads */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full uppercase tracking-wide">
            {formatCategory(preset.category)}
          </span>
          {preset.downloads > 0 && (
            <div className="flex items-center text-gray-600 text-sm">
              <FaDownload className="mr-1.5" />
              <span className="font-medium">
                {preset.downloads.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg mb-3 text-gray-900 line-clamp-2 group-hover:text-gray-800 transition-colors">
          {preset.title}
        </h3>

        {/* Rating (if available) */}
        {preset.rating && (
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.floor(preset.rating)
                      ? "fill-current"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">{preset.rating}/5.0</span>
          </div>
        )}

        {/* Price Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center text-3xl font-black text-gray-900">
              <FaRupeeSign className="text-xl" />
              {preset.price}
            </span>
            {preset.original_price && preset.original_price > preset.price && (
              <span className="text-gray-400 line-through text-lg">
                ₹{preset.original_price}
              </span>
            )}
          </div>
          {discount > 0 && (
            <div className="text-sm text-green-600 font-semibold">
              Save ₹{(preset.original_price - preset.price).toLocaleString()} (
              {discount}% off)
            </div>
          )}
        </div>

        {/* Action Button */}
        {isOwned ? (
          <button
            onClick={() => onDownload(preset)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3.5 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-[1.02] group flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            disabled={isPurchasing}
          >
            <FaDownload className="group-hover:animate-bounce" />
            <span>Download Now</span>
          </button>
        ) : (
          <button
            onClick={() => onBuy(preset)}
            disabled={isPurchasing}
            className={`w-full bg-gradient-to-r from-gray-900 to-black text-white font-bold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-xl ${
              isPurchasing
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-gray-800 hover:to-gray-900"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {isPurchasing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <FaShoppingCart />
                  <span>Buy Now - ₹{preset.price}</span>
                </>
              )}
            </div>
          </button>
        )}

        {/* Quick View on Hover */}
      </div>
    </div>
  );
};

export default PresetCard;
