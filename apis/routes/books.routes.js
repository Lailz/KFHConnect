const express = require("express");
const passport = require("passport");
const { getBooks, createBook } = require("../controllers/books.controllers");

const router = express.Router();

router.get("/", getBooks);

router.post("/", passport.authenticate("jwt", { session: false }), createBook);

module.exports = router;
