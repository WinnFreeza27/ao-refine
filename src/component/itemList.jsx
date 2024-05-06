
import { useSelectedItem } from "../hooks/useSelectedItem"
import { useData } from "../hooks/useData.js"
import { useFiltering } from "../hooks/useFiltering.js"
import ImageGallery from "./imageLazyLoad.jsx"
import { useSearchQuery } from "../hooks/useSearchQuery.js"
import { filterAndSearch } from "../utils/filterAndSearch.js"
export default function ListItem() {
    
    
    // const filter = useFiltering((state) => state.filter)
     //convert the data into my format
     //update the filter data
    const data = useData((state) => state.data)
    const filter = useFiltering((state) => state.filter)
    const searchQuery = useSearchQuery((state) => state.searchQuery)
    console.log(searchQuery)
    const filteredData  = filterAndSearch(data, filter, searchQuery)
    const updateSelected = useSelectedItem((state) => state.updateSelected)
    const updateSelectedData = useSelectedItem((state) => state.updateSelectedData)
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
    // console.log(filteredData)
    return (
    <>
        <div className="grid grid-cols-3 gap-3 items-center justify-start mt-5 p-3 min-[430px]:grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:flex lg:flex-wrap lg:px-3 overflow-hidden -z-10">
        {filteredData?.length > 0 ? 
            <ImageGallery images={images} />
           : null
            }
        </div>
    </>
    )
}