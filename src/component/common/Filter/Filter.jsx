import { useState } from 'react';
import FilterLabel from './FilterLabel';
import FilterItem from './FilterItem';

export default function Filter({ filter, handleFilterChange, availableOptions, filterHeadList }) {
    const [activeFilter, setActiveFilter] = useState(null);

    // Handle the filter checkbox change
    const handleActiveFilter = (filterType) => {
        setActiveFilter((prev) => (prev === filterType ? null : filterType));
    };

    const handleFilter = (filterData) => {
        setActiveFilter(null);
        handleFilterChange(filterData);
    };
    const renderList = Object.entries(availableOptions).reduce((acc, [key, value]) => {
        acc[key] = value.map((item) => (
            <FilterItem
                key={`${key}-${item}`}
                inputId={`${key}-${item}`}
                inputName={`select-${key}`}
                inputValue={item}
                onChangeFn={() => handleFilter({ [key]: item })}
                checkedFn={filter[key] === item}
            />
        ));
        return acc;
    }, {});

    return (
        <div className="filterBoxWrapper">
            {filterHeadList.map((item, index) => (
                <FilterLabel
                    key={index}
                    activeFilter={activeFilter}
                    filter={filter}
                    renderList={renderList}
                    handleActiveFilter={handleActiveFilter}
                    type={item.type}
                    styleWidth={item.style}
                />
            ))}
        </div>
    );
}
