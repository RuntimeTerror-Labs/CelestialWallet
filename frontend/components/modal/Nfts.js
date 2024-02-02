"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Urbanist } from "next/font/google";
import { toggleNftModal } from "@/redux/slice/modalSlice";
import NFT from "./nfts/NFT";
import { ImageOff } from "lucide-react";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export default function Nfts() {
  const dialog = useSelector((state) => state.modal.nftModal);
  const dispatch = useDispatch();
  const nfts = useSelector((state) => state.data.nfts);

  return (
    <Dialog
      size="xs"
      open={dialog}
      className="bg-transparent shadow-none outline-none"
    >
      <div className="h-full w-full flex flex-col justify-center bg-white px-32 rounded-3xl pt-14 pb-2 items-center relative">
        <Card
          className={"w-96 shadow-none bg-transparent " + urbanist.className}
        >
          <CardHeader className="bg-transparent flex text-3xl font-bold shadow-none">
            Savings NFT
          </CardHeader>

          <CardBody className="flex h-96  mt-3 mx-3 relative">
            {nfts?.length !== 0 && (
              <div className="absolute h-full top-0 left-0 w-full overflow-y-auto hide-scroll rounded-3xl ">
                <div className="grid grid-cols-2 gap-4">
                  {nfts?.toReversed().map((nft, index) => (
                    <NFT key={index} nft={nft} />
                  ))}
                </div>
              </div>
            )}

            {nfts?.length === 0 && (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <ImageOff size={100} className="text-black/15" />
              </div>
            )}
          </CardBody>

          <CardFooter className="pt-0">
            <Typography
              variant="small"
              className={"mt-4 flex justify-center " + urbanist.className}
            >
              Back to
              <Typography
                variant="small"
                color="blue-gray"
                className={
                  "ml-1 font-bold hover:cursor-pointer " + urbanist.className
                }
                onClick={() => {
                  dispatch(toggleNftModal());
                }}
              >
                Dashboard
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </Dialog>
  );
}
