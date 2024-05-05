import {create} from "zustand"

export const useFilterData = create((set) => ({
    filterData: [],
    updateFilterData: (newData) => set(() => ({filterData: newData}))
}))
