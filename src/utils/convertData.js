import { merge } from "lodash"

export const convertData = (data) => {
    const joinedItem = {}
    const join = data.map((item) => {
        let temp = {}
        
        const sorted = sortedItems(item["craft-resource"])
        const AmountCrafted = item.AmountCrafted
        const craftRes = sorted.map((sortedRes) => {
            return {...sortedRes, AmountCrafted}
        })
        
        if(!joinedItem[item.ItemsName]) {
            joinedItem[item.ItemsName] = {...item, "craft-resource": craftRes};
        } else {
            joinedItem[item.ItemsName]["craft-resource"].push(...craftRes)
        }
    })
    const rawData = Object.values(joinedItem)
    
    const resourceConvert = craftResourceToObj(rawData)
    
    const sortResource = resourceConvert.map((item) => {
        const res = item["craft-resource"].sort((a,b) => {
            if(a[1] !== undefined && b[1] !== undefined) {
                return a[1].ItemsName.localeCompare(b[1].ItemsName)
              
            }
        })
        return {
            ...item,
            "craft-resource" : res
        }
    })
    // console.log(sortResource)
    const sorted = sortedItems(sortResource)
    const mergedTier = Object.values(mergeTierAndEnchantment(sorted))
    const mergedCategories = mergeByCategories(mergedTier)

    return mergedCategories
}

//check if the tier is same , then merge and put it on the enchantments list
function mergeTierAndEnchantment(data) {
    let temp = {};
    
    data.map((item) => {
        const name = cleanItemName(item.ItemsName)
        if (!(temp[item.ItemsName]) && item.EnchantmentLevel == 0) {
            temp[item.ItemsName] = {...item};
            temp[item.ItemsName]["Enchantments"] = [];
        } else if (temp[name]?.Categories == item.Categories && 
                   temp[name]?.Tier == item.Tier && 
                   temp[name]?.EnchantmentLevel != item.EnchantmentLevel) {
            temp[name]["Enchantments"].push(item);
        }
    });
    return temp;
    
}

function cleanItemName(itemName) {
    // Use a regular expression to match and capture the desired part of the string
    const regex = /^(T\d+_[A-Z]+)_LEVEL\d+@\d+$/;
    const match = itemName.match(regex);
    
    // If there's a match, return the first capture group, otherwise return the original string
    if (match) {
        return match[1];
    } else {
        return itemName;
    }
}

//this code are used to merge the item into object with categories as key
function mergeByCategories(data) {
    let temp = {}
    data.map((item) => {
        if(!temp[item.Categories]) {
            temp[item.Categories] = [item]
        } else {
            temp[item.Categories].push(item)
        }
    })
    return temp
}

//this code below are meaning to make the craft-resource into object with number as key using index
function craftResourceToObj(data) {
    const modifiedItems = data.map(item => {
        const craftingRequirements = [];
        item["craft-resource"].forEach((req, index) => {
            const groupIndex = Math.floor(index / 2); // Calculate the group index (0, 1, 2, ...) where to put
            if (!craftingRequirements[groupIndex]) {
                craftingRequirements[groupIndex] = [];
            }
            craftingRequirements[groupIndex].push({ ...req });
        });
    
        //returning the item , and new copy of craft-resource
        return {
            ...item,
            "craft-resource": craftingRequirements
        };
    });
    return modifiedItems
}

function sortedItems(data) {
    const sorted = data.sort((a, b) => a.ItemsName.localeCompare(b.ItemsName));
    return sorted;
}
