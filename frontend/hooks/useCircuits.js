"use client";

import { Noir } from "@noir-lang/noir_js";
import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import passkeyHash from "@/lib/circuits/passkey_hash.json";
import recoveryHash from "@/lib/circuits/recovery_hash.json";
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

    return output.returnValue;
  };

  const hashRecovery = async (input) => {
    const backend = new BarretenbergBackend(recoveryHash, {
      threads: navigator.hardwareConcurrency,
    });

    const noir = new Noir(recoveryHash, backend);

    const inputs = {
      input: Array.from(ethers.utils.arrayify(input)),
    };

    const output = await noir.execute(inputs);

    return output.returnValue;
  };

  return { hashPassword, hashRecovery };
}
