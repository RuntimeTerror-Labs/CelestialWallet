import Chat from "./Chat";
import ChatHeader from "./header/ChatHeader";
import SendMessageContainer from "../message/SendMessageContainer";
import Image from "next/image";

const ChatBox = () => {
  return (
    <>
      <ChatHeader />

      <div className="overflow-auto hide-scroll px-3 py-4 rounded-xl shadow-xl relative flex-grow bg-white/30">
        <Image
          src="/chat/chatbg.jpg"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="absolute top-0 left-0 z-0"
        />
        <Chat />
      </div>

      <SendMessageContainer />
    </>
  );
};

export default ChatBox;
