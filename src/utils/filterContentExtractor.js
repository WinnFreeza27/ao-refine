export const filterContentExtract = (data, extractRules) => {
    let temp = {};
    for (const [key,value] of Object.entries(data)) {
        value.map((item) => {
            extractRules.map((keyRule) => {          
                const itemValue = item[keyRule];
                if(!temp[keyRule]) {
                    temp[keyRule] = [itemValue]
                } else if (!temp[keyRule].some(val => val == itemValue)) {
                        temp[keyRule].push(itemValue)
                }
            })
        })
    }

    return temp
}

export const getAvailableOptions = (data, currentFilter) => {
    const { Categories, Tier, EnchantmentLevel } = currentFilter;
    const availableOptions = {
      Categories: [],
      Tier: [],
      EnchantmentLevel: []
    };

    const currentCategoryData = data[Categories];
  
    // Check if the current category and tier have the current enchantment level
    const validCategory = Object.values(currentCategoryData).some(item => {
      return item.Tier === Tier && 
             (item.EnchantmentLevel === EnchantmentLevel || 
              item.Enchantments.some(enchantment => enchantment.EnchantmentLevel === EnchantmentLevel));
    });
  
    if (!validCategory) {
      return availableOptions;
    }
  
    // Find valid categories based on the current enchantment level
    availableOptions.Categories = Object.keys(data).filter(category => {
      return Object.values(data[category]).some(item => 
        item.Tier === Tier && 
        (item.EnchantmentLevel === EnchantmentLevel || 
         item.Enchantments.some(enchantment => enchantment.EnchantmentLevel === EnchantmentLevel))
      );
    });
  
    // Find valid tiers and enchantments for the current category
    Object.values(currentCategoryData).forEach(item => {

      if (item.EnchantmentLevel === EnchantmentLevel || 
          item.Enchantments.some(enchantment => enchantment.EnchantmentLevel === EnchantmentLevel)) {
        availableOptions.Tier.push(item.Tier);
      }
      if (item.Tier === Tier) {
        availableOptions.EnchantmentLevel.push(item.EnchantmentLevel);
        item.Enchantments.forEach(enchantment => {
          availableOptions.EnchantmentLevel.push(enchantment.EnchantmentLevel);
        });
      }
    });

    // Deduplicate tiers and enchantments
    availableOptions.Tier = [...new Set(availableOptions.Tier)];
    availableOptions.EnchantmentLevel = [...new Set(availableOptions.EnchantmentLevel)];
    
    return availableOptions;
  };