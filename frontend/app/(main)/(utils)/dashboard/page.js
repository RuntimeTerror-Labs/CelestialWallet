import Balance from "@/components/layout/dashboard/Balance";
import Deposit from "@/components/layout/dashboard/Deposit";
import EmailChange from "@/components/layout/dashboard/EmailChange";
import Info from "@/components/layout/dashboard/Info";
import Logo from "@/components/layout/dashboard/Logo";
import Saving from "@/components/layout/dashboard/Saving";
import Signout from "@/components/layout/dashboard/Signout";
import Transactions from "@/components/layout/dashboard/Transactions";
import Transfer from "@/components/layout/dashboard/Transfer";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="h-full w-full bg-[#eeeeee] flex items-center justify-center relative">
      <Image
        src="/main/dashboard/bg.jpg"
        alt="Celestial"
        width={1500}
        height={1080}
        className="absolute -right-1/3 md:-bottom-1/2 -bottom-32 opacity-70 -z-0"
      />
      <div className="grid grid-cols-4 grid-rows-4 gap-4 mt-4 z-10">
        <div className="border-[1px] bg-white rounded-3xl h-full w-52 row-span-2 shadow-lg">
          <Info />
        </div>
        <div className="border-[1px] rounded-3xl h-[9.7rem] w-52">
          <Transfer />
        </div>
        <div className="border-[1px] rounded-3xl h-[9.7rem] w-52 shadow-lg">
          <Logo />
        </div>
        <div className="border-[1px] rounded-3xl h-full w-52 row-span-2">
          <Saving />
        </div>
        <div className="border-[1px] rounded-3xl h-full w-full row-span-2 col-span-2 shadow-lg">
          <Balance />
        </div>
        <div className="border-[1px] rounded-3xl shadow-lg border-blue-500 h-full w-52 row-span-2">
          <Transactions />
        </div>
        <div className="rounded-3xl h-[9.7rem] w-52 shadow-lg">
          <Signout />
        </div>
        <div className="border-[1px] rounded-3xl h-[9.7rem] w-52">
          <Deposit />
        </div>
        <div className="rounded-3xl h-[9.7rem] w-full col-span-2">
          <EmailChange />
        </div>
      </div>
    </div>
  );
}
