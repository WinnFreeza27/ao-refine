import { storeFilterList } from "../store/storeFilterList"

export const useFilterList = () => {
    const filterList = storeFilterList((state) => state.filterList)
    const updateFilterList = storeFilterList((state) => state.updateFilterList)
    
    return {filterList, updateFilterList}
}