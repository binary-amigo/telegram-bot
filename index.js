const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const axios = require("axios")

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.post("/new-message", (req, res) => {
    const {message} = req.body;

    if(!message || message.text.toLowerCase().indexOf("career") < 0){
        return res.end();
    }

    axios
        .post(
            "https://api.telegram.org/bot8052086424:AAET1uXu-31-oPMr_lFXtwE--G61mfQCLG4/sendMessage",
            {
                chat_id: message.chat.id,
                text: "apply!",
            }
        )
        .then((response) => {
            console.log("Message posted")
            res.end("ok")
        })
        .catch((err) => {
            console.log("Error :", err)
            res.end("Error :" + err)
        })
})

app.listen(3000, () => {
    console.log("telegram app listening on port 3000!")
})