const express = require("express");
const app = express();
const csurf = require("csurf");
const db = require("./db");
const cryptoRandomString = require("crypto-random-string");

const { sendEmail } = require("./ses.js");
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

app.use(csurf());

app.use(function (req, res, next) {
    console.log("csrf");
    res.cookie("mytoken", req.csrfToken());
    next();
});

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
    hash(req.body.password)
        .then((hashedPW) => {
            db.register(req.body.first, req.body.last, req.body.email, hashedPW)
                .then((results) => {
                    console.log(
                        "Netzung database, users table update successful"
                    );
                    console.log("results.rows: ", results.rows[0]);
                    req.session.userId = results.rows[0].id;
                })
                .catch((err) => {
                    console.log("err in db.register: ", err);
                });
        })
        .catch((err) => {
            console.log("err in hash: ", err);
        });
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/login", (req, res) => {
    console.log("app.post /login route fired");
    db.getHashedPW(req.body.email)
        .then((results) => {
            const hashFromDatabase = results.rows[0].password;
            compare(req.body.password, hashFromDatabase).then((match) => {
                if (match) {
                    console.log("it's a match");
                    req.session.user_id = results.rows[0].id;
                    //redirect soemwhere & set a "logged-in" cookie with user id
                } else {
                    console.log("Incorrect password");
                    res.status("Incorrect password").json({
                        error: true,
                    });
                }
            });
        })
        .catch((err) => console.log("err in hash: ", err));

    // res.sendStatus(200);
});

app.post("/resetpassword/start", (req, res) => {
    // this runs when the user enters their password in ResetPassword
    console.log("app.post/resetpassword/start fired");
    //*verify that the email entered exists in users
    // - query
    //*if email exists:
    // - generate random code
    const secretCode = cryptoRandomString({
        length: 6,
    });
    console.log("secretCode: ", secretCode);
    // - store code
    //      -create new secret code table
    //      -store secret code in secret code table along with email
    // - send code to user using sendEmail function

    sendEmail(recipient, message, subject)
        .then((results) => {
            console.log("email sent");
        })
        .catch((err) => {
            console.log("err in sendEmail: ", err);
        });
});

app.post("/resetpassword/verify", (req, res) => {
    console.log("app.post/resetpassword/verify fired");
    // - verify the code that the user inputted is correct:
    //      - database query reset_codes and retreive code and email
    // db.getCode(req.body.first, req.body.last, req.body.email, hashedPW)
    //             .then((results) => {
    //                 console.log(
    //                     "Netzung database, users table update successful"
    //                 );
    //                 console.log("results.rows: ", results.rows[0]);
    //                 req.session.userId = results.rows[0].id;
    //             })
    //             .catch((err) => {
    //                 console.log("err in db.register: ", err);
    //             });
    // - if code is expired send failure message

    // - take new password, hash it and store it in users
});

app.listen(process.env.PORT || 3001, function () {
    console.log("Netzung server listening...");
});
