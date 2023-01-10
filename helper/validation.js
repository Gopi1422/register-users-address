const registrationValidation = (
  name,
  email,
  address,
  password,
  cpassword,
  errors
) => {
  if (!name || !email || !address || !password || !cpassword) {
    errors.push({ message: "Please enter all the field!" });
  }
  if (password.length < 6) {
    errors.push({ message: "Password should be at least 6 characters!" });
  }

  if (password !== cpassword) {
    errors.push({ message: "Passwords do not match!" });
  }
};

module.exports = registrationValidation;
