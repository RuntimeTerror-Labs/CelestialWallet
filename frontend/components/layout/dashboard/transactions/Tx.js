"use client";
import pubKeySlicer from "@/lib/pubKeySlicer";
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import { ArrowDownLeft, ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function TxMini({ tx }) {
  const walletAddress = useSelector((state) => state.user.user.pubKey);
  const ethPrice = useSelector((state) => state.data.ethPrice);

  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="flex w-full mt-4 rounded-xl bg-white border-blue-500/70 hover:shadow-lg transition duration-300 border cursor-pointer prevent-select">
      <div className=" flex h-full w-full items-center justify-between p-2">
        <div className="flex gap-2 items-center">
          <div>
            {tx.to.hash === walletAddress ? (
              <p className="text-black/50 text-sm font-bold border border-green-500/70 rounded-lg p-5">
                <ArrowDownLeft
                  className="inline-block text-green-500/70"
                  size={28}
                ></ArrowDownLeft>
              </p>
            ) : (
              <p className="text-black/50 text-sm font-bold border border-red-500/70 rounded-lg p-5">
                <ArrowUpRight
                  className="inline-block text-red-500/70"
                  size={28}
                ></ArrowUpRight>
              </p>
            )}
          </div>

          <div>
            <div className="flex gap-1 text-2xl">
              <p className="text-black/70 font-bold">
                {tx.to.hash === walletAddress ? "Received " : "Sent "}
              </p>

              <p className="text-black/70 font-bold">
                {tx.to.hash === walletAddress ? " From" : " To"}
              </p>
            </div>

            <button
              className={`flex items-center text-gray-600 hover:cursor-pointer`}
              onClick={() => {
                navigator.clipboard.writeText(
                  tx.to.hash === walletAddress ? tx.from.hash : tx.to.hash
                );

                toast.success("Copied to clipboard");

                setIsClicked(true);

                setTimeout(() => {
                  setIsClicked(false);
                }, 1000);
              }}
            >
              <p
                className={`text-black/50 text-base font-bold ${
                  isClicked && "text-green-300"
                }`}
              >
                {tx.to.hash === walletAddress
                  ? pubKeySlicer(tx.from.hash)
                  : pubKeySlicer(tx.to.hash)}
              </p>

              {isClicked ? (
                <CheckIcon className="w-4 h-4 mt-px ml-1 text-green-600" />
              ) : (
                <DocumentDuplicateIcon className="w-4 h-4 mt-px ml-1 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div className="text-right">
          <p className="font-bold text-2xl text-black/70 mr-3">
            <span>{tx.to.hash === walletAddress ? "+" : "-"}</span> $
            {((tx.value / 10 ** 18) * ethPrice).toFixed(3)}
          </p>

          <p className="font-semibold text-black/50">
            {new Date(tx.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
