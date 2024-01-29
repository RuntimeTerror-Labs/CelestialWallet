"use client";

import { Copy, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Info() {
  const username = useSelector((state) => state.user.user.username);
  const walletAddress = useSelector((state) => state.user.user.pubKey);
  const router = useRouter();

  return (
    <div className="flex flex-col h-full w-full p-4">
      <div
        className="group mt-2 hover:cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(username);
          toast.success("Copied to clipboard!");
        }}
      >
        <p className="text-4xl text-black font-bold text-black/70 group-hover:underline  transition duration-300">
          {username.split("@")[0].length < 9
            ? username.split("@")[0]
            : username.split("@")[0].slice(0, 6) + "..."}
        </p>

        <p className="text-2xl text-black font-bold flex items-center group-hover:underline text-black/40  transition duration-300">
          @celestial
          <Copy className="inline-block ml-2 text-black/40" size={15} />
        </p>
      </div>

      <p
        className="text-xl mb-4 mt-2 text-black font-bold flex items-center hover:underline hover:cursor-pointer text-black/70 group-hover:text-white/70 transition duration-300"
        onClick={() => {
          navigator.clipboard.writeText(walletAddress);
          toast.success("Copied to clipboard!");
        }}
      >
        {walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4)}{" "}
        <Copy className="inline-block ml-2 text-black/70" size={15} />
      </p>

      <div
        className="bg-black h-full w-full rounded-3xl hover:cursor-pointer p-4 group relative overflow-hidden"
        onClick={() => {
          router.push("/chats");
        }}
      >
        <p className="text-[2.75rem] font-bold text-white/70">Chats</p>
        <MessageCircle
          className="absolute -bottom-3 -right-7 text-white/30 group-hover:text-white/20 transition duration-300 group-hover:translate-x-4"
          size={115}
        />
      </div>
    </div>
  );
}
