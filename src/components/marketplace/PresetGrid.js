import React from "react";
import PresetCard from "./PresetCard";

const PresetGrid = ({
  presets,
  onBuy,
  purchasingId,
  ownedPresets,
  onDownload,
}) => {
  if (presets.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-gray-500 text-lg">No presets found</p>
        <p className="text-gray-400 text-sm mt-2">
          Try adjusting your search or filter
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {presets.map((preset) => (
        <PresetCard
          key={preset.id}
          preset={preset}
          onBuy={onBuy}
          isPurchasing={purchasingId === preset.id}
          isOwned={!!ownedPresets[preset.id]}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
};

export default PresetGrid;
