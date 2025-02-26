require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

app.post("/new-message", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || !message.text || !message.chat || !message.chat.id) {
            return res.status(400).send("Invalid request");
        }

        if (!message.text.toLowerCase().includes("career")) {
            return res.end();
        }

        await axios.post(TELEGRAM_API_URL, {
            chat_id: message.chat.id,
            text: "apply!",
        });

        console.log("Message posted");
        res.send("ok");
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send("Error: " + err.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Telegram app listening on port ${PORT}!`);
});
