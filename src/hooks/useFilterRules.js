import { storeFilterRules } from "../store/storeFilterRules"

export const useFilterRules = () => {
    const filter = storeFilterRules((state) => state.filter)
    const updateFilter = storeFilterRules((state) => state.updateFilter)

    return {filter, updateFilter}
}