"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

import axios from "axios";
import toast from "react-hot-toast";
import { DollarSign, Loader2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";

import { setPaymentAmount } from "@/redux/slice/dataSlice";
import { togglePaymentModal } from "@/redux/slice/modalSlice";
import { Urbanist } from "next/font/google";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

const MessageInput = () => {
  const dispatch = useDispatch();

  const selectedContact = useSelector(
    (state) => state.contacts.selectedContact
  );
  const currentUser = useSelector((state) => state.user.user);
  const ably = useSelector((state) => state.contacts.ablyAuth);

  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const balance = useSelector((state) => state.data.balance);
  const ethPrice = useSelector((state) => state.data.ethPrice);

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
      const channel = ably.channels.get(`chatId-${selectedContact._id}`);

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
    <>
      {message &&
      !Number.isNaN(Number(message)) &&
      Number(message) < balance * ethPrice &&
      Number(message) > 0 ? (
        <DollarSign className="w-5 h-5" />
      ) : (
        <ChatBubbleLeftIcon className="w-5 h-5" />
      )}

      <form
        className={
          "w-full flex justify-between items-center pr-2 gap-2 bg-white " +
          urbanist.className
        }
      >
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

        {message &&
          !Number.isNaN(Number(message)) &&
          Number(message) < balance * ethPrice &&
          selectedContact &&
          Number(message) > 0 && (
            <Button
              type="submit"
              className={`bg-black w-20 h-10 flex items-center justify-center py-1.5 rounded-full text-white normal-case`}
              onClick={(e) => sendPayment(e)}
            >
              <DollarSign className="h-5 w-5" />
              Send
            </Button>
          )}

        <Button
          type="submit"
          className={`bg-black h-fit rounded-full px-3`}
          onClick={(e) => sendMessage(e)}
          disabled={disabled || selectedContact === null || message === ""}
        >
          {disabled ? (
            <Loader2Icon className="h-4 w-4 text-white animate-spin" />
          ) : (
            <PaperAirplaneIcon className="h-4 w-4 text-white pr-0.5" />
          )}
        </Button>
      </form>
    </>
  );
};

export default MessageInput;
