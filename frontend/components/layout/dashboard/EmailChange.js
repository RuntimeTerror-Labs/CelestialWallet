"use client";

import { handleDialog } from "@/redux/slice/changeEmailSlice";
import { AtSign } from "lucide-react";
import { useDispatch } from "react-redux";

export default function EmailChange() {
  const dispatch = useDispatch();

  return (
    <div
      className="border-[1px] border-green-500 hover:border-black h-full w-full hover:cursor-pointer bg-white transition duration-300 hover:bg-black rounded-3xl overflow-hidden group relative p-4"
      onClick={() => {
        dispatch(handleDialog());
      }}
    >
      <p className="text-5xl font-bold text-green-500/70 group-hover:text-white/70 transition duration-300">
        Change <br /> E-mail
      </p>

      <AtSign
        className="absolute -bottom-5 -right-3 text-green-500/20 group-hover:text-white/20 transition duration-300 group-hover:translate-x-4"
        size={125}
      />
    </div>
  );
}
