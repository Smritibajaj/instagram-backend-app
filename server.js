const app = require("express")();
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const { handleNotFound } = require("./middlewear/error");
const cors = require("cors");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.options("*", function (req, res) {
  res.sendStatus(200);
});

require("./routes/index")(app);
app.use("/", (req, res) => res.send("hello js"));
app.use(handleNotFound);

module.exports = app;
