const User = require("../schemas/userSchema");

// Create a new user
const createUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const { username, pubKey } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Create a new user instance
    const newUser = new User({
      username,
      pubKey,
    });

    // Save the user to the database
    await newUser.save();

    // Return the newly created user
    return res.status(201).json(newUser);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "User cannot be created. Check later." });
  }
};

module.exports = { createUser };
