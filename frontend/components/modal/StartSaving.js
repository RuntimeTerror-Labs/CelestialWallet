"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  Card,
  CardHeader,
  CardBody,
  Radio,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Urbanist } from "next/font/google";
import Image from "next/image";
import { AtSign, Info, KeyRound, Loader2, Wallet2 } from "lucide-react";
import { handleDialog } from "@/redux/slice/startSavingSlice";
import { useState } from "react";
import useSavings from "@/hooks/useSavings";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function StartSaving() {
  const dialog = useSelector((state) => state.startSaving.dialog);
  const isLoading = useSelector((state) => state.startSaving.isLoading);
  const step = useSelector((state) => state.startSaving.step);
  const dispatch = useDispatch();
  const [time, setTime] = useState("1 Day");
  const { enableSaving } = useSavings();

  return (
    <Dialog
      size="xs"
      open={dialog}
      className="bg-transparent shadow-none outline-none"
    >
      <div className="h-full w-full flex flex-col justify-center bg-white rounded-3xl pt-20 pb-5 items-center relative">
        <Card
          className={"w-96 shadow-none bg-transparent " + urbanist.className}
        >
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
            <p className="text-black/70 font-bold text-2xl">Lock Period</p>
            <div className="flex -ml-3 gap-5 -mt-4 w-full">
              <Radio
                name="type"
                label="1 Day"
                defaultChecked
                checked={time === "1 Day"}
                onChange={() => {
                  setTime("1 Day");
                }}
              />
              <Radio
                name="type"
                label="1 Week"
                checked={time === "1 Week"}
                onChange={() => {
                  setTime("1 Week");
                }}
              />
              <Radio
                name="type"
                label="1 Month"
                checked={time === "1 Month"}
                onChange={() => {
                  setTime("1 Month");
                }}
              />
            </div>
            <div
              className={
                "-mt-3 text-sm flex text-gray-600 " + urbanist.className
              }
            >
              <Info size={17} className="inline mt-0.5 mr-1" />
              You can't withdraw your savings until the lock period ends.
            </div>

            <Button
              variant="gradient"
              fullWidth
              className={
                urbanist.className + " flex items-center mt-1 justify-center"
              }
              onClick={() => {
                enableSaving(time);
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin -ml-1 mr-2" size={15} />
              ) : (
                "Start Saving"
              )}
            </Button>
          </CardBody>

          <CardFooter className="pt-0 -mt-7">
            {!isLoading && (
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
                  onClick={() => {
                    dispatch(handleDialog());
                  }}
                >
                  Dashboard
                </Typography>
              </Typography>
            )}
          </CardFooter>
        </Card>
      </div>
    </Dialog>
  );
}
