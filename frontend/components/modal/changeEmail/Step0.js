"use client";
import { Urbanist } from "next/font/google";
import { AtSign, Info, Loader2 } from "lucide-react";
import { Input, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useCelestial from "@/hooks/useCelestial";
import { useSelector } from "react-redux";
import useChangeEmail from "@/hooks/useChangeEmail";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function Step0() {
  const [currentEmail, setCurrentEmail] = useState("Loading...");
  const { getEmail } = useCelestial();
  const walletAddress = useSelector((state) => state.user.user.pubKey);
  const isLoading = useSelector((state) => state.changeEmail.isLoading);
  const { verifyCurrentEmail } = useChangeEmail();

  useEffect(() => {
    if (walletAddress) {
      getEmail(walletAddress).then((email) => {
        setCurrentEmail(email);
      });
    }
  }, [walletAddress]);

  return (
    <div className="">
      <div className="flex flex-col w-full">
        <Input
          label="Current Email"
          size="lg"
          className={urbanist.className}
          icon={<AtSign />}
          value={
            currentEmail === false ? "Something Went Wrong!" : currentEmail
          }
          labelProps={{
            className: urbanist.className,
          }}
          onChange={() => {}}
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
          verifyCurrentEmail(currentEmail);
        }}
        disabled={currentEmail === false || isLoading}
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
