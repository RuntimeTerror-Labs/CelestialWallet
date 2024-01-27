const express = require("express");
const router = express.Router();

const { createUser } = require("../../controllers/userController");

router.route("/").post(createUser);

module.exports = router;
