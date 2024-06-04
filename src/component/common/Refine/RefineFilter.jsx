import { useState, useEffect } from 'react';
import Filter from '../Filter/Filter';
import { useFilterRules } from '../../../hooks/useFilterRules';
import { useSelectedItem } from '../../../hooks/useSelectedItem';
import { useData } from '../../../hooks/useData';
import { useFilterList } from '../../../hooks/useFilterList';
import { filterFn } from '../../../utils/filterFn';
import { getAvailableOptions } from '../../../utils/filterContentExtractor';
import { filterHeadList } from './storage';

export default function RefineFilter() {
    const { filter, updateFilter } = useFilterRules();
    const { updateSelected, updateSelectedData } = useSelectedItem();
    const { data } = useData();
    const { filterList, updateFilterList } = useFilterList();

    useEffect(() => {
        if (data && filter.Tier) {
            const [filteredData] = filterFn(data, filter);
            updateSelected(filteredData.ItemsName);
            updateSelectedData(filteredData);
            const availableOptions = getAvailableOptions(data, filter);
            updateFilterList(availableOptions);
        }
    }, [filter, data]);

    const handleFilterChange = (filterData) => {
        if (data && filterData.Tier) {
            const [filteredData] = filterFn(data, filterData);
            updateSelected(filteredData.ItemsName);
            updateSelectedData(filteredData);
            const availableOptions = getAvailableOptions(data, filterData);
            updateFilterList(availableOptions);
        }
    };
    console.log(filterList)
    return (
        <>
        {Object.keys(filterList).length > 0 ? (
            <Filter
            filter={filter}
            updateFilter={updateFilter}
            data={data}
            handleFilterChange={handleFilterChange}
            availableOptions={filterList}
            filterHeadList={filterHeadList}
        />
        ) : null}
        </>
    );
}
