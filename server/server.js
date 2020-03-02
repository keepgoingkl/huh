const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys").mongoURI;
const expressGraphQL = require("express-graphql");
const models = require("./models");
const schema = require("./schema/schema");
const cors = require("cors");
const path = require("path");

const app = express();

if (!db) {
    throw new Error("This is a config keys.js error.")
}

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(cors());
app.use("/static", express.static(path.join(__dirname, "assets")));


app.use(
    "/graphql",
    expressGraphQL(req => {
        return {
            schema,
            context: {
                token: req.headers.authorization
            },
            graphiql: true
        };
    })
);

module.exports = app;