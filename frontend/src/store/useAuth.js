import { create } from "zustand";

const useAuth = create((set) => ({
  user: null,
  error: null,
  isLoading: false,

  register: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");
      set({ user: data.user || null, isLoading: false });
      return { success: true };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, message: err.message };
    }
  },
}));

export default useAuth;
