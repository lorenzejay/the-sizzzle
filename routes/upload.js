const router = require("express").Router();
const pool = require("../db.js");
const authorization = require("../middleware/authorization");
const { cloudinary } = require("../utils/cloudinary");
const cloudMedia = require("cloudinary").v2;

//submit post
//gets in title image ingredient list (array) and description (array)
router.post("/", authorization, async (req, res) => {
  try {
    const fileStr = req.body.data; //image uploaded
    const { title, ingredients, directions, difficulty, category } = req.body;
    const user_id = req.user;

    const uploadImageResponse = await cloudinary.uploader.upload(fileStr, {
      use_filename: true,
    });
    // console.log(uploadImageResponse);
    const query = await pool.query(
      "INSERT INTO uploads (uploaded_by, title, ingredients, directions, cloudinary_id, image_url, difficulty, category) VALUES ($1, $2 ,$3, $4, $5, $6, $7, $8) RETURNING *",
      [
        user_id,
        title,
        ingredients,
        directions,
        uploadImageResponse.public_id,
        uploadImageResponse.secure_url,
        difficulty,
        category,
      ]
    );
    const result = query.rows[0];
    //select username and profile pic from the user that just posted the imag

    res.status(201).json({
      data: {
        success: true,
        result,
      },
    });
    // console.log("success");
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Something went wrong" });
  }
});

//get 10 random posts if there is no followers
router.get("/random", async (req, res) => {
  try {
    const query = await pool.query("SELECT * FROM uploads ORDER BY RANDOM() limit 6");
    res.send(query.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get all users posts based on their user id
router.get("/get-user-post/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const query = await pool.query("SELECT * FROM uploads WHERE uploaded_by = $1", [user_id]);
    const result = query.rows;

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

//GET a specific post details
router.get("/get-upload-details/:upload_id", async (req, res) => {
  try {
    const { upload_id } = req.params;
    const query = await pool.query("SELECT * FROM uploads WHERE upload_id = $1", [upload_id]);
    const result = query.rows[0];
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

//get username and profile pic from users where user_id = uploaded_by in uploads where upload_id = upload_id
router.post("/upload-username-profilepic", async (req, res) => {
  try {
    const { uploaded_by } = req.body;
    const query = await pool.query(
      "SELECT user_id, username, profilepic from users WHERE user_id = $1",
      [uploaded_by]
    );
    const result = query.rows[0];
    const cloudinaryId = query.rows[0].profilepic;

    //use the cloudinary id to get the resource / picture
    const imageDetails = await cloudMedia.api.resource(cloudinaryId);
    const { username, user_id } = result;
    res.json({ username, user_id, imageUrl: imageDetails.secure_url });
  } catch (error) {
    console.log(error);
  }
});

//GET followings posts
router.get("/user-following-post", authorization, async (req, res) => {
  try {
    const user_id = req.user;

    //get the posts of the users following so we can fill the feed with this
    // SELECT * FROM `posts`
    // WHERE `username` = 'user1'
    // OR `username` IN (SELECT `follower` FROM `connection` WHERE `following`='user1' AND `status`=1)

    // const query = await pool.query(
    //   "SELECT * FROM uploads WHERE uploaded_by IN (SELECT user_to FROM followers WHERE user_from = $1)",
    //   [user_id]
    // );
    const query = await pool.query(
      "SELECT * FROM uploads WHERE uploaded_by = $1 OR uploaded_by IN (SELECT user_to FROM followers WHERE user_from = $1) ORDER BY created_at DESC",
      [user_id]
    );

    // console.log(user_id);
    res.json(query.rows);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/details/:upload_id", async (req, res) => {
  try {
    const { upload_id } = req.params;

    const query = await pool.query("SELECT * FROM uploads WHERE upload_id = $1", [upload_id]);
    const result = query.rows[0];
    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

//DELETE UPLOAD POST
//takes in user_id and upload_id
//delete only if user_id === uploaded_by
//delete upload from db
//delete image from cloudinary
router.delete("/delete-post/:upload_id", authorization, async (req, res) => {
  try {
    const user_id = req.user;
    const { upload_id } = req.params;
    //check if post id belongs to the user
    const check = await pool.query(
      "SELECT * FROM uploads WHERE upload_id = $1 AND uploaded_by = $2",
      [upload_id, user_id]
    );
    //should return 1
    const checkResult = check.rows;
    if (checkResult.length === 0) {
      return res.status(403).send("You are not authorized to delete this post.");
    }
    //grab clouinary id from the check
    const cloudinary_id = check.rows[0].cloudinary_id;

    //delete from cloudinary
    await cloudinary.uploader.destroy(cloudinary_id);

    //if it passes above check we can delete
    //make sure constraints towards saved posts are deleted
    const deleteUpload = await pool.query(
      "DELETE FROM uploads WHERE upload_id = $1 AND uploaded_by = $2",
      [upload_id, user_id]
    );

    res.send({ message: "Deleted Post", success: true });
  } catch (error) {
    console.log(error);
  }
});

//PUT EDIT POST
//takes in upload_id and user_uploaded by from params
//takes in title, ingredients, and directions from req.body
//confirm that there is a post that they will update
//if there is a post, use update query
router.put("/update/:upload_id", authorization, async (req, res) => {
  try {
    const { upload_id } = req.params;
    const user_id = req.user;
    //not updating images for simplicity reasons
    const { title, ingredients, directions, difficulty, category } = req.body;
    //check if post exists and if user owns it
    const check = await pool.query(
      "SELECT * FROM uploads WHERE upload_id = $1 AND uploaded_by = $2",
      [upload_id, user_id]
    );

    //should return 1
    const checkResult = check.rows;
    if (checkResult.length === 0) {
      return res.send("Naughty Naughty...");
    }

    const query = await pool.query(
      "UPDATE uploads SET title = $1, ingredients = $2, directions = $3, difficulty = $4, category = $5 WHERE uploaded_by = $6 AND upload_id = $7 RETURNING *",
      [title, ingredients, directions, difficulty, category, user_id, upload_id]
    );
    if (query.rows.length > 0) {
      return res.json({ success: true, message: "Post Updated Successfully" });
    } else {
      return res.json({ success: false, message: "Something went wrong with the update..." });
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
