export const recipeListMaker = (selectedData) => {
    const recipeList = []
    selectedData["craft-resource"]?.map((item,index) => {
        recipeList.push(
            {
                text: index + 1,
                id: `recipe${index}-form`,
                data: item,
                amountCrafted: item[0].AmountCrafted,
                selectedId: index
            }
        )
    })
    return recipeList
}