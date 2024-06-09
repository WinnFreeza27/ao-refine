export const findItemToFetch = (data, indexSelected) => {
    
    let items = new Set()
    if(data && data.ItemsName) {
        const targetName = data.ItemsName;
        items.add(targetName)
        const craftResource = data["refine-resource"]
        if(craftResource.length > 0) {
            craftResource[indexSelected].map((item) => {
                items.add(item.ItemsName)
            })
        }
    }
    return Array.from(items)
}