import {create} from "zustand";

export const storeSelectedItem = create((set) => ({
    selected: null,
    selectedData: {},
    updateSelected: (newItem) => set(() => ({selected: newItem})),
    removeSelected: () => set(() => ({selected: null})),
    updateSelectedData: (newItem) => set(() => ({selectedData: {...newItem}})),
    removeSelectedData: () => (() => ({selectedData: {}}))
}))