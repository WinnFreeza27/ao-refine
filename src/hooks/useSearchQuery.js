
import {create} from "zustand";

export const useSearchQuery = create((set) => ({
    searchQuery: "",
    updateSearchQuery : (newData) => set((prev) => ({searchQuery: newData}))
}))