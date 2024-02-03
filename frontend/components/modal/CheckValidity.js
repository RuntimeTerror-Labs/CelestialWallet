"use client";

import { useSelector } from "react-redux";
import {
  Dialog,
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Urbanist } from "next/font/google";
import Image from "next/image";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function CheckValidity() {
  const password = useSelector((state) => state.user.user.password);

  return (
    <Dialog size="xs" open={!password} className="bg-transparent shadow-none">
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
            <p className={"text-center " + urbanist.className}>
              You are not signed in. Please sign in to continue.
            </p>
            <Button
              variant="gradient"
              fullWidth
              className={
                urbanist.className + " flex items-center mt-5 justify-center"
              }
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Sign In
            </Button>
          </CardBody>
          <CardFooter className="pt-0 -mt-7">
            <Typography
              variant="small"
              className={"mt-4 flex justify-center " + urbanist.className}
            >
              Don't have an account?{" "}
              <Typography
                variant="small"
                color="blue-gray"
                className={
                  "ml-1 font-bold hover:cursor-pointer " + urbanist.className
                }
                onClick={() => {
                  window.location.href = "/signup";
                }}
              >
                Sign Up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </Dialog>
  );
}
