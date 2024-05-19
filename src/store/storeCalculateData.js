import {create} from "zustand";

export const storeCalculateData = create((set) => ({
    calculateData: null,
    updateCalculateData: (newData) => set(() => ({calculateData: newData})),
    removeCalculateData: () => set(() => ({calculateData: null}))
}))