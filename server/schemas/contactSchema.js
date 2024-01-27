const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    users: [
      {
        type: String,
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = Chat = mongoose.model("Chat", ChatSchema);
