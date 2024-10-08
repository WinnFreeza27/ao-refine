export const labelMaker = (selectedData, recipeSelected) => {
    const listOfLabel = [];
    if (selectedData["refine-resource"]) {
        const craftedLabel = selectedData.ItemsName;
        const craftedField = "sellprice-form";
        const resourceItem = selectedData["refine-resource"][recipeSelected];
        resourceItem.forEach((resItem, index) => {
            const fieldName = `item${index + 1}price-form`;
            const labelName = resItem.ItemsName;
            const result = { [labelName]: fieldName };
            listOfLabel.push(result);
        });
        const crafted = { [craftedLabel]: craftedField };
        listOfLabel.push(crafted);
    }
    return Object.assign({}, ...listOfLabel);
}