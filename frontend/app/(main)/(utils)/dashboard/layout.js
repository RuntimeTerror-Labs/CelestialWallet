import ChangeEmail from "@/components/modal/ChangeEmail";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <ChangeEmail />
    </>
  );
}
