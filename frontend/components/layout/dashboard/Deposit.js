import { ArrowDownLeft } from "lucide-react";

export default function Deposit() {
  return (
    <div className="border-[1px] border-indigo-500 hover:border-black h-full w-full hover:cursor-pointer bg-white transition duration-300 hover:bg-black rounded-3xl overflow-hidden group relative p-4">
      <p className="text-4xl font-bold text-indigo-500/70 group-hover:text-white/70 transition duration-300">
        Deposit
      </p>

      <ArrowDownLeft
        className="absolute -bottom-7 -right-3 text-indigo-500/20 group-hover:text-white/20 transition duration-300 group-hover:translate-x-4"
        size={135}
      />
    </div>
  );
}
