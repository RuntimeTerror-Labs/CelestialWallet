"use client";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useSelector } from "react-redux";

export default function TxMini({ tx }) {
  const walletAddress = useSelector((state) => state.user.user.pubKey);
  const ethPrice = useSelector((state) => state.data.ethPrice);

  return (
    <div className="flex w-full mt-2 rounded-2xl h-[70px] bg-white border-blue-500/70 hover:shadow-lg transition duration-300 border-[1px]">
      <div className=" flex h-full w-full items-center justify-between px-2">
        <p className="text-black/50 text-sm font-bold">
          {tx.to.hash === walletAddress ? (
            <ArrowDownLeft
              className="inline-block text-green-500/70 mr-2"
              size={45}
            ></ArrowDownLeft>
          ) : (
            <ArrowUpRight
              className="inline-block text-red-500/70 mr-2"
              size={45}
            ></ArrowUpRight>
          )}
        </p>
        <p className="font-bold text-3xl text-black/70 mr-3">
          ${((tx.value / 10 ** 18) * ethPrice).toFixed(0)}
        </p>
      </div>
    </div>
  );
}
