import {create} from "zustand"

export const useFilterData = create((set) => ({
    filterData: [],
    filterSearchData: [],
    updateFilterData: (newData) => set(() => ({filterData: newData})),
    updateFilterSearchData: (newData) => set(() => ({filterSearchData: newData}))
}))
