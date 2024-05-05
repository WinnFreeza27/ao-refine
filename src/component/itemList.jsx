
import Refineinput from "./refineInput.jsx"
import { useSelectedItem } from "../hooks/useSelectedItem"
import { useData } from "../hooks/useData.js"
import { useFiltering } from "../hooks/useFiltering.js"
import convertData from "../utils/convertData.js"
import filterFn from "../utils/filterFn.js"


export default function ListItem() {
    
    const data = useData((state) => state.data)
    const filter = useFiltering((state) => state.filter)
     //convert the data into my format
     const dataConvert = convertData(data)
     //update the filter data
    const filteredData = filterFn(dataConvert, filter)
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
    return (
    <>
    {selected !== null ? <Refineinput /> : null}
    
        <div className="grid grid-cols-3 gap-3 items-center justify-start mt-5 p-3 min-[430px]:grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:flex lg:flex-wrap lg:px-3 overflow-hidden -z-10">
        {filteredData.length > 0 ?  filteredData.map((item,index) => 
            <div className="item-card" key={index}>
                <img className="w-full h-full" src={item["resource-items"].ItemsImageUrl} id="T2_METALBAR" onClick={(el) => handleClick(el.target.id, item)} />
            </div>
        )
           : null
            }
        </div>
    </>
    )
}