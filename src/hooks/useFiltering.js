
import {create} from "zustand";

export const useFiltering = create((set) => ({
    filter: {Categories: "all", Tier: "all", EnchantmentLevel: "all"},
    updateFilter : (newData) => set((prev) => ({filter: {...prev.filter, ...newData}}))
}))