var spicedPg = require("spiced-pg");

var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/cyclingKit"
);

module.exports.insert = (tableTemp, dry, data, effort) => {
    const q = `
INSERT into advice (tableTemp , dry, data, effort) 
VALUES ($1, $2, $3, $4)`;
    const params = [tableTemp, dry, data, effort];

    return db.query(q, params);
};

module.exports.getData = (tableTemp, dry, effort) => {
    const q = `SELECT * FROM advice WHERE (tableTemp = $1 AND dry = $2 AND effort = $3)`;
    const params = [tableTemp, dry, effort];
    return db.query(q, params);
};
