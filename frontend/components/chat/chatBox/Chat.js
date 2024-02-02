"use client";

import Ably from "ably";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MessageWithDate from "../message/MessageWithDate";
import {
  addMessage,
  setAbly,
  setAblyAuth,
  setMessages,
} from "@/redux/slice/contactsSlice";
import { Loader2 } from "lucide-react";

const Chat = () => {
  const dispatch = useDispatch();

  const selectedContact = useSelector(
    (state) => state.contacts.selectedContact
  );
  const currentUser = useSelector((state) => state.user.user);
  const ablyAuth = useSelector((state) => state.contacts.ablyAuth);
  const messages = useSelector((state) => state.contacts.messages);

  const [loading, setLoading] = useState(false);

  const initializeChat = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages/${selectedContact._id}`
      );

      const filteredMessages = res.data.map(
        ({ content, createdAt, type, sender }) => ({
          content,
          createdAt,
          type,
          sender,
        })
      );

      dispatch(setMessages(filteredMessages));

      setLoading(false);
    } catch (err) {
      toast.error("Error fetching chat history");
    }
  };

  useEffect(() => {
    const authCallback = (tokenParams, callback) => {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ably/auth/${currentUser.pubKey}`
      )
        .then((response) => response.json())
        .then((tokenDetails) => {
          dispatch(setAbly(tokenDetails));
          callback(null, tokenDetails);
        })
        .catch((err) => {
          callback(err, null);
        });
    };

    const realtime = new Ably.Realtime({ authCallback });
    dispatch(setAblyAuth(realtime));

    const setAblyClient = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ably/auth/${currentUser.pubKey}`
      );

      dispatch(setAbly(response.data));
    };

    setAblyClient();

    const channel = realtime.channels.get(`chatId-${currentUser.pubKey}`);
    channel.presence.enter();

    return () => {
      channel.presence.leave();
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ably/disconnect`);
      dispatch(setAbly(null));
    };
  }, []);

  useEffect(() => {
    if (!selectedContact) return;

    setLoading(true);

    const channel = ablyAuth.channels.get(`chatId-${selectedContact._id}`);

    channel.subscribe((message) => {
      dispatch(addMessage(message.data));
    });

    initializeChat();

    return () => {
      channel.unsubscribe();
    };
  }, [selectedContact]);

  return selectedContact ? (
    <div
      className={`absolute flex-col-reverse flex w-full top-0 left-0 h-full overflow-y-auto hide-scroll px-3 py-4`}
    >
      {loading ? (
        <div className="text-primary-white/60 z-10 w-fit mx-auto">
          <div className="bg-white text-black/60 p-2 mb-4 rounded-full">
            <Loader2 className="animate-spin " size={40} />
          </div>
        </div>
      ) : messages?.length === 0 ? (
        <div className="flex text-primary-white/60 py-2 px-6 bg-gray-900 text-white rounded-lg mt-2 items-start">
          <p className="text-sm text-center flex mx-auto">
            Don't Share any personal information. This is a demo app. Messages
            are not encrypted.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-1 z-10">
          {messages?.map((message, index, arr) => (
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
  ) : (
    <div className="flex py-2 px-20 bg-white rounded-3xl shadow-lg w-fit relative mx-auto text-black/60  mt-2 items-start z-10">
      <p className="text-base font-semibold text-center flex mx-auto">
        Select a contact to start messaging
      </p>
    </div>
  );
};

export default Chat;
