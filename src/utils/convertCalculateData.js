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
        storage.items.push({[`item${index + 1}`]: {itemCount}})
    })
    
    //Extract itemNeed (count) and put into array of object this data need to perform calcItemNeed function
    const itemsCount = storage.items.map((item, index) => {
        const itemNeed = item[`item${index + 1}`].itemCount
        const key = Object.keys(item)[0]
        return {itemName: key, itemNeed}
    })
    const calcItemNeed = refineCalculate(itemPerCraft, targetCraftQty, itemsCount, returnRate)
    //to extract the itemPrice and itemNeed and put it inside the storage.items , to then pass it into summaryData
    const resData = data["craft-resource"].map((res,index) => {
        const itemPrice = parseInt(formData[`item${index+1}price-form`])
        const itemNeed = parseInt(calcItemNeed[`item${index+1}`])
        storage.items[index] = {[`item${index + 1}`] :{...storage.items[index][`item${index + 1}`], itemPrice, itemNeed}}
        return {...res, itemPrice, itemNeed}
    })
    const resultItems = Object.values(Object.assign({}, ...storage.items))

    return {
        data: {...data, "craft-resource": resData},
        formData: {...formData},
        summaryData: {items: resultItems, refineCost: parsedData.refineCost, taxCost: parsedData.taxCost, targetCraftQty: parsedData.targetCraftQty, sellPrice: parsedData.sellPrice}
    }
}