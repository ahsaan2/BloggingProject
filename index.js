const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const port = 8000;
mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then((e) => console.log("MongoDb is Connected!"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({extended:false}))

app.get("/", (req, res) => {
  res.render("home");
});
app.use("/user", userRoute);
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
