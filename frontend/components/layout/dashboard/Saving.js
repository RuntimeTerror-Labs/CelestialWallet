"use client";
import { handleDialog } from "@/redux/slice/startSavingSlice";
import { handleDialog as handleDlg } from "@/redux/slice/savingsSlice";
import { Chip } from "@material-tailwind/react";
import { PiggyBank } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Saving() {
  const savings = useSelector((state) => state.data.savings);
  const ethPrice = useSelector((state) => state.data.ethPrice);
  const dispatch = useDispatch();

  return (
    <div
      className="border-[1px] border-pink-500 hover:border-black h-full w-full hover:cursor-pointer bg-white transition duration-300 hover:bg-black rounded-3xl overflow-hidden group relative p-4"
      onClick={() => {
        if (!savings) return toast.error("Please Login!");
        Number(savings[2]) === 0
          ? dispatch(handleDialog())
          : dispatch(handleDlg());
      }}
    >
      <p className="text-4xl font-bold text-pink-500/70 group-hover:text-white/70 transition duration-300">
        Savings
      </p>

      {savings &&
        (Number(savings[2]) === 0 ? (
          <Chip
            color="pink"
            className="mt-2 w-fit group-hover:bg-white/70 group-hover:text-black transition duration-300"
            value="Disabled"
          />
        ) : (
          <Chip
            color="pink"
            className="mt-2 w-fit group-hover:bg-white/70 group-hover:text-black transition duration-300"
            value="Enabled"
          />
        ))}

      <p className="mt-2">
        <span className="text-4xl font-bold text-pink-500/70 group-hover:text-white/70 transition duration-300">
          $
          {savings
            ? ((Number(savings[0]) / 10 ** 18) * ethPrice).toFixed(2)
            : "0.00"}
        </span>
      </p>

      <p className="mt-0">
        <span className="text-lg font-bold text-pink-500/40 group-hover:text-white/70 transition duration-300">
          {savings ? (Number(savings[0]) / 10 ** 18).toFixed(4) : "0.0000"} ETH
        </span>
      </p>

      <PiggyBank
        className="absolute -bottom-9 -right-3 text-pink-500/20 group-hover:text-white/20 transition duration-300 group-hover:translate-x-4"
        size={150}
      />
    </div>
  );
}
