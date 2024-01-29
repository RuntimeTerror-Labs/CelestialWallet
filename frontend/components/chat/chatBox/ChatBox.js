import Chat from "./Chat";
import ChatHeader from "./header/ChatHeader";
import SendMessageContainer from "../message/SendMessageContainer";

const ChatBox = () => {
  return (
    <>
      <ChatHeader />

      <section className="h-full flex flex-col justify-between overflow-hidden relative chat-bg">
        <div className="overflow-y-auto hide-scroll px-3 py-4">
          <Chat />
        </div>

        <SendMessageContainer />
      </section>
    </>
  );
};

export default ChatBox;
