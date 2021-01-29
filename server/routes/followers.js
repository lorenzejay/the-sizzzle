const router = require("express").Router();
const pool = require("../db.js");
const authorization = require("../middleware/authorization");
//get a users followers
router.get("/:userId", async (req, res) => {
  try {
    //getting the followers associated with the userId
    const { userId } = req.params;
    const amountOfFollowers = await pool.query("SELECT * FROM followers WHERE user_to = $1", [
      userId,
    ]);
    const amountOfFollowing = await pool.query("SELECT * FROM followers WHERE user_from = $1", [
      userId,
    ]);
    //followers
    const followers = amountOfFollowers.rows[0];
    const followerCount = amountOfFollowers.rowCount;

    //following
    const following = amountOfFollowing.rows[0];
    const followingCount = amountOfFollowing.rowCount;

    res.json({ followers, followerCount, following, followingCount });
  } catch (error) {
    console.log(error.message);
  }
});

//authorized (logged in user) follows user with associated user_id
router.post("/follow/:userId", authorization, async (req, res) => {
  try {
    const userFrom = req.headers.logged_in_user_id;
    const { userId: userTo } = req.params;

    //check if the userFrom is already following userFrom
    const followCheck = await pool.query(
      "SELECT * FROM followers WHERE user_to = $1 AND user_from = $2",
      [userTo, userFrom]
    );

    //there is a follow already established
    if (followCheck.rowCount > 0) {
      const deleteFollow = await pool.query(
        "DELETE FROM followers WHERE user_to = $1 AND user_from = $2",
        [userTo, userFrom]
      );
      return res.json(false);
    }

    // //else they are not followed yet, so we insert
    const query = await pool.query(
      "INSERT INTO followers (user_to, user_from) VALUES ($1, $2) RETURNING *",
      [userTo, userFrom]
    );

    res.json(true);
  } catch (error) {
    console.log(error.message);
  }
});

//POST to check for a user
//check if user already follows other user
router.post("/check-if-following", authorization, async (req, res) => {
  try {
    //check if userFrom follows userTo already
    const { user_to } = req.body;

    //this will be passed from userInfo from userLogin state
    const user_from = req.headers.logged_in_user_id;

    const checkFollow = await pool.query(
      "SELECT * FROM followers WHERE user_to = $1 AND user_from = $2",
      [user_to, user_from]
    );
    if (checkFollow.rowCount === 0) {
      return res.json(false);
    }
    res.json(true);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
