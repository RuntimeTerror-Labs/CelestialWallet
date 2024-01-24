"use client";

import React from "react";
import { useSelector } from "react-redux";

const MessageWithDate = ({ message, nextMessage, index }) => {
  const pushSign = "0xfjifjeldfslnflsend";

  const messageDate = new Date(Number(message.timestamp)).toLocaleDateString();
  const messageTime = new Date(Number(message.timestamp)).toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const nextMessageDate = nextMessage
    ? new Date(Number(nextMessage.timestamp)).toLocaleDateString()
    : null;

  const pubKey = "0xfjifjeldfslnflsend";

  return (
    <div>
      {index === 0 && (
        <div className="text-center text-xs font-medium text-gray-400 my-2 font-sans">
          {messageDate}
        </div>
      )}

      <div
        className={`flex ${
          pubKey === pushSign ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`text-sm text-primary-black px-4 py-2 rounded-3xl font-medium w-fit flex gap-1 ${
            pubKey === pushSign
              ? "bg-[#ffecec] rounded-tr-none"
              : "bg-gray-200 rounded-tl-none"
          }`}
        >
          {pubKey !== pushSign && (
            <MessageInfo message={message.messageContent} />
          )}

          <div>
            <p className="max-w-[260px] break-all">
              {message.messageContent.split("::")[1] || message.messageContent}
            </p>

            <div
              className={`text-xs text-gray-500 prevent-select ${
                pubKey === pushSign ? "text-right" : "text-left"
              }`}
            >
              {messageTime}
            </div>
          </div>
        </div>
      </div>

      {nextMessageDate && messageDate !== nextMessageDate && (
        <div className="text-center text-xs font-medium text-gray-400 my-2 font-sans">
          {nextMessageDate}
        </div>
      )}
    </div>
  );
};
export default MessageWithDate;
