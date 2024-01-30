"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";
import { ArrowLeftRight, BookX } from "lucide-react";

import Tx from "@/components/layout/dashboard/transactions/Tx";
import Image from "next/image";

const TransactionsPage = () => {
  const router = useRouter();
  // const transactions = useSelector((state) => state.data.transactions);
  const transactions = [
    {
      timestamp: "2024-01-29T23:01:47.000000Z",
      fee: {
        type: "actual",
        value: "25954000000",
      },
      gas_limit: "38931",
      block: 65884879,
      status: "ok",
      method: null,
      confirmations: 111379,
      type: 0,
      exchange_rate: null,
      to: {
        ens_domain_name: null,
        hash: "0xD102ecE5C7eCFEEFF5F19155bf60680aEAaB4AD6",
        implementation_name: null,
        is_contract: true,
        is_verified: true,
        name: "ERC1967Proxy",
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      tx_burnt_fee: null,
      max_fee_per_gas: null,
      result: "success",
      hash: "0xe62f50acdf4626ef9ecd752a6b6b730f4a7ea747e64fead5e9ff6204280573fb",
      gas_price: "1000000",
      priority_fee: null,
      base_fee_per_gas: null,
      from: {
        ens_domain_name: null,
        hash: "0xDb1d125C9f7faE45d7CeE470d048670a85270f4D",
        implementation_name: null,
        is_contract: false,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      token_transfers: null,
      tx_types: ["coin_transfer", "contract_call"],
      gas_used: "25954",
      created_contract: {
        ens_domain_name: null,
        hash: "0x0000000000000000000000000000000000000000",
        implementation_name: null,
        is_contract: true,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      position: 0,
      nonce: 24,
      has_error_in_internal_txs: false,
      actions: [],
      decoded_input: null,
      token_transfers_overflow: null,
      raw_input: "0x",
      value: "1000000000000000",
      max_priority_fee_per_gas: null,
      revert_reason: null,
      confirmation_duration: [0, 343],
      tx_tag: null,
    },
    {
      timestamp: "2024-01-29T23:01:47.000000Z",
      fee: {
        type: "actual",
        value: "25954000000",
      },
      gas_limit: "38931",
      block: 65884879,
      status: "ok",
      method: null,
      confirmations: 111379,
      type: 0,
      exchange_rate: null,
      to: {
        ens_domain_name: null,
        hash: "0xD102ecE5C7eCFEEFF5F19155bf60680aEAaB4AD6",
        implementation_name: null,
        is_contract: true,
        is_verified: true,
        name: "ERC1967Proxy",
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      tx_burnt_fee: null,
      max_fee_per_gas: null,
      result: "success",
      hash: "0xe62f50acdf4626ef9ecd752a6b6b730f4a7ea747e64fead5e9ff6204280573fb",
      gas_price: "1000000",
      priority_fee: null,
      base_fee_per_gas: null,
      from: {
        ens_domain_name: null,
        hash: "0xDb1d125C9f7faE45d7CeE470d048670a85270f4D",
        implementation_name: null,
        is_contract: false,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      token_transfers: null,
      tx_types: ["coin_transfer", "contract_call"],
      gas_used: "25954",
      created_contract: {
        ens_domain_name: null,
        hash: "0x0000000000000000000000000000000000000000",
        implementation_name: null,
        is_contract: true,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      position: 0,
      nonce: 24,
      has_error_in_internal_txs: false,
      actions: [],
      decoded_input: null,
      token_transfers_overflow: null,
      raw_input: "0x",
      value: "1000000000000000",
      max_priority_fee_per_gas: null,
      revert_reason: null,
      confirmation_duration: [0, 343],
      tx_tag: null,
    },
    {
      timestamp: "2024-01-29T23:01:47.000000Z",
      fee: {
        type: "actual",
        value: "25954000000",
      },
      gas_limit: "38931",
      block: 65884879,
      status: "ok",
      method: null,
      confirmations: 111379,
      type: 0,
      exchange_rate: null,
      to: {
        ens_domain_name: null,
        hash: "0xD102ecE5C7eCFEEFF5F19155bf60680aEAaB4AD6",
        implementation_name: null,
        is_contract: true,
        is_verified: true,
        name: "ERC1967Proxy",
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      tx_burnt_fee: null,
      max_fee_per_gas: null,
      result: "success",
      hash: "0xe62f50acdf4626ef9ecd752a6b6b730f4a7ea747e64fead5e9ff6204280573fb",
      gas_price: "1000000",
      priority_fee: null,
      base_fee_per_gas: null,
      from: {
        ens_domain_name: null,
        hash: "0xDb1d125C9f7faE45d7CeE470d048670a85270f4D",
        implementation_name: null,
        is_contract: false,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      token_transfers: null,
      tx_types: ["coin_transfer", "contract_call"],
      gas_used: "25954",
      created_contract: {
        ens_domain_name: null,
        hash: "0x0000000000000000000000000000000000000000",
        implementation_name: null,
        is_contract: true,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      position: 0,
      nonce: 24,
      has_error_in_internal_txs: false,
      actions: [],
      decoded_input: null,
      token_transfers_overflow: null,
      raw_input: "0x",
      value: "1000000000000000",
      max_priority_fee_per_gas: null,
      revert_reason: null,
      confirmation_duration: [0, 343],
      tx_tag: null,
    },
    {
      timestamp: "2024-01-29T23:01:47.000000Z",
      fee: {
        type: "actual",
        value: "25954000000",
      },
      gas_limit: "38931",
      block: 65884879,
      status: "ok",
      method: null,
      confirmations: 111379,
      type: 0,
      exchange_rate: null,
      to: {
        ens_domain_name: null,
        hash: "0xD102ecE5C7eCFEEFF5F19155bf60680aEAaB4AD6",
        implementation_name: null,
        is_contract: true,
        is_verified: true,
        name: "ERC1967Proxy",
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      tx_burnt_fee: null,
      max_fee_per_gas: null,
      result: "success",
      hash: "0xe62f50acdf4626ef9ecd752a6b6b730f4a7ea747e64fead5e9ff6204280573fb",
      gas_price: "1000000",
      priority_fee: null,
      base_fee_per_gas: null,
      from: {
        ens_domain_name: null,
        hash: "0xDb1d125C9f7faE45d7CeE470d048670a85270f4D",
        implementation_name: null,
        is_contract: false,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      token_transfers: null,
      tx_types: ["coin_transfer", "contract_call"],
      gas_used: "25954",
      created_contract: {
        ens_domain_name: null,
        hash: "0x0000000000000000000000000000000000000000",
        implementation_name: null,
        is_contract: true,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      position: 0,
      nonce: 24,
      has_error_in_internal_txs: false,
      actions: [],
      decoded_input: null,
      token_transfers_overflow: null,
      raw_input: "0x",
      value: "1000000000000000",
      max_priority_fee_per_gas: null,
      revert_reason: null,
      confirmation_duration: [0, 343],
      tx_tag: null,
    },
    {
      timestamp: "2024-01-29T23:01:47.000000Z",
      fee: {
        type: "actual",
        value: "25954000000",
      },
      gas_limit: "38931",
      block: 65884879,
      status: "ok",
      method: null,
      confirmations: 111379,
      type: 0,
      exchange_rate: null,
      to: {
        ens_domain_name: null,
        hash: "0xD102ecE5C7eCFEEFF5F19155bf60680aEAaB4AD6",
        implementation_name: null,
        is_contract: true,
        is_verified: true,
        name: "ERC1967Proxy",
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      tx_burnt_fee: null,
      max_fee_per_gas: null,
      result: "success",
      hash: "0xe62f50acdf4626ef9ecd752a6b6b730f4a7ea747e64fead5e9ff6204280573fb",
      gas_price: "1000000",
      priority_fee: null,
      base_fee_per_gas: null,
      from: {
        ens_domain_name: null,
        hash: "0xDb1d125C9f7faE45d7CeE470d048670a85270f4D",
        implementation_name: null,
        is_contract: false,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      token_transfers: null,
      tx_types: ["coin_transfer", "contract_call"],
      gas_used: "25954",
      created_contract: {
        ens_domain_name: null,
        hash: "0x0000000000000000000000000000000000000000",
        implementation_name: null,
        is_contract: true,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      position: 0,
      nonce: 24,
      has_error_in_internal_txs: false,
      actions: [],
      decoded_input: null,
      token_transfers_overflow: null,
      raw_input: "0x",
      value: "1000000000000000",
      max_priority_fee_per_gas: null,
      revert_reason: null,
      confirmation_duration: [0, 343],
      tx_tag: null,
    },
    {
      timestamp: "2024-01-29T23:01:47.000000Z",
      fee: {
        type: "actual",
        value: "25954000000",
      },
      gas_limit: "38931",
      block: 65884879,
      status: "ok",
      method: null,
      confirmations: 111379,
      type: 0,
      exchange_rate: null,
      to: {
        ens_domain_name: null,
        hash: "0xD102ecE5C7eCFEEFF5F19155bf60680aEAaB4AD6",
        implementation_name: null,
        is_contract: true,
        is_verified: true,
        name: "ERC1967Proxy",
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      tx_burnt_fee: null,
      max_fee_per_gas: null,
      result: "success",
      hash: "0xe62f50acdf4626ef9ecd752a6b6b730f4a7ea747e64fead5e9ff6204280573fb",
      gas_price: "1000000",
      priority_fee: null,
      base_fee_per_gas: null,
      from: {
        ens_domain_name: null,
        hash: "0xDb1d125C9f7faE45d7CeE470d048670a85270f4D",
        implementation_name: null,
        is_contract: false,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      token_transfers: null,
      tx_types: ["coin_transfer", "contract_call"],
      gas_used: "25954",
      created_contract: {
        ens_domain_name: null,
        hash: "0x0000000000000000000000000000000000000000",
        implementation_name: null,
        is_contract: true,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      position: 0,
      nonce: 24,
      has_error_in_internal_txs: false,
      actions: [],
      decoded_input: null,
      token_transfers_overflow: null,
      raw_input: "0x",
      value: "1000000000000000",
      max_priority_fee_per_gas: null,
      revert_reason: null,
      confirmation_duration: [0, 343],
      tx_tag: null,
    },
    {
      timestamp: "2024-01-29T23:01:47.000000Z",
      fee: {
        type: "actual",
        value: "25954000000",
      },
      gas_limit: "38931",
      block: 65884879,
      status: "ok",
      method: null,
      confirmations: 111379,
      type: 0,
      exchange_rate: null,
      to: {
        ens_domain_name: null,
        hash: "0xD102ecE5C7eCFEEFF5F19155bf60680aEAaB4AD6",
        implementation_name: null,
        is_contract: true,
        is_verified: true,
        name: "ERC1967Proxy",
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      tx_burnt_fee: null,
      max_fee_per_gas: null,
      result: "success",
      hash: "0xe62f50acdf4626ef9ecd752a6b6b730f4a7ea747e64fead5e9ff6204280573fb",
      gas_price: "1000000",
      priority_fee: null,
      base_fee_per_gas: null,
      from: {
        ens_domain_name: null,
        hash: "0xDb1d125C9f7faE45d7CeE470d048670a85270f4D",
        implementation_name: null,
        is_contract: false,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      token_transfers: null,
      tx_types: ["coin_transfer", "contract_call"],
      gas_used: "25954",
      created_contract: {
        ens_domain_name: null,
        hash: "0x0000000000000000000000000000000000000000",
        implementation_name: null,
        is_contract: true,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      position: 0,
      nonce: 24,
      has_error_in_internal_txs: false,
      actions: [],
      decoded_input: null,
      token_transfers_overflow: null,
      raw_input: "0x",
      value: "1000000000000000",
      max_priority_fee_per_gas: null,
      revert_reason: null,
      confirmation_duration: [0, 343],
      tx_tag: null,
    },
  ];

  return (
    <div className="relative h-screen w-full">
      <Image
        src="/main/tsx-bg.jpg"
        width={500}
        height={500}
        alt=""
        className="absolute bottom-0 right-0"
      />

      <div className="h-full w-full rounded-3xl flex flex-col justify-between relative overflow-hidden max-w-3xl mx-auto">
        <div className="h-full py-4 flex flex-col w-full">
          <p className="text-5xl text-blue-500/70 font-bold">Transactions</p>

          <div className="w-4/5 min-w-96 mx-auto flex-grow overflow-y-auto hide-scroll my-5">
            {transactions &&
              transactions.length > 0 &&
              transactions.map((transaction, index) => {
                return <Tx tx={transaction} key={index} />;
              })}
          </div>

          <div className="w-4/5 min-w-96 mx-auto z-10">
            <Button
              className="rounded-2xl h-10 z-10 w-full bg-blue-500/80"
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>

        <ArrowLeftRight
          className="absolute -bottom-5 -right-3 text-blue-500/20"
          size={125}
        ></ArrowLeftRight>
      </div>
    </div>
  );
};

export default TransactionsPage;
