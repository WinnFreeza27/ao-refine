import { useSelectedItem } from "../../../hooks/useSelectedItem.js"
import { useData } from "../../../hooks/useData.js"
import { useFilterRules } from "../../../hooks/useFilterRules.js"
import { useSearchQuery } from "../../../hooks/useSearchQuery.js"
import {filterAndSearch} from "../../../utils/filterAndSearch.js"
import ImageLazy from "../../ui/Image/ImageLazy.jsx"

export default function ItemRefine() {
   
    const {data} = useData()
    const {filter} = useFilterRules()
    const {searchQuery} = useSearchQuery()
    
    const filteredData  = filterAndSearch(data, filter, searchQuery)
    const {updateSelected, updateSelectedData} = useSelectedItem()

     //handle the filter change
    const handleClick = (id,itemData) => {
        updateSelectedData(itemData)
        updateSelected(id)
    }
    const images = filteredData?.map((item) => {
        const imageUrl = item["resource-items"].ItemsImageUrl;
        return {
            src: imageUrl,
            alt: "",
            id: item.ItemsName,
            onClick: () => handleClick(item.ItemsName, item)
        }
    })

    return (
    <>
        <div className="grid grid-cols-3 gap-3 mx-auto 2xl:max-w-[90%] items-center justify-start mt-3 xl:mt-0 p-3 min-[430px]:grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 lg:px-3 overflow-hidden -z-10">
        {filteredData?.length > 0 ? 
            <ImageLazy images={images} style={{img: "w-full h-full", div: "item-card w-full h-full"}} imageOnly={false}/>
           : null
            }
        </div>
    </>
    )
}