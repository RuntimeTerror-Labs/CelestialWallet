import ChangeEmail from "@/components/modal/ChangeEmail";
import CheckValidity from "@/components/modal/CheckValidity";
import DepositModal from "@/components/modal/Deposit";
import Nfts from "@/components/modal/Nfts";
import Savings from "@/components/modal/Savings";
import StartSaving from "@/components/modal/StartSaving";
import TransferModal from "@/components/modal/Transfer";

export default function Layout({ children }) {
  return (
    <>
      <DepositModal />
      <TransferModal />
      {children}
      <ChangeEmail />
      <StartSaving />
      <Savings />
      <Nfts />
      <CheckValidity />
    </>
  );
}
