import CheckValidity from "@/components/modal/CheckValidity";

export default function LandingLayout({ children }) {
  return (
    <>
      {children}
      <CheckValidity />
    </>
  );
}
