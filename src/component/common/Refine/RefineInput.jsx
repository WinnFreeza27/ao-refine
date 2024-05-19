import React, { useEffect } from "react";
import Blackoverlay from "../../ui/Overlay/blackOverlay.jsx";
import FormRefine from "../../ui/Forms/FormRefine.jsx"
import SubmitButton from "../../ui/Buttons/SubmitButton.jsx";
import ImageForm from "../../ui/Forms/ImageForm.jsx";
import VariationSelector from "../../ui/Forms/VariationSelector.jsx";
import { useSelectedItem } from "../../../hooks/useSelectedItem.js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCalculateData } from "../../../hooks/useCalculateData.js";
import { useFormData } from "../../../hooks/useFormData.js";
import { formList } from "./storage.js";
import { recipeListMaker } from "../../../utils/recipeListMaker.js";
import { formatNumber } from "../../../utils/formatNumber.js";



export default function Refineinput() {
    const [recipeSelected, setRecipeSelected] = useState(0);

    const handleRecipe = (id) => {
        setRecipeSelected(id);
    };

    const { selected, removeSelected, selectedData } = useSelectedItem();
    const { calculateData, updateCalculateData } = useCalculateData();
    const recipeList = recipeListMaker(selectedData);

    const formMethods = useForm();
    const { setForms } = useFormData();

    useEffect(() => {
        setForms(formMethods);
    }, [formMethods, setForms]);

    const { register, handleSubmit, formState: { errors }, watch, reset } = formMethods;

    const onSubmit = (data) => {
        const recipeData = recipeList[recipeSelected].data;
        updateCalculateData({
            formData: { ...data, itemPerCraft: recipeList[recipeSelected].amountCrafted },
            data: { ...selectedData, "craft-resource": recipeData }
        });
    };

    const focusValue = watch("focuscost-form");
    const qtyValue = watch("targetQty");

    const resetForm = () => {
        reset();
    };

    const onClose = () => {
        setRecipeSelected(0);
        removeSelected();
        resetForm();
    };

    useEffect(() => {
        const handleBackButton = () => {
          console.log('Back button was pressed');
          onClose();
        };
    
        window.addEventListener('popstate', handleBackButton);

        return () => {
          window.removeEventListener('popstate', handleBackButton);
        };
      }, []);

    useEffect(() => {
        if (selected) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [selected]);

        return(
            <>
            {selected !== null && calculateData == null ? <>
                <Blackoverlay />
                <div className="relative w-full h-full">
                <div className="refine-box">
                <div className="flex items-center justify-between w-full mb-4">
                <svg onClick={() => onClose()} className="justify-self-start w-10 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 8L8 16M8 8L16 16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"></path> </g></svg>
                <div className="flex items-center">
                <h1 className="font-bold text-lg md:text-xl">{selectedData["resource-items"].ItemsLocalizedName}</h1>
                </div>
                <div></div>
                </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-3 sm:p-3 md:grid md:grid-cols-2 md:gap-x-24 lg:auto-cols-max">
                        <div className="flex flex-col">
                        <ImageForm url={selectedData["resource-items"].ItemsImageUrl}
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
                            <FormRefine 
                            key={index}
                            register={register}
                            percentage={item.percentage} 
                            text={item.text} 
                            id={item.id}
                            errors = {errors}
                            readOnly={item.readOnly}
                            required={item.required}
                            readOnlyText={qtyValue > 0 && focusValue > 0 ? formatNumber(qtyValue * focusValue) : "0"}
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
                                <ImageForm 
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
                            <VariationSelector 
                            key={index} 
                            recipeSelected={recipeSelected} 
                            handleRecipe={handleRecipe}
                            text={`${item.text}`}
                            selectedId={item.selectedId}
                            id={item.id}/>) : null}
                                </div>
                                </>
                        ): null}
                            <SubmitButton />
                        </div>
                    </form>
            </div>
            </div>
            </>
             : null}
                
            </>
        )
    }



