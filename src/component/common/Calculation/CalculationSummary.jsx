import {formatNumber} from "../../../utils/formatNumber"
import {profitCalculate} from "../../../utils/profitCalculate"
import propTypes from "prop-types"

function CalculationSummary({summaryData}) {
    const {items, refineCost, taxCost, sellPrice, targetQty} = summaryData
    const result = profitCalculate(targetQty,items,sellPrice,taxCost, refineCost)
    return(
        <>
            <div className="flex gap-3 justify-evenly pr-2">
                <div className="flex flex-col p-2 bg-bg-greyish-transparent border border-bd-grey rounded-lg grow">
                    <span>Refine cost</span>
                    <div className="font-bold text-xl md:text-2xl text-bluenize">{formatNumber(result.totalRefine)}</div>
                </div>
                <div className="flex flex-col p-2 bg-bg-greyish-transparent border border-bd-grey rounded-lg grow">
                    <span>Tax cost</span>
                    <div className="font-bold text-xl md:text-2xl text-bluenize">{formatNumber(result.totalTax)}</div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:pr-2">
                <div className="flex flex-col p-2 mr-2 sm:m-0 bg-bg-greyish-transparent border border-bd-grey rounded-lg grow">
                <span>Total Spend</span>
                        <div className="font-bold text-xl md:text-2xl text-bluenize">{formatNumber(result.totalItemCost)}</div>
                </div>
                <div className="flex flex-col p-2 mr-2 sm:m-0 bg-bg-greyish-transparent border border-bd-grey rounded-lg grow">
                    <span>Net Profit</span>
                    <div className={`font-bold text-xl md:text-2xl ${result.totalCleanProfit > 0 ? "text-greenize" : "text-salmonize"}`}>{formatNumber(result.totalCleanProfit)}</div>
                </div>
            </div>
        </>
    )
}

CalculationSummary.propTypes = {
    summaryData: propTypes.object.isRequired
}

export default CalculationSummary