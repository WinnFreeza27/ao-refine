export default function convertData(data) {
    const joinedItem = {}
    const join = data.map((item) => {
        const sorted = sortedItems(item["craft-resource"])
        if(!joinedItem[item.ItemsName]) {
            joinedItem[item.ItemsName] = {...item, "craft-resource": sorted};
        } else {
            joinedItem[item.ItemsName]["craft-resource"].push(...sorted)
        }
    })
    const rawData = Object.values(joinedItem)
    const resourceConvert = craftResourceToObj(rawData)
    const sortResource = resourceConvert.map((item) => {
        const res = item["craft-resource"].sort((a,b) => {
            if(a[1] !== undefined && b[1] !== undefined) {
                // console.log(`${a[1].ItemsName} => ${b[1].ItemsName}`)
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
    return sorted
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
    console.log(data)
    const sorted = data.sort((a,b) => {
        return a.ItemsName > b.ItemsName
    })
    return sorted
}