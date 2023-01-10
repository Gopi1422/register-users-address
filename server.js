const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");

const initializePassport = require("./middleware/passportConfig");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

// Middleware
initializePassport(passport);

app.set("view engine", "ejs");

// Parses details from a form
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    // Key we want to keep secret which will encrypt all of our information
    secret: "secret",
    // Should we resave our session variables if nothing has changes which we dont
    resave: false,
    // Save empty value if there is no vakue which we do not want to do
    saveUninitialized: false,
  })
);
// Funtion inside passport which initializes passport
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
app.use(passport.session());
app.use(flash());

// load routes
app.use("/", require("./routes/router"));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
