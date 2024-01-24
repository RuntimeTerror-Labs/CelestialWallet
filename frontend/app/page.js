import ChatContainer from "@/components/chat/ChatContainer";
import ContactsBody from "@/components/chat/contacts/ContactsBody";

function ChatPage() {
  return (
    <div className="flex h-screen">
      <ContactsBody />
      <ChatContainer />
    </div>
  );
}

export default ChatPage;
