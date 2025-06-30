const { Router } = require("express");
const User = require("../models/user");
const router = Router();
router.get("/signin", (req, res) => {
  return res.render("Signin");
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.post("/signin", async (req, res) => {
  const { fullName, email, password } = req.body;
  // while signing in, user will give us email and password
  // we need to find the user with the email, hash the password, and match both the passwords

  const user = await User.matchpassword(email, password);
  console.log("User", user);
  return res.redirect("/");
});
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});

module.exports = router;
