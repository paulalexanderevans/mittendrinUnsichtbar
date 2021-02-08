const express = require("express");
const app = express();
let secrets;
if (process.env.sessionSecret) {
    secrets = process.env.sessionSecret;
} else secrets = require("./secrets").sessionSecret;
const cookieSession = require("cookie-session");
app.use(
    cookieSession({
        maxAge: 1000 * 60 * 60 * 24 * 14,
        keys: ["key1", "key2"],
        secret: secrets,
    })
);
const compression = require("compression");
const path = require("path");
const { hash, compare } = require("./bCrypt.js");
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        //if user is logged in redirect away from welcome
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/registration", (req, res) => {
    console.log("POST /registration fired");
    console.log("req: ", req);
    // hash(req.body.password)
    //     .then((hashedPW) => {
    //         db.register(
    //             req.body.first,
    //             req.body.last,
    //             req.body.email,
    //             hashedPW
    //         ).then((results) => {
    //             console.log("user_id: ", results.rows[0].id);
    //             req.session.user_id = results.rows[0].id;
    //             res.redirect("/profile");
    //         });
    //     })
    //     .catch((err) => {
    //         res.redirect("/login");
    //         console.log("err in hash: ", err);
    //     });
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("Netzung server listening...");
});
