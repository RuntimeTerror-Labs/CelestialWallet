import ChatContainer from "@/components/chat/ChatContainer";
import CreateContact from "@/components/modal/CreateContact";
import ConfirmPayment from "@/components/modal/ConfirmPayment";
import ContactsBody from "@/components/chat/contacts/ContactsBody";

function ChatPage() {
  return (
    <>
      <CreateContact />
      <ConfirmPayment />

      <div className="flex h-screen gap-2 p-2">
        <ContactsBody />
        <ChatContainer />
      </div>
    </>
  );
}

export default ChatPage;
