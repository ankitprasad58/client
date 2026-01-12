import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaDownload,
  FaCalendar,
  FaShoppingBag,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchProfile();
    fetchPurchases();
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        toast.error("Failed to load profile");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  const fetchPurchases = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/purchases", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPurchases(data);
      }
    } catch (error) {
      console.error("Failed to fetch purchases");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
              <FaUser className="text-4xl text-indigo-600" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-800">
                {user?.username}
              </h1>
              <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mt-2">
                <FaEnvelope />
                {user?.email}
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2 text-gray-500 text-sm mt-1">
                <FaCalendar />
                Joined {new Date(user?.created_at).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-indigo-50 px-6 py-4 rounded-xl text-center">
              <p className="text-3xl font-bold text-indigo-600">
                {user?.purchaseCount || 0}
              </p>
              <p className="text-gray-600 text-sm">Purchases</p>
            </div>
          </div>
        </div>

        {/* Purchased Presets */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FaShoppingBag className="text-indigo-600" />
            My Purchases
          </h2>

          {purchases.length === 0 ? (
            <div className="text-center py-12">
              <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No purchases yet</p>
              <button
                onClick={() => navigate("/marketplace")}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
              >
                Browse Marketplace
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {purchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <img
                    src={
                      purchase.thumbnail || "https://via.placeholder.com/100"
                    }
                    alt={purchase.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-semibold text-gray-800">
                      {purchase.title}
                    </h3>
                    <p className="text-gray-500 text-sm capitalize">
                      {purchase.category}
                    </p>
                    <p className="text-gray-400 text-xs">
                      Purchased on{" "}
                      {new Date(purchase.purchased_at).toLocaleDateString()}
                    </p>
                  </div>

                  <a
                    href={purchase.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    <FaDownload />
                    Download
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
