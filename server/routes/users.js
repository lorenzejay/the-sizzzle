const router = require("express").Router();
const pool = require("../db.js");
const bycrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator.js");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
//401 - person is unauthenticated
//403 - for not authorized

//registering a user to the db
//POST to /users
router.post("/register", validInfo, async (req, res) => {
  try {
    //we need username, firstname, lastname,email, and password
    const { username, first_name, last_name, email, password } = req.body;

    //check if user exists already then throw error
    const isAlreadyRegistered = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR username = $2",
      [email, username]
    );

    if (isAlreadyRegistered.rows.length !== 0) {
      return res.status(401).json("There is already a user associated with this account.");
    }

    //bycrypt users password

    const saltRounds = 10;

    const salt = await bycrypt.genSalt(saltRounds);

    const bycryptPassword = await bycrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users(username, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, first_name, last_name, email, bycryptPassword]
    );

    const returnedUsername = newUser.rows[0].username;
    const returnedUserId = newUser.rows[0].user_id;

    //genrate jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);
    //this is what is returned when our call is successful
    res.json({ token, returnedUsername, returnedUserId });
  } catch (error) {
    console.log(error.message);
  }
});

//post route for logining in users
router.post("/login", validInfo, async (req, res) => {
  try {
    const { email, password } = req.body;
    //get the user details by checking the username
    const query = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const returnedUsername = query.rows[0].username;
    const returnedUserId = query.rows[0].user_id;
    //if there are no users associated with the given username
    if (query.rowCount === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }
    const savedHashPassword = query.rows[0].password;

    await bycrypt.compare(password, savedHashPassword, function (err, isMatch) {
      if (err) {
        throw err;
      } else if (!isMatch) {
        return res.status(401).json("Password or Email is incorrect.");
      } else {
        //passwrods match so we should authenticate user
        const token = jwtGenerator(query.rows[0].user_id);

        return res.json({ token, returnedUsername, returnedUserId });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
});

//GET
// get a user based on username passed in
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    //getting user based on username
    const query = await pool.query(
      "SELECT user_id, username, first_name, last_name, profilepic FROM USERS WHERE username = $1",
      [username]
    );

    if (query.rowCount === 0) {
      return res.status(404).json(false);
    }

    const user = query.rows[0];
    res.json({ user });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
