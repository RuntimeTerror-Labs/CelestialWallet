"use client";
import { Urbanist } from "next/font/google";
import { Input, Button } from "@material-tailwind/react";
import { Info } from "lucide-react";
import { useDispatch } from "react-redux";
import { setStep } from "@/redux/slice/signupSlice";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function Step0() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex w-full">
        <Input
          label="Domain"
          size="lg"
          className={urbanist.className + " rounded-r-none"}
          labelProps={{
            className: "after:rounded-tr-none",
          }}
        />
        <Button
          ripple={false}
          variant="text"
          color="blue-gray"
          className={
            "flex items-center rounded-l-none border border-l-0 border-blue-gray-200 bg-blue-gray-500/10 normal-case px-3 text-sm py-0 " +
            urbanist.className
          }
        >
          @celestial
        </Button>
      </div>

      <div className="flex flex-col w-full">
        <Input
          label="Password"
          size="lg"
          type="password"
          className={urbanist.className}
        />
        <p className="mt-2 text-sm flex text-gray-500">
          <Info size={20} className="inline mr-1" />
          Use at least 8 characters, one uppercase, one lowercase and one
          number.
        </p>
      </div>
      <Button
        variant="gradient"
        fullWidth
        className={urbanist.className + " mt-1"}
        onClick={() => {
          dispatch(setStep(1));
        }}
      >
        Next
      </Button>
    </>
  );
}
