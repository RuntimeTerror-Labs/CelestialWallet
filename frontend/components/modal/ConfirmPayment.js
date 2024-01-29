"use client";

import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

import Ably from "ably";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { setPaymentAmount } from "@/redux/slice/dataSlice";
import { togglePaymentModal } from "@/redux/slice/modalSlice";

const ConfirmPayment = () => {
  const dispatch = useDispatch();

  const selectedContact = useSelector(
    (state) => state.contacts.selectedContact
  );
  const ably = useSelector((state) => state.contacts.ablyAuth);
  const currentUser = useSelector((state) => state.user.user);
  const open = useSelector((state) => state.modal.paymentModal);
  const paymentAmount = useSelector((state) => state.data.paymentAmount);

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

    try {
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

      handleOpen();
    } catch (error) {
      toast.error("Error sending Payment.");
    }
  };

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Confirm Payment
            </Typography>

            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Confirm payment of $
              <span className="font-bold text-red-500">{paymentAmount}</span>?
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Address
            </Typography>
            <Input
              value={currentUser.pubKey}
              readOnly
              label="Address"
              required
              size="lg"
            />
          </CardBody>

          <CardFooter className="pt-0 flex gap-1 justify-end">
            <Button variant="outlined" color="red" onClick={handleOpen}>
              Cancel
            </Button>

            <Button variant="gradient" onClick={sendPayment}>
              Confirm
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default ConfirmPayment;
