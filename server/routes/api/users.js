const express = require("express");
const router = express.Router();

const { createUser, fetchUser } = require("../../controllers/userController");

router.route("/:pubKey").get(fetchUser);

router.route("/").post(createUser);

module.exports = router;
