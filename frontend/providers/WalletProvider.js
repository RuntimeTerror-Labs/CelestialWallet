"use client";
import useWalletData from "@/hooks/useWalletData";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function WalletProvider({ children }) {
  const walletAddress = useSelector((state) => state.user.user.pubKey);
  const ethPrice = useSelector((state) => state.data.ethPrice);
  const { fetchBalance, fetchPrice } = useWalletData();
  var currentTimeout = null;

  useEffect(() => {
    if (walletAddress) {
      fetchBalance(walletAddress);
      fetchPrice();
    }
  }, [walletAddress]);

  useEffect(() => {
    if (ethPrice) {
      currentTimeout = setInterval(() => {
        fetchPrice();
        fetchBalance(walletAddress);
      }, 10000);
    }

    return () => {
      clearInterval(currentTimeout);
    };
  }, []);

  return <>{children}</>;
}
