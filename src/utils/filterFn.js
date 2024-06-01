export const filterFn =  (data, filterRules) => {
    const { Categories, Tier, EnchantmentLevel } = filterRules;
  const categoryData = data[Categories];

  const result = [];

  Object.values(categoryData).forEach(item => {
    if (item.Tier === Tier && item.EnchantmentLevel === EnchantmentLevel) {
      result.push(item);
    }

    item.Enchantments.forEach(enchantment => {
      if (enchantment.Tier === Tier && enchantment.EnchantmentLevel === EnchantmentLevel) {
        result.push(enchantment);
      }
    });
  });
  return result;
}