const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,

  pubKey: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = User = mongoose.model("User", userSchema);
