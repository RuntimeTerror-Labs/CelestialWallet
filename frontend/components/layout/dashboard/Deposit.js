"use client";

import { toggleDepositModal } from "@/redux/slice/modalSlice";
import { Button } from "@material-tailwind/react";
import { ArrowDownLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function Deposit() {
  const dispatch = useDispatch();

  return (
    <Button
      className={
        "p-0 bg-transparent h-full w-full rounded-3xl " + urbanist.className
      }
      onClick={() => dispatch(toggleDepositModal(true))}
    >
      <div className="border-[1px] border-indigo-500 hover:border-black h-full w-full hover:cursor-pointer bg-white transition duration-300 hover:bg-black rounded-3xl overflow-hidden group relative p-4">
        <p className="text-4xl font-bold text-indigo-500/70 group-hover:text-white/70 transition duration-300 capitalize text-left">
          Deposit
        </p>

        <ArrowDownLeft
          className="absolute -bottom-7 -right-3 text-indigo-500/20 group-hover:text-white/20 transition duration-300 group-hover:translate-x-4"
          size={135}
        />
      </div>
    </Button>
  );
}
