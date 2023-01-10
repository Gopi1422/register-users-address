const { pool } = require("../database/dbConfig");
const bcrypt = require("bcrypt");

// Register an address
const addAddress = async (id, address, req, res) => {
  pool.query(
    `INSERT INTO address (user_id, address) VALUES ($1, $2) RETURNING *`,
    [id, address],
    (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result.rows);
      req.flash(
        "success",
        "Your registration is done successfully, please log in."
      );
      res.redirect("/");
    }
  );
};

// Check if the user address is already registered
const checkAddressExists = async (user_id, address, req, res) => {
  pool.query(
    `SELECT * FROM address WHERE user_id=$1 AND address=$2`,
    [user_id, address],
    (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result.rows);
      if (result.rows.length > 0) {
        let errors = [];
        errors.push({
          message: "Address is already registered!!",
        });
        console.log(errors);
        return res.render("register", { errors: errors });
      } else {
        addAddress(user_id, address, req, res);
      }
    }
  );
};

// Get all the addresses of a user
const getUserAddress = async (req, res) => {
  pool.query(
    `SELECT * FROM address WHERE user_id=$1`,
    [req.user.id],
    (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result.rows);
      return res.render("dashboard", {
        user: req.user.name,
        addresses: result.rows,
      });
    }
  );
};

// Register a user
const addUserAndAddress = async (name, email, password, address, req, res) => {
  pool.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, password, email`,
    [name, email, password],
    (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result.rows);
      id = result.rows[0].id;
      addAddress(id, address, req, res);
    }
  );
};

// if user is not already registered, then register the user and the address
const getUserAddAddress = async (
  name,
  email,
  password,
  hashedPassword,
  address,
  req,
  res
) => {
  // Check if user is already registered
  pool.query(`SELECT * FROM users WHERE email=$1`, [email], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result.rows);
    if (result.rows.length > 0) {
      user = result.rows[0];

      // Check User Password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          throw err;
        }
        if (isMatch) {
          // Register the address if not already registered
          checkAddressExists(user.id, address, req, res);
        } else {
          // Password is incorrect
          let errors = [];
          errors.push({
            message: "Password is not correct!!",
          });
          console.log(errors);
          return res.render("register", { errors: errors });
        }
      });
    } else {
      // Register the user and address
      addUserAndAddress(name, email, hashedPassword, address, req, res);
    }
  });
};

module.exports = {
  addAddress,
  addUserAndAddress,
  getUserAddAddress,
  getUserAddress,
  checkAddressExists,
};
