import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaDownload, FaShoppingBag } from "react-icons/fa";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const MyPurchases = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(`${API_URL}/auth/lookup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone }),
      });

      const data = await res.json();

      if (res.ok) {
        setPurchases(data);
        toast.success(`Found ${data.length} purchase(s)`);
      } else {
        setPurchases([]);
        toast.error(data.message || "No purchases found");
      }
    } catch (error) {
      toast.error("Something went wrong");
      setPurchases([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <FaShoppingBag className="mx-auto text-4xl text-purple-600 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">
              Find My Purchases
            </h1>
            <p className="text-gray-600 mt-2">
              Enter the email or phone number you used during checkout
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Email or phone number"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>

        {/* Results */}
        {searched && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {purchases.length > 0
                ? `Your Purchases (${purchases.length})`
                : "No Purchases Found"}
            </h2>

            {purchases.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">
                  No purchases found with this email/phone.
                </p>
                <Link
                  to="/marketplace"
                  className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition"
                >
                  Browse Marketplace
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {purchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={purchase.preview_image || purchase.thumbnail}
                        alt={purchase.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {purchase.title}
                        </h3>
                        <p className="text-sm text-gray-500 capitalize">
                          {purchase.category} • {purchase.file_size}
                        </p>
                        <p className="text-xs text-gray-400">
                          Purchased on{" "}
                          {new Date(purchase.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold text-purple-600">
                        ₹{purchase.amount}
                      </span>
                      <a
                        href={`${API_URL.replace("/api", "")}/api/download/${
                          purchase.download_token
                        }`}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                      >
                        <FaDownload /> Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-800">
                <strong>💡 Tip:</strong> Create an account with the same
                email/phone to access all your purchases in one place.{" "}
                <Link to="/register" className="underline font-semibold">
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPurchases;
