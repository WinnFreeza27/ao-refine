export const refineCalculate = (itemPerCraft, target, itemsNeed, returnRate) => {

    const percentage = returnRate / 100;
    const refinedItems = itemsNeed.map((item) => {
      const itemName = item.itemName;
      const itemNeed = parseInt(item.itemCount);
      const totalNeed = itemNeed * parseInt(target) / itemPerCraft
      const totalNeedWithRr = Math.round(totalNeed - (totalNeed * parseFloat(percentage)))
      return {[itemName]: totalNeedWithRr}
    })

    const result = Object.assign({}, ...refinedItems)
    
    return result
}