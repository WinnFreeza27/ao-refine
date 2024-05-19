import { storeSearchQuery } from "../store/storeSearchQuery"

export const useSearchQuery = () => {
    const searchQuery = storeSearchQuery((state) => state.searchQuery)
    const updateSearchQuery = storeSearchQuery((state) => state.updateSearchQuery)
    
    return {searchQuery, updateSearchQuery}
}