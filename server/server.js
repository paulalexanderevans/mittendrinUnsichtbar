const express = require("express");
const app = express();
const csurf = require("csurf");
const db = require("./db");
const cryptoRandomString = require("crypto-random-string");

const sendEmailFunc = require("./ses.js");
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
    console.log("req.session.userId: ", req.session.userId);
    if (req.session.userId) {
        //if user is logged in redirect away from welcome
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.get("/app", (req, res) => {
    console.log("req.session.userId: ", req.session.userId);
    if (!req.session.userId) {
        //if user is logged in redirect away from welcome
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

// app.post("/registration", (req, res) => {
//     console.log("POST /registration fired");
//     hash(req.body.password)
//         .then((hashedPW) => {
//             db.register(req.body.first, req.body.last, req.body.email, hashedPW)
//                 .then((results) => {
//                     console.log(
//                         "Netzung database, users table update successful"
//                     );
//                     console.log("results.rows: ", results.rows[0]);
//                     req.session.userId = results.rows[0].id;
//                 })
//                 .catch((err) => {
//                     console.log("err in db.register: ", err);
//                 });
//         })
//         .catch((err) => {
//             console.log("err in hash: ", err);
//         });
// });

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/registration", async (req, res) => {
    console.log("POST /registration fired");
    const { first, last, email, password } = req.body;
    try {
        const hashedPW = await hash(password);
        const results = await db.register(first, last, email, hashedPW);
        console.log("Netzung database, users table update successful");
        console.log("results.rows[0].id: ", results.rows[0].id);
        req.session.userId = results.rows[0].id;
        res.json({ success: true, error: false });
    } catch (err) {
        console.log("err in db.register:");
        if (
            err.message ===
            'duplicate key value violates unique constraint "users_email_key"'
        ) {
            //send back specific error message
            console.log("duplicate email address error");
            res.json({
                success: false,
                error: true,
                errorMessage:
                    "There is already an account associated with this email address, please log in or try again with a different email.",
            });
        }
    }
});

app.post("/login", (req, res) => {
    console.log("POST /login fired");
    db.getHashedPW(req.body.email)
        .then((results) => {
            const hashFromDatabase = results.rows[0].password;
            compare(req.body.password, hashFromDatabase).then((match) => {
                if (match) {
                    console.log("it's a match");
                    console.log("userId: ", results.rows[0].id);
                    req.session.userId = results.rows[0].id;
                    res.json({
                        success: true,
                        error: false,
                    });
                } else {
                    console.log("Incorrect password");
                    res.json({
                        success: false,
                        error: true,
                        errorMessage:
                            "Incorrect password, please try again or click the link below to reset your password.",
                    });
                }
            });
        })
        .catch((err) => {
            console.log("err in getHashedPW: ", err);
            res.json({
                success: false,
                error: true,
                errorMessage:
                    "There is no account associated with this email address, please try again or click below to register.",
            });
        });
});

app.post("/resetpassword/start", async (req, res) => {
    console.log("app.post/resetpassword/start fired");
    //*verify that the email entered exists in users
    // - query
    try {
        const results = await db.getEmail(req.body.email);
        // console.log("results.rows[0]: ", results.rows[0].email);
        //*if email exists:
        if (req.body.email === results.rows[0].email) {
            try {
                console.log("User has account");
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                console.log("secretCode: ", secretCode);
                console.log("req.body.email: ", req.body.email);
                const results = await db.storeReset_codes(
                    req.body.email,
                    secretCode
                );
                console.log(
                    "Netzung database, reset_codes table update successful"
                );
                console.log("results.rows[0]: ", results.rows[0]);
                // - send code to user using sendEmail function
                console.log("results.rows[0].email: ", results.rows[0].email);
                console.log("results.rows[0].email: ", results.rows[0].code);
                const emailResults = await sendEmailFunc.sendEmail(
                    results.rows[0].email,
                    results.rows[0].code,
                    "Reset your Netzung Password"
                );
                console.log("sendEmail fired");
                console.log("results from sendEmail: ", emailResults);
                // console.log("sendEmail response: ", res);
                //if messageRejected do something:
                //else send response
                res.json({
                    success: true,
                    error: false,
                    renderView: 2,
                });
            } catch (err) {
                console.log("err in db.sendEmail:");
            }
        } else {
            console.log("email not in database");
            res.json({
                success: false,
                error: true,
                errorMessage:
                    "There is no account associated with this email address, please try again or click below to register.",
            });
        }
    } catch (err) {
        console.log("err in db.getEmail:");
        res.json({
            success: false,
            error: true,
            errorMessage:
                "There is no account associated with this email address, please try again or click below to register.",
        });
    }
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
