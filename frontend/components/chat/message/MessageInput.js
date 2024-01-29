"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

import Ably from "ably";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { setPaymentAmount } from "@/redux/slice/dataSlice";
import { togglePaymentModal } from "@/redux/slice/modalSlice";

const MessageInput = () => {
  const dispatch = useDispatch();

  const selectedContact = useSelector(
    (state) => state.contacts.selectedContact
  );
  const ably = useSelector((state) => state.contacts.ably);
  const currentUser = useSelector((state) => state.user.user);

  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current.scrollHeight < 224) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const sendPayment = async (e) => {
    e.preventDefault();

    if (!message) {
      toast.error("Message cannot be empty.");
      return;
    }

    dispatch(setPaymentAmount(message));
    dispatch(togglePaymentModal(true));
    setMessage("");
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!selectedContact) {
      toast.error("Please select a contact first.");
      return;
    }

    if (!message) {
      toast.error("Message cannot be empty.");
      return;
    }

    setDisabled(true);

    try {
      const realtime = new Ably.Realtime({
        token: ably.token,
      });

      realtime.connection.once("connected", () => {
        const channel = realtime.channels.get(`chatId-${selectedContact._id}`);

        channel.publish(
          "message",
          {
            content: message.trim(),
            createdAt: new Date().toISOString(),
            type: "text",
            sender: currentUser.pubKey,
          },
          (err) => {
            if (err) {
              console.error("Error publishing message:", err);
            } else {
              console.log("Message sent successfully");
            }
          }
        );
      });

      axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages`, {
        type: "text",
        sender: currentUser.pubKey,
        content: message.trim(),
        chat: selectedContact._id,
      });

      setMessage("");
      setDisabled(false);
    } catch (error) {
      toast.error("Error sending message.");
    }
  };

  return (
    <form className="w-full flex justify-between items-center pr-2 gap-2 bg-white">
      <textarea
        ref={textareaRef}
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disabled}
        rows={1}
        className="bg-transparent flex-1 pl-4 text-black focus:outline-none text-primary-white placeholder:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        style={{ resize: "none", overflow: "hidden" }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(e);
          }
        }}
      />

      {message && Number.isInteger(Number(message)) && (
        <button
          type="submit"
          className={`bg-black h-fit rounded-lg w-20 py-1.5 text-white uppercase font-semibold ${
            disabled ? "cursor-not-allowed" : "pl-2 pr-1"
          }`}
          onClick={(e) => sendPayment(e)}
        >
          Pay
        </button>
      )}

      <button
        type="submit"
        className={`bg-black h-fit rounded-lg ${
          disabled ? "p-1.5 cursor-not-allowed" : "py-1.5 pl-2 pr-1"
        }`}
        onClick={(e) => sendMessage(e)}
      >
        {disabled ? (
          <Loader2Icon className="h-5 w-5 text-white animate-spin" />
        ) : (
          <PaperAirplaneIcon className="h-5 w-5 text-white pr-0.5" />
        )}
      </button>
    </form>
  );
};

export default MessageInput;
