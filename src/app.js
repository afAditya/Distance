const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getDistance = require("./utils/getDistance");

const app = express();
const port = process.env.PORT || 3000;

// define path
const pubDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//setup handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

//setup static directory
app.use(express.static(pubDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Distance",
    name: "Aditya singh",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Contact for help ",
    name: "Aditya singh",
  });
});

app.get("/distance", (req, res) => {
  if (!req.query.from || !req.query.to) {
    return res.send({
      error: "provide a address",
    });
  }
  getDistance(req.query.from, req.query.to, (error, body) => {
    if (error) {
      return res.send({ error });
    }
    res.send({
      body,
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Aditya Singh",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Aditya Singh",
    errorMessage: "page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
