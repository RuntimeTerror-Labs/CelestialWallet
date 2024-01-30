"use client";
import { Urbanist } from "next/font/google";
import { AtSign, Info, Loader2 } from "lucide-react";
import { Input, Button } from "@material-tailwind/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import useChangeEmail from "@/hooks/useChangeEmail";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function Step1() {
  const [newEmail, setNewEmail] = useState("");
  const { changeEmail } = useChangeEmail();
  const isLoading = useSelector((state) => state.changeEmail.isLoading);
  return (
    <div className="">
      <div className="flex flex-col w-full">
        <Input
          label="New Email"
          size="lg"
          className={urbanist.className}
          icon={<AtSign />}
          value={newEmail}
          labelProps={{
            className: urbanist.className,
          }}
          onChange={(e) => {
            setNewEmail(e.target.value);
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
          changeEmail(newEmail);
        }}
        disabled={!newEmail || isLoading}
      >
        {isLoading ? (
          <Loader2 size={20} className="inline mr-1 animate-spin" />
        ) : (
          "Change"
        )}
      </Button>
    </div>
  );
}
