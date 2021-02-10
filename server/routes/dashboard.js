const router = require("express").Router();
const pool = require("../db.js");
const authorization = require("../middleware/authorization.js");
const bycrypt = require("bcrypt");

//dashboard gets us the user details so we can update the profile

//get user info
// router.get("/", authorization, async (req, res) => {
//   try {
//     const user_id = req.user;

//     const userInfo = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);

//     res.json(userInfo.rows[0]);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json("Server Error");
//   }
// });

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
  try {
    const user_id = req.user;
    const { first_name, last_name, username } = req.body;

    const noSpaceUsernameAndMakeLowerCase = await username.split(" ").join("").toLowerCase();

    await pool.query(
      "UPDATE users SET first_name = $1, last_name = $2, username = $3 WHERE user_id = $4",
      [first_name, last_name, noSpaceUsernameAndMakeLowerCase, user_id]
    );

    return res.json(true);
  } catch (error) {
    console.log(error);
    res.status(404).json("An Error Occurred");
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
