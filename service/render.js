const { getUserAddress } = require("../helper/query");
exports.homeRoutes = (req, res) => {
  getUserAddress(req, res);
};

exports.loginRoutes = (req, res) => res.render("index");

exports.registerRoutes = (req, res) => res.render("register");
