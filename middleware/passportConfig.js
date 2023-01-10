const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("../database/dbConfig");
const bcrypt = require("bcrypt");

function initialize(passport) {
  console.log("Initializing");
  const authenticateUser = (email, password, done) => {
    pool.query(`SELECT * FROM users WHERE email=$1`, [email], (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result.rows);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        console.log(password);
        console.log(user.password);

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            throw err;
          }
          if (isMatch) {
            return done(null, user);
          } else {
            // password is incorrect
            return done(null, false, { message: "Password is not correct!!" });
          }
        });
      } else {
        // No user exists
        return done(null, false, { message: "Email is not registered!!" });
      }
    });
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      authenticateUser
    )
  );

  // Stores user details inside session. serializeUser determines which data of the user
  // object should be stored in the session. The result of the serializeUser method is attached
  // to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
  // the user id as the key) req.session.passport.user = {id: 'xyz'}
  passport.serializeUser((user, done) => done(null, user.id));

  // In deserializeUser that key is matched with the in memory array / database or any data resource.
  // The fetched object is attached to the request object as req.user
  passport.deserializeUser((id, done) => {
    pool.query("SELECT * FROM users WHERE id=$1", [id], (err, result) => {
      if (err) {
        throw err;
      }
      console.log(`ID is ${result.rows[0].id}`);
      return done(null, result.rows[0]);
    });
  });
}

module.exports = initialize;
