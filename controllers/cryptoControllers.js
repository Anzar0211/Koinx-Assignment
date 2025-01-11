const CryptoData=require("../models/CryptoData");
const { COINS } = require("../modules/cryptocurrencies");
const { std } = require("mathjs");
const fetchAndStoreData=require("../jobs/fetchData");


const fetchLatestData = async (req, res) => {
    try {
        await fetchAndStoreData(); 
        res
        .status(200)
        .json({ message: "Latest data fetched and stored successfully." });
    } catch (err) {
        console.error("Error fetching data manually:", err.message);
        res.status(500).json({ error: "Failed to fetch the latest data." });
    }
};

const getStats = async (req, res) => {
    const { coin } = req.query;

    if (!coin) return res.status(400).json({ error: "Coin is required" });

    const coinExists = COINS.find((c) => c.id === coin);
    if (!coinExists) return res.status(400).json({ error: "Invalid coin ID" });

    const data = await CryptoData.findOne({ coin }).sort({ timestamp: -1 });
    if (!data) return res.status(404).json({ error: "No data found" });

    res.json({
        price: data.price,
        marketCap: data.marketCap,
        "24hChange": data.change24h,
    });
    };


    const getDeviation = async (req, res) => {
    const { coin } = req.query;

    if (!coin) return res.status(400).json({ error: "Coin is required" });

    const coinExists = COINS.find((c) => c.id === coin);
    if (!coinExists) return res.status(400).json({ error: "Invalid coin ID" });

    const records = await CryptoData.find({ coin })
        .sort({ timestamp: -1 })
        .limit(100);

    if (!records.length) return res.status(404).json({ error: "No data found" });

    const prices = records.map((record) => record.price);
    const deviation = std(prices).toFixed(2);

    res.json({ deviation });
};

module.exports = { getStats, getDeviation,fetchLatestData };