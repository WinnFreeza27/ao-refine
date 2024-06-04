import Filter from "../Filter/Filter";
import { filterHeadList } from "./storage"
import { useState } from "react";
import { useData } from "../../../hooks/useData";
import { useServerData } from "../../../hooks/useServerData";


export default function FilterSetting() {
    const { data } = useData();

    const {serverData, updateServerData} = useServerData()


    const filterList = {
            "AutoPrice": ["ON","OFF"],
            "Server": ["EAST","EUROPE","WEST"]
        }

    const handleFilterChange = (filterData) => {
        updateServerData(filterData)
    }
    

    return (
        <div className="flex w-full mx-2 justify-center">
            {Object.keys(filterList).length > 0 ? (
            <Filter
            filter={serverData}
            data={data}
            handleFilterChange={handleFilterChange}
            availableOptions={filterList}
            filterHeadList={filterHeadList}
        />
        ) : null}
        </div>
        
    )
}