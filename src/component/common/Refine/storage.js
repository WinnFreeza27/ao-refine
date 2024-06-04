export const formList = [
    {
        percentage: false,
        text: "Sell price",
        id:"sellprice-form",
        readOnly: false,
        required: "Can't be empty",
        tooltip: "The sell price of this crafted item (per 1)"
    },
    {
        percentage: true,
        text: "Tax cost",
        id:"taxcost-form",
        readOnly: false,
        required: "Can't be empty",
        tooltip: "The percentage of tax paid on the market for selling items. (e.g., 10 or 6.5)."
    },
    {
        percentage: false,
        text: "Refine cost",
        id:"refinecost-form",
        readOnly: false,
        required: "Can't be empty",
        tooltip: "The actual cost required to refine an item for each craft. (e.g., 100)."
    },
    {
        percentage:true,
        text: "Return rate",
        id:"returnrate-form",
        readOnly: false,
        required: "Can't be empty",
        tooltip: "The percentage of resources returned after crafting an item. (e.g., 36.7)."
    },
    {
        percentage: false,
        text: "Focus cost",
        id:"focuscost-form",
        readOnly: false,
        required: false,
        tooltip: "The actual cost in focus points needed for each craft. (e.g., 50)."
    },
    {
        percentage: false,
        text: "Total focus",
        id:"totalfocus-form",
        readOnly: true,
        tooltip: ""
    },
    
]

export const filterHeadList = [
    {
        type:"Categories",
        style:"w-28 sm:w-32 lg:w-36"
    },
    {
        type:"Tier",
        style:"w-16 sm:w-20"
    },
    {
        type:"EnchantmentLevel",
        style:"w-28 sm:w-32"
    }
]

export const serverUrlList = {
    EAST: "https://east.albion-online-data.com",
    WEST: "https://west.albion-online-data.com",
    EUROPE: "https://europe.albion-online-data.com"
}
