export const recipeListMaker = (selectedData) => {
    const recipeList = []
    selectedData["craft-resource"]?.map((item,index) => {
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
                    additionalText: "*Item will yld every craft ",
                    required:"Please fill out this field",
                },
                imageFormData: {
                    text: "Buy Price",
                    tooltip: "The buy price of this material item (per 1)",
                    additionalText: "*Item need for every craft ",
                    required:"Please fill out this field",
                }
            }
        )
    })
    return recipeList
}