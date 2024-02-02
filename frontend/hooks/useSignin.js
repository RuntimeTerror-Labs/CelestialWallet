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
import { ethers } from "ethers";
import CelestialABI from "@/lib/abis/Celestial.json";

export default function useSignin() {
  const { hashPassword } = useCircuits();
  const { getCelestialAddress } = useCelestial();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignIn = async (domain, password, isRemember) => {
    try {
      const address = await getCelestialAddress(domain);

      const providers = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );

      const celestial = new ethers.Contract(address, CelestialABI, providers);

      const hash = await celestial.passwordHash();

      const passwordHash = await hashPassword(password);

      if (passwordHash !== hash) {
        toast.error("Invalid credentials");
        return false;
      }

      toast.success("Successfully signed in");
      dispatch(updatePubkey(address));
      dispatch(updateUsername(domain));
      dispatch(updatePassword(password));
      if (isRemember) localStorage.setItem("domain", domain);
      else localStorage.removeItem("domain");
      router.push(`/dashboard`);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
      return false;
    }
  };

  return { handleSignIn };
}
