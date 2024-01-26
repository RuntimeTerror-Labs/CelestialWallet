"use client";
import Image from "next/image";
import { Urbanist } from "next/font/google";
import { useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
  Stepper,
  Step,
} from "@material-tailwind/react";
import Step0 from "@/components/layout/signup/step0";
import Step1 from "@/components/layout/signup/Step1";
import { Cog, UserIcon } from "lucide-react";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function SignupPage() {
  const step = useSelector((state) => state.signup.step);

  return (
    <>
      <div className="h-full w-full flex flex-col justify-center items-center relative">
        <Image
          src="/signup/bg.jpg"
          alt="Celestial"
          width={1500}
          height={1080}
          className="absolute -right-1/3 md:-bottom-1/2 -bottom-32"
        />
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
                <UserIcon className="h-5 w-5" />
              </Step>
              <Step className="">
                <Cog className="h-5 w-5" />
              </Step>
            </Stepper>
            {step === 0 && <Step0 />}
            {step === 1 && <Step1 />}
          </CardBody>
          <CardFooter className="pt-0 -mt-7">
            <Typography
              variant="small"
              className={"mt-4 flex justify-center " + urbanist.className}
            >
              Back to
              <Typography
                as="a"
                href="/"
                variant="small"
                color="blue-gray"
                className={"ml-1 font-bold " + urbanist.className}
              >
                Sign In
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
