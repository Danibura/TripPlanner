import { create } from "zustand";
import API_BASE_URL from "../config";

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

  findUser: async (email) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/users/email/${encodeURIComponent(email)}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "User not found");
      return { success: true, data: data.user };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  fetchUsers: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/`);
      const users = await res.json();
      set({ users: users.data });
      return { success: true, data: users.data };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  modifyUser: async (updatedUser) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/users/${updatedUser.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!res.ok) return { success: false, message: "Error" };
      const data = await res.json();
      return { success: true, data: data.data };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  deleteUser: async (email) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/${email}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return { success: true, message: "User deleted" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  createResetToken: async (email) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!data.success)
        return { success: false, message: "Couldn't find user" };
      return { success: true, resetUrl: data.resetUrl };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  resetPassword: async (resetToken, password) => {
    try {
      console.log("Sending to backend:", { resetToken, password });
      const res = await fetch(`${API_BASE_URL}/api/users/resetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resetToken, password }),
      });
      const data = await res.json();
      if (!data.success) {
        console.log("Error occurred changing password");
        return { success: false, message: data.message };
      }
      console.log("Password changed successfully");
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  findUserByCalendar: async (calendarCode) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/users/calendar/${encodeURIComponent(calendarCode)}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "User not found");
      return { success: true, data: data.user };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },
}));

export default useAuth;
