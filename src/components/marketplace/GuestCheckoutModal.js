import React from "react";
import { FaTimes, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";

const GuestCheckoutModal = ({
  isOpen,
  onClose,
  preset,
  guestInfo,
  setGuestInfo,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Guest Checkout</h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter your details to purchase
          </p>
        </div>

        {/* Preset Info */}
        {preset && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center gap-4">
            <img
              src={preset.thumbnail || "https://via.placeholder.com/80"}
              alt={preset.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-800">{preset.title}</h3>
              <p className="text-indigo-600 font-bold">₹{preset.price}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={guestInfo.email}
                onChange={(e) =>
                  setGuestInfo({ ...guestInfo, email: e.target.value })
                }
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={guestInfo.phone}
                onChange={(e) =>
                  setGuestInfo({ ...guestInfo, phone: e.target.value })
                }
                required
                placeholder="9876543210"
                maxLength="10"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
            <FaLock className="text-green-500" />
            <span>Secure checkout powered by Razorpay</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition"
            >
              Continue to Pay
            </button>
          </div>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Login for faster checkout
          </a>
        </p>
      </div>
    </div>
  );
};

export default GuestCheckoutModal;
