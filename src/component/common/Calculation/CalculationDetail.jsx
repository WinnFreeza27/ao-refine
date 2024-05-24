import { useCalculateData } from "../../../hooks/useCalculateData"
import { useSelectedItem } from "../../../hooks/useSelectedItem"
import { useFormData } from "../../../hooks/useFormData"
import {convertCalculateData} from "../../../utils/convertCalculateData"
import ItemCalculateCard from "../../ui/Cards/ItemCalculateCard"
import Blackoverlay from "../../ui/Overlay/blackOverlay"
import CalculationSummary from "./CalculationSummary"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"


export default function CalculationDetail() {
    const {calculateData, removeCalculateData} = useCalculateData()
    const {removeSelected, removeSelectedData} = useSelectedItem()
    const {formData, resetFormData} = useFormData()
    const navigate = useNavigate();

    const onBack = () => {
        removeCalculateData()
        navigate("/")
    }
    const onClose = () => {
        if(formData) {
            resetFormData()
            navigate("/")
        }
        removeCalculateData()
        removeSelected()
        removeSelectedData()
    }

    useEffect(() => {
      const handleBackNavigation = () => {
        // Execute your function here
        onBack()
        // You can perform any action you want when the back button is pressed
      };
  
      const handlePopstate = (event) => {
        if (event.type === 'popstate') {
          handleBackNavigation();
        }
      };
  
      window.addEventListener('popstate', handlePopstate);
  
      return () => {
        window.removeEventListener('popstate', handlePopstate);
      };
    }, [calculateData]);
    let convertedData;
    if(calculateData) {
        convertedData = convertCalculateData(calculateData.data, calculateData.formData)
    }

    return(
        <>
        {calculateData !== null && convertedData !== undefined || null ? 
            <>
                <Blackoverlay />
                <div className="refine-box text-sm sm:text-base sm:overflow-hidden md:w-[70%] md:p-4 2xl:w-[50%]">
                    <div className="flex items-center justify-around w-full mb-5">
                        <svg onClick={() => onBack()} className="w-8 cursor-pointer" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="#ffffff" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g></svg>
                        <div className="flex items-center w-full justify-center">
                        <h1 className="font-bold text-base sm:text-lg">Calculation Detail</h1>
                        </div>
                        <svg onClick={() => onClose()} className="justify-self-start w-10 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 8L8 16M8 8L16 16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"></path> </g></svg>
                    </div> 
                    <div className="flex flex-col gap-3">
                    {convertedData?.data["craft-resource"].length > 0 ? convertedData.data["craft-resource"].map((res,index) => {
                        return (
                       <ItemCalculateCard key={index} 
                        item={res["resource-items"]}
                        resData={res}
                        title={{text1: "Item Need", text2:"Buy Price", text3:"Total Spend"}}
                       />
                        )
                    }): null} 
                    {convertedData !== null ? 
                        <ItemCalculateCard
                        item={convertedData.data["resource-items"]}
                        resData={convertedData.formData}
                        title={{text1: "Quantity", text2:"Sell Price", text3:"Sell After Tax"}}
                        targetItem={true}
                       />
                    :null}
                       <CalculationSummary 
                        summaryData={convertedData.summaryData}
                       />
                    </div>
                </div>
            </>
        : null}
        
        </>
    )
}

