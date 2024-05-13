export const searchFunction = (query, filteredData) => {
    if(query.trim() === "") {
        return filteredData
    } else {
        const filterSearch = filteredData.filter((item) => {
            const itemName = item["resource-items"].ItemsName.replace(/_/g, " ").toUpperCase();
            return itemName.includes(query.toUpperCase()) || item["resource-items"].ItemsLocalizedName.toUpperCase().includes(query.toUpperCase());
        });
        return filterSearch
    }
};