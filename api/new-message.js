require("dotenv").config();
const axios = require("axios");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
    }

    try {
        const { message } = req.body;

        if (!message || !message.text || !message.chat || !message.chat.id) {
            return res.status(400).send("Invalid request");
        }

        if (!message.text.toLowerCase().includes("career")) {
            return res.end();
        }

        const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

        await axios.post(TELEGRAM_API_URL, {
            chat_id: message.chat.id,
            text: "apply!",
        });

        console.log("Message posted");
        res.status(200).send("ok");
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send("Error: " + err.message);
    }
};
