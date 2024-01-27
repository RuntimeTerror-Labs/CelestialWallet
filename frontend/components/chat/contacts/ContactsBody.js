"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import Contacts from "./Contacts";
import AddContactsBtn from "./AddContactsBtn";

const ContactsBody = () => {
  return (
    <div className="w-3/12 h-screen py-4 bg-white border-r border-gray-200">
      <div className="flex items-center justify-between w-full mb-3 px-4">
        <h2 className="text-2xl font-bold text-black">Contacts</h2>

        <AddContactsBtn />
      </div>

      <div className="flex items-center rounded-lg bg-[#fffaf9] border border-gray-200 mb-3 mx-4">
        <div className="flex justify-center items-center px-3 py-2">
          <MagnifyingGlassIcon className="h-5 w-5 text-primary-white" />

          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-base ml-3 w-full text-primary-white"
          />
        </div>
      </div>

      <div className="h-[calc(100vh-116px)] flex flex-col overflow-hidden relative">
        <div className="overflow-y-auto hide-scroll h-full">
          <Contacts />
        </div>
      </div>
    </div>
  );
};

export default ContactsBody;
