const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    zoomUrl: String,
    shortUrl: String,
    clickCount: Number
});

module.exports = mongoose.model("url", urlSchema);
