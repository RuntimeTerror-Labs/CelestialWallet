const Message = require("../schemas/messageSchema");

const sendMessage = async (req, res) => {
  const { chat, content, type, sender } = req.body;
  // const currentUser = req.pubkey;

  if (!chat || !content) {
    return res.sendStatus(400).json({ error: "ChatId or message not sent" });
  }

  const newMessage = {
    type,
    sender,
    content,
    chat,
  };

  try {
    const message = await Message.create(newMessage);

    // message = await message.populate('sender');
    // message = await message.populate('chat');

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const fetchMessages = async (req, res) => {
  const { chatId } = req.params;

  if (!chatId) {
    return res
      .sendStatus(400)
      .json({ error: "Chat Id not exist to fetch message." });
  }

  try {
    const messages = await Message.find({ chat: chatId });

    if (!messages) {
      return res.sendStatus(400).json({ error: "Chat not found" });
    }

    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const fetchLatestMessage = async (req, res) => {
  try {
    const { chatId } = req.params;

    if (!chatId) {
      return res
        .sendStatus(400)
        .json({ error: "ChatId not sent with request" });
    }

    const latestMessage = await Message.findOne({ chat: chatId })
      .sort({ updatedAt: -1 })
      .limit(1);

    return res.status(200).json(latestMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteMessages = async (req, res) => {
  const { chatId } = req.params;

  if (!chatId) {
    return res.sendStatus(400).json({ error: "ChatId not sent with request" });
  }

  try {
    const messages = await Message.deleteMany({ chat: chatId });

    if (!messages) {
      console.log("Chat not found");
      return res.sendStatus(400);
    }

    res.status(200).json({ message: "Messages deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  sendMessage,
  fetchMessages,
  deleteMessages,
  fetchLatestMessage,
};
