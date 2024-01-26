"use client";

import { Noir } from "@noir-lang/noir_js";
import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import passkeyHash from "@/lib/circuits/passkey_Hash.json";
import { ethers } from "ethers";

export default function useCircuits() {
  const hashPassword = async (password) => {
    const backend = new BarretenbergBackend(passkeyHash, {
      threads: navigator.hardwareConcurrency,
    });

    const noir = new Noir(passkeyHash, backend);

    const input = {
      password: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(password)),
    };

    const output = await noir.execute(input);

    console.log(output.returnValue);
  };

  return { hashPassword };
}
