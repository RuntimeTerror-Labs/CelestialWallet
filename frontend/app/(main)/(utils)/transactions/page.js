"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";
import { ArrowLeftRight, BookX } from "lucide-react";

import Tx from "@/components/layout/dashboard/transactions/Tx";
import Image from "next/image";

const TransactionsPage = () => {
  const router = useRouter();
  const transactions = useSelector((state) => state.data.transactions);

  return (
    <div className="relative h-screen w-full">
      <Image
        src="/main/tsx-bg.jpg"
        width={500}
        height={500}
        alt=""
        className="absolute bottom-0 right-0"
      />

      <div className="h-full w-full rounded-3xl flex flex-col justify-between relative overflow-hidden max-w-3xl mx-auto">
        <div className="h-full py-4 flex flex-col w-full">
          <p className="text-5xl text-blue-500/70 font-bold">Transactions</p>

          <div className="w-4/5 min-w-96 mx-auto flex-grow overflow-y-auto hide-scroll my-5">
            {transactions &&
              transactions.length > 0 &&
              transactions.map((transaction, index) => {
                return <Tx tx={transaction} key={index} />;
              })}
          </div>

          <div className="w-4/5 min-w-96 mx-auto z-10">
            <Button
              className="rounded-2xl h-10 z-10 w-full bg-blue-500/80"
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>

        <ArrowLeftRight
          className="absolute -bottom-5 -right-3 text-blue-500/20"
          size={125}
        ></ArrowLeftRight>
      </div>
    </div>
  );
};

export default TransactionsPage;
