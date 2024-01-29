import WalletProvider from "@/providers/WalletProvider";

export default function Layout({ children }) {
  return (
    <>
      <WalletProvider>{children}</WalletProvider>
    </>
  );
}
