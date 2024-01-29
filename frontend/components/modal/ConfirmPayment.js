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
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { togglePaymentModal } from "@/redux/slice/modalSlice";

const ConfirmPayment = ({ user, amount, handlePayment }) => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");

  const open = useSelector((state) => state.modal.paymentModal);
  const currentUser = useSelector((state) => state.user.user);
  const selectedContact = useSelector(
    (state) => state.contacts.selectedContact
  );

  const handleOpen = () => {
    dispatch(togglePaymentModal(false));
  };

  const sendPayment = async (e) => {
    e.preventDefault();

    if (!message) {
      toast.error("Message cannot be empty.");
      return;
    }

    setDisabled(true);

    try {
      const realtime = new Ably.Realtime({
        token: ably.token,
      });

      realtime.connection.once("connected", () => {
        const channel = realtime.channels.get(`chatId-${selectedContact._id}`);

        channel.publish("payment", {
          content: message.trim(),
          createdAt: new Date().toISOString(),
          type: "payment",
          sender: currentUser.pubKey,
        });
      });

      axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages`, {
        type: "payment",
        sender: currentUser.pubKey,
        content: message.trim(),
        chat: selectedContact._id,
      });

      setMessage("");
      setDisabled(false);
    } catch (error) {
      toast.error("Error sending message.");
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
              Confirm payment of {amount} to {user}?
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Address
            </Typography>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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

            <Button variant="gradient" onClick={handlePayment}>
              Confirm
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default ConfirmPayment;
