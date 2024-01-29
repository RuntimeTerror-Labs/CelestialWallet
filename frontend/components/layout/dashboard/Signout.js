"use client";
import { LogOut } from "lucide-react";

export default function Signout() {
  return (
    <div
      className="border-[1px] border-red-500 hover:border-black h-full w-full bg-white hover:bg-black transition duration-300 rounded-3xl flex p-4 relative overflow-hidden group hover:cursor-pointer"
      onClick={() => {
        window.location.href = "/";
      }}
    >
      <p className="text-5xl font-bold text-red-500/70 group-hover:text-white/70 transition duration-300">
        Sign <br /> Out
      </p>
      <LogOut
        className="absolute -bottom-5 -right-3 text-red-500/20 group-hover:text-white/20 transition duration-300 group-hover:translate-x-4"
        size={125}
      />
    </div>
  );
}
