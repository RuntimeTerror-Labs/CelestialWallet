"use client";

import { Contract, ethers } from "ethers";
import { CelestialFactory } from "@/lib/abis/AddressManager";
import CelestialFactoryAbi from "@/lib/abis/CelestialFactory.json";

export default function useCelestial() {
  const isValidCelestial = async (name) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );

      const factory = new Contract(
        CelestialFactory,
        CelestialFactoryAbi,
        provider
      );

      const celestialDetails = await factory.getCelestial(name);

      return celestialDetails.isUsed;
    } catch (e) {
      return false;
    }
  };

  const getCelestialAddress = async (name) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );

      const factory = new Contract(
        CelestialFactory,
        CelestialFactoryAbi,
        provider
      );

      const celestialDetails = await factory.getCelestial(name);

      return celestialDetails.walletAddress;
    } catch (e) {
      return false;
    }
  };

  return { isValidCelestial, getCelestialAddress };
}
