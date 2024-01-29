"use client";

import { CelestialSavingManager } from "@/lib/abis/AddressManager";
import { ethers } from "ethers";
import CelestialSavingManagerABI from "@/lib/abis/CelestialSavingManager.json";
import { useDispatch } from "react-redux";
import { setSavings } from "@/redux/slice/dataSlice";

export default function useSavings() {
  const dispatch = useDispatch();
  const fetchSavings = async (address) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );
      const contract = new ethers.Contract(
        CelestialSavingManager,
        CelestialSavingManagerABI,
        provider
      );

      const details = await contract.accounts(address);
      dispatch(setSavings(details));
    } catch (err) {
      console.log(err);
      dispatch(setSavings(null));
    }
  };

  return { fetchSavings };
}
