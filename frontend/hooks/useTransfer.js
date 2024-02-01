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
import {
  CelestialFactory,
  CelestialSavingManager,
} from "@/lib/abis/AddressManager";
import useRelay from "./useRelay";
import toast from "react-hot-toast";
import useWalletData from "./useWalletData";
import useSavings from "./useSavings";
import { evaluateTotalAmount } from "@/lib/SavingEvaluater";
import CelestialSavingManagerABI from "@/lib/abis/CelestialSavingManager.json";

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
  const savings = useSelector((state) => state.data.savings);
  const ethPrice = useSelector((state) => state.data.ethPrice);
  const balance = useSelector((state) => state.data.balance);

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

      const amountInDollars = amount * ethPrice;
      const totalAmount = evaluateTotalAmount(amountInDollars);

      const totalSavings = totalAmount - amountInDollars;

      let data;
      if (
        !savings ||
        savings[2] === 0 ||
        totalSavings <= 0 ||
        totalSavings + amountInDollars > balance * ethPrice
      ) {
        data = factory.interface.encodeFunctionData("executeCelestialTx", [
          name,
          passwordProof,
          recipient,
          (amount * 10 ** 18).toFixed(0),
          "0x",
        ]);
      } else {
        const savingContract = new ethers.Contract(
          CelestialSavingManager,
          CelestialSavingManagerABI,
          provider
        );

        const savingsData = savingContract.interface.encodeFunctionData(
          "deposit",
          []
        );

        data = factory.interface.encodeFunctionData("executeCelestialBatchTx", [
          name,
          passwordProof,
          [recipient, CelestialSavingManager],
          [
            (amount * 10 ** 18).toFixed(0),
            ((totalSavings / ethPrice) * 10 ** 18).toFixed(0),
          ],
          ["0x", savingsData],
        ]);
      }

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
