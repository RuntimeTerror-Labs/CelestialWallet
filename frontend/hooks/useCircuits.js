"use client";

import { Noir } from "@noir-lang/noir_js";
import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import passkeyHash from "@/lib/circuits/passkey_hash.json";
import recoveryHash from "@/lib/circuits/recovery_hash.json";
import passkeyProve from "@/lib/circuits/passkey_prove.json";
import recoveryProve from "@/lib/circuits/recovery_prove.json";
import { ethers } from "ethers";

export default function useCircuits() {
  const hashPassword = async (password) => {
    const backend = new BarretenbergBackend(passkeyHash, {
      threads: navigator.hardwareConcurrency,
    });

    const noir = new Noir(passkeyHash, backend);

    const input = {
      password: ethers.utils.hexlify(
        ethers.utils.ripemd160(ethers.utils.toUtf8Bytes(password))
      ),
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

  const passkey_prove = async (password, nonce) => {
    const backend = new BarretenbergBackend(passkeyProve, {
      threads: navigator.hardwareConcurrency,
    });

    const noir = new Noir(passkeyProve, backend);

    const passwordHex = await hashPassword(password);

    const inputs = {
      password: ethers.utils.hexlify(
        ethers.utils.ripemd160(ethers.utils.toUtf8Bytes(password))
      ),
      password_hash: passwordHex,
      nonce: ethers.utils.hexlify(nonce),
      use_nonce: ethers.utils.hexlify(nonce),
    };

    const output = await noir.generateFinalProof(inputs);

    return ethers.utils.hexlify(output.proof);
  };

  const recovery_prove = async (pubkeyx, pubkeyy, signature, message) => {
    try {
      const backend = new BarretenbergBackend(recoveryProve, {
        threads: navigator.hardwareConcurrency,
      });

      const recoveryHash = await hashRecovery(pubkeyx);
      const uint8Array = new Uint8Array(recoveryHash);

      signature.pop();

      const inputs = {
        pub_key_x: Array.from(ethers.utils.arrayify(pubkeyx)),
        pub_key_y: Array.from(ethers.utils.arrayify(pubkeyy)),
        signature: signature,
        hashed_message: message,
        pub_key_x_hash: Array.from(uint8Array),
      };

      const noir = new Noir(recoveryProve, backend);

      const output = await noir.generateFinalProof(inputs);

      return ethers.utils.hexlify(output.proof);
    } catch (e) {
      return false;
    }
  };

  return { hashPassword, hashRecovery, passkey_prove, recovery_prove };
}
