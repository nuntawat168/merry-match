import React from "react";
import ProfilePopup from "./Modal/ProfilePopup";
import { useDisclosure } from "@chakra-ui/react";
import viewIcon from "../assets/icon/Frame.svg";
import { Tooltip } from "@chakra-ui/react";

const MatchCardViewProfileButton = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div
      onClick={onOpen}
      className="w-[32px] h-[32px] rounded-full shadow-nav flex items-center justify-center hover:cursor-pointer
        "
      style={{ background: "rgba(255, 255, 255, 0.20)" }}
    >
      {/* <img src={viewIcon} alt="view icon" className="w-[24px] h-[24px]" /> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M8 10C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8C10 7.46957 9.78929 6.96086 9.41421 6.58579C9.03914 6.21071 8.53043 6 8 6C7.46957 6 6.96086 6.21071 6.58579 6.58579C6.21071 6.96086 6 7.46957 6 8C6 8.53043 6.21071 9.03914 6.58579 9.41421C6.96086 9.78929 7.46957 10 8 10Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.531497 8.47203C0.41398 8.16668 0.41398 7.82858 0.531497 7.52323C1.11328 6.01482 2.13826 4.71798 3.47146 3.80347C4.80467 2.88896 6.38358 2.39967 8.0003 2.40002C11.4059 2.40002 14.3147 4.52802 15.4691 7.52803C15.5867 7.83283 15.5859 8.17123 15.4691 8.47683C14.8873 9.98523 13.8623 11.2821 12.5291 12.1966C11.1959 13.1111 9.61701 13.6004 8.0003 13.6C4.5947 13.6 1.6859 11.472 0.531497 8.47203ZM11.2003 8.00003C11.2003 8.84872 10.8632 9.66265 10.263 10.2628C9.66292 10.8629 8.84899 11.2 8.0003 11.2C7.1516 11.2 6.33767 10.8629 5.73755 10.2628C5.13744 9.66265 4.8003 8.84872 4.8003 8.00003C4.8003 7.15133 5.13744 6.3374 5.73755 5.73728C6.33767 5.13717 7.1516 4.80002 8.0003 4.80002C8.84899 4.80002 9.66292 5.13717 10.263 5.73728C10.8632 6.3374 11.2003 7.15133 11.2003 8.00003Z"
          fill="white"
        />
      </svg>
      <ProfilePopup
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        user={props.user}
      />
    </div>
  );
};

export default MatchCardViewProfileButton;
