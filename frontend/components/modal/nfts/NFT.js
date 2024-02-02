"use client";

import { CelestialSavingManager } from "@/lib/abis/AddressManager";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CelestialSavingManagerABI from "@/lib/abis/CelestialSavingManager.json";
import { PiggyBank } from "lucide-react";

export default function NFT({ nft }) {
  const [balance, setBalance] = useState(0);
  const ethPrice = useSelector((state) => state.data.ethPrice);

  useEffect(() => {
    if (!nft) return;
    fetchNftMetaData();
  }, [nft]);

  const fetchNftMetaData = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_URL
    );

    const savingContract = new ethers.Contract(
      CelestialSavingManager,
      CelestialSavingManagerABI,
      provider
    );

    const balance = await savingContract.tokenURI(nft.toNumber());
    setBalance(balance);
  };

  return (
    <div className="shadow-lg border-[1px] border-black hover:bg-black transition duration-300 rounded-3xl h-44 p-4 relative overflow-hidden group">
      <p className="mt-2">
        <span className="text-4xl font-bold text-black/70 group-hover:text-white/70 transition duration-300">
          $
          {balance
            ? ((Number(balance) / 10 ** 18) * ethPrice).toFixed(2)
            : "0.00"}
        </span>
      </p>

      <p className="mt-0">
        <span className="text-lg font-bold text-black/40 group-hover:text-white/70  transition duration-300">
          {balance ? (Number(balance) / 10 ** 18).toFixed(4) : "0.0000"} ETH
        </span>
      </p>

      <PiggyBank
        className="absolute -bottom-6 -right-4 text-black/15 group-hover:text-white/15 transition duration-300 group-hover:-translate-x-4"
        size={125}
      />
    </div>
  );
}
