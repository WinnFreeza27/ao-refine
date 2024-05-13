import { create } from "zustand";

export const useCalculateData = create((set) => ({
    calculateData: null,
    updateCalculateData: (newData) => set(() => ({calculateData: newData})),
    removeCalculateData: () => set(() => ({calculateData: null}))
}))