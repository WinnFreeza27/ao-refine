import {create} from "zustand"

export const storeData = create((set) => ({
    data: {},
    updateData: (newData) => set((prev) => ({data: {...prev.data, ...newData}}))
}))