"use client";
import useWalletData from "@/hooks/useWalletData";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function WalletProvider({ children }) {
  const walletAddress = useSelector((state) => state.user.user.pubKey);
  const ethPrice = useSelector((state) => state.data.ethPrice);
  const { fetchBalance, fetchPrice, fetchTransactions } = useWalletData();
  var currentTimeout = null;

  useEffect(() => {
    if (walletAddress) {
      fetchBalance(walletAddress);
      fetchPrice();
      fetchTransactions(walletAddress);
    }
  }, [walletAddress]);

  useEffect(() => {
    if (ethPrice) {
      currentTimeout = setInterval(() => {
        fetchPrice();
        if (walletAddress) {
          fetchBalance(walletAddress);
          fetchTransactions(walletAddress);
        }
      }, 10000);
    }

    return () => {
      clearInterval(currentTimeout);
    };
  }, []);

  return <>{children}</>;
}
