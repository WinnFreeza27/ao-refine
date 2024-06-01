import React, { useEffect } from "react";
import FormRefine from "../../ui/Forms/FormRefine.jsx"
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
import { useNavigate, useNavigationType } from "react-router-dom";
import Filter from "../Filter/Filter.jsx";
import {useFetchPrice} from "../../../hooks/useFetchPrice.js";
import ButtonXn from "../../ui/Buttons/Button.jsx";
import { findItemToFetch } from "../../../utils/findItemToFetch.js";

export default function Refineinput() {
    const [fetchPriceData, setFetchPriceData] = useState(null);
    const [recipeSelected, setRecipeSelected] = useState(0);
    const navigate = useNavigate()
    const handleRecipe = (id) => {
        setRecipeSelected(id);
    };
    const navType = useNavigationType()
    

    const { selected, removeSelected, selectedData } = useSelectedItem();
    const { calculateData, updateCalculateData, removeCalculateData } = useCalculateData();
    const recipeList = recipeListMaker(selectedData);
    
    const itemToFetch = findItemToFetch(selectedData, recipeSelected)
    
    const formMethods = useForm();
    const { formData, setFormData, resetFormData } = useFormData();
    const { register, handleSubmit, formState: { errors }, watch, setValue } = formMethods;

    const { loading, error, fetchData } = useFetchPrice(itemToFetch);

    const handleFetchPrice = async () => {
        try {
          const fetchedData = await fetchData(itemToFetch);
          setFetchPriceData(fetchedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      console.log(fetchPriceData)
    useEffect(() => {

        
        //if the back button was pressed
        if(navType == "POP" && calculateData !== null) {
            removeCalculateData()
        }
        
        // if the selected state is null , which mean nothing data has ben sent , then redirect to the list page
        if(selected == null) {
            navigate('/')
        }
        
    },[])

    //check if the recipelist array is less than selected , this can be happen because of previous user state
    if(recipeList.length > 0 && recipeList.length <= recipeSelected) {
        const recipeListDecrement = recipeList.length - 1
        console.log(recipeList[recipeListDecrement])
        setRecipeSelected(recipeListDecrement)
    }
    // Populate form with existing formData if any
  useEffect(() => {
    Object.keys(formData).forEach(key => {
      setValue(key, formData[key]);
    });
  }, [formData, setValue]);

  // Watch for changes in form values and update Zustand store
  const formValues = watch();
  
  useEffect(() => {
    // Only update if formValues have actually changed
    if (JSON.stringify(formValues) !== JSON.stringify(formData)) {
      setFormData(formValues);
    }
  }, [formValues, formData, setFormData]);

    const onSubmit = (data) => {
        const recipeData = recipeList[recipeSelected].data;
        updateCalculateData({
            formData: { ...data, itemPerCraft: recipeList[recipeSelected].amountCrafted },
            data: { ...selectedData, "craft-resource": recipeData }
        });
        navigate("/result")
    };

    const focusValue = watch("focuscost-form");
    const qtyValue = watch("targetCraftQty");

    const resetForm = () => {
        resetFormData()
    };

    const onClose = () => {
        setRecipeSelected(0);
        removeSelected();
        resetForm();
        navigate("/")
    };
        return(
            <>
            {selected !== null && calculateData == null && recipeList[recipeSelected] !== undefined ? 
            <>
                <div className="refine-box text-sm md:text-base">
                <div className="flex items-center justify-between w-full mb-4">
                    <svg onClick={() => onClose()} className="justify-self-start w-6 cursor-pointer" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#fdfdfd" stroke="#fdfdfd"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path>
                    <path fill="#ffffff" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g>
                    </svg>
                <div className="flex items-center">
                <h1 className="font-bold text-lg md:text-xl xl:text-2xl">{selectedData["resource-items"].ItemsLocalizedName}</h1>
                </div>
                <div></div>
                </div>
                <Filter />
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-3 p-1 lg:grid lg:grid-cols-2 justify-items-center lg:gap-x-24">
                        <div className="flex flex-col">
                        <ImageForm
                                imageUrl={selectedData["resource-items"].ItemsImageUrl} 
                                formData={recipeList[recipeSelected].targetCraftData}
                                register={register}
                                errors={errors} />
                            <div className="max-w-[20ch] text-xs">
                                <span>This item will yield <span className="text-cyanide">{recipeList[recipeSelected].amountCrafted}</span> for every craft</span>
                            </div>
                            <div className="grid grid-cols-2 mt-3 min-[420px]:grid-cols-3 gap-x-3 gap-y-3">
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
                            tooltipText={item.tooltip}
                            />
                            </React.Fragment>
                            ) : null}
                            </div>
                        </div>
                        <div className="flex flex-col lg:justify-self-start mt-5 lg:mt-0">
                        <div className="flex flex-col gap-3 lg:gap-10 xl:flex-row">
                        {recipeList[recipeSelected].data.length > 0 && recipeList[recipeSelected]?.imageFormData !== undefined ? 
                            recipeList[recipeSelected].data.map((item,index) => {
                                const id = `item${index + 1}price-form`
                                return(
                                <ImageForm key={index}
                                imageUrl={item["resource-items"].ItemsImageUrl} 
                                formData={{...recipeList[recipeSelected].imageFormData, id, highlightedText: item.Count}}
                                register={register}
                                errors={errors} />
                                )
                            })
                        : null}
                        </div>
                        {/* recipe radio */}
                        {recipeList.length > 1 ? (
                            <>
                            <div className="max-w-[30ch]">
                                <span className="text-xs">This item has a variety of recipes to craft you can choose one of the recipes below.</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2 -ml-2">
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
                        <div className="w-full inline-flex items-center justify-center gap-3 my-5 lg:justify-start">
                            <ButtonXn
                            text={"Fetch"}
                            type={"button"}
                            onClick={() => handleFetchPrice()}
                            />
                            <ButtonXn 
                            text={"Calculate"}
                            type={"submit"}
                            customStyle={"bg-cyanide hover:bg-cyanide/90"}
                            />
                        </div>
                        </div>
                        
                    </form>
            </div>
            
            </>
             : null}
                
            </>
        )
    }



