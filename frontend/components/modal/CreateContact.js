"use client";

import {
  Card,
  Input,
  Button,
  Dialog,
  Textarea,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { toggleNewContactModal } from "@/redux/slice/modalSlice";
import { addContact, addOriginalContact } from "@/redux/slice/contactsSlice";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

const CreateContact = () => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const open = useSelector((state) => state.modal.newContactModal);
  const currentUser = useSelector((state) => state.user.user);

  const handleOpen = () => {
    dispatch(toggleNewContactModal(false));
  };

  const handleCreateContact = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contacts`,
        {
          currentUser: currentUser.pubKey,
          userId: address,
          message,
        }
      );

      dispatch(addContact(res.data));
      dispatch(addOriginalContact(res.data));
      handleOpen();
    } catch (err) {
      toast.error("Failed to create contact");
    }
  };

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className={"bg-transparent shadow-none"}
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className={"flex flex-col gap-4 " + urbanist.className}>
            <Typography
              variant="h4"
              color="blue-gray"
              className={urbanist.className}
            >
              Create New Contact
            </Typography>

            <Typography
              className={"mb-3 font-normal " + urbanist.className}
              variant="paragraph"
              color="gray"
            >
              Enter the address and message to create contact.
            </Typography>

            <Typography
              variant="h6"
              className={"-mb-2 -mt-2 " + urbanist.className}
            >
              Address
            </Typography>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              label="Address"
              required
              size="lg"
              className={urbanist.className}
            />

            <Typography className={"-mb-2 " + urbanist.className} variant="h6">
              Message (Optional)
            </Typography>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              label="Message"
              size="lg"
              className={urbanist.className}
            />
          </CardBody>

          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              onClick={handleCreateContact}
              className={urbanist.className}
              fullWidth
            >
              Create
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default CreateContact;
