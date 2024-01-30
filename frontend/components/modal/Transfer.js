"use client";

import { Urbanist } from "next/font/google";

import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  CardHeader,
} from "@material-tailwind/react";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { toggleTransferModal } from "@/redux/slice/modalSlice";

import Image from "next/image";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

const TransferModal = () => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  const open = useSelector((state) => state.modal.transferModal);

  const handleOpen = () => {
    dispatch(toggleTransferModal(false));
  };

  return (
    <>
      <Dialog size="xs" open={open} className="bg-transparent shadow-none">
        <div className="h-full w-full flex flex-col justify-center bg-white rounded-3xl pt-20 pb-5 items-center relative">
          <Card className="w-96 shadow-none bg-transparent">
            <CardHeader className="bg-transparent flex justify-center shadow-none">
              <Image
                src="/main/logo.png"
                alt="Celestial"
                width={140}
                height={140}
                className="mb-3"
              />
            </CardHeader>

            <CardBody className="flex flex-col gap-4 -mt-2">
              <div className="text-center">
                <Typography variant="h4" color="blue-gray">
                  Transfer
                </Typography>

                <Typography
                  className="mb-3 font-normal"
                  variant="paragraph"
                  color="gray"
                >
                  Send token from your wallet to another wallet.
                </Typography>
              </div>

              <div className="space-y-3">
                <Typography className="-mb-2" variant="h6">
                  Amount
                </Typography>
                <Input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  label="Token Amount"
                  required
                  size="lg"
                />
              </div>

              <div className="space-y-3">
                <Typography className="-mb-2" variant="h6">
                  Address
                </Typography>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  label="Receiver's Address"
                  required
                  size="lg"
                />
              </div>
            </CardBody>

            <CardFooter className="pt-0 -mt-7">
              <Button
                variant="gradient"
                fullWidth
                className={
                  urbanist.className + " flex items-center mt-5 justify-center"
                }
                onClick={() => {}}
              >
                Transfer
              </Button>

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

export default TransferModal;
