const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Source",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    name: "Source",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Get help!!",
    mssg: "If u need help .... dont hesitate call us immediately",
    name: "Source",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  const address = req.query.address;

  geocode(address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    forecast(data.latitude, data.longitude, (error, forecastdata) => {
      if (error) {
        return res.send(error);
      }
      res.send({
        location: [data.latitude, data.longitude],
        forecast: forecastdata,
      });
      // console.log(chalk.green.inverse(data.location));
      // console.log(chalk.yellow(forecastdata));
    });
  });

  // res.send({
  //   address: req.query.address,
  // });
});

app.get("/produtcs", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("page404", {
    title: "Error 404",
    mssg: "Help article not found",
    name: "Source",
  });
});

app.get("*", (req, res) => {
  res.render("page404", {
    title: "Error 404",
    mssg: "Page not found",
    name: "Source",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
