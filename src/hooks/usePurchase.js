import { useState } from "react";
import { toast } from "react-toastify";
import { paymentService } from "../services";

const usePurchase = (ownedPresets, setOwnedPresets) => {
  const [purchasing, setPurchasing] = useState(null);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [guestInfo, setGuestInfo] = useState({ email: "", phone: "" });

  const isLoggedIn = !!localStorage.getItem("token");

  const handleBuyClick = (preset) => {
    if (isLoggedIn) {
      processPurchase(preset);
    } else {
      setSelectedPreset(preset);
      setShowGuestModal(true);
    }
  };

  const handleGuestCheckout = async (e) => {
    e.preventDefault();
    if (!guestInfo.email || !guestInfo.phone) {
      toast.error("Please enter both email and phone");
      return;
    }
    if (guestInfo.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    setShowGuestModal(false);
    processPurchase(selectedPreset, guestInfo);
  };

  const processPurchase = async (preset, guestData = null) => {
    setPurchasing(preset.id);

    try {
      const result = await paymentService.purchasePreset(preset, guestData);

      // Update owned presets
      setOwnedPresets((prev) => ({
        ...prev,
        [preset.id]: result.purchase.download_token,
      }));

      // Show appropriate message based on email status
      if (result.emailSent) {
        toast.success(
          "🎉 Purchase successful! Check your email for download link & receipt."
        );
      } else {
        toast.warning(
          "✅ Payment successful! Email delivery failed. Use the download button.",
          { autoClose: 8000 }
        );

        // Show download link
        if (result.purchase.drive_link) {
          toast.info(
            <div>
              <p>
                <strong>Your Download Link:</strong>
              </p>
              <a
                href={result.purchase.drive_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#4F46E5", textDecoration: "underline" }}
              >
                Click here to download
              </a>
            </div>,
            { autoClose: false }
          );
        }
      }

      // Auto-start download
      if (result.purchase.drive_link) {
        window.open(result.purchase.drive_link, "_blank");
      }
    } catch (error) {
      if (error.message !== "Payment cancelled") {
        toast.error(error.message || "Payment failed. Please try again.");
      }
    } finally {
      setPurchasing(null);
    }
  };

  const handleDownload = (preset) => {
    const token = ownedPresets[preset.id];
    if (token) {
      paymentService.startDownload(token);
    }
  };

  const closeGuestModal = () => {
    setShowGuestModal(false);
    setGuestInfo({ email: "", phone: "" });
  };

  return {
    purchasing,
    showGuestModal,
    selectedPreset,
    guestInfo,
    setGuestInfo,
    handleBuyClick,
    handleGuestCheckout,
    handleDownload,
    closeGuestModal,
  };
};

export default usePurchase;
