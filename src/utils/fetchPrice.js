import axios from 'axios'


export const fetchPrice = async (items) => {
    try {
        const itemString = items.join(',');
        const url = `https://east.albion-online-data.com/api/v2/stats/history/${itemString}?time-scale=1`;
        const response = await axios.get(url);
        const price = takePrice(response.data);
        return price;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

function takePrice(dataPrice) {
    let temp = {}
    const priceList = dataPrice.map((price) => {
        if(price.location !== "Brecilien" && price.location !== "Caerleon") {
            const lastIndex = price.data.length - 1;
            const latestData = price.data[lastIndex]
            if(latestData !== undefined) {
                if(!temp[price["item_id"]]) {
                    temp[price["item_id"]] = [latestData]
                } else {
                    temp[price["item_id"]].push(latestData)
                }
            }
        }
    }).filter(latestData => latestData !== undefined)
    return getAveragePrice(temp)
}

function getAveragePrice(priceList) {
    let temp = {}

    for (const [priceLabel, priceData] of Object.entries(priceList)) {
        // Calculate the total sum of valid prices
        const total = priceData.reduce((acc, price) => acc + price["avg_price"], 0);

        // Calculate the average price
        const averagePrice = total / priceData.length;
        temp = {...temp, [priceLabel]: averagePrice}
    }
    return temp
}