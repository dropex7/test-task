const fetch = require('node-fetch')
    //Загрузка данных с сервера
export const getDataFromBinance = async function(symbol) {
    const url = `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=500`
    return fetch(url)
        .then(response => response.json())
        .then((data) => {
            return data
        })
}

// console.log(getDataFromBinance('ETHBTC'))