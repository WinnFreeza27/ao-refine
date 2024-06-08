import { useCalculateData } from "../../../hooks/useCalculateData"
import {convertCalculateData} from "../../../utils/convertCalculateData"
import ItemCalculateCard from "../../ui/Cards/ItemCalculateCard"
import CalculationSummary from "./CalculationSummary"
import { useNavigate, useNavigationType } from "react-router-dom"
import { useEffect } from "react"


export default function CalculationDetail() {
    const {calculateData, removeCalculateData} = useCalculateData()

    const navigate = useNavigate();
    const navType = useNavigationType()
    
    useEffect(() => {
        if(navType == "POP" && calculateData == null) {
            navigate("/")
        }
    },[])

    const onBack = () => {
        removeCalculateData();
        navigate("/input", { state: 'POP' });
    };

   

    let convertedData;
    if(calculateData) {
        convertedData = convertCalculateData(calculateData.data, calculateData.formData)
    }


    return(
        <>
        {calculateData !== null && convertedData !== undefined || null ? 
            <>
                
                <div className="refine-box text-sm sm:text-base sm:overflow-hidden md:w-[70%] md:p-4 xl:w-full">
                    <div className="flex items-center justify-around w-full mb-5">
                        <svg onClick={() => onBack()} className="w-6 cursor-pointer" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="#ffffff" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g></svg>
                        <div className="flex items-center w-full justify-center">
                        <h1 className="font-bold text-lg xl:text-2xl">Calculation Detail</h1>
                        </div>
                        
                    </div> 
                    <div className="flex flex-col gap-5 w-full justify-center items-center">
                    <div className="flex flex-col p-3 border border-bd-grey rounded-lg w-full xl:w-max xl:min-w-[50%]">
                    <span className="self-center text-base lg:text-lg mb-3">Detail of material item</span>
                    <div className={`flex flex-col xl:flex-row xl:flex-wrap justify-items-center gap-3`}>
                        {convertedData?.data["craft-resource"].length > 0 ? convertedData.data["craft-resource"].map((res,index) => {
                            return (
                        <ItemCalculateCard key={index} 
                            item={res["resource-items"]}
                            resData={res}
                            title={{text1: "Item Need", text2:"Buy Price", text3:"Total Spend"}}
                        />
                            )
                        }): null} 
                    </div>
                    </div>
                    <div className="flex flex-col gap-3 p-3 border border-bd-grey rounded-lg w-full xl:max-w-[50%] xl:mx-auto">
                        <span className="self-center text-base lg:text-lg">Detail of crafted item</span>
                        {convertedData !== null ? 
                            <ItemCalculateCard
                            item={convertedData.data["resource-items"]}
                            resData={convertedData.formData}
                            title={{text1: "Quantity", text2:"Sell Price", text3:"Sell After Tax"}}
                            targetItem={true}
                        />
                        :null}
                    </div>
                    <div className="flex flex-col gap-3 xl:w-[50%] p-3 border border-bd-grey rounded-lg w-full xl:mx-auto">
                    <span className="self-center text-base lg:text-lg">Summary</span>
                       <CalculationSummary 
                        summaryData={convertedData.summaryData}
                       />
                    </div>
                    </div>
                </div>
            </>
        : null}
        
        </>
    )
}

