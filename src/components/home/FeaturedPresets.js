import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaDownload, FaArrowRight, FaRupeeSign } from "react-icons/fa";
import { presetService, authService } from "../../services";
import { usePurchase } from "../../hooks";
import { GuestCheckoutModal } from "../marketplace";

const PresetCard = ({ preset, onBuy, isPurchasing, isOwned, onDownload }) => {
  const discount = preset.original_price
    ? Math.round((1 - preset.price / preset.original_price) * 100)
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={
            preset.thumbnail ||
            preset.preview_image ||
            "https://via.placeholder.com/400x300"
          }
          alt={preset.title}
          className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {discount > 0 && (
          <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {discount}% OFF
          </span>
        )}
        {isOwned && (
          <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Owned
          </span>
        )}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Link
            to="/marketplace"
            className="bg-white text-purple-600 font-semibold px-6 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform"
          >
            Quick View
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded capitalize">
            {preset.category}
          </span>
          {preset.downloads > 0 && (
            <div className="flex items-center text-gray-500 text-sm">
              <FaDownload className="mr-1" />
              {preset.downloads.toLocaleString()}
            </div>
          )}
        </div>

        <h3 className="font-bold text-lg mb-3 text-gray-900 line-clamp-1">
          {preset.title}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center text-2xl font-extrabold text-purple-600">
              <FaRupeeSign className="text-xl" />
              {preset.price}
            </span>
            {preset.original_price && preset.original_price > preset.price && (
              <span className="text-gray-400 line-through text-sm">
                ₹{preset.original_price}
              </span>
            )}
          </div>
        </div>

        {isOwned ? (
          <button
            onClick={() => onDownload(preset)}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center font-semibold py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2"
          >
            <FaDownload />
            Download
          </button>
        ) : (
          <button
            onClick={() => onBuy(preset)}
            disabled={isPurchasing}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center font-semibold py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
          >
            {isPurchasing ? "Processing..." : "Buy Now"}
          </button>
        )}
      </div>
    </div>
  );
};

const FeaturedPresets = () => {
  const [presets, setPresets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ownedPresets, setOwnedPresets] = useState({});

  const isLoggedIn = authService.isLoggedIn();

  // Use purchase hook
  const {
    purchasing,
    showGuestModal,
    selectedPreset,
    guestInfo,
    setGuestInfo,
    handleBuyClick,
    handleGuestCheckout,
    handleDownload,
    closeGuestModal,
  } = usePurchase(ownedPresets, setOwnedPresets);

  useEffect(() => {
    loadData();
  });

  const loadData = async () => {
    try {
      const [presetsData, owned] = await Promise.all([
        presetService.getAllPresets(),
        isLoggedIn ? presetService.getOwnedPresets() : {},
      ]);
      const sortedPresets = presetsData
        .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
        .slice(0, 3);
      setPresets(sortedPresets);
      setOwnedPresets(owned);
    } catch (error) {
      console.error("Error loading presets:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="text-center mb-12">
          <span className="inline-block bg-red-100 text-red-600 font-semibold px-4 py-1 rounded-full text-sm mb-4">
            🔥 HOT DEALS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Best Selling Presets
          </h2>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      </section>
    );
  }

  if (presets.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <span className="inline-block bg-red-100 text-red-600 font-semibold px-4 py-1 rounded-full text-sm mb-4">
          🔥 HOT DEALS
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Best Selling Presets
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join thousands of creators who transformed their content with these
          presets
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {presets.map((preset) => (
          <PresetCard
            key={preset.id}
            preset={preset}
            onBuy={handleBuyClick}
            isPurchasing={purchasing === preset.id}
            isOwned={!!ownedPresets[preset.id]}
            onDownload={handleDownload}
          />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/marketplace"
          className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 text-lg"
        >
          View All Presets
          <FaArrowRight className="ml-2" />
        </Link>
      </div>

      {/* Guest Checkout Modal */}
      <GuestCheckoutModal
        isOpen={showGuestModal}
        onClose={closeGuestModal}
        preset={selectedPreset}
        guestInfo={guestInfo}
        setGuestInfo={setGuestInfo}
        onSubmit={handleGuestCheckout}
      />
    </section>
  );
};

export default FeaturedPresets;
