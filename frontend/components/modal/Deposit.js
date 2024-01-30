"use client";

import { Urbanist } from "next/font/google";

import {
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  CardHeader,
  Input,
} from "@material-tailwind/react";

import { Info } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { toggleDepositModal } from "@/redux/slice/modalSlice";
import Image from "next/image";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import QRCode from "react-qr-code";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

const DepositModal = () => {
  const dispatch = useDispatch();

  const open = useSelector((state) => state.modal.depositModal);
  const username = useSelector((state) => state.user.user.username);
  const walletAddress = useSelector((state) => state.user.user.pubKey);

  const handleOpen = () => {
    dispatch(toggleDepositModal(false));
  };

  return (
    <>
      <Dialog size="xs" open={open} className="bg-transparent shadow-none">
        <div className="h-full w-full flex flex-col justify-center bg-white rounded-3xl pt-20 pb-5 items-center relative">
          <Card className="w-96 shadow-none bg-transparent">
            <CardHeader className="bg-transparent flex justify-center shadow-none">
              <div className="border-black border-[1px] rounded-3xl p-4 mb-3">
                <QRCode value={walletAddress} size={125} />
              </div>
            </CardHeader>

            <CardBody className="flex flex-col gap-4 -mt-2">
              <div className="flex flex-col w-full">
                <Input
                  label="Celestial Domain"
                  size="lg"
                  className={urbanist.className + " font-bold"}
                  icon={
                    <Copy
                      className=" scale-75 hover:text-black hover:cursor-pointer transition duration-300"
                      onClick={() => {
                        navigator.clipboard.writeText(username);
                        toast.success("Copied to clipboard!");
                      }}
                    />
                  }
                  value={username}
                  labelProps={{
                    className: urbanist.className,
                  }}
                  onChange={() => {}}
                />
                <div
                  className={
                    "mt-2 text-sm flex items-center text-gray-600 " +
                    urbanist.className
                  }
                >
                  <Info size={16} className="inline mr-1" />
                  Celestial Domain only works in our website.
                </div>
              </div>

              <div className="flex flex-col mb-4 mt-1 w-full">
                <Input
                  label="Address"
                  size="lg"
                  className={urbanist.className + " font-bold"}
                  icon={
                    <Copy
                      className=" scale-75 hover:text-black hover:cursor-pointer transition duration-300"
                      onClick={() => {
                        navigator.clipboard.writeText(walletAddress);
                        toast.success("Copied to clipboard!");
                      }}
                    />
                  }
                  value={walletAddress}
                  labelProps={{
                    className: urbanist.className,
                  }}
                  onChange={() => {}}
                />
              </div>
            </CardBody>

            <CardFooter className="pt-0 -mt-7">
              <Typography
                variant="small"
                className={"mt-4 flex justify-center " + urbanist.className}
              >
                Back to
                <Typography
                  variant="small"
                  color="blue-gray"
                  className={
                    "ml-1 font-bold hover:cursor-pointer " + urbanist.className
                  }
                  onClick={handleOpen}
                >
                  Dashboard
                </Typography>
              </Typography>
            </CardFooter>
          </Card>
        </div>
      </Dialog>
    </>
  );
};

export default DepositModal;
