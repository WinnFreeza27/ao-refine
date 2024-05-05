import { useState } from 'react';
import { useFiltering } from '../hooks/useFiltering';
import { useData } from '../hooks/useData';
import filterFn from '../utils/filterFn';
import convertData from '../utils/convertData';
import { useFilterData } from '../hooks/useFilterData';


export default function Filter() {
    const filterList = {
        Categories: ["all","planks","cloth","stoneblock","metalbar","leather"],
        Tier: ["all","1","2","3","4","5","6","7","8"],
        EnchantmentLevel:["all","0","1","2","3","4"]
    }
    const [activeFilter, setActiveFilter] = useState(null)
    
    
    const updateFilterData = useFilterData((state) => state.updateFilterData)
    const filter = useFiltering((state) => state.filter)
    const updateFilter = useFiltering((state) => state.updateFilter)
    
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
            <Filtercomponent activeFilter={activeFilter} filter={filter} renderList={renderList} handleActiveFilter={handleActiveFilter} type={"Categories"} styleWidth={"w-28 sm:w-32 lg:w-36"}/>
            <Filtercomponent activeFilter={activeFilter} filter={filter} renderList={renderList} handleActiveFilter={handleActiveFilter} type={"Tier"} styleWidth={"w-16 sm:w-20"}/>
            <Filtercomponent activeFilter={activeFilter} filter={filter} renderList={renderList} handleActiveFilter={handleActiveFilter} type={"EnchantmentLevel"} styleWidth={"w-28 sm:w-32"}/>
        </div>
    )
}

function Filtercomponent({activeFilter,filter,renderList,handleActiveFilter, type, styleWidth}) {
    return (
        <>
           <div className="relative">
                <label htmlFor={type} className={`cursor-pointer inline-flex items-center justify-center text-center ${styleWidth}`}>
                    <div className="filterLabel">{filter[type].charAt(0).toUpperCase() + filter[type].slice(1)}
                    <input type="checkbox" id={type} onChange={() => handleActiveFilter(`${type}Filter`)} checked={activeFilter == `${type}Filter`} className="appearance-none"/>
                        <div className="w-4 h-4 sm:w-5 sm:h-5">
                            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="#FFFFFF" strokeLinecap="round" strokeWidth="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"/>
                            </svg>
                        </div>
                    </div>
                </label>
                <div className={`filterHead ${activeFilter == `${type}Filter` ? "filterShow" : "filterHide" }`}>
                <span className="filter-span">{type == "EnchantmentLevel" ? "Enchantment" : type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    {...renderList[type]}
                </div>
            </div>
        </>
    )
}