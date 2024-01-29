import ChatBox from "./chatBox/ChatBox";

const ChatContainer = () => {
  return (
    <section className="flex-1 flex justify-between flex-col gap-2 h-full">
      <ChatBox />
    </section>
  );
};

export default ChatContainer;
