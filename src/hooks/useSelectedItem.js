import {create} from "zustand";

export const useSelectedItem = create((set) => ({
    selected: null,
    selectedData: {},
    updateSelected: (newItem) => set((state) => ({selected: newItem})),
    removeSelected: () => set((state) => ({selected: null})),
    updateSelectedData: (newItem) => set((state) => ({selectedData: {...newItem}})),
    removeSelectedData: () => ((state) => ({selectedData: {}}))
}))