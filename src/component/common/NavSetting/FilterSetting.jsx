import Filter from "../Filter/Filter";
import { filterHeadList } from "./storage"
import { useData } from "../../../hooks/useData";
import { useServerData } from "../../../hooks/useServerData";


export default function FilterSetting() {
    const { data } = useData();

    const {serverData, updateServerData} = useServerData()


    const filterList = {
            "AutoPrice": ["ON","OFF"],
            "Server": ["EAST","EU","WEST"]
        }

    const handleFilterChange = (filterData) => {
        updateServerData(filterData)
    }
    
    return (
        <div className="w-full h-max sticky top-0 left-0 z-[10000]">
            <div className="flex w-full mx-auto justify-center items-center px-2 bg-bg-transparent border-b border-bd-grey shadow-md shadow-bg-transparent mb-2">
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
            </div>
    )
}