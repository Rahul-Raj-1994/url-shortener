const express = require("express");
const dotEnv = require("dotenv");
dotEnv.config();
const connectDB = require("./db/db");

const urlRoute = require("./routes/url");

connectDB();

const app = express();

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );
    res.redirect(entry.redirectURL);
});

const PORT = process.env.PORT;

app.listen(() => {
    console.log(`Server Up and runnnig on port ${PORT}`);
});