"use client";
import { ethers } from "ethers";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setBalance,
  setEthPrice,
  setMarketData,
  setTransactions,
} from "@/redux/slice/dataSlice";

export default function useWalletData() {
  const dispatch = useDispatch();
  const fetchBalance = async (address) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );
      const balance = await provider.getBalance(address);
      dispatch(setBalance(ethers.utils.formatEther(balance)));
    } catch (e) {
      dispatch(setBalance(0));
    }
  };

  const fetchPrice = async () => {
    try {
      const res = await axios.get(
        "https://optimism.blockscout.com/api/v2/stats/charts/market"
      );
      dispatch(setEthPrice(res.data.chart_data[0].closing_price));
      dispatch(setMarketData(res.data.chart_data));
    } catch (e) {
      dispatch(setEthPrice(0));
    }
  };

  const fetchTransactions = async (address) => {
    try {
      const res = await axios.get(
        `https://pegasus.lightlink.io/api/v2/addresses/${address}/transactions?filter=to%20%7C%20from`
      );
      dispatch(setTransactions(res.data.items));
    } catch (e) {
      dispatch(setTransactions([]));
    }
  };

  return { fetchBalance, fetchPrice, fetchTransactions };
}
