"use client";

import { Urbanist } from "next/font/google";
import { Input, Button } from "@material-tailwind/react";
import { Info, Loader2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSignup from "@/hooks/useSignup";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function Step1() {
  const [email, setEmail] = useState("");
  const isLoading = useSelector((state) => state.signup.isLoading);
  const { handleSignup } = useSignup();

  return (
    <>
      <div className="flex flex-col w-full">
        <Input
          label="Email"
          size="lg"
          type="email"
          className={urbanist.className}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="mt-2 text-sm flex text-gray-500">
          <Info size={20} className="inline mr-1" />
          We will send you a magic link, please make sure you have access to the
          email.
        </p>
      </div>
      <Button
        variant="gradient"
        fullWidth
        className={
          urbanist.className + " mt-1 flex items-center justify-center"
        }
        onClick={() => {
          handleSignup(email);
        }}
        disabled={isLoading || email.length < 3}
      >
        {isLoading ? (
          <div className="flex items-center">
            <Loader2 size={20} className="inline mr-1 animate-spin " />
          </div>
        ) : (
          "Sign up"
        )}
      </Button>
    </>
  );
}
