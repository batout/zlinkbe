const express = require("express");
const connectDB = require("./config/db");
const shortUrlRoute = require("./routes/shorturl")
const getShortenUrlRoute = require("./routes/getshort")
const cors = require('cors')

const app = express();
connectDB();

app.use(express.json({}));
// app.use(cors);
const PORT = 8000;
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.listen(PORT, () => console.log("Server is listening on port " + PORT));


app.use("/",cors(),getShortenUrlRoute);
//post request to create zoomlink
app.use("/shorturl", shortUrlRoute);

