"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";

import axios from "axios";
import Avatar from "boring-avatars";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import pubKeySlicer from "@/lib/pubKeySlicer";
import { setSelectedContact } from "@/redux/slice/contactsSlice";

const ContactsItem = ({ chat }) => {
  let flag = true;
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);

  const currentUser = useSelector((state) => state.user.user);

  const user =
    chat.users[0] === currentUser.pubKey ? chat.users[1] : chat.users[0];

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages/${chat._id}/latest-message`
        );

        setMessage(res.data);
      } catch (error) {
        toast.error("Error loading latest message.");
      }
    };

    // if (message) {
    //   flag = false;
    fetchMessage();
    // }
  }, []);

  const handleContactClick = () => {
    dispatch(setSelectedContact(chat));
  };

  return (
    <li
      className="flex justify-between items-center mx-2 py-1 px-4 hover:bg-gray-50 cursor-pointer rounded-lg"
      onClick={handleContactClick}
    >
      <div className="flex items-center my-2">
        <div className="w-10 h-10 bg-red-200 rounded-full mr-3 overflow-hidden">
          <Avatar
            size={40}
            name={user}
            variant="marble"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
        </div>

        <div>
          <h3 className="text-base font-bold text-black">
            {pubKeySlicer(user)}
          </h3>

          <div className="text-xs font-medium w-24 hide-scroll overflow-hidden whitespace-nowrap scroll-on-hover">
            {message?.content}
          </div>
        </div>
      </div>

      <ChevronRightIcon className="h-5 w-5 text-black" />
    </li>
  );
};

export default ContactsItem;
