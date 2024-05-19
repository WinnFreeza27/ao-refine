export const profitCalculate = (targetQty, items, targetPrice, taxCost, refineCost) => {
    let storage = []
    items.map((item) => {
      const itemNeed = item.itemNeed
      const itemPrice = item.itemPrice
      const itemSpend = itemNeed * itemPrice
      
      storage.push({itemNeed, itemPrice, itemSpend})
    }
  )
  let totalItemCost = 0;
    storage.map((item) => {
      
      totalItemCost += item.itemSpend
    })
    
    const grossProfit = targetQty * targetPrice;
    const totalTax = (grossProfit * taxCost) / 100;
  
    const totalRefine = targetQty * refineCost
  
    const totalCleanProfit = grossProfit - totalTax - totalRefine - totalItemCost;
    return {totalCleanProfit, totalItemCost, totalRefine, totalTax}
  }
  