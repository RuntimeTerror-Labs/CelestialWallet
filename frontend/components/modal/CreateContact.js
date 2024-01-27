"use client";

import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { addContact } from "@/redux/slice/contactsSlice";
import { toggleNewContactModal } from "@/redux/slice/modalSlice";

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
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Create New Contact
            </Typography>

            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter the address and message to create contact.
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Address
            </Typography>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              label="Address"
              required
              size="lg"
            />

            <Typography className="-mb-2" variant="h6">
              Message (Optional)
            </Typography>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              label="Message"
              size="lg"
            />
          </CardBody>

          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleCreateContact} fullWidth>
              Create
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default CreateContact;
