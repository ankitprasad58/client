import apiService from "./apiService";

class PresetService {
  // Get all presets
  async getAllPresets() {
    try {
      const data = await apiService.get("/presets");
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching presets:", error);
      return [];
    }
  }

  // Get preset by ID
  async getPresetById(id) {
    return apiService.get(`/presets/${id}`);
  }

  // Get presets by category
  async getPresetsByCategory(category) {
    return apiService.get(`/presets/category/${category}`);
  }

  // Get user's purchased presets
  async getOwnedPresets() {
    try {
      const data = await apiService.get("/user/purchases");
      if (Array.isArray(data)) {
        const owned = {};
        data.forEach((p) => {
          owned[p.preset_id] = p.download_token;
        });
        return owned;
      }
      return {};
    } catch (error) {
      console.error("Error fetching owned presets:", error);
      return {};
    }
  }
}

const presetService = new PresetService();
export default presetService;
