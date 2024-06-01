import {create} from "zustand";

export const storeFilterList = create((set) => ({
    filterList: {},
    updateFilterList : (newData) => set((prev) => ({filterList: {...newData}}))
}))