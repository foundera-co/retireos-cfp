import { create } from 'zustand'
import { householdsApi } from '../api/client'
import type { Household } from '../types'

interface HouseholdStore {
  households: Household[]
  currentHousehold: Household | null
  isLoading: boolean
  error: string | null
  fetchHouseholds: () => Promise<void>
  setCurrentHousehold: (household: Household | null) => void
  addHousehold: (household: Household) => void
}

export const useHouseholdStore = create<HouseholdStore>((set) => ({
  households: [],
  currentHousehold: null,
  isLoading: false,
  error: null,

  fetchHouseholds: async () => {
    set({ isLoading: true, error: null })
    try {
      const households = await householdsApi.list()
      set({ households, isLoading: false })
      if (households.length > 0) {
        set({ currentHousehold: households[0] })
      }
    } catch (error: any) {
      const message = error.message || 'Failed to fetch households'
      set({ error: message, isLoading: false })
    }
  },

  setCurrentHousehold: (household: Household | null) => {
    set({ currentHousehold: household })
  },

  addHousehold: (household: Household) => {
    set((state) => ({
      households: [...state.households, household],
    }))
  },
}))
