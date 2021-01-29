const router = require("express").Router();
const pool = require("../db.js");
const authorization = require("../middleware/authorization");

router.post("/submit", async (req, res) => {
  try {
    const fileStr = req.body;
    console.log(fileStr);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
