"use client";

import { Urbanist } from "next/font/google";
import { AtSign, DollarSign, Info, Loader2, PiggyBank } from "lucide-react";
import { Input, Button } from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAmount, setStep } from "@/redux/slice/transferSlice";
import { evaluateTotalAmount } from "@/lib/SavingEvaluater";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function Step1() {
  const [input, setInput] = useState("");
  const balance = useSelector((state) => state.data.balance);
  const ethPrice = useSelector((state) => state.data.ethPrice);
  const dispatch = useDispatch();
  const savings = useSelector((state) => state.data.savings);

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
          "mt-2 text-sm flex text-gray-600 w-fit hover:text-blue-500 hover:cursor-pointer " +
          urbanist.className
        }
        onClick={() => {
          setInput(balance * ethPrice);
        }}
      >
        Balance : $
        <span className="font-bold ml-1">
          {" "}
          {(balance * ethPrice).toFixed(2)}
        </span>
      </div>

      {savings &&
        savings[2] !== 0 &&
        input &&
        balance * ethPrice >= input &&
        evaluateTotalAmount(input) - input > 0 &&
        evaluateTotalAmount(input) <= balance * ethPrice &&
        Number(input) !== 0 && (
          <div className="flex items-center text-sm text-blue-600/50 mt-1 -mb-2 ">
            <PiggyBank size={20} className="mr-2 animate-bounce" />
            <span className={urbanist.className + " font-medium"}>
              Sending
              <span className="font-bold">
                {" "}
                $ {(evaluateTotalAmount(input) - input).toFixed(2)}
              </span>{" "}
              to your savings account
            </span>
          </div>
        )}

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
