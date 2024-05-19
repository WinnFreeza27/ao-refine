import {create} from "zustand";

export const storeSearchQuery = create((set) => ({
    searchQuery: "",
    updateSearchQuery : (newData) => set(() => ({searchQuery: newData}))
}))