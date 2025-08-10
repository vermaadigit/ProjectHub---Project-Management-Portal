import api from "./api";

export const authService = {
  async register(userData) {
    const response = await api.post("/register", userData);
    return response.data;
  },

  async login(credentials) {
    const response = await api.post("/login", credentials);
    return response.data;
  },

  async getProfile() {
    const response = await api.get("/profile");
    return response.data;
  },

  async updateProfile(userData) {
    const response = await api.put("/profile", userData);
    return response.data;
  },

  async changePassword(passwordData) {
    const response = await api.put("/change-password", passwordData);
    return response.data;
  },

  async deleteAccount() {
    const response = await api.delete("/account");
    return response.data;
  },
};
