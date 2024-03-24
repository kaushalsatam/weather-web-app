import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/get-weather", async (req, res) => {
    const location = req.body.location;
    try {
        const response = await axios.get(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}`,
            {
                headers: {
                    'X-RapidAPI-Key': 'a6ffe1718emsh4d92d1af41a38b7p13e698jsn1fee7fb14e94',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                }
            });
        // const data = JSON.stringify(response.data);
        // console.log(data);
        res.render("index.ejs", { content: response.data })
    } catch (error) {
        console.error(error.message);
        res.render("index.ejs", { error: "Sorry, Weather information is not available for this location.." });
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
})