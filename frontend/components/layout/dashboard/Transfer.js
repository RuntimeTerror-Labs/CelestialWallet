import { ArrowUpRight } from "lucide-react";

export default function Transfer() {
  return (
    <div className="border-[1px] border-orange-500 hover:border-black h-full w-full hover:cursor-pointer bg-white transition duration-300 hover:bg-black rounded-3xl overflow-hidden group relative p-4">
      <p className="text-4xl font-bold text-orange-500/70 group-hover:text-white/70 transition duration-300">
        Transfer
      </p>

      <ArrowUpRight
        className="absolute -bottom-11 -right-3 text-orange-500/20 group-hover:text-white/20 transition duration-300 group-hover:translate-x-4"
        size={150}
      />
    </div>
  );
}
