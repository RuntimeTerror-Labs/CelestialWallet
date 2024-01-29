import Contacts from "./Contacts";
import AddContactsBtn from "./AddContactsBtn";
import ContactsSearch from "./ContactsSearch";

const ContactsBody = () => {
  return (
    <div className="w-3/12 h-[calc(100vh-16px)] py-4 bg-white border-r border-gray-200 rounded-xl drop-shadow-md">
      <div className="flex items-center justify-between w-full mb-3 px-4">
        <h2 className="text-2xl font-bold text-black">Contacts</h2>

        <AddContactsBtn />
      </div>

      <ContactsSearch />

      <div className="h-[calc(100vh-136px)] flex flex-col overflow-hidden relative">
        <div className="overflow-y-auto hide-scroll h-full">
          <Contacts />
        </div>
      </div>
    </div>
  );
};

export default ContactsBody;
