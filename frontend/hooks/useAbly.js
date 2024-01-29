"use client";

import Ably from "ably";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { addMessage, setAbly } from "@/redux/slice/contactsSlice";

export default function useAbly() {
  const dispatch = useDispatch();

  const ably = useSelector((state) => state.contacts.ablyAuth);
  const currentUser = useSelector((state) => state.user.user);
  const selectedContact = useSelector(
    (state) => state.contacts.selectedContact
  );

  const initializeAbly = async () => {
    try {
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

      const setAblyClient = async () => {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ably/auth/${currentUser.pubKey}`
        );

        dispatch(setAbly(response.data));
      };

      setAblyClient();
    } catch (error) {
      toast.error("Error initializing chat");
    }
  };

  const disconnectAbly = async () => {
    try {
      ably.close();
    } catch (error) {
      toast.error("Error disconnecting chat");
    }
  };

  const initializeChannel = async () => {
    try {
      ably.connection.once("connected", () => {
        const channel = ably.channels.get(`chatId-${selectedContact._id}`);

        channel.subscribe((message) => {
          dispatch(addMessage(message.data));
        });
      });
    } catch (error) {
      toast.error("Error initializing channel");
    }
  };

  const unsubscribeChannel = async () => {
    try {
      const channel = ably.channels.get(`chatId-${selectedContact._id}`);

      channel.unsubscribe();
    } catch (error) {
      toast.error("Error unsubscribing channel");
    }
  };

  const sendAblyMessage = async (message, type) => {
    try {
      ably.connection.once("connected", () => {
        const channel = ably.channels.get(`chatId-${selectedContact._id}`);

        channel.publish(
          "message",
          {
            content: message.trim(),
            createdAt: new Date().toISOString(),
            type: type,
            sender: currentUser.pubKey,
          },
          (err) => {
            if (err) {
              console.error("Error publishing message:", err);
            }
          }
        );
      });
    } catch (error) {
      toast.error("Error publishing message");
    }
  };

  return {
    initializeAbly,
    initializeChannel,
    unsubscribeChannel,
    disconnectAbly,
    sendAblyMessage,
  };
}
