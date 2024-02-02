"use client";

import {
  CelestialFactory,
  CelestialSavingManager,
} from "@/lib/abis/AddressManager";
import { ethers } from "ethers";
import CelestialSavingManagerABI from "@/lib/abis/CelestialSavingManager.json";
import { useDispatch, useSelector } from "react-redux";
import { setSavings } from "@/redux/slice/dataSlice";
import useRelay from "./useRelay";
import useCircuits from "./useCircuits";
import useCelestial from "./useCelestial";
import { handleDialog, setIsLoading } from "@/redux/slice/startSavingSlice";
import toast from "react-hot-toast";
import CelestialFactoryABI from "@/lib/abis/CelestialFactory.json";
import { setIsLoading as setLoading } from "@/redux/slice/savingsSlice";

export default function useSavings() {
  const dispatch = useDispatch();
  const { execute } = useRelay();
  const { passkey_prove } = useCircuits();
  const { getNonce } = useCelestial();
  const password = useSelector((state) => state.user.user.password);
  const walletAddress = useSelector((state) => state.user.user.pubKey);
  const name = useSelector((state) => state.user.user.username);

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

  const enableSaving = async (time) => {
    dispatch(setIsLoading(true));
    try {
      let unixTime;

      if (time === "1 Day") {
        unixTime = new Date().getTime() + 86400000;
      } else if (time === "1 Week") {
        unixTime = new Date().getTime() + 604800000;
      } else {
        unixTime = new Date().getTime() + 2592000000;
      }

      const nonce = await getNonce(walletAddress);

      const password_proof = await passkey_prove(password, nonce);

      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );

      const SavingContracts = new ethers.Contract(
        CelestialSavingManager,
        CelestialSavingManagerABI,
        provider
      );

      const data = SavingContracts.interface.encodeFunctionData(
        "startAccount",
        [(unixTime / 1000).toFixed(0)]
      );

      const factory = new ethers.Contract(
        CelestialFactory,
        CelestialFactoryABI,
        provider
      );

      const payload = factory.interface.encodeFunctionData(
        "executeCelestialTx",
        [name, password_proof, CelestialSavingManager, 0, data]
      );

      const txId = await execute(payload);

      console.log(txId);

      dispatch(setIsLoading(false));
      dispatch(handleDialog());
      toast.success("Saving enabled");
      fetchSavings(walletAddress);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      dispatch(setIsLoading(false));
    }
  };

  const redeemSaving = async () => {
    dispatch(setLoading(true));
    try {
      const nonce = await getNonce(walletAddress);

      const password_proof = await passkey_prove(password, nonce);

      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );

      const SavingContracts = new ethers.Contract(
        CelestialSavingManager,
        CelestialSavingManagerABI,
        provider
      );

      const data = SavingContracts.interface.encodeFunctionData("redeem");

      const factory = new ethers.Contract(
        CelestialFactory,
        CelestialFactoryABI,
        provider
      );

      const payload = factory.interface.encodeFunctionData(
        "executeCelestialTx",
        [name, password_proof, CelestialSavingManager, 0, data]
      );

      const txId = await execute(payload);

      console.log(txId);

      dispatch(setLoading(false));
      toast.success("Saving Disabled");
      fetchSavings(walletAddress);
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    }
  };

  const mintSummaryNFT = async (address) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );

      const nonce = await getNonce(walletAddress);

      const password_proof = await passkey_prove(password, nonce);

      const contract = new ethers.Contract(
        CelestialSavingManager,
        CelestialSavingManagerABI,
        provider
      );

      const details = await contract.accounts(address);

      if (
        details[0] === 0 ||
        details[1] === 0 ||
        details[2] === 0 ||
        details[1].toNumber() + 86400 > new Date().getTime() / 1000
      ) {
        return;
      }

      const data = contract.interface.encodeFunctionData("mintWeeklyNFT", [
        address,
      ]);

      const factory = new ethers.Contract(
        CelestialFactory,
        CelestialFactoryABI,
        provider
      );

      const payload = factory.interface.encodeFunctionData(
        "executeCelestialTx",
        [name, password_proof, CelestialSavingManager, 0, data]
      );

      const txId = await execute(payload);

      console.log(txId);
    } catch (e) {
      console.log(e);
    }
  };

  return { fetchSavings, enableSaving, mintSummaryNFT, redeemSaving };
}
