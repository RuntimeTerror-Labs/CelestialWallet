"use client";

import { Contract, ethers } from "ethers";
import { CelestialFactory } from "@/lib/abis/AddressManager";
import CelestialFactoryAbi from "@/lib/abis/CelestialFactory.json";
import CelestialABI from "@/lib/abis/Celestial.json";

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

  const verifyPassword = async (address, proof) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );

      const Celestial = new Contract(address, CelestialABI, provider);

      const isVerified = await Celestial.verifyPasskey(proof);

      return isVerified;
    } catch (e) {
      return false;
    }
  };

  const getNonce = async (address) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );

      const Celestial = new Contract(address, CelestialABI, provider);

      const nonce = await Celestial.getNonce();

      return nonce;
    } catch (e) {
      return 0;
    }
  };

  return { isValidCelestial, getCelestialAddress, verifyPassword, getNonce };
}
