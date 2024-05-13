
import {create} from "zustand";

export const useFiltering = create((set) => ({
    filter: {Categories: "planks", Tier: "all", EnchantmentLevel: "all"},
    updateFilter : (newData) => set((prev) => ({filter: {...prev.filter, ...newData}}))
}))