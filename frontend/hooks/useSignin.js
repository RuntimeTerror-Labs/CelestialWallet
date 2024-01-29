"use client";
import toast from "react-hot-toast";
import useCelestial from "./useCelestial";
import useCircuits from "./useCircuits";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  updatePassword,
  updatePubkey,
  updateUsername,
} from "@/redux/slice/userSlice";

export default function useSignin() {
  const { passkey_prove } = useCircuits();
  const { getCelestialAddress, getNonce, verifyPassword } = useCelestial();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignIn = async (domain, password, isRemember) => {
    try {
      const address = await getCelestialAddress(domain);

      const nonce = await getNonce(address);

      const proof = await passkey_prove(password, nonce);

      const isVerified = await verifyPassword(address, proof);

      if (isVerified) {
        toast.success("Successfully signed in");
        dispatch(updatePubkey(address));
        dispatch(updateUsername(domain));
        dispatch(updatePassword(password));
        if (isRemember) localStorage.setItem("domain", domain);
        else localStorage.removeItem("domain");
        router.push(`/dashboard`);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (e) {
      toast.error("Something went wrong");
      return false;
    }
  };

  return { handleSignIn };
}
