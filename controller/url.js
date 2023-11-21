const shortid = require("shortid");
const URL = require("../models/url");

const generateNewShortUrl = async (req, res) => {
    const body = req.body;
    try {
        if (!body.url) return res.status(401).json({ error: "Please provide a url" });

        const shortId = shortid();
        await URL.create({
            shortId,
            redirectUrl: req.body,
            visitHistory: []
        });

        return res.status(201).json({ id: shortId });
    } catch (error) {
        console.log("error", error);
    }

};

module.exports = generateNewShortUrl;