"use client";

import { Button } from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/outline";

import { useDispatch } from "react-redux";

import { toggleNewContactModal } from "@/redux/slice/modalSlice";

const AddContactsBtn = () => {
  const dispatch = useDispatch();

  return (
    <Button
      className="p-2.5 bg-transparent shadow-none hover:shadow-sm hover:scale-105 transition-all duration-200 ease-in-out"
      onClick={() => dispatch(toggleNewContactModal(true))}
    >
      <UserPlusIcon className="h-4 w-4 text-black" />
    </Button>
  );
};

export default AddContactsBtn;
