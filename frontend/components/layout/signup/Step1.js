"use client";

import { Urbanist } from "next/font/google";
import { Input, Button } from "@material-tailwind/react";
import { Info } from "lucide-react";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function Step1() {
  return (
    <>
      <div className="flex flex-col w-full">
        <Input
          label="Email"
          size="lg"
          type="email"
          className={urbanist.className}
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
        className={urbanist.className + " mt-1"}
      >
        Sign Up
      </Button>
    </>
  );
}
