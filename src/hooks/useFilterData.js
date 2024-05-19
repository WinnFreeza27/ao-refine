import { storeFilterData } from "../store/storeFilterData"

export const useFilterData = () => {
    const filterData = storeFilterData((state) => state.calculatedData)
    const filterSearchData = storeFilterData((state) => state.filterSearchData)
    const updateFilterData = storeFilterData((state) => state.updateFilterData)
    const updateFilterSearchData = storeFilterData((state) => state.updateFilterSearchData)

    return {filterData, filterSearchData, updateFilterData, updateFilterSearchData}
}