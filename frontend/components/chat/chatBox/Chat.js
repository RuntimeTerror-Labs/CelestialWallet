"use client";

import Ably from "ably";
import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MessageWithDate from "../message/MessageWithDate";
import {
  addMessage,
  setAbly,
  setAblyAuth,
  setMessages,
  setPresence,
} from "@/redux/slice/contactsSlice";

const Chat = () => {
  const dispatch = useDispatch();

  const selectedContact = useSelector(
    (state) => state.contacts.selectedContact
  );
  const currentUser = useSelector((state) => state.user.user);
  const ablyAuth = useSelector((state) => state.contacts.ablyAuth);
  const messages = useSelector((state) => state.contacts.messages);
  // const messagesContainerRef = useRef(null);

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

    const userChannel = realtime.channels.get(`user`);
    userChannel.presence.enter();

    return () => {
      userChannel.presence.leave();
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

    // channel.presence.enter();

    // channel.presence.subscribe((presenceMsg) => {
    //   const user =
    //     selectedContact.users[0] === currentUser.pubKey
    //       ? selectedContact.users[1]
    //       : selectedContact.users[0];

    //   if (presenceMsg.clientId === user) {
    //     console.log(presenceMsg.action);
    //     dispatch(
    //       setPresence({
    //         user: presenceMsg.clientId,
    //         action: presenceMsg.action,
    //       })
    //     );
    //   }
    // });

    initializeChat();

    return () => {
      // channel.presence.leave();
      channel.unsubscribe();
    };
  }, [selectedContact]);

  // useEffect(() => {
  //   if (messagesContainerRef.current) {
  //     const { scrollHeight } = messagesContainerRef.current;
  //     messagesContainerRef.current.scrollTo(0, scrollHeight);
  //   }
  // }, [messageHistory]);

  return selectedContact ? (
    <div className={`mb-6 flex-1 relative`}>
      {loading ? (
        <div className="text-primary-white/60 z-10 w-fit mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M8.175 7.377l-3.042-5.27 1.732-1 3.045 5.273c-.635.238-1.222.573-1.735.997zm-.799.8l-5.27-3.042-1 1.732 5.274 3.045c.237-.635.572-1.223.996-1.735zm-1.376 3.823c0-.341.035-.673.09-.999h-6.09v1.999h6.09c-.055-.326-.09-.659-.09-1zm11.351-2.705l5.208-3.007-.333-.577-5.206 3.007c.121.185.23.379.331.577zm-5.351-3.295c.341 0 .673.035.999.09v-6.09h-1.999v6.09c.326-.055.659-.09 1-.09zm3.14.894l3.004-5.204-.288-.166-3 5.197.284.173zm1.685 8.662l5.234 3.022.666-1.154-5.229-3.019c-.181.41-.408.794-.671 1.151zm-10.444-1.467l-5.274 3.046 1 1.732 5.27-3.042c-.424-.513-.759-1.1-.996-1.736zm11.594-2.589l.025.5-.025.5h6.025v-1h-6.025zm-3.727 6.061l3.03 5.249 1.442-.833-3.031-5.25c-.437.34-.92.623-1.441.834zm-2.248.439c-.341 0-.674-.035-1-.09v6.09h1.999v-6.09c-.326.055-.658.09-.999.09zm-3.824-1.376l-3.042 5.27 1.732 1 3.045-5.274c-.635-.237-1.222-.572-1.735-.996z" />
          </svg>
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
    <div className="flex text-primary-white/60 py-2 px-20 bg-gray-900/70 w-fit mx-auto text-white rounded-lg mt-2 items-start">
      <p className="text-base font-bold text-center flex mx-auto">
        Select a contact to start messaging
      </p>
    </div>
  );
};

export default Chat;
