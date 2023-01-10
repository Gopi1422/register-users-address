const express = require("express");
const passport = require("passport");

const { registerUser, logoutUser, loginUser } = require("../controller/user");
const {
  homeRoutes,
  registerRoutes,
  loginRoutes,
} = require("../service/render");
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middleware/authentication");

const route = express.Router();

route.get("/", checkAuthenticated, loginRoutes);
route.get("/users/register", checkAuthenticated, registerRoutes);
route.get("/users/home", checkNotAuthenticated, homeRoutes);

route.get("/users/logout", logoutUser);
route.post("/users/register", registerUser);
route.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/users/home",
    failureRedirect: "/",
    failureFlash: true,
  })
);

module.exports = route;
