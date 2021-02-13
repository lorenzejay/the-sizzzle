const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
//process.env.NODE_ENV

//middleware
app.use(cors()); //integrates backend and frontend ports
// app.use(express.json()); //gives us access to req.body

//for media uploads
app.use(express.json({ limit: "50mb" })); //lets us upload bigger images
app.use(express.urlencoded({ limit: "50mb", extended: true })); //allows to accept data from forms

//ROUTES//
//register and login route
app.use("/api/users", require("./routes/users"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/followers", require("./routes/followers"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/save-uploads", require("./routes/savedUploads"));
app.use("/api/like-uploads", require("./routes/likedUploads"));

if (process.env.NODE_ENV === "Production") {
  //serve our static content by getting the build folder from our client side
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("/", function (req, res) {
  res.send("Server Started");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
