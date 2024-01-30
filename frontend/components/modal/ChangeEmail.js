"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Stepper,
  Step,
  CardHeader,
} from "@material-tailwind/react";
import { handleDialog, handleStep } from "@/redux/slice/changeEmailSlice";
import { AtSign, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { Urbanist } from "next/font/google";
import Step0 from "./changeEmail/Step0";
import Step1 from "./changeEmail/Step1";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function ChangeEmail() {
  const open = useSelector((state) => state.changeEmail.dialog);
  const dispatch = useDispatch();
  const step = useSelector((state) => state.changeEmail.step);
  const isLoading = useSelector((state) => state.changeEmail.isLoading);

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={() => {}}
        className="bg-transparent shadow-none"
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
                  <ShieldAlert className="h-5 w-5" />
                </Step>
                <Step className="">
                  <AtSign className="h-5 w-5" />
                </Step>
              </Stepper>
              {step === 0 && <Step0 />}
              {step === 1 && <Step1 />}
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
                      dispatch(handleStep(0));
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
    </>
  );
}
