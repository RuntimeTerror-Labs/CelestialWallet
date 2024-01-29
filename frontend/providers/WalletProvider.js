"use client";
import useSavings from "@/hooks/useSavings";
import useWalletData from "@/hooks/useWalletData";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function WalletProvider({ children }) {
  const walletAddress = useSelector((state) => state.user.user.pubKey);
  const ethPrice = useSelector((state) => state.data.ethPrice);
  const { fetchBalance, fetchPrice, fetchTransactions } = useWalletData();
  const { fetchSavings } = useSavings();
  var currentTimeout = null;

  useEffect(() => {
    if (walletAddress) {
      fetchBalance(walletAddress);
      fetchPrice();
      fetchTransactions(walletAddress);
      fetchSavings(walletAddress);
    }
  }, [walletAddress]);

  useEffect(() => {
    currentTimeout = setInterval(() => {
      fetchPrice();
      if (walletAddress) {
        fetchBalance(walletAddress);
        fetchTransactions(walletAddress);
        fetchSavings(walletAddress);
      }
    }, 10000);

    return () => {
      clearInterval(currentTimeout);
    };
  }, []);

  return <>{children}</>;
}
