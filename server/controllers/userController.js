const User = require("../schemas/userSchema");

const createUser = async (req, res) => {
  try {
    const { username, pubKey } = req.body;

    if (!username)
      return res.status(400).json({ error: "Username not sent with request" });

    if (!pubKey)
      return res.status(400).json({ error: "PubKey not sent with request" });

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = new User({
      username,
      pubKey,
    });

    await newUser.save();

    return res.status(201).json(newUser);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "User cannot be created. Check later." });
  }
};

const fetchUser = async (req, res) => {
  try {
    const { pubKey } = req.params;

    if (!pubKey) {
      return res.status(400).json({ error: "PubKey not sent with request" });
    }

    const user = await User.findOne({ pubKey });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createUser, fetchUser };
