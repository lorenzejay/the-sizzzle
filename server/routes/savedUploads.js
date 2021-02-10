const router = require("express").Router();
const pool = require("../db.js");
const authorization = require("../middleware/authorization");

//all routes must be authorized

//save the post & if already saved unsave the post
//takes in the upload_id
//current user_id from req.user
router.post("/", authorization, async (req, res) => {
  try {
    const { upload_id } = req.body;
    const user_id = req.user;
    //check if post is already saved
    const check = await pool.query(
      "SELECT * FROM saved_uploads WHERE upload_post = $1 AND saved_by = $2",
      [upload_id, user_id]
    );
    if (check.rowCount !== 0) {
      //means user saved it already so we delete
      await pool.query("DELETE FROM saved_uploads WHERE upload_post = $1 AND saved_by = $2", [
        upload_id,
        user_id,
      ]);
      return res.send(false);
    }
    //we saved it if it
    const query = await pool.query(
      "INSERT INTO saved_uploads(saved_by,upload_post) VALUES ($1, $2)",
      [user_id, upload_id]
    );
    return res.send(true);
  } catch (error) {
    console.log(error);
  }
});

//check if loggedIn user already saved the post
//when the user initally gets on the page
router.get("/check/:upload_id", authorization, async (req, res) => {
  try {
    const user_id = req.user;
    const { upload_id } = req.params;
    //check
    const query = await pool.query(
      "SELECT * FROM saved_uploads WHERE upload_post = $1 AND saved_by = $2",
      [upload_id, user_id]
    );
    const result = query.rows;
    if (result.length > 0) {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (error) {
    console.log(error);
  }
});

//retrieve loggedIn user saved post
//user_id
//seelct all from saved_posts WHERE saved_by is user_id
router.get("/retrieve-saved-posts", authorization, async (req, res) => {
  try {
    const user_id = req.user;
    //get all posts from saved_by
    const query = await pool.query("SELECT * FROM saved_uploads WHERE saved_by = $1", [user_id]);
    const result = query.rows;

    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

//get amount of saved uploads
//check with upload_post
//how every many row counts is the amount of saved by number of upload_post
router.get("/count-amount-saved/:upload_post", async (req, res) => {
  try {
    const { upload_post } = req.params;
    const query = await pool.query("SELECT * FROM saved_uploads WHERE upload_post = $1", [
      upload_post,
    ]);
    res.json(query.rowCount);
  } catch (error) {
    console.log(error);
  }
});

//below can be done by getting uploads by id
//retrieve the one saved post
//select * from post where upload_id IN (select upload_id FROM saved_upload WHERE upload_id = upload_id)
// "SELECT * FROM uploads WHERE uploaded_by = $1 OR uploaded_by IN (SELECT user_to FROM followers WHERE user_from = $1) ORDER BY created_at DESC",
module.exports = router;
