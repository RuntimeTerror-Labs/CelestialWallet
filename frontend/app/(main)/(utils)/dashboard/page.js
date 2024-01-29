import Balance from "@/components/layout/dashboard/Balance";
import Logo from "@/components/layout/dashboard/Logo";
import Signout from "@/components/layout/dashboard/Signout";

export default function Dashboard() {
  return (
    <div className="h-full w-full bg-[#eeeeee] flex items-center justify-center">
      <div className="grid grid-cols-4 grid-rows-4 gap-4 mt-4">
        <div className="border-[1px] border-black rounded-3xl h-full w-52 row-span-2"></div>
        <div className="border-[1px] border-black rounded-3xl h-40 w-52"></div>
        <div className="border-[1px] rounded-3xl h-40 w-52 shadow-lg">
          <Logo />
        </div>
        <div className="border-[1px] border-black rounded-3xl h-full w-52 row-span-2"></div>
        <div className="border-[1px] rounded-3xl h-full w-full row-span-2 col-span-2 shadow-lg">
          <Balance />
        </div>
        <div className="border-[1px] border-black rounded-3xl h-full w-52 row-span-2"></div>
        <div className="rounded-3xl h-40 w-52 shadow-lg">
          <Signout />
        </div>
        <div className="border-[1px] border-black rounded-3xl h-40 w-52"></div>
        <div className="border-[1px] border-black rounded-3xl h-40 w-full col-span-2"></div>
      </div>
    </div>
  );
}
