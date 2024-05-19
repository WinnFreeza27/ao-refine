import { useState } from 'react';
import { useFilterRules } from '../../../hooks/useFilterRules';
import { filterList } from './storage';
import { filterHeadList } from './storage';
import FilterItem from './FilterItem';

export default function Filter() {
   
    const [activeFilter, setActiveFilter] = useState(null)
    const {filter, updateFilter} = useFilterRules()
    //handle the filter checkbox change
    const handleActiveFilter = (filter) => {
        setActiveFilter(activeFilter === filter ? "all" : filter)
    }
    const handleFilter = (data) => {
        updateFilter(data)
        setActiveFilter(null)
    }
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
                  {item.charAt(0).toUpperCase() + item.slice(1)}
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

