"use client";

import { Urbanist } from "next/font/google";
import { AtSign, Info, Loader2 } from "lucide-react";
import { Input, Button } from "@material-tailwind/react";
import useCelestial from "@/hooks/useCelestial";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { setAddress, setDomain, setStep } from "@/redux/slice/transferSlice";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function Step0() {
  const [input, setInput] = useState("");
  const { isValidCelestial, getCelestialAddress } = useCelestial();
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  var timeout = null;
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.user.username);
  const walletAddress = useSelector((state) => state.user.user.pubKey);

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

  const checkCelestial = async () => {
    setIsLoading(true);

    if (input === walletAddress.toString()) {
      setIsValid(false);
      setIsLoading(false);
      return;
    }

    if (input.startsWith("0x") && input.length === 42) {
      setIsValid(true);
      setIsLoading(false);
      dispatch(setAddress(input));
      dispatch(setDomain(""));
      return;
    }

    if (input === username) {
      setIsValid(false);
      setIsLoading(false);
      return;
    }

    const isUsed = await isValidCelestial(input);

    if (isUsed) {
      dispatch(setDomain(input));
      const address = await getCelestialAddress(input);
      dispatch(setAddress(address));
    }

    setIsValid(isUsed);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col w-full">
      <Input
        label="Domain or Address"
        size="lg"
        className={urbanist.className}
        icon={
          <AtSign
            onClick={() => {
              if (input.includes("@celestial")) return;
              setInput(input + "@celestial");
              checkCelestial();
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
      {!input && (
        <div
          className={"mt-2 text-sm flex text-gray-600 " + urbanist.className}
        >
          <Info size={17} className="inline mt-0.5 mr-1" />
          Enter a valid celestial domain or an arbitrary address.
        </div>
      )}

      {isLoading && input && (
        <div className={"mt-2 flex items-center " + urbanist.className}>
          <Loader2 className="animate-spin -mt-0.5 mr-2" size={15} />
          <span className="text-sm">Checking domain...</span>
        </div>
      )}

      {!isLoading && input && !isValid && (
        <div className={"mt-2 text-sm flex text-red-600 " + urbanist.className}>
          <Info size={17} className="inline mt-0.5 mr-1" />
          Celestial domain or address is invalid.
        </div>
      )}

      {!isLoading && input && isValid && (
        <div
          className={"mt-2 text-sm flex text-green-600 " + urbanist.className}
        >
          <Info size={17} className="inline mt-0.5 mr-1" />
          Celestial domain or address is valid.
        </div>
      )}

      <Button
        variant="gradient"
        fullWidth
        className={
          urbanist.className + " flex items-center mt-5 justify-center"
        }
        onClick={() => {
          dispatch(setStep(1));
        }}
        disabled={isLoading || input === "" || !isValid}
      >
        Next
      </Button>
    </div>
  );
}
