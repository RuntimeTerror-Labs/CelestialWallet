import ChatContainer from "@/components/chat/ChatContainer";
import ContactsBody from "@/components/chat/contacts/ContactsBody";
import CreateContact from "@/components/modal/CreateContact";

function ChatPage() {
  return (
    <>
      <CreateContact />

      <div className="flex h-screen">
        <ContactsBody />
        <ChatContainer />
      </div>
    </>
  );
}

export default ChatPage;
