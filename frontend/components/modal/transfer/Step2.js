"use client";
import { Urbanist } from "next/font/google";
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import useTransfer from "@/hooks/useTransfer";
import { Loader2 } from "lucide-react";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function Step2() {
  const domain = useSelector((state) => state.transfer.domain);
  const address = useSelector((state) => state.transfer.address);
  const amount = useSelector((state) => state.transfer.amount);
  const ethPrice = useSelector((state) => state.data.ethPrice);
  const isLoading = useSelector((state) => state.transfer.isLoading);
  const { handleTransfer } = useTransfer();

  return (
    <div className="flex flex-col w-full">
      <p className={"text-center " + urbanist.className}>
        Do you want to send{" "}
        <span className="font-bold">
          ${(Number(amount) * ethPrice).toFixed(2)}
        </span>{" "}
        to{" "}
        <span className="font-bold">
          {domain
            ? domain
            : address.substring(0, 4) + "..." + address.substring(36, 42)}
        </span>
        ?
      </p>

      <Button
        variant="gradient"
        fullWidth
        className={
          urbanist.className + " flex items-center mt-7 justify-center"
        }
        onClick={() => {
          handleTransfer();
        }}
      >
        {isLoading ? (
          <Loader2 size={20} className="inline mr-1 animate-spin" />
        ) : (
          "Confirm"
        )}
      </Button>
    </div>
  );
}
