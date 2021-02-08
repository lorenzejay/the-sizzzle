const router = require("express").Router();
const pool = require("../db.js");
const authorization = require("../middleware/authorization");
const { cloudinary } = require("../utils/cloudinary");

//submit post
router.post("/", authorization, async (req, res) => {
  try {
    const fileStr = req.body.data; //image uploaded
    const { title, caption, description } = req.body;
    const user_id = req.user;

    const uploadImageResponse = await cloudinary.uploader.upload(fileStr, {
      use_filename: true,
    });
    // console.log(uploadImageResponse);
    const query = await pool.query(
      "INSERT INTO uploads (uploaded_by, title, captions, description, cloudinary_id, image_url) VALUES ($1, $2 ,$3, $4, $5, $6) RETURNING *",
      [
        user_id,
        title,
        caption,
        description,
        uploadImageResponse.public_id,
        uploadImageResponse.secure_url,
      ]
    );
    const result = query.rows[0];
    //select username and profile pic from the user that just posted the imag

    res.status(201).json({
      data: {
        message: "Image Uploaded Successfully",
        success: true,
        user_id: result.user_id,
        title: result.title,
        description: result.description,
        caption: result.description,
        cloudinary_id: result.cloudinary_id,
        image_url: result.image_url,
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

    res.json(result);
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

// //get the images from out list of images
// router.get("/post-image", async (req, res) => {
//   //get resources from recipegram folder
//   const { resources } = await cloudinary.search
//     .expression("folder: recipegram")
//     .sort_by("public_id", "desc")
//     .max_results(30)
//     .execute();
//   const publicIds = resources.map((file) => file.public_id);

//   res.send(publicIds);
// });

module.exports = router;
