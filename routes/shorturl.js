const express = require("express");
const validUrl = require("valid-url");
require('dotenv').config();
const Url = require("../mongomodel/url");

var shortUrlRoute = express.Router();

shortUrlRoute.post("/", async (req, res)=>{
    const zoomUrl = req.body.zoomUrl;
    const shortUrl = req.body.shortUrl;
    const baseUrl = process.env.baseUrl;
    
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json("Internal error. Please come back later.");
    }

    if(validUrl.isUri(zoomUrl)){

        try{
            var url = await Url.findOne({shortUrl : shortUrl});
            if(url){
                return  res.status(400).json("This name is already taken");
            }else{

                url  = new Url({
                    zoomUrl,
                    shortUrl,
                    clickCount: 0
                });
                
                await url.save()
                return res.status(201).json(url);
            }
        }catch(err){
            console.error(err.message);
            return res.status(500).json("Internal Server error " + err.message);
        }
    }else{
        res.status(400).json("Invalid URL. Please enter a vlaid url for shortening.");
    }    
});

module.exports = shortUrlRoute;