"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";
import { ArrowLeftRight, BookX, ChevronLeft } from "lucide-react";

import Tx from "@/components/layout/dashboard/transactions/Tx";
import Image from "next/image";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

const TransactionsPage = () => {
  const router = useRouter();
  const transactions = useSelector((state) => state.data.transactions);

  return (
    <div className="relative h-screen w-full bg-[#eeeeee]">
      <Image
        src="/main/tsx-bg.jpg"
        alt="Celestial"
        width={1500}
        height={1080}
        className="absolute -right-1/3 md:-bottom-1/2 -bottom-32 opacity-70 -z-0"
      />

      <div className="h-full w-full rounded-3xl flex flex-col justify-between p-2 relative overflow-hidden max-w-xl mx-auto">
        <div className="h-full py-4 flex flex-col w-full">
          <div className="bg-white rounded-3xl p-5 shadow-lg">
            <p className="text-5xl text-blue-500/70 font-bold">Transactions</p>
          </div>

          <div className="w-full min-w-96 mx-auto flex-grow overflow-y-auto hide-scroll my-3">
            {transactions &&
              transactions.length > 0 &&
              transactions.map((transaction, index) => {
                return <Tx tx={transaction} key={index} />;
              })}
          </div>

          <div className="w-full min-w-96 mx-auto z-10">
            <div
              className={
                "rounded-3xl p-4 h-20 z-10 w-full flex items-center bg-blue-500/80 relative overflow-hidden group hover:cursor-pointer hover:bg-black transition duration-300 " +
                urbanist.className
              }
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              <p className="text-white/80 font-bold text-3xl">
                Back to Dashboard
              </p>

              <ChevronLeft
                className="absolute -bottom-10 -right-3 text-white/20 group-hover:text-white/20 transition duration-300 group-hover:translate-x-4"
                size={135}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
