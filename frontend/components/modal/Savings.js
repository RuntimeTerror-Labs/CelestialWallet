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
import { useEffect, useState } from "react";
import { handleDialog } from "@/redux/slice/savingsSlice";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function Savings() {
  const dialog = useSelector((state) => state.savings.dialog);
  const isLoading = useSelector((state) => state.savings.isLoading);
  const dispatch = useDispatch();
  const savings = useSelector((state) => state.data.savings);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const ethPrice = useSelector((state) => state.data.ethPrice);

  useEffect(() => {
    if (!savings) return;
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [savings]);

  function calculateTimeRemaining() {
    const now = Math.floor(Date.now() / 1000);
    const difference = savings ? savings[2] - now : 0;

    if (difference <= 0) {
      // Timer has expired
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(difference / (60 * 60 * 24));
    const hours = Math.floor((difference % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((difference % (60 * 60)) / 60);
    const seconds = difference % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  const formatWithLeadingZero = (value) => (value < 10 ? `0${value}` : value);

  return (
    savings && (
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
              <p className="text-xl font-bold">Redeem After</p>
              <p className="text-2xl font-bold -mt-3">
                {formatWithLeadingZero(timeRemaining.days)}
                <span className=" text-xs font-normal"> days</span> :{" "}
                {formatWithLeadingZero(timeRemaining.hours)}
                <span className=" text-xs font-normal"> hours</span> :{" "}
                {formatWithLeadingZero(timeRemaining.minutes)}
                <span className=" text-xs font-normal"> minutes</span> :{" "}
                {formatWithLeadingZero(timeRemaining.seconds)}
                <span className=" text-xs font-normal"> seconds</span>
              </p>

              <p className="text-xl font-bold">Total Savings</p>
              <p className="text-2xl font-bold -mt-3">
                ${((Number(savings[0]) / 10 ** 18) * ethPrice).toFixed(2)}{" "}
                <span className="font-bold text-sm text-black/40">
                  {(Number(savings[0]) / 10 ** 18).toFixed(4)} ETH
                </span>
              </p>

              <Button
                variant="gradient"
                fullWidth
                className={
                  urbanist.className + " flex items-center mt-1 justify-center"
                }
                onClick={() => {}}
                disabled={
                  isLoading ||
                  Number(savings[2]) === 0 ||
                  Number(savings[2]) > Date.now() / 1000
                }
              >
                {isLoading ? (
                  <Loader2 className="animate-spin -ml-1 mr-2" size={15} />
                ) : (
                  "Redeem"
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
                      "ml-1 font-bold hover:cursor-pointer " +
                      urbanist.className
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
    )
  );
}
