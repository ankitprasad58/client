const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

class ApiService {
  constructor() {
    this.baseUrl = API_URL;
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getHeaders(includeAuth = true) {
    const headers = { "Content-Type": "application/json" };
    if (includeAuth) {
      const token = this.getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return headers;
  }

  async get(endpoint) {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(res);
  }

  async post(endpoint, data) {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(res);
  }

  async handleResponse(res) {
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Request failed");
    }
    return data;
  }
}

const apiService = new ApiService();
export default apiService;
