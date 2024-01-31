"use client";
import { Urbanist } from "next/font/google";
import { Input, Button } from "@material-tailwind/react";
import { Info, Loader2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import useForgotPassword from "@/hooks/useForgotPassword";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function Step2() {
  const [password, setPassword] = useState("");
  const isLoading = useSelector((state) => state.forgotPassword.isLoading);
  const { changePassword } = useForgotPassword();

  return (
    <div className={"flex flex-col w-full " + urbanist.className}>
      <Input
        label="New Password"
        size="lg"
        type="password"
        className={urbanist.className}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className="mt-2 text-sm flex text-gray-500">
        <Info size={20} className="inline mr-1" />
        Use at least 8 characters, one uppercase, one lowercase and one number.
      </p>

      <Button
        variant="gradient"
        fullWidth
        className={
          urbanist.className + " flex items-center mt-5 justify-center"
        }
        onClick={() => {
          changePassword(password);
        }}
        disabled={password.length < 8 || isLoading}
      >
        {isLoading ? (
          <Loader2 size={20} className="inline mr-1 animate-spin" />
        ) : (
          "Reset Password"
        )}
      </Button>
    </div>
  );
}
