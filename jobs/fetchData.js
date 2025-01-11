const axios = require("axios");
const CryptoData = require("../models/CryptoData");
const { COINS, BASE_URL } = require("../modules/cryptocurrencies");

const fetchAndStoreData = async () => {
  try {
    for (const coin of COINS) {
      const { data } = await axios.get(BASE_URL, {
        params: {
          ids: coin.id,
          vs_currencies: "usd",
          include_market_cap: true,
          include_24hr_change: true,
        },
        headers: {
          "Content-Type": "application/json",
          "x-cg-demo-api-key":process.env.COINGECKO_API_KEY 
        },
      });

      const coinData = data[coin.id];
      const record = new CryptoData({
        coin: coin.id,
        price: coinData.usd,
        marketCap: coinData.usd_market_cap,
        change24h: coinData.usd_24h_change,
      });

      await record.save();
    }
    console.log("Data fetched and stored");
  } catch (err) {
    console.error("Error fetching data:", err.message);
  }
};

module.exports = fetchAndStoreData;
