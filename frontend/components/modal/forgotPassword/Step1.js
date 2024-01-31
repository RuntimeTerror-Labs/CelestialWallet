"use client";

import { Urbanist } from "next/font/google";
import { AtSign, Info, Loader2 } from "lucide-react";
import { Input, Button } from "@material-tailwind/react";
import { useRef, useState, useEffect } from "react";
import useCelestial from "@/hooks/useCelestial";
import { useDispatch, useSelector } from "react-redux";
import { setDomain, setSteps } from "@/redux/slice/forgotPasswordSlice";
import useForgotPassword from "@/hooks/useForgotPassword";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function Step1() {
  const [email, setEmail] = useState("");
  const isLoading = useSelector((state) => state.forgotPassword.isLoading);
  const { verifyEmail } = useForgotPassword();

  return (
    <div className="">
      <div className="flex flex-col w-full">
        <Input
          label="Email"
          size="lg"
          className={urbanist.className}
          icon={<AtSign />}
          value={email}
          labelProps={{
            className: urbanist.className,
          }}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div
          className={"mt-2 text-sm flex text-gray-600 " + urbanist.className}
        >
          <Info size={20} className="inline mr-1" />
          We will send you a magic link, please make sure you have access to the
          email.
        </div>
      </div>

      <Button
        variant="gradient"
        fullWidth
        className={
          urbanist.className + " flex items-center mt-5 justify-center"
        }
        onClick={() => {
          verifyEmail(email);
        }}
        disabled={!email || isLoading}
      >
        {isLoading ? (
          <Loader2 size={20} className="inline mr-1 animate-spin" />
        ) : (
          "Verify"
        )}
      </Button>
    </div>
  );
}
