const express = require("express");
const router = express.Router();
require("dotenv").config();
const ethers = require("ethers");
const utils = require("../../lib/utils");

router.post("/recovery/inputs", async (req, res) => {
  const { signature, message } = req.body;

  if (!signature || !message) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const pubKey_uncompressed = ethers.utils.recoverPublicKey(
    ethers.utils.hashMessage(ethers.utils.toUtf8Bytes(message)),
    signature
  );

  let pubKey = pubKey_uncompressed.slice(4);
  let pub_key_x = pubKey.substring(0, 64);
  let pub_key_y = pubKey.substring(64, 128);

  const signatureHex = await utils.getSignature(signature);
  const signatureArray = utils.getArray(signatureHex);
  const messageArray = ethers.utils.arrayify(
    ethers.utils.hashMessage(ethers.utils.toUtf8Bytes(message))
  );

  res.json({
    pub_key_x: pub_key_x,
    pub_key_y: pub_key_y,
    signature: Array.from(signatureArray),
    message: Array.from(messageArray),
  });
});

module.exports = router;
