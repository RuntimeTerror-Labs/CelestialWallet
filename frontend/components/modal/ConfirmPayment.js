"use client";

import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  CardHeader,
  Input,
} from "@material-tailwind/react";

import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { setPaymentAmount } from "@/redux/slice/dataSlice";
import { togglePaymentModal } from "@/redux/slice/modalSlice";
import Image from "next/image";
import { Urbanist } from "next/font/google";
import useChatPayment from "@/hooks/useChatPayment";
import { setIsLoading } from "@/redux/slice/transferSlice";
import { Loader2, PiggyBank } from "lucide-react";
import { evaluateTotalAmount } from "@/lib/SavingEvaluater";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

const ConfirmPayment = () => {
  const dispatch = useDispatch();

  const selectedContact = useSelector(
    (state) => state.contacts.selectedContact
  );
  const ably = useSelector((state) => state.contacts.ablyAuth);
  const currentUser = useSelector((state) => state.user.user);
  const open = useSelector((state) => state.modal.paymentModal);
  const paymentAmount = useSelector((state) => state.data.paymentAmount);
  const isLoading = useSelector((state) => state.transfer.isLoading);
  const { handlePayment } = useChatPayment();
  const balance = useSelector((state) => state.data.balance);
  const ethPrice = useSelector((state) => state.data.ethPrice);
  const savings = useSelector((state) => state.data.savings);

  const handleOpen = () => {
    dispatch(setPaymentAmount(0));
    dispatch(togglePaymentModal(false));
  };

  const sendPayment = async (e) => {
    e.preventDefault();

    if (!paymentAmount) {
      toast.error("Amount cannot be empty or 0.");
      return;
    }

    dispatch(setIsLoading(true));
    try {
      const success = await handlePayment();

      if (!success) {
        toast.error("Error sending Payment.");
        dispatch(setIsLoading(false));
        return;
      }

      const channel = ably.channels.get(`chatId-${selectedContact._id}`);

      channel.publish("payment", {
        content: paymentAmount,
        createdAt: new Date().toISOString(),
        type: "payment",
        sender: currentUser.pubKey,
      });

      axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages`, {
        type: "payment",
        sender: currentUser.pubKey,
        content: paymentAmount,
        chat: selectedContact._id,
      });

      dispatch(setIsLoading(false));
      handleOpen();
    } catch (error) {
      toast.error("Error sending Payment.");
      dispatch(setIsLoading(false));
    }
  };

  return (
    <>
      <Dialog size="xs" open={open} className="bg-transparent shadow-none">
        <div className="h-full w-full flex flex-col justify-center bg-white rounded-3xl pt-20 pb-5 items-center relative">
          <Card className="w-96 shadow-none bg-transparent">
            <CardHeader className="bg-transparent flex justify-center shadow-none">
              <Image
                src="/main/logo.png"
                alt="Celestial"
                width={140}
                height={140}
                className="mb-3"
              />
            </CardHeader>

            <CardBody className="flex flex-col gap-4 -mt-2">
              <div className="flex flex-col w-full">
                <p className={"text-center " + urbanist.className}>
                  Do you want to send{" "}
                  <span className="font-bold">
                    ${Number(paymentAmount).toFixed(2)}
                  </span>{" "}
                  to{" "}
                  <span className="font-bold">
                    {selectedContact &&
                      selectedContact.users[1].substring(0, 4) +
                        "..." +
                        selectedContact.users[1].substring(36, 42)}
                  </span>
                  ?
                </p>

                {savings &&
                  savings[2] !== 0 &&
                  paymentAmount &&
                  balance * ethPrice >= paymentAmount &&
                  evaluateTotalAmount(paymentAmount) - paymentAmount > 0 &&
                  evaluateTotalAmount(paymentAmount) <= balance * ethPrice &&
                  Number(paymentAmount) !== 0 && (
                    <div className="flex items-center justify-center text-sm text-blue-600/50 mt-3 -mb-4 ">
                      <PiggyBank size={20} className="mr-2 animate-bounce" />
                      <span className={urbanist.className + " font-medium"}>
                        Sending
                        <span className="font-bold">
                          {" "}
                          ${" "}
                          {(
                            evaluateTotalAmount(paymentAmount) - paymentAmount
                          ).toFixed(2)}
                        </span>{" "}
                        to your savings account
                      </span>
                    </div>
                  )}

                <Button
                  variant="gradient"
                  fullWidth
                  className={
                    urbanist.className +
                    " flex items-center mt-7 justify-center"
                  }
                  onClick={(e) => {
                    sendPayment(e);
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 size={20} className="inline mr-1 animate-spin" />
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </div>
            </CardBody>

            <CardFooter className="pt-0 -mt-7">
              {!isLoading && (
                <Typography
                  variant="small"
                  className={"mt-4 flex justify-center " + urbanist.className}
                >
                  Back to
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className={
                      "ml-1 font-bold hover:cursor-pointer " +
                      urbanist.className
                    }
                    onClick={() => {
                      handleOpen();
                    }}
                  >
                    Dashboard
                  </Typography>
                </Typography>
              )}
            </CardFooter>
          </Card>
        </div>
      </Dialog>
    </>
  );
};

export default ConfirmPayment;
