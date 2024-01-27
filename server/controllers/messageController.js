const Message = require("../schemas/messageSchema");

const sendMessage = async (req, res) => {
  const { chatId, message, type, currentUser } = req.body;
  // const currentUser = req.pubkey;

  if (!chatId || !message) {
    console.log("ChatId or message not sent with request");
    return res.sendStatus(400);
  }

  const newMessage = {
    type,
    sender: currentUser,
    content: message,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    // message = await message.populate('sender');
    // message = await message.populate('chat');

    res.status(200).json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

const fetchMessages = async (req, res) => {
  const { chatId } = req.params;

  if (!chatId) {
    console.log("ChatId not sent with request");
    return res.sendStatus(400);
  }

  try {
    const messages = await Message.find({ chat: chatId });

    if (!messages) {
      console.log("Contact not found");
      return res.sendStatus(400);
    }

    res.status(200).json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

const fetchLatestMessage = async (req, res) => {
  try {
    const { chatId } = req.params;

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
    console.log("ChatId not sent with request");
    return res.sendStatus(400);
  }

  try {
    const messages = await Message.deleteMany({ chat: chatId });

    if (!messages) {
      console.log("Chat not found");
      return res.sendStatus(400);
    }

    res.status(200).json({ message: "Messages deleted successfully" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

module.exports = {
  sendMessage,
  fetchMessages,
  deleteMessages,
  fetchLatestMessage,
};
