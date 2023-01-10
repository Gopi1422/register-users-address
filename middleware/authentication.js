exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/home");
  }
  next();
};

exports.checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};
