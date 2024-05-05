import Blackoverlay from "./blackOverlay.jsx";
import Form from "./form.jsx";
import Forminput from "./formInput.jsx";
import { useSelectedItem } from "../hooks/useSelectedItem";

export default function Refineinput() {
    const formList = [
        {
            percentage: false,
            text: "Sell price",
            id:"sellprice-form"
        },
        {
            percentage: true,
            text: "Tax cost",
            id:"taxcost-form"
        },
        {
            percentage: true,
            text: "Refine cost",
            id:"refinecost-form"
        },
        {
            percentage:true,
            text: "Return rate",
            id:"returnrate-form"
        },
        {
            percentage: false,
            text: "Focus cost",
            id:"focuscost-form"
        }
    ]
    const recipeList = [
        {
            text: 1,
            peer: "recipe1",
            id: "recipe1-form"
        },
        {
            text: 2,
            peer: "recipe2",
            id: "recipe2-form"
        },
        {
            text: 3,
            peer: "recipe3",
            id: "recipe3-form"
        }
    ]
    
    const removeSelected = useSelectedItem((state) => state.removeSelected)
    const selectedData = useSelectedItem((state) => state.selectedData)
    
    return(
        <>
            <Blackoverlay />
            <div className="refine-box">
            <svg onClick={() => removeSelected()} className="absolute top-0 left-0 w-10 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 8L8 16M8 8L16 16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"></path> </g></svg>
               <Title />
                <div className="flex flex-col w-full mt-4 gap-3 sm:p-3 md:grid md:grid-cols-2 md:gap-x-24 lg:auto-cols-max">
                    <div className="flex flex-col">
                    <Imageform url={selectedData["resource-items"].ItemsImageUrl} text={"Quantity"}/>
                        <div className="max-w-[20ch] text-sm">
                            <span>This item will yield <span className="text-cyanide">{selectedData.AmountCrafted}</span> for every craft</span>
                        </div>
                        <div className="grid grid-cols-2 mt-3 gap-x-3 min-[420px]:grid-cols-3 md:grid-cols-2">
                        {formList.length > 0 ? formList.map((item,index) => <Forminput key={index} percentage={item.percentage} text={item.text} id={item.id}/>) : null}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                    {selectedData["craft-resource"] !== null ? selectedData["craft-resource"][0].map((res) => {
                        console.log(res)
                        return (
                            <Imageform key={Math.floor(Math.random() * 9999)} url={res["resource-items"].ItemsImageUrl}
                        text={"Buy price"} 
                        additionalText={"*Item need for every craft "} 
                        highlightedText={res.Count}/>
                        )
                    }
                        
                    ) : null}
                       

                        <div className="max-w-[30ch] pl-2">
                            <span className="text-xs">This item has a variety of recipes to craft you can choose one of the recipes below.</span>
                        </div>
                        <div className="flex items-center gap-2">
                        {recipeList.length > 0 ? recipeList.map((item,index) => <Radiorecipe key={index} text={item.text} id={item.id} peer={item.peer}/>) : null}
                            </div>
                        <Submitbutton />
                    </div>
                </div>
            </div>
        </>
    )
} 

function Title() {
    return (
        <div className="flex items-center justify-center textn-center w-full pl-8">
            <h1 className="font-bold">Adamantium steel bar</h1>
        </div>
    )
}

function Radiorecipe({text,id,peer}) {
    return(
        
        <>
            <input type="radio" className={`peer/${peer} appearance-none`} id={id} name="recipe-radio"/>
                <label htmlFor={id}
                className={`cursor-pointer hover:bg-bd-grey bg-bg-transparent peer-checked/${peer}:bg-bd-grey border border-bd-grey w-8 h-8 rounded-lg text-center inline-flex items-center justify-center`}>
                {text}</label>
        </>
    )
}

function Imageform({url,text,additionalText,highlightedText}) {
    return (
        <div className="flex">
                        <img className="w-28 h-28" src={url}/>
                                <label className="flex flex-col justify-end gap-1" htmlFor="qty-form">
                                <span className="text-xs">{additionalText}<span className="text-cyanide">{highlightedText}</span></span>
                                <span>{text}</span>
                                <Form inputType={"number"} id={"qty-form"} noDefaultClass={false} styleClass={"w-44 remove-arrow px-3 py-2 mb-4"}/>
                                </label>
                        </div>
    )
}

function Submitbutton() {
    return (
        <div className="w-full inline-flex items-center justify-center my-5 lg:justify-start">
            <button type="submit" className="bg-[#EDEDED] text-xl transition-all text-bg-transparent hover:bg-[#CCCCCC] px-6 py-4 rounded-lg">Calculate</button>
        </div>
    )
}