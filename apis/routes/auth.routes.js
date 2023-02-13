const express = require("express");
const passport = require("passport");
const { signup, signin } = require("../controllers/auth.controllers");

const router = express.Router();

router.post(
  "/signin",
  passport.initialize("local", { session: false }),
  signin
);
router.post("/signup", signup);

module.exports = router;
