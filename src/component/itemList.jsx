
import Refineinput from "./refineInput.jsx"
import { useSelectedItem } from "../hooks/useSelectedItem"
import { useData } from "../hooks/useData.js"
import { useFiltering } from "../hooks/useFiltering.js"
import filterFn from "../utils/filterFn.js"
import ImageGallery from "./imageLazyLoad.jsx"
export default function ListItem() {
    
    const data = useData((state) => state.data)
    const filter = useFiltering((state) => state.filter)
     //convert the data into my format
     //update the filter data
    
    const filteredData = filterFn(data, filter)
    const selected = useSelectedItem((state) => state.selected)
    const updateSelected = useSelectedItem((state) => state.updateSelected)
    const updateSelectedData = useSelectedItem((state) => state.updateSelectedData)
     //handle the filter change
    const handleClick = (id,itemData) => {
        updateSelectedData(itemData)
        updateSelected(id)
    }
    if(selected) {
        document.body.classList.add('overflow-hidden');
    } else {
        document.body.classList.remove('overflow-hidden');
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
    {selected !== null ? <Refineinput /> : null}
    
        <div className="grid grid-cols-3 gap-3 items-center justify-start mt-5 p-3 min-[430px]:grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:flex lg:flex-wrap lg:px-3 overflow-hidden -z-10">
        {filteredData.length > 0 ? 
            <ImageGallery images={images} />
           : null
            }
        </div>
    </>
    )
}