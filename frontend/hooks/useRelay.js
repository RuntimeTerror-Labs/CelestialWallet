"use client";

import { ethers } from "ethers";
import axios from "axios";
import {
  CelestialFactory,
  CelestialForwarder,
} from "@/lib/abis/AddressManager";
import CelestialForwarderABI from "@/lib/abis/CelestialForwarder.json";

export default function useRelay() {
  const data712 = async (forwarder, message) => {
    return {
      types: {
        ForwardRequest: [
          { name: "from", type: "address" },
          { name: "to", type: "address" },
          { name: "value", type: "uint256" },
          { name: "gas", type: "uint256" },
          { name: "nonce", type: "uint256" },
          { name: "deadline", type: "uint48" },
          { name: "data", type: "bytes" },
        ],
      },
      primaryType: "ForwardRequest",
      domain: {
        name: "CelestialForwarder",
        version: "1",
        verifyingContract: CelestialForwarder,
        chainId: 1891,
      },
      message: message,
    };
  };

  const execute = async (data) => {
    const keyPair = ethers.Wallet.createRandom();

    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_URL
    );

    const forwarder = new ethers.Contract(
      CelestialForwarder,
      CelestialForwarderABI,
      provider
    );

    const message = {
      from: keyPair.address,
      to: CelestialFactory,
      value: 0,
      gas: 1000000,
      nonce: Number(await forwarder.nonces(keyPair.address)),
      deadline: Number((Date.now() / 1000).toFixed(0)) + 2000,
      data: data,
    };

    const forwardRequestData = await data712(forwarder, message);

    const signature = await keyPair._signTypedData(
      forwardRequestData.domain,
      forwardRequestData.types,
      forwardRequestData.message
    );

    const forwardRequest = {
      from: message.from,
      to: message.to,
      value: message.value,
      gas: message.gas,
      deadline: message.deadline,
      data: message.data,
      signature: signature,
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/relay`,
      {
        forwardRequest,
      },
      {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.error);
    }

    return response.data.receipt;
  };

  return {
    execute,
  };
}
