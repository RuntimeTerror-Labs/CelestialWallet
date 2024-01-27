const express = require("express");
const router = express.Router();

const {
  sendMessage,
  fetchMessages,
  deleteMessages,
} = require("../../controllers/messageController");

router.route("/:chatId").get(fetchMessages);
router.route("/").post(sendMessage);
router.route("/:chatId").delete(deleteMessages);

module.exports = router;
