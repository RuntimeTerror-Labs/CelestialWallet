"use client";

import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

import toast from "react-hot-toast";
import Avatar from "boring-avatars";
import { useSelector } from "react-redux";

const ChatHeader = () => {
  const currentUser = useSelector((state) => state.user.user);
  const chat = useSelector((state) => state.contacts.selectedContact);
  const presence = useSelector((state) => state.contacts.selectedPresence);

  const user =
    chat?.users[0] === currentUser.pubKey ? chat?.users[1] : chat?.users[0];

  return (
    <div className="flex justify-between items-center w-full py-2 px-5 relative z-10 bg-white border-b rounded-xl shadow-xl border-gray-200">
      {chat ? (
        <div className="flex gap-3">
          <div className="w-11 h-11 relative">
            <Avatar
              size={44}
              name={user}
              variant="marble"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />

            <div
              className={`absolute top-0.5 right-0 border rounded-full w-3 h-3 ${
                presence === "enter" || presence === "present"
                  ? "bg-green-300 border-green-700"
                  : "bg-red-400 border-red-800"
              }`}
            ></div>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-bold text-black">{user}</h3>

            <div className="text-xs flex items-center">
              <button
                className={`flex flex-start text-gray-600 text-[12px] hover:cursor-pointer`}
                onClick={() => {
                  navigator.clipboard.writeText(user);

                  toast.success("Copied to clipboard");
                }}
              >
                Click to Copy
                <DocumentDuplicateIcon className="w-3 h-3 mt-px ml-1 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-3">
          <div className="w-11 h-11 aspect-square rounded-full overflow-hidden">
            <Avatar
              size={44}
              name={currentUser.pubKey}
              variant="bauhaus"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-bold text-black">
              {currentUser.username}
            </h3>
          </div>
        </div>
      )}

      {/* <ChatHeaderMenu /> */}
    </div>
  );
};

export default ChatHeader;
