import React from "react";
import FormRefine from "../../ui/Forms/FormRefine.jsx";
import ImageForm from "../../ui/Forms/ImageForm.jsx";
import VariationSelector from "../../ui/Forms/VariationSelector.jsx";
import ButtonXn from "../../ui/Buttons/Button.jsx";
import { formatNumber } from "../../../utils/formatNumber.js";

export default function RefineForm ({ register, errors, recipeList, recipeSelected, formList, watch, selectedData, setRecipeSelected, labelToFieldName}) {
    const focusValue = watch("focuscost-form");
    const qtyValue = watch("targetCraftQty");

    return (
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-24">
        <div className="flex flex-col">
            <ImageForm
                imageUrl={selectedData["resource-items"].ItemsImageUrl}
                formData={recipeList[recipeSelected].targetCraftData}
                register={register}
                errors={errors}
            />
            <div className="max-w-[20ch] text-xs">
                <span>This item will yield <span className="text-cyanide">{recipeList[recipeSelected].amountCrafted}</span> for every craft</span>
            </div>
            <div className="grid grid-cols-2 mt-3 min-[420px]:grid-cols-3 gap-x-3 gap-y-3">
                {formList.length > 0 ? formList.map((item, index) => (
                    <React.Fragment key={index}>
                        <FormRefine
                            register={register}
                            percentage={item.percentage}
                            text={item.text}
                            id={item.id}
                            errors={errors}
                            readOnly={item.readOnly}
                            required={item.required}
                            readOnlyText={qtyValue > 0 && focusValue > 0 ? formatNumber(qtyValue * focusValue) : "0"}
                            tooltipText={item.tooltip}
                        />
                    </React.Fragment>
                )) : null}
            </div>
            </div>
            <div className="flex flex-col lg:justify-self-start mt-5 lg:mt-0">
                <div className="flex flex-col gap-3 lg:gap-10 xl:flex-row">
                    {recipeList[recipeSelected].data.length > 0 && recipeList[recipeSelected]?.imageFormData !== undefined ? 
                        recipeList[recipeSelected].data.map((item, index) => {
                            const id = labelToFieldName && labelToFieldName[item.ItemsName] ? labelToFieldName[item.ItemsName] : `item${index + 1}price-form`;
                            return (
                                <ImageForm key={index}
                                    imageUrl={item["resource-items"].ItemsImageUrl}
                                    formData={{ ...recipeList[recipeSelected].imageFormData, id, highlightedText: item.Count }}
                                    register={register}
                                    errors={errors}
                                />
                            );
                        })
                    : null}
                </div>
                {recipeList.length > 1 && (
                    <>
                        <div className="max-w-[30ch]">
                            <span className="text-xs">This item has a variety of recipes to craft you can choose one of the recipes below.</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 -ml-2">
                            {recipeList.map((item, index) => (
                                <VariationSelector
                                    key={index}
                                    recipeSelected={recipeSelected}
                                    handleRecipe={() => setRecipeSelected(index)}
                                    text={`${item.text}`}
                                    selectedId={item.selectedId}
                                    id={item.id}
                                />
                            ))}
                        </div>
                    </>
                )}
                <div className="w-full inline-flex items-center justify-center gap-3 my-5 lg:justify-start">
                            <ButtonXn
                                text={"Calculate"}
                                type={"submit"}
                                customStyle={"bg-white border border-transparent hover:bg-bg-transparent hover:border-bd-grey hover:text-white"}
                            />
            </div>
            </div>
            
    </div>
    );
}

