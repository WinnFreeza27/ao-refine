import {formatNumber} from "../../../utils/formatNumber"
import propTypes from "prop-types"

 function ItemCalculateCard({item, title, resData, targetItem}) {
    let itemPrice
    let itemNeed
    let itemTotalSpend
    if(!targetItem) {
        itemPrice = resData.itemPrice
        itemNeed =  resData.itemNeed
        itemTotalSpend = Math.round(parseInt(itemPrice * itemNeed))
    } else {
        itemNeed = resData.targetCraftQty
        itemPrice = resData["sellprice-form"]
        const tax = parseFloat(resData["taxcost-form"])
        const grossProfit = parseInt(itemPrice * itemNeed)
        itemTotalSpend = Math.round(grossProfit - (grossProfit * tax) / 100);
    }
    return(
        <div className="flex flex-col grow bg-bg-greyish-transparent border md:items-center border-bd-grey rounded-lg sm:flex-row md:gap-3 pt-2 sm:pt-0 text-sm lg:text-base">
                            <div className="rounded-t-lg inline-flex sm:justify-center items-center border-b sm:border-b-transparent border-bd-grey sm:rounded-lg h-max md:bg-bg-greyish-transparent sm:self-center sm:mr-3 md:mr-0">
                                <img className="w-12 h-12 sm:w-24 sm:h-24 ml-2 aspect-square" src={item.ItemsImageUrl}/>
                                <div className="sm:hidden">{item.ItemsLocalizedName}</div>
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex items-center gap-1 md:gap-3">
                                    <div className="bg-bg-greyish-transparent border border-l-transparent border-t-transparent sm:border-l-bd-grey border-bd-grey p-2 w-36 lg:w-44">{title.text1}</div>
                                    <span>=</span>
                                    <div className="bg-bg-greyish-transparent border border-r-transparent border-t-transparent border-bd-grey p-2 grow">{formatNumber(itemNeed)}</div>
                                </div>
                                <div className="flex items-center gap-1 md:gap-3">
                                    <div className="bg-bg-greyish-transparent border-r sm:border-x border-bd-grey p-2 w-36 lg:w-44">{title.text2}</div>
                                    <span>=</span>
                                    <div className="bg-bg-greyish-transparent border-l border-bd-grey p-2 grow">{formatNumber(itemPrice)}</div>
                                </div>
                                <div className="flex items-center gap-1 md:gap-3">
                                    <div className="bg-bg-greyish-transparent border border-l-transparent border-b-transparent sm:border-l-bd-grey border-bd-grey p-2 rounded-bl-lg sm:rounded-bl-none w-36 lg:w-44">{title.text3}</div>
                                    <span>=</span>
                                    <div className="bg-bg-greyish-transparent border border-r-transparent border-b-transparent border-bd-grey p-2 rounded-br-lg grow overflow-auto">{formatNumber(itemTotalSpend)}</div>
                                </div>
                            </div>
                        </div>
    )
}

ItemCalculateCard.propTypes = {
    item: propTypes.object,
    title: propTypes.object,
    resData: propTypes.object,
    targetItem: propTypes.bool
}

export default ItemCalculateCard