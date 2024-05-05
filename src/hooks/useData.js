import {create} from "zustand"

export const useData = create((set) => ({
    data: [],
    updateData: (newData) => set((prev) => ({data: [...prev.data,...newData]}))
}))