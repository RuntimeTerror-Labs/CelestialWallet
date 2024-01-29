const Chat = require("../schemas/contactSchema");
const Message = require("../schemas/messageSchema");

const accessChat = async (req, res) => {
  const { currentUser, userId, message } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "No user exist with this contact." });
  }

  if (!currentUser) {
    return res.status(400).json({ error: "User not authenticated." });
  }

  try {
    const existingChat = await Chat.findOne({
      $and: [
        { users: { $elemMatch: { $eq: currentUser } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    });

    if (existingChat) {
      const { _id, users } = existingChat;

      res.status(200).json({ _id, users });
    } else {
      const chatData = {
        users: [currentUser, userId],
      };

      const createdChat = await Chat.create(chatData);

      const { _id, users } = await Chat.findOne({
        _id: createdChat._id,
      }).select("_id users");

      if (message) {
        await Message.create({
          type: "text",
          sender: currentUser,
          content: message,
          chat: _id,
        });
      }

      res.status(200).json({ _id, users });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const fetchChats = async (req, res) => {
  const { pubKey } = req.params;

  if (!pubKey) {
    return res.status(400).json({ error: "User not authenticated." });
  }

  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: pubKey } },
    });

    res.status(200).json(chats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteChat = async (req, res) => {
  const { chatId } = req.params;

  if (!chatId) {
    return res.status(400).json({ error: "No chat exist with this contact." });
  }

  try {
    const chat = await Chat.findByIdAndDelete(chatId);

    if (!chat) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { accessChat, fetchChats, deleteChat };
