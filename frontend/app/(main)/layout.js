export default function LandingLayout({ children }) {
  return (
    <div className="h-screen max-h-screen w-screen relative overflow-hidden flex flex-col items-center">
      {children}
    </div>
  );
}
