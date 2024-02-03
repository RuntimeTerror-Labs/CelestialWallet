"use client";
import { handleDialog } from "@/redux/slice/startSavingSlice";
import { handleDialog as handleDlg } from "@/redux/slice/savingsSlice";
import { Button, Chip } from "@material-tailwind/react";
import { FileImage, PiggyBank } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Urbanist } from "next/font/google";
import { toggleNftModal } from "@/redux/slice/modalSlice";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function Saving() {
  const savings = useSelector((state) => state.data.savings);
  const ethPrice = useSelector((state) => state.data.ethPrice);
  const dispatch = useDispatch();

  return (
    <div
      className="border-[1px] border-pink-500 hover:border-black h-full flex flex-col justify-between w-full hover:cursor-pointer bg-white transition duration-300 hover:bg-black rounded-3xl overflow-hidden group relative p-4"
      onClick={() => {
        if (!savings) return toast.error("Please Login!");
        Number(savings[2]) === 0
          ? dispatch(handleDialog())
          : dispatch(handleDlg());
      }}
    >
      <div>
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
            {savings ? (Number(savings[0]) / 10 ** 18).toFixed(4) : "0.0000"}{" "}
            ETH
          </span>
        </p>
      </div>

      <Button
        className={
          "bg-black mb-1 h-32 normal-case flex w-full border-[1px] border-white rounded-2xl hover:cursor-pointer text-white/70 hover:text-pink-500/70 hover:bg-white shadow-lg transition duration-300 p-4 py-3 group relative overflow-hidden z-10 " +
          urbanist.className
        }
        onClick={(e) => {
          e.stopPropagation();
          dispatch(toggleNftModal(true));
        }}
      >
        <p className="text-[2.75rem] font-bold mt-6 ">NFTs</p>
        <FileImage
          className="absolute -bottom-4 -right-2 transition opacity-30 duration-300 group-hover:translate-x-4"
          size={100}
        />
      </Button>

      <PiggyBank
        className="absolute top-14 -right-4 text-pink-500/15 group-hover:text-white/15 transition duration-300 group-hover:translate-x-4"
        size={125}
      />
    </div>
  );
}
