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
  Textarea,
  CardHeader,
} from "@material-tailwind/react";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { toggleDepositModal } from "@/redux/slice/modalSlice";
import Image from "next/image";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

const DepositModal = () => {
  const dispatch = useDispatch();

  const open = useSelector((state) => state.modal.depositModal);

  const handleOpen = () => {
    dispatch(toggleDepositModal(false));
  };

  return (
    <>
      {/* <Dialog size="xs" open={open} className="bg-transparent shadow-none">
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Deposit to your wallet
            </Typography>

            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Send some money to your wallet to start using.
            </Typography>
          </CardBody>

          <CardFooter className="flex gap-2 justify-end">
            <Button variant="outlined" color="red" onClick={handleOpen}>
              Cancel
            </Button>

            <Button variant="gradient">Create</Button>
          </CardFooter>
        </Card>
      </Dialog> */}

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
                  Deposit to your wallet
                </Typography>

                <Typography
                  className="mb-3 font-normal"
                  variant="paragraph"
                  color="gray"
                >
                  Send some money to your wallet to start using.
                </Typography>
              </div>
              Hello
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
                Deposit
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

export default DepositModal;
