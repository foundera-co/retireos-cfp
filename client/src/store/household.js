import { create } from 'zustand';
import { householdsApi } from '../api/client';
export const useHouseholdStore = create((set) => ({
    households: [],
    currentHousehold: null,
    isLoading: false,
    error: null,
    fetchHouseholds: async () => {
        set({ isLoading: true, error: null });
        try {
            const households = await householdsApi.list();
            set({ households, isLoading: false });
            if (households.length > 0 && !set({ currentHousehold: households[0] })) {
                set({ currentHousehold: households[0] });
            }
        }
        catch (error) {
            const message = error.message || 'Failed to fetch households';
            set({ error: message, isLoading: false });
        }
    },
    setCurrentHousehold: (household) => {
        set({ currentHousehold: household });
    },
    addHousehold: (household) => {
        set((state) => ({
            households: [...state.households, household],
        }));
    },
}));
