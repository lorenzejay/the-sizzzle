const router = require("express").Router();
const pool = require("../db.js");

//get a users followers
router.get("/:username", async (req, res) => {
  try {
    //gettig this usernames followers
    const { username } = req.params;
    const query = await pool.query("SELECT * FROM followers WHERE user_to = $1", [username]);

    const followers = query.rows[0];
    const followerCount = query.rowCount;

    res.json({ followers, followerCount });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
