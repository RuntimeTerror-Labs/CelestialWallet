"use client";
import { toggleTransferModal } from "@/redux/slice/modalSlice";
import {
  setAddress,
  setAmount,
  setDomain,
  setIsLoading,
  setStep,
} from "@/redux/slice/transferSlice";
import { useDispatch } from "react-redux";
import useCircuits from "./useCircuits";
import useCelestial from "./useCelestial";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import CelestialFactoryABI from "@/lib/abis/CelestialFactory.json";
import { CelestialFactory } from "@/lib/abis/AddressManager";
import useRelay from "./useRelay";
import toast from "react-hot-toast";
import useWalletData from "./useWalletData";
import useSavings from "./useSavings";

export default function useTransfer() {
  const dispatch = useDispatch();
  const password = useSelector((state) => state.user.user.password);
  const { passkey_prove } = useCircuits();
  const { getNonce } = useCelestial();
  const address = useSelector((state) => state.user.user.pubKey);
  const name = useSelector((state) => state.user.user.username);
  const recipient = useSelector((state) => state.transfer.address);
  const amount = useSelector((state) => state.transfer.amount);
  const { execute } = useRelay();
  const { fetchBalance, fetchTransactions } = useWalletData();
  const { fetchSavings } = useSavings();

  const handleTransfer = async () => {
    dispatch(setIsLoading(true));
    try {
      const nonce = await getNonce(address);
      const passwordProof = await passkey_prove(password, nonce);

      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );

      const factory = new ethers.Contract(
        CelestialFactory,
        CelestialFactoryABI,
        provider
      );

      const data = factory.interface.encodeFunctionData("executeCelestialTx", [
        name,
        passwordProof,
        recipient,
        (amount * 10 ** 18).toFixed(0),
        "0x",
      ]);

      const txId = await execute(data);

      console.log(txId);

      toast.success("Amount Transfered!");

      dispatch(setStep(0));
      dispatch(setDomain(""));
      dispatch(setAmount(""));
      dispatch(setAddress(""));
      dispatch(setIsLoading(false));
      dispatch(toggleTransferModal(false));
      fetchBalance(address);
      fetchTransactions(address);
      fetchSavings(address);
    } catch (err) {
      console.log(err);
      dispatch(setIsLoading(false));
      toast.error("Something went wrong!");
    }
  };

  return { handleTransfer };
}
