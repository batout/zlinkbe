const express = require("express");
require('dotenv').config();
const Url = require("../mongomodel/url");

var getShortenUrlRoute = express.Router();
getShortenUrlRoute.get('/:shortUrl', async (req, res) => {
    var shortUrl = req.params.shortUrl;
    var url = await Url.findOne({ shortUrl: shortUrl });

    try {
        if (url) {
            var clickCount = url.clickCount;
            // TO-DO activate this when activating paid planes
            // if(clickCount >= process.env.allowedClick){
            //     console.log("The click count for shortcode " + shortUrl + " has passed the limit of " + config.allowedClick);
            //     return res.status(400).json("The click count for shortcode " + shortUrl + " has passed the limit of " + config.allowedClick);
            // }
            // clickCount++;
            // await url.update({ clickCount });
            return res.status(200).json(url);
        } else {
            return res.status(400).json("This name is not linked to zoom link.");
        }
    }
    catch (err) {
        console.log(err);
        console.error("Error while retrieving long url for shortUrl " + shortUrl);
        return res.status(500).json("There is some internal error.");
    }
})

module.exports = getShortenUrlRoute;