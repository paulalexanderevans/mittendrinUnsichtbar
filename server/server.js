const express = require("express");
const app = express();
const csurf = require("csurf");
const db = require("./db");
const cryptoRandomString = require("crypto-random-string");
const { uploader } = require("./uploader.js");
const s3 = require("./s3");

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

app.get("/user", async (req, res) => {
    console.log("app.get /user fired");
    console.log("req.session.userId: ", req.session.userId);
    try {
        let result = await db.getUser(req.session.userId);
        res.json(result.rows[0]);
    } catch (err) {
        console.log("error in getUser: ", err);
        res.json({
            error: true,
            errorMessage: "User not found.",
        });
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
    try {
        const results = await db.getEmail(req.body.email);
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
                const emailResults = await sendEmailFunc.sendEmail(
                    results.rows[0].email,
                    results.rows[0].code,
                    "Reset your Netzung Password"
                );
                console.log("results from sendEmail: ", emailResults);
                if (emailResults.error) {
                    res.json(emailResults);
                } else {
                    res.json({
                        success: true,
                        error: false,
                        renderView: 2,
                    });
                }
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

app.post("/resetpassword/verify", async (req, res) => {
    console.log("app.post/resetpassword/verify fired");
    try {
        const codes = await db.getValidCodes();
        console.log("Netzung database, reset_codes table request successful");
        var j = 0;
        for (var i = 0; i < codes.rows.length; i++) {
            if (codes.rows[i].code === req.body.code) {
                console.log("it's a match!");
                console.log(codes.rows[i]);
                try {
                    console.log("try resetPassword");
                    const hashedPW = await hash(req.body.password);
                    const results = await db.resetPassword(
                        codes.rows[i].email,
                        hashedPW
                    );
                    console.log("resetPassword results.rows: ", results.rows);
                    req.session.userId = results.rows[0].id;
                    res.json({
                        success: true,
                        error: false,
                        renderView: 3,
                    });
                } catch (err) {
                    console.log("err in db.resetPassword: ", err);
                }
            } else {
                console.log("no match!");
                j++;
                console.log("j: ", j);
                if (j === codes.rows.length) {
                    res.json({
                        success: false,
                        error: true,
                        errorMessage: "Code invalid or expired",
                    });
                }
            }
        }
    } catch (err) {
        console.log("err in db.getValidCodes: ", err);
        res.json({
            success: false,
            error: true,
            errorMessage: "Code invalid or expired",
        });
    }
});

app.post("/bio", async (req, res) => {
    console.log("app.post /bio fired");
    console.log("bioText: ", req.body.bioText);
    console.log("req.session.userId: ", req.session.userId);
    db.updateBio(req.body.bioText, req.session.userId)
        .then((results) => {
            res.json(results.rows[0]);
        })
        .catch((err) => console.log("err in profile update: ", err));
});

app.post("/profilePic", uploader.single("file"), s3.upload, (req, res) => {
    console.log("app.post /profilePic fired");
    let fullURL =
        "https://radfarimagebucket.s3.amazonaws.com/" + req.file.filename;
    db.updateProfilePic(fullURL, req.session.userId)
        .then((results) => {
            res.json(results.rows[0]);
        })
        .catch((err) => console.log("err in profile update: ", err));
});

app.get("/loggedInUser", function (req, res) {
    console.log("get /loggedInUser fired");
    res.json(req.session.userId);
});

app.get("/userInfo/:userId", async (req, res) => {
    console.log("app.get /userInfo fired");
    console.log("req: ", req.params);
    try {
        let result = await db.getUser(req.params.userId);
        res.json(result.rows[0]);
    } catch (err) {
        console.log("error in getUser: ", err);
        res.json({
            error: true,
            errorMessage: "User not found.",
        });
    }
});

app.get("/recentlyJoined", async (req, res) => {
    console.log("app.get /recentlyJoined fired");
    try {
        let result = await db.getRecentlyJoined();
        res.json(result.rows);
    } catch (err) {
        console.log("error in getRecentlyJoined: ", err);
        res.json({
            error: true,
            errorMessage: "User not found.",
        });
    }
});

app.get("/findPeople/:inputval", async (req, res) => {
    console.log("app.get /findPeople fired");
    console.log("req: ", req.params.inputval);
    // if (req.params.inputval)
    try {
        let result = await db.findPeople(req.params.inputval);
        console.log("result.rows: ", result.rows);
        res.json(result.rows);
    } catch (err) {
        console.log("error in findPeople: ", err);
        res.json({
            error: true,
            errorMessage: "User not found.",
        });
    }
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
