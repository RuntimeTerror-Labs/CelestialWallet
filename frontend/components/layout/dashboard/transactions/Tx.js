"use client";
import {
  CelestialSavingManager,
  PasskeyUltraVerifier,
  RecoveryUltraVerifier,
} from "@/lib/abis/AddressManager";
import pubKeySlicer from "@/lib/pubKeySlicer";
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Check,
  Copy,
  PiggyBank,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function TxMini({ tx }) {
  const walletAddress = useSelector((state) => state.user.user.pubKey);
  const ethPrice = useSelector((state) => state.data.ethPrice);

  const [isClicked, setIsClicked] = useState(false);

  if (tx.to === null) return;
  if (tx.to.hash === PasskeyUltraVerifier) return;
  if (tx.to.hash === RecoveryUltraVerifier) return;
  return (
    <div className="flex w-full mt-4 rounded-3xl bg-white shadow-lg transition duration-300 border cursor-pointer prevent-select">
      <div className=" flex h-full w-full items-center justify-between p-5">
        <div className="flex gap-2 items-center">
          <div>
            {tx.to.hash !== CelestialSavingManager ? (
              tx.to.hash === walletAddress ? (
                <p
                  className="text-black/50 group hover:bg-black hover:border-black transition duration-300 text-sm font-bold border border-green-500/70 rounded-lg p-5"
                  onClick={() => {
                    window
                      .open(
                        `https://pegasus.lightlink.io/tx/${
                          tx.hash ? tx.hash : tx.transaction_hash
                        }`,
                        "_blank"
                      )
                      .focus();
                  }}
                >
                  <ArrowDownLeft
                    className="inline-block group-hover:text-white/70 transition duration-300  text-green-500/70"
                    size={28}
                  ></ArrowDownLeft>
                </p>
              ) : (
                <p
                  className="text-black/50 text-sm group hover:bg-black hover:border-black transition duration-300 font-bold border border-red-500/70 rounded-lg p-5"
                  onClick={() => {
                    window
                      .open(
                        `https://pegasus.lightlink.io/tx/${
                          tx.hash ? tx.hash : tx.transaction_hash
                        }`,
                        "_blank"
                      )
                      .focus();
                  }}
                >
                  <ArrowUpRight
                    className="inline-block group-hover:text-white/70 transition duration-300 text-red-500/70"
                    size={28}
                  ></ArrowUpRight>
                </p>
              )
            ) : (
              <p
                className="text-black/50 text-sm group hover:bg-black hover:border-black transition duration-300 font-bold border border-blue-500/70 rounded-lg p-5"
                onClick={() => {
                  window
                    .open(
                      `https://pegasus.lightlink.io/tx/${
                        tx.hash ? tx.hash : tx.transaction_hash
                      }`,
                      "_blank"
                    )
                    .focus();
                }}
              >
                <PiggyBank
                  className="inline-block group-hover:text-white/70 transition duration-300 text-blue-500/70"
                  size={28}
                ></PiggyBank>
              </p>
            )}
          </div>

          <div className="ml-1">
            <div className="flex gap-1 text-3xl">
              <p className="text-black/60 font-bold">
                {tx.to.hash === walletAddress ? "Received " : "Sent "}
              </p>

              <p className="text-black/60 font-bold">
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
                className={`text-black/50 text-lg font-bold ${
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
                <Copy className="w-3 h-3 mt-px ml-1 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div className="text-right">
          <p className="font-bold text-3xl text-black/60 mr-3">
            <span>{tx.to.hash === walletAddress ? "+" : "-"}</span> $
            {((tx.value / 10 ** 18) * ethPrice).toFixed(3)}
          </p>

          <p className="font-semibold text-base mr-3 text-black/40 uppercase">
            {new Date(tx.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
