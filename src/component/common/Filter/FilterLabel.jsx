export default function FilterLabel({activeFilter,filter,renderList,handleActiveFilter, type}) {
    return (
        <>
           <div className="relative">
                <label htmlFor={type} className={`cursor-pointer flex items-center justify-center text-center h-10 rounded-lg border w-max border-bd-grey hover:bg-black ${activeFilter == `${type}Filter` ? "bg-black" : "bg-bg-transparent" }`}>
                    <div className="filterLabel">
                    <span>{type == "EnchantmentLevel" ? "Enchantment" : type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    <input type="checkbox" id={type} onChange={() => handleActiveFilter(`${type}Filter`)} checked={activeFilter == `${type}Filter`} className="appearance-none"/>
                        <div className="h-full border-l border-bd-grey inline-flex items-center p-2">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> 
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#ffffff"></path> </g>
                            </svg>
                        </div>
                    </div>
                    <span className="text-xs pr-3">{filter[type]}</span>
                </label>
                <div className={`filterHead ${activeFilter == `${type}Filter` ? "filterShow" : "filterHide" }`}>
                <span className="filter-span">{type == "EnchantmentLevel" ? "Enchantment" : type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    {...renderList[type]}
                </div>
            </div>
        </>
    )
}