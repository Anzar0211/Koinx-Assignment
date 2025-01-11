const express = require("express");
const {
    getStats,
    getDeviation,
    fetchLatestData,
} = require("../controllers/cryptoControllers");
const router = express.Router();

router.get("/stats", getStats);
router.get("/deviation", getDeviation);
router.post("/fetch-latest", fetchLatestData);

module.exports = router;
