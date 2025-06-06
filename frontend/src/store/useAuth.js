import { create } from "zustand";
import API_BASE_URL from "../../../backend/config/api";
const useAuth = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  error: null,
  isLoading: false,

  register: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");
      set({
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        isLoading: false,
      });
      return { success: true };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, message: err.message };
    }
  },

  login: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      set({
        user: data.user || null,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        isLoading: false,
      });
      return { success: true };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, message: err.message };
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      error: null,
    });
  },
}));

export default useAuth;
