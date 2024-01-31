"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  Card,
  CardHeader,
  CardBody,
  Stepper,
  Step,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Urbanist } from "next/font/google";
import Image from "next/image";
import { AtSign, KeyRound, Wallet2 } from "lucide-react";
import Step0 from "./forgotPassword/Step0";
import Step1 from "./forgotPassword/Step1";
import Step2 from "./forgotPassword/Step2";
import {
  handleDialog,
  setAddress,
  setDomain,
  setProof,
  setSteps,
} from "@/redux/slice/forgotPasswordSlice";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function ForgotPassword() {
  const dialog = useSelector((state) => state.forgotPassword.dialog);
  const dispatch = useDispatch();
  const step = useSelector((state) => state.forgotPassword.steps);
  const isLoading = useSelector((state) => state.forgotPassword.isLoading);

  return (
    <Dialog
      size="xs"
      open={dialog}
      className="bg-transparent shadow-none outline-none"
    >
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
            <Stepper activeStep={step} className="mb-3">
              <Step className="">
                <Wallet2 className="h-5 w-5" />
              </Step>
              <Step className="">
                <AtSign className="h-5 w-5" />
              </Step>
              <Step className="">
                <KeyRound className="h-5 w-5" />
              </Step>
            </Stepper>

            {step === 0 && <Step0 />}
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
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
                    dispatch(setSteps(0));
                    dispatch(setDomain(""));
                    dispatch(setAddress(""));
                    dispatch(setProof(""));
                  }}
                >
                  Home
                </Typography>
              </Typography>
            )}
          </CardFooter>
        </Card>
      </div>
    </Dialog>
  );
}
