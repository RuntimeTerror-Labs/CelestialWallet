import Chat from "./Chat";
import ChatHeader from "./header/ChatHeader";
import SendMessageContainer from "../message/SendMessageContainer";

const ChatBox = () => {
  return (
    <>
      <ChatHeader />

      <div className="overflow-y-auto hide-scroll px-3 py-4 rounded-xl shadow-xl flex-grow chat-bg">
        <Chat />
      </div>

      <SendMessageContainer />
    </>
  );
};

export default ChatBox;
