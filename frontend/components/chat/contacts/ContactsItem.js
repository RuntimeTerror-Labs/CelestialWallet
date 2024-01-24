"use strict";

import { ChevronRightIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ContactsItem = ({ chat }) => {
  let flag = true;

  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessage = async () => {
      setMessage(null);
    };

    if (message) {
      flag = false;
      fetchMessage();
    }
  }, []);

  return (
    <>
      <li className="flex justify-between items-center mx-2 py-1 px-4 hover:bg-gray-50 cursor-pointer rounded-lg">
        <div className="flex items-center my-2">
          <div className="w-10 h-10 bg-red-200 rounded-full mr-3 overflow-hidden">
            <Image
              src={chat.profilePicture}
              alt="profile picture"
              width={40}
              height={40}
            />
          </div>

          <div>
            <h3 className="text-base font-bold text-black">PUBKEY</h3>

            <div className="text-xs font-medium w-24 hide-scroll overflow-hidden whitespace-nowrap scroll-on-hover">
              <p>{chat.message}</p>
            </div>
          </div>
        </div>

        <ChevronRightIcon className="h-5 w-5 text-black" />
      </li>
    </>
  );
};

export default ContactsItem;
