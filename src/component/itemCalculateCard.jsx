import formatNumber from "../utils/formatNumber"

export default function ItemCalculateCard({item, title, resData, targetItem}) {
    let itemPrice
    let itemNeed
    let itemTotalSpend
    if(!targetItem) {
        itemPrice = resData.itemPrice
        itemNeed =  resData.itemNeed
        itemTotalSpend = parseInt(itemPrice * itemNeed)
    } else {
        itemNeed = resData.targetQty
        itemPrice = resData["sellprice-form"]
        const tax = parseFloat(resData["taxcost-form"])
        const grossProfit = parseInt(itemPrice * itemNeed)
        itemTotalSpend = grossProfit - (grossProfit * tax) / 100;
    }
    return(
        <div className="flex flex-col bg-bg-greyish-transparent border md:items-center border-bd-grey rounded-lg sm:flex-row sm:border-none sm:bg-transparent md:gap-3">
                            <div className="rounded-t-lg inline-flex md:justify-center items-center sm:border sm:border-bd-grey sm:rounded-lg h-max m-1 md:m-0 md:bg-bg-greyish-transparent">
                                <img className="w-12 h-12 sm:w-36 sm:h-32 md:w-36 md:h-32" src={item.ItemsImageUrl}/>
                                <div className="sm:hidden">{item.ItemsLocalizedName}</div>
                            </div>
                            <div className="flex flex-col w-full p-2 pt-0 sm:pt-2">
                                <div className="flex items-center gap-1 md:gap-3">
                                    <div className="bg-bg-greyish-transparent border border-bd-grey rounded-t-lg p-2 w-32 lg:w-44">{title.text1}</div>
                                    <span>=</span>
                                    <div className="bg-bg-greyish-transparent border border-bd-grey rounded-t-lg p-2 grow">{formatNumber(itemNeed)}</div>
                                </div>
                                <div className="flex items-center gap-1 md:gap-3">
                                    <div className="bg-bg-greyish-transparent border border-bd-grey p-2 w-32 lg:w-44">{title.text2}</div>
                                    <span>=</span>
                                    <div className="bg-bg-greyish-transparent border border-bd-grey p-2 grow">{formatNumber(itemPrice)}</div>
                                </div>
                                <div className="flex items-center gap-1 md:gap-3">
                                    <div className="bg-bg-greyish-transparent border border-bd-grey p-2 rounded-b-lg w-32 lg:w-44">{title.text3}</div>
                                    <span>=</span>
                                    <div className="bg-bg-greyish-transparent border border-bd-grey p-2 rounded-b-lg grow">{formatNumber(itemTotalSpend)}</div>
                                </div>
                            </div>
                        </div>
    )
}