import ChangeEmail from "@/components/modal/ChangeEmail";
import DepositModal from "@/components/modal/Deposit";
import TransferModal from "@/components/modal/Transfer";

export default function Layout({ children }) {
  return (
    <>
      <DepositModal />
      <TransferModal />
      {children}
      <ChangeEmail />
    </>
  );
}
