//checks if the email provided
module.exports = function (req, res, next) {
  const { email, username, first_name, last_name, password } = req.body;

  function validateEmail(email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
  }

  if (req.path === "/register") {
    //check if we have everything submitted for registering
    if (![email, username, first_name, last_name, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validateEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validateEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  }
  next();
};
