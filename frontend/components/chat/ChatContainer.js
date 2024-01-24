import ChatBox from "./chatBox/ChatBox";
import ChatHeader from "./chatBox/header/ChatHeader";

const ChatContainer = () => {
  return (
    <section className="flex-1 flex justify-between flex-col">
      <ChatBox />
    </section>
  );
};

export default ChatContainer;
