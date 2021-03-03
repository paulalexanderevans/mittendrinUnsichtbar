DROP TABLE IF EXISTS advice;

CREATE TABLE advice(
id SERIAL PRIMARY KEY,
tableTemp INT,
dry BOOLEAN,
data json,
effort INT
);

SELECT * FROM advice