const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors()); //integrates backend and frontend ports
app.use(express.json()); //gives us access to req.body

//ROUTES//
//register and login route
app.use("/users", require("./routes/users"));
app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () => {
  console.log("Server is running on port 500");
});
