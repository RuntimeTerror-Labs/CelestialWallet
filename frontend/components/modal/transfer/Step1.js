"use client";

import { Urbanist } from "next/font/google";
import { AtSign, DollarSign, Info, Loader2 } from "lucide-react";
import { Input, Button } from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAmount, setStep } from "@/redux/slice/transferSlice";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function Step1() {
  const [input, setInput] = useState("");
  const balance = useSelector((state) => state.data.balance);
  const ethPrice = useSelector((state) => state.data.ethPrice);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    const decimalRegex = /^[0-9]*\.?[0-9]*$/;
    if (e.target.value.match(decimalRegex)) {
      setInput(e.target.value);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Input
        label="Enter Amount"
        size="lg"
        className={urbanist.className}
        icon={<DollarSign />}
        value={input}
        labelProps={{
          className: urbanist.className,
        }}
        onChange={(e) => {
          handleInput(e);
        }}
        style={{
          color:
            balance * ethPrice < input || Number(input) === 0 ? "red" : "black",
        }}
      />
      <div
        className={
          "mt-2 text-sm flex text-gray-600 hover:text-blue-500 hover:cursor-pointer " +
          urbanist.className
        }
        onClick={() => {
          setInput(balance * ethPrice);
        }}
      >
        Balance : $ {(balance * ethPrice).toFixed(2)}
      </div>

      <Button
        variant="gradient"
        fullWidth
        className={
          urbanist.className + " flex items-center mt-5 justify-center"
        }
        onClick={() => {
          dispatch(setStep(2));
          dispatch(setAmount(input / ethPrice));
        }}
        disabled={!input || balance * ethPrice < input || Number(input) === 0}
      >
        Next
      </Button>
    </div>
  );
}
