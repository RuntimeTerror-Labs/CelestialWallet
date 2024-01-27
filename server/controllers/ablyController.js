// const jwt = require('jsonwebtoken');
const Ably = require("ably");

require("dotenv").config();

const apiKey = process.env.ABLY_API_KEY;
const ably = new Ably.Realtime({
  key: apiKey,
  cipher: {
    key: process.env.ABLY_CIPHER_KEY,
    algorithm: "aes",
    keyLength: 256,
    mode: "cbc",
  },
});

const ablyAuth = (req, res) => {
  console.log("Successfully connected to the server auth endpoint");
  try {
    const { userId } = req.params;

    const tokenRequestData = {
      clientId: userId,
      capability: {
        "*": ["subscribe"],
      },
    };

    ably.auth.createTokenRequest(
      tokenRequestData,
      null,
      (err, tokenRequest) => {
        if (err) {
          console.error("Error generating Ably token request:", err);
          return res
            .status(500)
            .json({ error: "Error generating Ably token request" });
        }

        return res.status(200).json(tokenRequest);
      }
    );
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const disconnectAbly = (req, res) => {
  try {
    if (ably) {
      ably.close();

      return res.status(200).json({ message: "Disconnected from Ably" });
    } else {
      return res.status(400).json({ error: "Ably client not initialized" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const createChannel = async (req, res) => {
  try {
    const { userId, currentUser } = req.body;

    if (!userId || !currentUser) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const channelName = `${userId}-${currentUser}`;

    const channel = ably.channels.get(channelName);

    return res.status(200).json({ channel: channel.name });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { ablyAuth, disconnectAbly, createChannel };
