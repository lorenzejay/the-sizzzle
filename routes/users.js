const router = require("express").Router();
const pool = require("../db.js");
const bycrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator.js");
const authorization = require("../middleware/authorization");
const { cloudinary } = require("../utils/cloudinary");
const cloudMedia = require("cloudinary").v2;

//401 - person is unauthenticated
//403 - for not authorized

//registering a user to the db
//POST to /users
router.post("/register", async (req, res) => {
  try {
    //we need username, firstname, lastname,email, and password
    const { username, first_name, last_name, email, password } = req.body;

    //check if user exists already then throw error
    const checker = await pool.query("SELECT * FROM users WHERE email = $1 OR username = $2", [
      email,
      username,
    ]);
    const isTaken = checker.rowCount;

    if (isTaken !== 0) {
      return res.status(401).json({
        success: false,
        message: "There is already an account associate with the email or username.",
      });
    }

    //bycrypt users password

    const saltRounds = 10;

    const salt = await bycrypt.genSalt(saltRounds);

    const bycryptPassword = await bycrypt.hash(password, salt);

    const noSpaceUsernameAndMakeLowerCase = await username.split(" ").join("").toLowerCase();

    const newUser = await pool.query(
      "INSERT INTO users(username, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [noSpaceUsernameAndMakeLowerCase, first_name, last_name, email, bycryptPassword]
    );

    //genrate jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);
    //this is what is returned when our call is successful
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error.message);
  }
});

//post route for logining in users
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //get the user details by checking the username
    const query = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    //if there are no users associated with the given username

    if (query.rows.length === 0) {
      return res.json({ success: false, message: "User Email or Password is incorrect" });
    } else {
      const savedHashPassword = query.rows[0].password;
      await bycrypt.compare(password, savedHashPassword, function (err, isMatch) {
        if (err) {
          throw err;
        } else if (!isMatch) {
          return res.json({ success: false, message: "User Email or Password is incorrect" });
        } else {
          //passwrods match so we should authenticate user
          const token = jwtGenerator(query.rows[0].user_id);

          return res.json({
            success: true,
            token,
          });
        }
      });
    }
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

//search bar for users
router.get("/search/:searchTerm", async (req, res) => {
  const { searchTerm } = req.params;

  const query = await pool.query("SELECT username, user_id from users WHERE username LIKE $1", [
    `${searchTerm}%`,
  ]);

  const result = query.rows;
  if (result.length === 0) {
    res.status(404).send("No users found");
  }
  res.json(result);
});

//post the user profile image / update
router.put("/profile-pic-upload/", authorization, async (req, res) => {
  try {
    const fileStr = req.body.data; //image uploaded
    const user_id = req.user;

    const uploadImageResponse = await cloudinary.uploader.upload(fileStr, {
      use_filename: true,
    });
    // console.log(uploadImageResponse);

    const query = await pool.query(
      "UPDATE users SET profilepic = $1 WHERE user_id = $2 RETURNING *",
      [uploadImageResponse.public_id, user_id]
    );
    const result = query.rows[0];
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to upload profile image" });
  }
});

//get the profile picture based on the profilepic which is the cloudinary public_id
router.get("/profile-pic/:public_id", async (req, res) => {
  try {
    const { public_id } = req.params;
    const imageDetails = await cloudMedia.api.resource(public_id);
    if (imageDetails.secure_url) {
      return res.json(imageDetails.secure_url);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json(error.message);
  }
});

//remove the user profile image by updating profilepic to empty and then deleting the file from cloudinary
router.put("/delete-profile-pic", authorization, async (req, res) => {
  try {
    const user_id = req.user;
    //user details
    const query = await pool.query("SELECT profilepic from users WHERE user_id = $1", [user_id]);
    const cloudinary_id = query.rows[0].profilepic;

    if (cloudinary_id) {
      await cloudinary.uploader.destroy(cloudinary_id);
      //update db to clear profilepic
      await pool.query("UPDATE users SET profilepic = '' WHERE user_id = $1 RETURNING * ", [
        user_id,
      ]);
      res.json({ message: "Profile Picture removed :(" });
    }
  } catch (error) {
    console.log(error);
  }

  //we should have the cloudinary id here
  //if there is an id we need to delete what was previously on cloudinary
  //delete from cloudinary
  //await cloudinary.uploader.destroy(cloudinary_id);
});

router.post("/loggedInUserDetails", authorization, async (req, res) => {
  try {
    const user_id = req.user;
    const query = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
    res.json(query.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

router.post("/verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
