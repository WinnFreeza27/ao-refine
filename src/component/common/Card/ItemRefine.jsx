import { useSelectedItem } from "../../../hooks/useSelectedItem.js"
import { useData } from "../../../hooks/useData.js"
import ImageLazy from "../../ui/Image/ImageLazy.jsx"
import { useFilterRules } from "../../../hooks/useFilterRules.js"
import { useFilterList } from "../../../hooks/useFilterList.js"

import { filterContentExtract } from "../../../utils/filterContentExtractor.js"
import { useEffect } from "react"

export default function ItemRefine() {
    const {data} = useData()

    const {filterList, updateFilterList} = useFilterList()

    const {updateSelected, updateSelectedData} = useSelectedItem()
    const {updateFilter} = useFilterRules()
     //handle the filter change


    
    const handleClick = (id,itemData) => {
        const {Categories, Tier, EnchantmentLevel} = itemData
        updateFilter({Categories, Tier, EnchantmentLevel})
        updateSelectedData(itemData)
        updateSelected(id)
    }
    
    useEffect(() => {

        if(data) {
            const result = filterContentExtract(data, ["Categories","Tier","EnchantmentLevel"])
            if(result) updateFilterList(result)
        }
    }, [])


    let images = [];
    if(filterList.Categories){
        filterList.Categories.map((category) => {
            const key = category.toUpperCase();
    
            //take the first element on the every category , first mean lowest tier.
            const item = data[key][0]
            const imageUrl = item["resource-items"].ItemsImageUrl;
                images.push( {
                    src: imageUrl,
                    alt: "",
                    id: item.ItemsName,
                    onClick: () => handleClick(item.ItemsName, item)
                })
            
        })
    }
    
    return (
    <>
     <div className="text-white inline-flex flex-col items-center justify-center w-full mt-4 gap-y-3 px-3">
            <h1 className="font-bold text-lg  text-center">Select the item you want to craft</h1>
            <svg className="w-6 rotate-[270deg]" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#fdfdfd" stroke="#fdfdfd"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path>
                    <path fill="#ffffff" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g>
                    </svg>
        </div>
        <div className="flex flex-row flex-wrap gap-3 justify-center w-[95%] sm:w-[90%] mx-auto mt-3">
        {images?.length > 0 ? 
            <ImageLazy images={images} style={{img: "w-full h-full", div: "item-card"}} imageOnly={false}/>
           : null
            }
        </div>
    </>
    )
}