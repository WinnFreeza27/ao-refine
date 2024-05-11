import Blackoverlay from "./blackOverlay.jsx";
import Forminput from "./formInput.jsx";
import { useSelectedItem } from "../hooks/useSelectedItem";
import { useState } from "react";
import { useForm } from "react-hook-form";
import React from "react";
import Submitbutton from "./submitButton.jsx";
import Imageform from "./imageForm.jsx";
import Recipeinput from "./recipeInput.jsx";
import { formList } from "../dummyDatas/formList.js";
import { useCalculateData } from "../hooks/useCalculateData.js";
import formatNumber from "../utils/formatNumber.js";
import { useFormData } from "../hooks/useFormData.js";
import { useEffect } from "react";


export default function Refineinput() {
    const [recipeSelected, setRecipeSelected] = useState(0)
    
    const recipeList = []
    const handleRecipe = (id) => {
        setRecipeSelected(id)
    }
    const selected = useSelectedItem((state) => state.selected)
    const removeSelected = useSelectedItem((state) => state.removeSelected)
    const selectedData = useSelectedItem((state) => state.selectedData)
    const calculateData = useCalculateData((state) => state.calculateData)
    const updateCalculateData = useCalculateData((state) => state.updateCalculateData)
    
    selectedData["craft-resource"]?.map((item,index) => {
        recipeList.push(
            {
                text: index,
                id: `recipe${index}-form`,
                data: item,
                amountCrafted: item[0].AmountCrafted
            }
        )
    })
    
    const formMethods = useForm();
    const setForm = useFormData((state) => state.setForm)
    
    useEffect(() => {
        setForm(formMethods)
    },[])
    const forms =  useFormData((state) => state.forms)

    if (forms !== null) {
        const { register, handleSubmit, formState: { errors }, watch, reset } = forms;
        const onSubmit = (data) => {
            const recipeData = recipeList[recipeSelected].data
            updateCalculateData({formData: {...data, itemPerCraft: recipeList[recipeSelected].amountCrafted}, data: {...selectedData, "craft-resource": recipeData}})
        }
        const focusValue = watch("focuscost-form")
        const qtyValue = watch("targetQty")
        const resetForm = () => {
            reset()
        }
        const onClose = () => {
            setRecipeSelected(0)
            removeSelected()
            resetForm()
        }
        if(selected) {
            document.body.classList.add('overflow-hidden');
            
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return(
            <>
            {selected !== null && calculateData == null ? <>
                <Blackoverlay />
                <div className="relative w-full h-full">
                <div className="refine-box">
                <div className="grid grid-cols-3 items-center justify-items-start w-full">
                <svg onClick={() => onClose()} className="justify-self-start w-10 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 8L8 16M8 8L16 16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"></path> </g></svg>
                <div className="flex items-center w-full max-[400px]:-ml-6 col-span-2">
                <h1 className="font-bold">Adamantium steel bar</h1>
                </div>
                </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-3 sm:p-3 md:grid md:grid-cols-2 md:gap-x-24 lg:auto-cols-max">
                        <div className="flex flex-col">
                        <Imageform url={selectedData["resource-items"].ItemsImageUrl}
                        text={"Quantity"}
                        register={register}
                        errors={errors}
                        id={"targetQty"}
                         />
                            <div className="max-w-[20ch] text-sm">
                                <span>This item will yield <span className="text-cyanide">{recipeList[recipeSelected].amountCrafted}</span> for every craft</span>
                            </div>
                            <div className="grid grid-cols-2 mt-3 gap-y-1 gap-x-3 min-[420px]:grid-cols-3 md:grid-cols-2">
                            {formList.length > 0 ? formList.map((item,index) => 
                            <React.Fragment key={index}>
                            <Forminput 
                            key={index}
                            register={register}
                            percentage={item.percentage} 
                            text={item.text} 
                            id={item.id}
                            errors = {errors}
                            readOnly={item.readOnly}
                            required={item.required}
                            readOnlyText={qtyValue > 0 && focusValue > 0 ? formatNumber(qtyValue * focusValue) : 0}
                            />
                            </React.Fragment>
                            ) : null}
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                        {recipeList.length > 0 ? recipeList[recipeSelected].data.map((res,index) => {
                            const fieldName = `item${index + 1}price-form`;
                            return (
                                <React.Fragment key={index}>
                                <Imageform 
                                url={res["resource-items"].ItemsImageUrl}
                                text={"Buy price"} 
                                additionalText={"*Item need for every craft "} 
                                highlightedText={res.Count}
                                register={register}
                                id = {fieldName}
                                errors = {errors}
                                />
                                </React.Fragment>
                            )
                        }) : null}
                        {recipeList.length > 1 ? (
                            <>
                            <div className="max-w-[30ch] pl-2">
                                <span className="text-xs">This item has a variety of recipes to craft you can choose one of the recipes below.</span>
                            </div>
                            <div className="flex items-center gap-2">
                            {recipeList.length > 0 ? recipeList.map((item,index) => 
                            <Recipeinput 
                            key={index} 
                            recipeSelected={recipeSelected} 
                            handleRecipe={handleRecipe} 
                            text={item.text} 
                            id={item.id}/>) : null}
                                </div>
                                </>
                        ): null}
                           
                            <Submitbutton />
                        </div>
                    </form>
            </div>
            </div>
            </>
             : null}
                
            </>
        )
    }

    
return (
    <div>Use Form is Null</div>
)
    
    
   
}



