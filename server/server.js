const express = require("express");
const app = express();
const server = require("http").Server(app);
const csurf = require("csurf");
const db = require("./db");
const cryptoRandomString = require("crypto-random-string");
const { uploader } = require("./uploader.js");
const s3 = require("./s3");
const axios = require("axios");

const cities = require("./cityList");

const sendEmailFunc = require("./ses.js");
let secrets;
if (process.env.sessionSecret) {
    secrets = process.env.sessionSecret;
} else secrets = require("./secrets").sessionSecret;
const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    maxAge: 1000 * 60 * 60 * 24 * 14,
    keys: ["key1", "key2"],
    secret: secrets,
});

app.use(cookieSessionMiddleware);

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

const compression = require("compression");
const path = require("path");
const { hash, compare } = require("./bCrypt.js");
const { response } = require("express");
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/welcome", (req, res) => {
    console.log("req.session.userId: ", req.session.userId);
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.get("/findCity/:inputval", async (req, res) => {
    var matchResults = [];
    for (var i = 0; i < cities.length; i++) {
        if (cities[i].name.toLowerCase().indexOf(req.params.inputval) === 0) {
            matchResults.push(cities[i]);
            if (matchResults.length === 10) {
                break;
            }
        }
    }
    res.json(matchResults);
});

app.post("/search", async (req, res) => {
    console.log("app.get /search fired");
    console.log("req.body: ", req.body);
    const owmKey = "741eefb942314b1fd9cdbf7f597481a8";
    const lat = req.body.coord.lat;
    const lon = req.body.coord.lon;
    const part = "minutely,daily";
    console.log("lat: ", lat);
    console.log("lon: ", lon);
    console.log("part: ", part);
    console.log("owmKey: ", owmKey);
    try {
        const { data } = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${owmKey}`
        );
        // console.log("data.current: ", data.current);
        // console.log("data.hourly: ", data.hourly);

        console.log("data.alerts: ", data.alerts);
        var matchResults = [];
        for (var i = 1; i < data.hourly.length; i++) {
            if (
                req.body.start <= data.hourly[i].dt &&
                data.hourly[i].dt < req.body.end
            ) {
                matchResults.push(data.hourly[i]);
            }
        }
        console.log("matchResults: ", matchResults);
        let response = {};

        // middle response
        let matchResultsMiddle = Math.floor(matchResults.length / 2);
        response["weather"] = matchResults[matchResultsMiddle].weather;

        // average temp
        let tempSum = 0;
        for (let i = 0; i < matchResults.length; i++) {
            tempSum = matchResults[i].feels_like + tempSum;
        }
        let temp = Math.round(tempSum / matchResults.length - 273.15);
        console.log("average temp: ", temp);
        response["temp"] = temp;
        let tableTemp;
        if (temp < -5) {
            tableTemp = -5;
        } else if (temp > 25) {
            tableTemp = 30;
        } else {
            tableTemp = Math.ceil(temp / 5) * 5;
        }
        console.log("tableTemp: ", tableTemp);

        //max & min temp
        let tempArr = [];
        for (let i = 0; i < matchResults.length; i++) {
            tempArr.push(matchResults[i].feels_like);
        }
        let maxTemp = Math.round(Math.max(...tempArr) - 273.15);
        console.log("maxTemp: ", maxTemp);
        let minTemp = Math.round(Math.min(...tempArr) - 273.15);
        console.log("minTemp: ", minTemp);

        // average uvi
        let uviSum = 0;
        for (let i = 0; i < matchResults.length; i++) {
            uviSum = matchResults[i].uvi + uviSum;
        }
        let uviAverage = uviSum / matchResults.length;
        let uvi;
        if (uviAverage < 2) {
            uvi = "Clear glasses recommended";
        } else if (uviAverage < 5) {
            uvi = "Moderate levels of UV, sunglasses recommended";
        } else if (uviAverage >= 5) {
            uvi = "High levels of UV, sunscreen & sunglasses recommended";
        }
        response["uvi"] = uvi;
        // average wind_speed
        let wind_speedSum = 0;
        for (let i = 0; i < matchResults.length; i++) {
            wind_speedSum = matchResults[i].wind_speed + wind_speedSum;
        }
        let wind_speed = Math.round(
            (wind_speedSum / matchResults.length) * 3.6
        );
        console.log("average wind_speed: ", wind_speed);
        response["wind_speed"] = wind_speed;
        // average wind_deg
        let wind_degSum = 0;
        for (let i = 0; i < matchResults.length; i++) {
            wind_degSum = matchResults[i].wind_deg + wind_degSum;
        }
        let wind_deg = Math.round(wind_degSum / matchResults.length);
        response["wind_deg"] = wind_deg;
        // average pop
        let popSum = 0;
        for (let i = 0; i < matchResults.length; i++) {
            popSum = matchResults[i].pop + popSum;
        }
        let pop = popSum / matchResults.length;
        console.log("average pop: ", pop);
        let dry;
        if (pop > 0.4) {
            dry = false;
        } else {
            dry = true;
        }
        console.log("dry: ", dry);

        //db query data

        try {
            let result = await db.getData(tableTemp, dry, req.body.effort);
            response = Object.assign(response, result.rows[0]);
        } catch (err) {
            console.log("error in db.getData: ", err);
        }

        console.log("response: ", response);
        res.json({
            response,
        });
    } catch (err) {
        console.log("error in search: ", err);
        // res.json({
        //     error: true,
        //     errorMessage: "User not found.",
        // });
    }
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("Netzung server listening...");
});
