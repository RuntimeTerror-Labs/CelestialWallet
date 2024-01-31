"use client";

import { Urbanist } from "next/font/google";
import { AtSign, Info, Loader2 } from "lucide-react";
import { Input, Button } from "@material-tailwind/react";
import { useRef, useState, useEffect } from "react";
import useCelestial from "@/hooks/useCelestial";
import { useDispatch } from "react-redux";
import {
  setAddress,
  setDomain,
  setSteps,
} from "@/redux/slice/forgotPasswordSlice";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function Step0() {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  var timeout = null;
  const [isUsed, setIsUsed] = useState(false);
  const { isValidCelestial, getCelestialAddress } = useCelestial();
  const dispatch = useDispatch();

  const checkCelestial = async () => {
    if (input.length < 13) return;

    const isUsed = await isValidCelestial(input);

    if (isUsed) {
      const address = await getCelestialAddress(input);
      dispatch(setAddress(address));
    }

    setIsUsed(isUsed);
    setIsLoading(false);
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
  }, [isTyping, input]);

  return (
    <div className="">
      <div className={"flex flex-col w-full " + urbanist.className}>
        <Input
          label="Celestial Domain"
          size="lg"
          className={urbanist.className}
          icon={
            <AtSign
              onClick={() => {
                if (input.includes("@celestial")) return;
                setInput(input + "@celestial");
              }}
              className="hover:cursor-pointer hover:text-black transition-all duration-200 ease-in-out"
            />
          }
          value={input}
          labelProps={{
            className: urbanist.className,
          }}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          ref={inputRef}
        />
        {isLoading && input.length > 12 && (
          <p className="mt-2 text-sm flex text-gray-500">
            <Loader2 size={20} className="inline mr-1 animate-spin " />
            Checking availability...
          </p>
        )}

        {input.length !== 0 && input.length < 13 && (
          <p className="mt-2 text-sm flex text-gray-500">
            <Info size={20} className="inline mr-1" />
            Enter a valid domain
          </p>
        )}

        {!isLoading && !isUsed && input.length > 12 && (
          <p className="mt-2 text-sm flex text-red-500">
            <Info size={20} className="inline mr-1" />
            This domain is not registered
          </p>
        )}

        <Button
          variant="gradient"
          fullWidth
          className={
            urbanist.className + " flex items-center mt-5 justify-center"
          }
          onClick={() => {
            dispatch(setDomain(input));
            dispatch(setSteps(1));
          }}
          disabled={isLoading || !isUsed || input.length < 13}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
