"use client";

import { Magic } from "magic-sdk";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "@/redux/slice/signupSlice";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import axios from "axios";
import useCircuits from "@/hooks/useCircuits";
import useRelay from "./useRelay";
import { CelestialFactory } from "@/lib/abis/AddressManager";
import CelestialFactoryABI from "@/lib/abis/CelestialFactory.json";
import {
  updatePassword,
  updatePubkey,
  updateUsername,
} from "@/redux/slice/userSlice";
import { useRouter } from "next/navigation";

export default function useSignup() {
  const dispatch = useDispatch();
  const { hashRecovery, hashPassword } = useCircuits();
  const password = useSelector((state) => state.signup.password);
  const { execute } = useRelay();
  const name = useSelector((state) => state.signup.name);
  const router = useRouter();

  const handleSignup = async (email) => {
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

      const signature = await signer.signMessage(
        ethers.utils.hashMessage(
          ethers.utils.toUtf8Bytes("Celestial_New_User_Sign_Up")
        )
      );

      const body = {
        signature,
        message: "Celestial_New_User_Sign_Up",
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/utils/recovery/inputs`,
        body
      );

      const recoveryHash = await hashRecovery("0x" + res.data.pub_key_x);
      const uint8Array = new Uint8Array(recoveryHash);
      const recoveryHashHex = ethers.utils.hexlify(uint8Array);

      const passwordHash = await hashPassword(password);

      const dataProvider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );

      const factory = new ethers.Contract(
        CelestialFactory,
        CelestialFactoryABI,
        dataProvider
      );

      const data = factory.interface.encodeFunctionData("createAccount", [
        name + "@celestial",
        passwordHash,
        recoveryHashHex,
        1,
      ]);

      const txId = await execute(data);
      console.log(txId);
      toast.success("Account created!");

      const wallet = await factory.getCelestial(name + "@celestial");
      dispatch(updatePubkey(wallet.walletAddress));
      dispatch(updateUsername(name + "@celestial"));
      dispatch(updatePassword(password));

      router.push("/dashboard");

      dispatch(setIsLoading(false));
    } catch (e) {
      console.log(e);
      dispatch(setIsLoading(false));
      toast.error("Something went wrong!");
    }
  };

  return { handleSignup };
}
