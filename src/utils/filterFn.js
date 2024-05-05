export default function filterFn (data, filterRules) {
    const filtered = data.filter((item) => {
        
        for (let key in filterRules) {
            let value = filterRules[key].toUpperCase()
            if(key == "EnchantmentLevel" && value == 0) {
                value = null
            }
            if(value == "ALL") {
                //Skip the loop on this key and move to the next key
                continue;
            } else if(value != item[key]) {
                //Returning false if the condition are met.
                return false
            }
        }
        //Returning true if the condition false are not met.
        return true
    })
    return filtered
}