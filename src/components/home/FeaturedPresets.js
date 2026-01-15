import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaFire } from "react-icons/fa";
import { presetService, authService } from "../../services";
import { usePurchase } from "../../hooks";
import { GuestCheckoutModal } from "../marketplace";
import { PresetCard } from "../marketplace";

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

      // Sort by downloads and get top 4
      const sortedPresets = presetsData
        .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
        .slice(0, 4);

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
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full mb-6 animate-pulse">
            <FaFire className="animate-spin-slow" />
            <span className="font-bold">🔥 TRENDING RIGHT NOW</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Everyone's Buying These
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 shadow-lg animate-pulse"
            >
              <div className="h-48 bg-gray-200 rounded-2xl mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (presets.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full mb-4">
          <FaFire className="animate-pulse" />
          <span className="font-bold">🔥 TRENDING RIGHT NOW</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-black mb-6">
          <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Everyone's Buying These
          </span>
        </h2>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join thousands of creators who are already using these premium digital
          products
        </p>
      </div>

      {/* Presets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* View All Link */}
      <div className="text-center mt-12">
        <Link
          to="/marketplace"
          className="inline-flex items-center justify-center border-2 border-gray-900 text-gray-900 font-bold py-3 px-8 rounded-2xl hover:bg-gray-900 hover:text-white transition-all duration-300 group"
        >
          <span>View All Premium Products</span>
          <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
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
