import React from "react";
import ProfilePopup from "./Modal/ProfilePopup";
import { useDisclosure } from "@chakra-ui/react";
import viewIcon from "../assets/icon/Frame.svg";
import { Tooltip } from "@chakra-ui/react";

function ViewProfileButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Tooltip
      bg="gray.400"
      label="See profile"
      aria-label="A tooltip"
      borderRadius="md"
    >
      <div
        onClick={onOpen}
        className="w-[48px] text-[12px] h-[48px] bg-white shadow-nav flex justify-center items-center rounded-2xl ml-[16px] hover:cursor-pointer
      
      "
      >
        <img src={viewIcon} alt="view icon" className="w-[24px] h-[24px]" />
        <ProfilePopup
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          user={props.user}
        />
      </div>
    </Tooltip>
  );
}

export default ViewProfileButton;
