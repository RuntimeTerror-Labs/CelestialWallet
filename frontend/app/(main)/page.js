"use client";
import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Typography,
  Button,
  CardHeader,
} from "@material-tailwind/react";
import Image from "next/image";
import { Urbanist } from "next/font/google";
import useCircuits from "@/hooks/useCircuits";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function Page() {
  const { hashPassword } = useCircuits();

  return (
    <div className="h-full w-full flex flex-col justify-center items-center relative">
      <Image
        src="/main/bg.jpg"
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
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Celestial Domain"
            size="lg"
            className={urbanist.className}
          />
          <Input
            label="Password"
            size="lg"
            type="password"
            className={urbanist.className}
          />
          <div className="-ml-2.5 -my-2">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0 -mt-2">
          <Button
            variant="gradient"
            fullWidth
            className={urbanist.className}
            onClick={() => {
              hashPassword("test");
            }}
          >
            Sign In
          </Button>
          <Typography
            variant="small"
            className={"mt-4 flex justify-center " + urbanist.className}
          >
            Don&apos;t have a Celestial?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className={"ml-1 font-bold " + urbanist.className}
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
