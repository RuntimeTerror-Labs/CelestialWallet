const express = require("express");
const router = express.Router();

const {
  accessChat,
  fetchChats,
  deleteChat,
} = require("../../controllers/contactController");

router.route("/:pubKey").get(fetchChats);

router.route("/").post(accessChat);

router.route("/:chatId").delete(deleteChat);

module.exports = router;
