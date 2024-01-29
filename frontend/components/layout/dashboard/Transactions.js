"use client";
import { ArrowLeftRight, BookX } from "lucide-react";
import { useSelector } from "react-redux";
import TxMini from "./transactions/TxMini";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

export default function Transactions() {
  const transactions = useSelector((state) => state.data.transactions);
  const router = useRouter();

  return (
    <div className="h-full w-full bg-white rounded-3xl flex flex-col justify-between p-4 relative overflow-hidden">
      <div className="h-full flex flex-col w-full">
        <p className="text-5xl text-blue-500/70 font-bold">Txs</p>
        {transactions &&
          transactions.length > 0 &&
          transactions.slice(0, 2).map((transaction, index) => {
            return <TxMini tx={transaction} key={index} />;
          })}
        {transactions && transactions.length === 0 && (
          <p className="text-black/50 text-md font-bold mb-7 h-full flex items-center justify-center">
            <BookX className="inline-block text-blue-500/50" size={100}></BookX>
          </p>
        )}
      </div>

      {transactions && transactions.length > 0 && (
        <div className="w-full z-10">
          <Button
            className="rounded-2xl z-10 w-full bg-blue-500/80"
            onClick={() => {
              router.push("/transactions");
            }}
          >
            View All
          </Button>
        </div>
      )}

      <ArrowLeftRight
        className="absolute -bottom-5 -right-3 text-blue-500/20"
        size={125}
      ></ArrowLeftRight>
    </div>
  );
}
