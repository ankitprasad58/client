import apiService from "./apiService";

class AuthService {
  // Register
  async register(userData) {
    const data = await apiService.post("/auth/register", userData);
    this.setSession(data);
    return data;
  }

  // Login
  async login(credentials) {
    const data = await apiService.post("/auth/login", credentials);
    this.setSession(data);
    return data;
  }

  // Logout
  async logout() {
    try {
      await apiService.post("/auth/logout", {});
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Always clear local storage
      this.clearSession();
    }
  }

  // Set session
  setSession(data) {
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  }

  // Clear session
  clearSession() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  // Check if logged in
  isLoggedIn() {
    return !!localStorage.getItem("token");
  }

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  // Get token
  getToken() {
    return localStorage.getItem("token");
  }

  // Get profile from API
  async getProfile() {
    return apiService.get("/auth/me");
  }

  // Change password
  async changePassword(currentPassword, newPassword) {
    return apiService.post("/auth/change-password", {
      currentPassword,
      newPassword,
    });
  }
}

const authService = new AuthService();
export default authService;
