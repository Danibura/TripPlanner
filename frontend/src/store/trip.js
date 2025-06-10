import { create } from "zustand";
import API_BASE_URL from "../config";

export const useTripStore = create((set) => ({
  trips: [],
  setTrips: (trips) => set({ trips }),
  selectedCode: null, // valore iniziale
  setSelectedCode: (code) => set({ selectedCode: code }),
  createTrip: async (newTrip) => {
    console.log(API_BASE_URL);
    if (!newTrip.destination || !newTrip.departureDate || !newTrip.returnDate) {
      return { success: false, message: "Please fill in all fields" };
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/trips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTrip),
      });

      if (!res.ok) {
        const errorText = await res.text();
        return { success: false, message: `Server error: ${errorText}` };
      }

      const data = await res.json();

      set((state) => ({
        trips: [...state.trips, data.data],
      }));

      return { success: true, message: "Trip created successfully" };
    } catch (error) {
      return { success: false, message: `Network error: ${error.message}` };
    }
  },
  fetchTrips: async () => {
    const res = await fetch(`${API_BASE_URL}/api/trips`);
    const data = await res.json();
    set({ trips: data.data });
  },
  modifyTrip: async (updatedTrip) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/trips/${updatedTrip.accessCode}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(updatedTrip),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        return { success: false, message: `Server error ${errorText}` };
      }

      const data = await res.json();
      set((state) => ({
        trips: state.trips.map((trip) =>
          trip.accessCode === data.data.accessCode ? data.data : trip
        ),
      }));

      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, message: err.message };
    }
  },
  getTripByCode: async (code) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/trips/${encodeURIComponent(code)}`
      );
      const data = await res.json();
      return { success: true, data: data.trip };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },
}));
