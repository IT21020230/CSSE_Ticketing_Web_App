const express = require("express");
const router = express.Router();

const { getAllUsers } = require("../controllers/userController");

//Get all lessons
router.get("/", getAllUsers);

module.exports = router;
