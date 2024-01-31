"use client";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Magic } from "magic-sdk";
import { ethers } from "ethers";
import useCelestial from "./useCelestial";
import axios from "axios";
import useCircuits from "./useCircuits";
import { CelestialFactory } from "@/lib/abis/AddressManager";
import CelestialFactoryABI from "@/lib/abis/CelestialFactory.json";
import useRelay from "./useRelay";
import {
  handleDialog,
  setAddress,
  setDomain,
  setIsLoading,
  setProof,
  setSteps,
} from "@/redux/slice/forgotPasswordSlice";

export default function useForgotPassword() {
  const dispatch = useDispatch();
  const { getNonce } = useCelestial();
  const { recovery_prove } = useCircuits();
  const walletAddress = useSelector((state) => state.forgotPassword.address);
  const domain = useSelector((state) => state.forgotPassword.domain);
  const proof = useSelector((state) => state.forgotPassword.proof);
  const { verifyEmail: verifyEmailCelestial, getEmail } = useCelestial();
  const { execute } = useRelay();
  const { hashPassword } = useCircuits();

  const verifyEmail = async (email) => {
    dispatch(setIsLoading(true));
    try {
      const currentEmail = await getEmail(walletAddress);
      if (currentEmail !== email) {
        dispatch(setIsLoading(false));
        dispatch(handleDialog());
        dispatch(setSteps(0));
        toast.error("Email does not match!");
        return;
      }

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

      const isVerified = await verifyEmailCelestial(walletAddress, proof);

      if (!isVerified) {
        dispatch(setIsLoading(false));
        toast.error("Error Verifying Email");
        return;
      }

      dispatch(setProof(proof));
      dispatch(setIsLoading(false));
      dispatch(setSteps(2));
    } catch {
      dispatch(setIsLoading(false));
      toast.error("Something Went Wrong!");
      return;
    }
  };

  const changePassword = async (password) => {
    dispatch(setIsLoading(true));
    try {
      const passwordHash = await hashPassword(password);

      const dataProvider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );

      const factory = new ethers.Contract(
        CelestialFactory,
        CelestialFactoryABI,
        dataProvider
      );

      const data = factory.interface.encodeFunctionData(
        "executeCelestialPasskeyRecovery",
        [domain, proof, passwordHash]
      );

      const txId = await execute(data);

      console.log(txId);

      toast.success("Password Changed!");

      dispatch(setIsLoading(false));
      dispatch(handleDialog());
      dispatch(setSteps(0));
      dispatch(setProof(null));
      dispatch(setDomain(""));
      dispatch(setAddress(""));
    } catch {
      dispatch(setIsLoading(false));
      toast.error("Something Went Wrong!");
      return;
    }
  };

  return { verifyEmail, changePassword };
}
