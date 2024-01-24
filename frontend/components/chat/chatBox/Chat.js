"use client";

import Image from "next/image";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MessageWithDate from "../message/MessageWithDate";

const Chat = () => {
  const dispatch = useDispatch();

  // const messagesContainerRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const messageHistory = [];

  // const initializeChat = async () => {
  //   try {
  //     const pastMessages = await pushSign.chat.history(
  //       currentContact.did.split(':')[1],
  //       {
  //         limit: 25,
  //       }
  //     );

  //     const filteredMessages = pastMessages.map(
  //       ({ fromDID, timestamp, messageContent, messageType }) => ({
  //         fromDID,
  //         timestamp,
  //         messageContent,
  //         messageType,
  //       })
  //     );

  //     dispatch(setMessages([...filteredMessages].reverse()));
  //     setLoading(false);
  //   } catch (err) {
  //     toast.error('Error fetching chat history');
  //   }
  // };

  // useEffect(() => {
  //   if (currentContact && pushSign) {
  //     setLoading(true);
  //     initializeChat();
  //   }
  // }, [currentContact, pushSign]);

  // useEffect(() => {
  //   if (messagesContainerRef.current) {
  //     const { scrollHeight } = messagesContainerRef.current;
  //     messagesContainerRef.current.scrollTo(0, scrollHeight);
  //   }
  // }, [messageHistory]);

  return (
    <div className="mb-6 flex-1 relative font-uni">
      {loading ? (
        <div className="text-primary-white/60 z-10 w-fit mx-auto">
          <Image
            src="/images/onboard/setup/loading.svg"
            alt="Loading spinner"
            width={32}
            height={32}
            className="animate-spin opacity-60"
          />
        </div>
      ) : messageHistory.length === 0 ? (
        <div className="flex text-primary-white/60 py-2 px-6 bg-gray-100 rounded-lg mt-2 items-start">
          <p className="text-sm text-center flex mx-auto">
            Don't Share any personal information. This is a demo app. Messages
            are not encrypted.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-1 z-10">
          {messageHistory.map((message, index, arr) => (
            <MessageWithDate
              key={index}
              index={index}
              message={message}
              nextMessage={arr[index + 1]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Chat;
