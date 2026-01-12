import apiService from "./apiService";

const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY_ID;

class PaymentService {
  constructor() {
    this.scriptLoaded = false;
  }

  // Load Razorpay script
  async loadScript() {
    if (this.scriptLoaded || window.Razorpay) {
      this.scriptLoaded = true;
      return true;
    }

    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        this.scriptLoaded = true;
        resolve(true);
      };
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  // Create order on backend
  async createOrder(presetId, guestData = null) {
    return apiService.post("/payment/create-order", {
      presetId,
      guestEmail: guestData?.email,
      guestPhone: guestData?.phone,
    });
  }

  // Verify payment on backend
  async verifyPayment(paymentData) {
    return apiService.post("/payment/verify", {
      razorpay_order_id: paymentData.razorpay_order_id,
      razorpay_payment_id: paymentData.razorpay_payment_id,
      razorpay_signature: paymentData.razorpay_signature,
    });
  }

  // Get payment history
  async getPaymentHistory() {
    return apiService.get("/payment/history");
  }

  // Open Razorpay checkout
  openCheckout(options) {
    return new Promise((resolve, reject) => {
      if (!window.Razorpay) {
        reject(new Error("Razorpay not loaded"));
        return;
      }

      const rzp = new window.Razorpay({
        ...options,
        handler: (response) => resolve(response),
        modal: {
          ondismiss: () => reject(new Error("Payment cancelled")),
        },
      });

      rzp.on("payment.failed", (response) => {
        reject(new Error(response.error.description || "Payment failed"));
      });

      rzp.open();
    });
  }

  // Main purchase flow
  async purchasePreset(preset, guestData = null) {
    // Step 1: Load Razorpay script
    const loaded = await this.loadScript();
    if (!loaded) {
      throw new Error("Payment gateway failed to load");
    }

    // Step 2: Create order
    const orderData = await this.createOrder(preset.id, guestData);

    // Step 3: Get user info for prefill
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Step 4: Open Razorpay checkout
    const paymentResponse = await this.openCheckout({
      key: RAZORPAY_KEY,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "PresetHub",
      description: preset.title,
      image: preset.thumbnail,
      order_id: orderData.orderId,
      prefill: {
        email: guestData?.email || user?.email || "",
        contact: guestData?.phone || user?.phone || "",
      },
      theme: {
        color: "#4F46E5",
      },
    });

    // Step 5: Verify payment
    const verifyData = await this.verifyPayment(paymentResponse);

    // Return with all status info
    return verifyData;
  }

  // Get download URL
  getDownloadUrl(token) {
    const baseUrl = apiService.baseUrl.replace("/api", "");
    return `${baseUrl}/api/download/${token}`;
  }

  // Start download
  startDownload(token) {
    const url = this.getDownloadUrl(token);
    window.open(url, "_blank");
  }
}

const paymentService = new PaymentService();
export default paymentService;
