const router = require("express").Router();
const pool = require("../db.js");
const authorization = require("../middleware/authorization.js");
const bycrypt = require("bcrypt");

//dashboard gets us the user details so we can update the profile

//get user info
router.get("/", authorization, async (req, res) => {
  try {
    const user_id = req.user;

    const userInfo = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);

    res.json(userInfo.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//delete user
router.delete("/delete-user", authorization, async (req, res) => {
  try {
    const user_id = req.user;
    await pool.query("DELETE FROM users WHERE user_id = $1", [user_id]);
    res.json("User Deleted");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//update first,lastname and username
//PUT
//update names
//body contains first_name lname, username
//update users set firstname= firstname, ...  where user_id = user_id
router.put("/update-names", authorization, async (req, res) => {
  const user_id = req.user;
  const { first_name, last_name } = req.body;

  //remove changing username - causes alot of problems on the frontend

  await pool.query("UPDATE users SET first_name = $1, last_name = $2 WHERE user_id = $3", [
    first_name,
    last_name,
    user_id,
  ]);
  return res.json(true);
});

//update username
router.put("/update-username", authorization, async (req, res) => {
  //check if the username they want to change to is the same username
  try {
    const user_id = req.user;
    const { username } = req.body; //username they want to change to

    //check if there is a user with that username alreayd
    const userCheck = await pool.query("select * from users WHERE username = $1", [username]);
    if (userCheck.rowCount > 0) {
      return res.json("There is already a user with that username, please try another.");
    }

    const user = await pool.query("UPDATE users SET username = $1 WHERE user_id = $2 RETURNING *", [
      username,
      user_id,
    ]);
    res.json(user.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//update password
router.put("/update-password", authorization, async (req, res) => {
  try {
    const user_id = req.user;
    //new password
    const { password } = req.body;

    //hash the new pass

    const saltRounds = 10;

    const salt = await bycrypt.genSalt(saltRounds);

    const bycryptPassword = await bycrypt.hash(password, salt);

    //get original password from the user
    const passwordCheck = await pool.query("select password from users WHERE user_id = $1", [
      user_id,
    ]);

    const previousPassword = passwordCheck.rows[0].password;

    await bycrypt.compare(bycryptPassword, previousPassword, function (err, isMatch) {
      if (err) {
        throw err;
      } else if (!isMatch) {
        pool.query("UPDATE users SET password = $1 WHERE user_id = $2", [bycryptPassword, user_id]);
        return res.json("Password Updated");
      } else {
        return res.status(401).send("Please use a new password");
      }
    });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
