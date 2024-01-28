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
import { AtSign } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import useCelestial from "@/hooks/useCelestial";
import { Info, Loader2 } from "lucide-react";
import useSignin from "@/hooks/useSignin";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function Page() {
  const [domain, setDomain] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUsed, setIsUsed] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const { isValidCelestial } = useCelestial();
  var timeout = null;
  const { handleSignIn } = useSignin();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const [previousDomain, setPreviousDomain] = useState("");

  const checkCelestial = async () => {
    if (domain.length < 13) return;

    const isUsed = await isValidCelestial(domain);

    setIsUsed(isUsed);
    setIsLoading(false);
  };

  const manageSignIn = async () => {
    setIsProcessing(true);
    await handleSignIn(domain, password, isRemember);
    setIsProcessing(false);
  };

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.addEventListener("keydown", function () {
      clearTimeout(timeout);

      timeout = setTimeout(function () {
        setIsTyping(false);
      }, 1000);

      setIsTyping(true);
    });
  }, []);

  useEffect(() => {
    if (isTyping) {
      setIsLoading(true);
    } else {
      checkCelestial();
    }
  }, [isTyping, domain]);

  useEffect(() => {
    const previousDomain = localStorage.getItem("domain");

    if (previousDomain) {
      if (previousDomain.length < 13 || !previousDomain.includes("@celestial"))
        return;

      setDomain(previousDomain);
      setPreviousDomain(previousDomain);
      setIsRemember(true);
    }
  }, []);

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
          {previousDomain && (
            <>
              <p className="text-center font-light">
                Previously logged in with
                {previousDomain && (
                  <span className="font-bold"> {previousDomain}</span>
                )}
              </p>

              <p
                className="font-bold -mt-4 hover:underline hover:cursor-pointer text-center"
                onClick={() => {
                  localStorage.removeItem("domain");
                  setDomain("");
                  setPreviousDomain("");
                  setIsRemember(false);
                }}
              >
                Not you?{" "}
              </p>
            </>
          )}

          <div
            className="flex flex-col w-full"
            style={{
              display: previousDomain ? "none" : "flex",
            }}
          >
            <Input
              label="Celestial Domain"
              size="lg"
              className={urbanist.className}
              icon={
                <AtSign
                  onClick={() => {
                    if (domain.includes("@celestial")) return;
                    setDomain(domain + "@celestial");
                  }}
                  className="hover:cursor-pointer hover:text-black transition-all duration-200 ease-in-out"
                />
              }
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              ref={inputRef}
            />

            {isLoading && domain.length > 12 && (
              <p className="mt-2 text-sm flex text-gray-500">
                <Loader2 size={20} className="inline mr-1 animate-spin " />
                Checking availability...
              </p>
            )}

            {domain.length !== 0 && domain.length < 13 && (
              <p className="mt-2 text-sm flex text-gray-500">
                <Info size={20} className="inline mr-1" />
                Enter a valid domain
              </p>
            )}

            {!isLoading && !isUsed && domain.length > 12 && (
              <p className="mt-2 text-sm flex text-red-500">
                <Info size={20} className="inline mr-1" />
                This domain is not registered
              </p>
            )}
          </div>

          <Input
            label="Password"
            size="lg"
            type="password"
            className={urbanist.className}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!previousDomain && (
            <div className="-ml-2.5 -my-2">
              <Checkbox
                label="Remember Me"
                value={isRemember}
                onChange={(e) => setIsRemember(e.target.checked)}
              />
            </div>
          )}
        </CardBody>
        <CardFooter className="pt-0 -mt-2">
          <Button
            variant="gradient"
            fullWidth
            className={urbanist.className + " flex items-center justify-center"}
            onClick={() => {
              manageSignIn();
            }}
            disabled={
              domain.length < 13 ||
              password.length < 8 ||
              isLoading ||
              !isUsed ||
              isProcessing
            }
          >
            {isProcessing ? (
              <Loader2 size={20} className="inline mr-1 animate-spin " />
            ) : (
              "Sign In"
            )}
          </Button>
          <Typography
            variant="small"
            className={"mt-4 flex justify-center " + urbanist.className}
          >
            Don&apos;t have a Celestial?
            <Typography
              as="a"
              href="/signup"
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
