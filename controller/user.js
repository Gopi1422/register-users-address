const { getUserAddAddress } = require("../helper/query");
const bcrypt = require("bcrypt");
const validateDetails = require("../helper/validation");

exports.registerUser = async (req, res) => {
  let { name, address, email, password, cpassword } = req.body;
  let errors = [];

  // form validation
  validateDetails(name, email, address, password, cpassword, errors);

  if (errors.length > 0) {
    res.render("register", { errors });
  } else {
    // form validation has passed
    let hashedPassword = await bcrypt.hash(password, 10);

    // Register the User and the address if not already registered
    await getUserAddAddress(
      name,
      email,
      password,
      hashedPassword,
      address,
      req,
      res
    );
  }
};

exports.logoutUser = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have logged out successfully");
    res.redirect("/");
  });
};
