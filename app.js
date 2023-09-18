const express = require("express");
const contestant = require("./model/contestant");
const bodyParser = require("body-parser");

const app = express();
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const User = require("./model/user");
const PORT = process.env.PORT || 7000;
const adminRoute = require("./routes/admin");
const session = require("express-session");
const flash = require("connect-flash");
const MONGODB_URI =process.env.MONGODB_URI
const MongoDBStore = require("connect-mongodb-session")(session);
var store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "static")));
app.use(
  session({
    secret: "my secret",   
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      res.locals.username = user.email;
      console.log("user logged in is ", user);
      next();
    })
    .catch((err) => console.log("session not registered", err));
});
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  //res.locals.csrfToken=req.csrfToken();
  //  res.locals.service=req.service;
  next();
});
app.use(flash());
app.use(adminRoute);
app.get("/", async (req, res, next) => {
  try {
    const contestants = await contestant.find();
    res.render("index", {
      contestants: contestants,
      title: "All Contestants",
      path: "/contestants",
    });
  } catch (err) {
    console.log(err);
  }
});
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(PORT, () => {
      console.log("Server Running at Port ", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
