const express = require("express");
const connectDb = require("./database");
const urlRoutes = require("./api/urls/urls.routes");
const userRoutes = require("./api/users/users.routes");
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const passport = require("passport");
const morgan = require("morgan");
const { localStrategy } = require("./middlewares/passport");
require("dotenv").config();
const app = express();
app.use(express.json());
passport.use("local", localStrategy);

app.use(passport.initialize());

app.use("/urls", urlRoutes);
app.use("/", userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

connectDb();
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
