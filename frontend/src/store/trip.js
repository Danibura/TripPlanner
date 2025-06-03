import { create } from "zustand";

export const useTripStore = create((set) => ({
  trips: [],
  setTrips: (trips) => set({ trips }),
  selectedCode: null, // valore iniziale
  setSelectedCode: (code) => set({ selectedCode: code }),
  createTrip: async (newTrip) => {
    if (!newTrip.destination || !newTrip.departureDate || !newTrip.returnDate) {
      return { success: false, message: "Please fill in all fields" };
    }

    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTrip),
      });

      // ✅ Controllo se la risposta è ok
      if (!res.ok) {
        const errorText = await res.text(); // Prende testo grezzo in caso non sia JSON
        return { success: false, message: `Server error: ${errorText}` };
      }

      const data = await res.json();

      set((state) => ({
        trips: [...state.trips, data.data],
      }));

      return { success: true, message: "Trip created successfully" };
    } catch (error) {
      // ❌ Catch blocca errori di rete o parsing JSON
      return { success: false, message: `Network error: ${error.message}` };
    }
  },
  fetchTrips: async () => {
    const res = await fetch("/api/trips");
    const data = await res.json();
    set({ trips: data.data });
  },
  modifyTrip: async (updatedTrip) => {
    try {
      const res = await fetch(`/api/trips/${updatedTrip.accessCode}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedTrip),
      });

      if (!res.ok) {
        const errorText = await res.text();
        return { success: false, message: `Server error ${errorText}` };
      }

      const data = await res.json(); // prendi il trip aggiornato
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
}));
