"use client";

import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

import React from "react";
import { useSelector } from "react-redux";

import pubKeySlicer from "@/lib/pubKeySlicer";

const MessageWithDate = ({ message, nextMessage, index }) => {
  const currentUser = useSelector((state) => state.user.user);
  const currentContact = useSelector((state) => state.contacts.selectedContact);

  const messageDate = new Date(message.createdAt).toLocaleDateString();
  const messageTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const nextMessageDate = nextMessage
    ? new Date(nextMessage.createdAt).toLocaleDateString()
    : null;

  return (
    <div>
      {index === 0 && (
        <div className="text-center text-xs text-gray-800 font-medium my-2 font-sans">
          {messageDate}
        </div>
      )}

      <div
        className={`flex ${
          currentUser.pubKey === message.sender
            ? "justify-end"
            : "justify-start"
        }`}
      >
        <div
          className={`${
            message.type === "text"
              ? "text-sm text-primary-black px-3 py-1 rounded-2xl font-medium w-fit flex gap-1"
              : "w-60 border-4 rounded-xl"
          } ${
            currentUser.pubKey === message.sender
              ? "bg-gray-900 rounded-tr-none text-white border-black"
              : "bg-white rounded-tl-none text-black border-white"
          }`}
        >
          <div
            className={`rounded-lg ${
              currentUser.pubKey === message.sender
                ? "rounded-tr-none"
                : "rounded-tl-none"
            } overflow-hidden`}
          >
            {message.type === "text" ? (
              <>
                <p className="max-w-[260px] break-all">{message.content}</p>

                <div
                  className={`text-xs text-gray-500 prevent-select ${
                    currentUser.pubKey === message.sender
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {messageTime}
                </div>
              </>
            ) : (
              <>
                <div
                  className={`flex py-5 text-3xl font-bold justify-center payment-bg ${
                    currentUser.pubKey === message.sender
                      ? "bg-gray-800 "
                      : "bg-white"
                  }`}
                >
                  <span className="prevent-select z-10">$</span>
                  <p className="z-10">{message.content}</p>
                </div>

                <div
                  className={`text-xs flex items-end justify-between prevent-select p-2 ${
                    currentUser.pubKey === message.sender
                      ? "text-right bg-gray-900 text-white"
                      : "text-left bg-gray-100 text-gray-500"
                  }`}
                >
                  <div className="flex gap-1 items-center">
                    <CurrencyDollarIcon
                      className={`w-5 h-5 inline-block ${
                        currentUser.pubKey === message.sender
                          ? "text-[#ff0000]"
                          : "text-[#40e868]"
                      }`}
                    />

                    <div className="text-left">
                      {currentUser.pubKey === message.sender ? (
                        <>
                          <p className="">
                            Sent to $
                            {currentContact.users[0] === currentUser.pubKey
                              ? pubKeySlicer(currentContact.users[1])
                              : pubKeySlicer(currentContact.users[0])}
                          </p>

                          <p className="font-bold">
                            <span>Saved: $</span>
                            11
                          </p>
                        </>
                      ) : (
                        <p>Sent to you</p>
                      )}
                    </div>
                  </div>

                  <p>{messageTime}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {nextMessageDate && messageDate !== nextMessageDate && (
        <div className="text-center text-xs font-medium text-gray-800 my-2 font-sans">
          {nextMessageDate}
        </div>
      )}
    </div>
  );
};
export default MessageWithDate;
