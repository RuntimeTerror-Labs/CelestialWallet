"use client";
import {
  CelestialFactory,
  CelestialSavingManager,
} from "@/lib/abis/AddressManager";
import { useSelector } from "react-redux";
import CelestialFactoryABI from "@/lib/abis/CelestialFactory.json";
import CelestialSavingManagerABI from "@/lib/abis/CelestialSavingManager.json";
import useCircuits from "./useCircuits";
import useCelestial from "./useCelestial";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import useRelay from "./useRelay";
import { evaluateTotalAmount } from "@/lib/SavingEvaluater";

export default function useChatPayment() {
  const amount = useSelector((state) => state.data.paymentAmount);
  const balance = useSelector((state) => state.data.balance);
  const ethPrice = useSelector((state) => state.data.ethPrice);
  const savings = useSelector((state) => state.data.savings);
  const password = useSelector((state) => state.user.user.password);
  const address = useSelector((state) => state.user.user.pubKey);
  const name = useSelector((state) => state.user.user.username);
  const selectedContact = useSelector(
    (state) => state.contacts.selectedContact
  );
  const recipient = selectedContact
    ? selectedContact.users[0] === address
      ? selectedContact.users[1]
      : selectedContact.users[0]
    : "";
  const { passkey_prove } = useCircuits();
  const { getNonce } = useCelestial();
  const { execute } = useRelay();

  const handlePayment = async () => {
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

      const totalAmount = evaluateTotalAmount(Number(amount));

      const totalSavings = totalAmount - amount;

      let data;
      if (
        !savings ||
        savings[2] === 0 ||
        totalSavings <= 0 ||
        Number(totalSavings) + Number(amount) > balance * ethPrice
      ) {
        data = factory.interface.encodeFunctionData("executeCelestialTx", [
          name,
          passwordProof,
          recipient,
          ((amount / ethPrice) * 10 ** 18).toFixed(0),
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
            ((amount / ethPrice) * 10 ** 18).toFixed(0),
            ((totalSavings / ethPrice) * 10 ** 18).toFixed(0),
          ],
          ["0x", savingsData],
        ]);
      }

      const txId = await execute(data);

      console.log(txId);

      toast.success("Amount Transfered!");

      return true;
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
      return false;
    }
  };

  return { handlePayment };
}
