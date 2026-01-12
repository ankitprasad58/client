import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
      <p className="text-gray-500">Loading presets...</p>
    </div>
  );
};

export default LoadingSpinner;
