require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const fetchAndStoreData = require("./jobs/fetchData");
const cryptoRoutes = require("./routes/crypto");
const cron = require("cron");

const app = express();
app.use(express.json());


connectDB();


app.use("/api", cryptoRoutes);


const job = new cron.CronJob("0 */2 * * *", fetchAndStoreData);
job.start();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
