"use client";
import {
  handleDialog,
  handleStep,
  setIsLoading,
  setProof,
} from "@/redux/slice/changeEmailSlice";
import { useDispatch, useSelector } from "react-redux";
import { Magic } from "magic-sdk";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import useCelestial from "./useCelestial";
import axios from "axios";
import useCircuits from "./useCircuits";
import { CelestialFactory } from "@/lib/abis/AddressManager";
import CelestialFactoryABI from "@/lib/abis/CelestialFactory.json";
import useRelay from "./useRelay";

export default function useChangeEmail() {
  const dispatch = useDispatch();
  const { getNonce } = useCelestial();
  const { recovery_prove } = useCircuits();
  const { verifyEmail } = useCelestial();
  const walletAddress = useSelector((state) => state.user.user.pubKey);
  const proof = useSelector((state) => state.changeEmail.proof);
  const name = useSelector((state) => state.user.user.username);
  const { execute } = useRelay();
  const { hashRecovery } = useCircuits();

  const verifyCurrentEmail = async (email) => {
    dispatch(setIsLoading(true));
    try {
      const magic = new Magic("pk_live_EC906C44C94A9773");
      await magic.auth.loginWithEmailOTP({ email });
      const userMetadata = await magic.user.isLoggedIn();
      if (!userMetadata) {
        dispatch(setIsLoading(false));
        toast.error("Validation failed!");
        return;
      }

      const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
      const signer = provider.getSigner();

      const nonce = await getNonce(walletAddress);

      const signature = await signer.signMessage(nonce.toString());

      const body = {
        signature,
        message: nonce.toString(),
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/utils/recovery/inputs`,
        body
      );

      const proof = await recovery_prove(
        "0x" + res.data.pub_key_x,
        "0x" + res.data.pub_key_y,
        Array.from(ethers.utils.arrayify(signature)),
        res.data.message
      );

      if (!proof) {
        dispatch(setIsLoading(false));
        toast.error("Error Verifying Email");
        return;
      }

      const isVerified = await verifyEmail(walletAddress, proof);

      if (!isVerified) {
        dispatch(setIsLoading(false));
        toast.error("Error Verifying Email");
        return;
      }

      dispatch(setProof(proof));
      dispatch(setIsLoading(false));
      dispatch(handleStep(1));
    } catch {
      dispatch(setIsLoading(false));
      toast.error("Something Went Wrong!");
      return;
    }
  };

  const changeEmail = async (email) => {
    dispatch(setIsLoading(true));
    try {
      const magic = new Magic("pk_live_EC906C44C94A9773");
      await magic.auth.loginWithEmailOTP({ email });
      const userMetadata = await magic.user.isLoggedIn();
      if (!userMetadata) {
        dispatch(setIsLoading(false));
        toast.error("Validation failed!");
        return;
      }

      const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
      const signer = provider.getSigner();

      const nonce = await getNonce(walletAddress);

      const signature = await signer.signMessage(nonce.toString());

      const body = {
        signature,
        message: nonce.toString(),
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/utils/recovery/inputs`,
        body
      );

      const recoveryHash = await hashRecovery("0x" + res.data.pub_key_x);
      const uint8Array = new Uint8Array(recoveryHash);
      const recoveryHashHex = ethers.utils.hexlify(uint8Array);

      const dataProvider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );

      const factory = new ethers.Contract(
        CelestialFactory,
        CelestialFactoryABI,
        dataProvider
      );

      const data = factory.interface.encodeFunctionData(
        "executeCelestialChangeRecovery",
        [name, proof, recoveryHashHex, email]
      );

      const txId = await execute(data);

      console.log(txId);

      toast.success("Email Changed!");

      dispatch(setIsLoading(false));
      dispatch(handleDialog());
      dispatch(handleStep(0));
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong!");
      dispatch(setIsLoading(false));
      return;
    }
  };

  return { verifyCurrentEmail, changeEmail };
}
