import Filter from "../Filter/Filter";
import { filterHeadList } from "./storage"
import { useState } from "react";
import { useData } from "../../../hooks/useData";

export default function FilterSetting() {
    const [filter, setFilter] = useState({"AutoPrice": "OFF", "Server": "EAST"});
    const { data } = useData();

    const filterList = {
            "AutoPrice": ["ON","OFF"],
            "Server": ["EAST","EUROPE","WEST"]
        }

    const handleFilterChange = (filterData) => {
        setFilter({...filter, ...filterData})
    }
    console.log(filter)
    

    return (
        <>
            {Object.keys(filterList).length > 0 ? (
            <Filter
            filter={filter}
            updateFilter={handleFilterChange}
            data={data}
            handleFilterChange={handleFilterChange}
            availableOptions={filterList}
            filterHeadList={filterHeadList}
        />
        ) : null}
        </>
        
    )
}