export const recipeListMaker = (selectedData) => {
    const recipeList = []
    selectedData["refine-resource"]?.map((item,index) => {
        
        recipeList.push(
            {
                text: index + 1,
                id: `recipe${index}-form`,
                data: item,
                selectedId: index,
                amountCrafted: selectedData.AmountCrafted,
                targetCraftData: {
                    text:"Quantity",
                    id: "targetCraftQty",
                    tooltip: "",
                    required:"Please fill out this field",
                },
                imageFormData: {
                    text: "Buy Price",
                    tooltip: "The buy price of this material item (per 1)",
                    additionalText: "Need per craft ",
                    required:"Please fill out this field",
                }
            }
        )
    })
    return recipeList
}