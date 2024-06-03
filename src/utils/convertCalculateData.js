import {refineCalculate} from "./refineCalculate"
export const convertCalculateData = (data, formData) => {
    const {
        itemPerCraft,
        "returnrate-form": returnRate,
        targetCraftQty,
        "refinecost-form": refineCost,
        "sellprice-form": sellPrice,
        "taxcost-form": taxCost
      } = formData;
    const parsedData = {
        itemPerCraft: parseInt(itemPerCraft),
        returnRate: parseFloat(returnRate),
        targetCraftQty: parseInt(targetCraftQty),
        refineCost: parseInt(refineCost),
        sellPrice: parseInt(sellPrice),
        taxCost: parseFloat(taxCost)
      };
    let storage = {
        items: []
    }

    //Extract count from craft resurce and add into storage.items
    data["craft-resource"].map((res,index) => {
        const itemCount = parseInt(res.Count)
        const itemCountId = `${res.ItemsName}`
        storage.items.push({itemName: itemCountId, itemCount})
        return {itemName: itemCountId, itemCount}
    })
    const itemsCount = storage.items;
    const calcItemNeed = refineCalculate(itemPerCraft, targetCraftQty, itemsCount, returnRate)
    //to extract the itemPrice and itemNeed and put it inside the storage.items , to then pass it into summaryData
    const resData = data["craft-resource"].map((res,index) => {
        const itemName = res.ItemsName
        // const itemPricId = 
        const itemPrice = parseInt(formData[`item${index + 1}price-form`])
        const itemNeed = parseInt(calcItemNeed[itemName])
        storage.items[index] = {[itemName] :{itemPrice, itemNeed}}
        return {...res, itemPrice, itemNeed}
    })
    const resultItems = Object.values(Object.assign({}, ...storage.items))
    return {
        data: {...data, "craft-resource": resData},
        formData: {...formData},
        summaryData: {items: resultItems, refineCost: parsedData.refineCost, taxCost: parsedData.taxCost, targetCraftQty: parsedData.targetCraftQty, sellPrice: parsedData.sellPrice}
    }
}