import {filterFn} from "./filterFn";
import { searchFunction } from "./searchFunction";

export const filterAndSearch = (rawData, filterRules, searchQuery) => {
    const filteringTheData = filterFn(rawData, filterRules)
    
    const searchingTheData = searchFunction(searchQuery, filteringTheData)
    return searchingTheData
}