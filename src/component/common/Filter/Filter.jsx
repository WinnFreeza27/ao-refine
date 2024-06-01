import { useState } from 'react';
import { useFilterRules } from '../../../hooks/useFilterRules';
import { filterHeadList } from './storage';
import FilterItem from './FilterItem';
import { filterFn } from '../../../utils/filterFn';
import { useSelectedItem } from '../../../hooks/useSelectedItem';
import { useData } from '../../../hooks/useData';
import { useEffect } from 'react';
import { useFilterList } from '../../../hooks/useFilterList';
import { getAvailableOptions } from '../../../utils/filterContentExtractor';


export default function Filter() {
   
    const [activeFilter, setActiveFilter] = useState(null)
    const {filter, updateFilter} = useFilterRules()
    const {updateSelected, updateSelectedData} = useSelectedItem()
    const {data} = useData()
    const {filterList, updateFilterList} = useFilterList()
    //handle the filter checkbox change
    const handleActiveFilter = (filter) => {
        setActiveFilter((prev) => prev == filter ? null : filter)
    }
    const handleFilter = (data) => {
        updateFilter(data)
        setActiveFilter(null)
    }

    useEffect(() => {
        if(data && filter.Tier) {
            const [filteredData] = filterFn(data, filter)
            updateSelected(filteredData.ItemsName)
            updateSelectedData(filteredData)
            const availableOptions = getAvailableOptions(data, filter)
            updateFilterList(availableOptions)
        }
    }, [filter])

    const renderList = Object.entries(filterList).reduce((acc, [key, value]) => {
        acc[key] = value.map((item) => {
            return (
                <div className="w-full" key={Math.floor(Math.random() * 999999)}>
                <input
                  type="radio"
                  id={`${key}-${item}`}
                  name={`select-${key}`}
                  value={item}
                  className={`peer appearance-none`}
                  onChange={() => handleFilter({[key]: item})}
                  checked={filter[key] == item}
                />
                <label
                  htmlFor={`${key}-${item}`}
                  className={`filterItem`}
                >
                  {item}
                </label>
                </div>
            )
        }
         
        );
        return acc;
      }, {});

    return (
        <div className="filterBoxWrapper">
            {filterHeadList.map((item, index) => (
                <FilterItem 
                key={index}
                activeFilter={activeFilter} 
                filter={filter} 
                renderList={renderList} 
                handleActiveFilter={handleActiveFilter} 
                type={item.type} 
                styleWidth={item.style}/>
            ))}
        </div>
    )
}

