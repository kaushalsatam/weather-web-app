import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

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
                    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                    'X-RapidAPI-Host': process.env.RAPID_API_HOST
                }
            });
        res.render("index.ejs", { content: response.data })
    } catch (error) {
        console.error(error.message);
        res.render("index.ejs", { error: "Sorry, Weather information is not available for this location.." });
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
})