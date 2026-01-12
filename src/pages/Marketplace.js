import React, { useState, useEffect, useCallback } from "react";
import {
  MarketplaceHeader,
  SearchAndFilter,
  PresetGrid,
  GuestCheckoutModal,
  LoadingSpinner,
} from "../components/marketplace";
import { presetService, authService } from "../services";
import { usePurchase } from "../hooks";

const Marketplace = () => {
  const [presets, setPresets] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
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

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [presetsData, owned] = await Promise.all([
        presetService.getAllPresets(),
        isLoggedIn ? presetService.getOwnedPresets() : {},
      ]);
      setPresets(presetsData);
      setOwnedPresets(owned);
    } catch (error) {
      // Optional: add error handling / toast notification here
      console.error("Failed to load marketplace data:", error);
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Filter presets
  const filteredPresets = presets.filter((preset) => {
    const matchesFilter = filter === "all" || preset.category === filter;
    const matchesSearch =
      preset.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      preset.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <MarketplaceHeader />

        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filter={filter}
          setFilter={setFilter}
        />

        <PresetGrid
          presets={filteredPresets}
          onBuy={handleBuyClick}
          purchasingId={purchasing}
          ownedPresets={ownedPresets}
          onDownload={handleDownload}
        />

        <GuestCheckoutModal
          isOpen={showGuestModal}
          onClose={closeGuestModal}
          preset={selectedPreset}
          guestInfo={guestInfo}
          setGuestInfo={setGuestInfo}
          onSubmit={handleGuestCheckout}
        />
      </div>
    </div>
  );
};

export default Marketplace;
