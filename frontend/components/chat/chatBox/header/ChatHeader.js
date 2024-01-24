"use client";

import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const HeaderLoader = () => {
  return (
    <>
      <div className="w-11 h-11 rounded-full bg-black/40 skeleton"></div>

      <div className="flex flex-col justify-center">
        <h3 className="h-5 w-24 bg-black/40 skeleton mb-1"></h3>

        <p className="flex items-center gap-2 text-primary-white/60">
          Public Key:
          <p className="bg-black/40 h-4 w-48 skeleton"></p>
        </p>
      </div>
    </>
  );
};

const ChatHeader = () => {
  return (
    <div className="flex justify-between items-center w-full py-2 px-5 relative z-10 bg-white border-b border-gray-200">
      <div className="flex gap-3">
        <div className="w-11 h-11 aspect-square rounded-full overflow-hidden">
          <Image src={"/next.svg"} width={44} height={44} alt="Profile" />
        </div>

        {/* <div
          className={`absolute top-0.5 right-1 border-primary-white border rounded-full w-1.5 h-1.5 ${
            status === "online" ? "bg-gradient-primary" : "bg-[#DF0000]"
          }`}
        ></div> */}

        <div className="flex flex-col justify-center">
          <h3 className="text-xl font-bold text-black">Hello</h3>

          {/* <p className="text-xs font-medium text-primary-white/60">
                {status ? 'Active' : 'Not Active'}
              </p> */}

          <div className="text-xs flex items-center">
            <button
              className={`flex flex-start text-gray-600 text-[12px] hover:cursor-pointer`}
              onClick={() => {
                navigator.clipboard.writeText("Hello");

                toast.success("Copied to clipboard");
              }}
            >
              Click to Copy
              <DocumentDuplicateIcon className="w-3 h-3 mt-px ml-1 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* <ChatHeaderMenu /> */}
    </div>
  );
};

export default ChatHeader;
