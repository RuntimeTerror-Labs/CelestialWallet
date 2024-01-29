const express = require("express");
const router = express.Router();

const {
  ablyAuth,
  disconnectAbly,
  createChannel,
} = require("../../controllers/ablyController");

router.route("/auth/:userId").get(ablyAuth);
router.route("/disconnect").get(disconnectAbly);
router.route("/create-channel/:chatId").get(createChannel);

module.exports = router;
