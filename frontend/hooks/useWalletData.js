"use client";
import { ethers } from "ethers";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setBalance,
  setEthPrice,
  setMarketData,
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

  return { fetchBalance, fetchPrice };
}
