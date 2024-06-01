import {create} from "zustand";

export const storeFilterRules = create((set) => ({
    filter: {Categories: "", Tier: "2", EnchantmentLevel: "0"},
    updateFilter : (newData) => set((prev) => ({filter: {...prev.filter, ...newData}}))
}))