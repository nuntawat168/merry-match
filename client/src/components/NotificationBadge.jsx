import React, { useEffect } from "react";
import { Fade, useDisclosure } from "@chakra-ui/react";
const NotificationBadge = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (props.count === 0) {
      onClose();
    } else {
      onOpen();
    }
  }, [props.count]);

  return (
    <div className={props.className}>
      <Fade in={isOpen}>
        <div className="flex justify-center items-center w-[20px] h-[20px] rounded-full bg-red-500 text-white text-xs font-normal">
          {props.count}
        </div>
      </Fade>
    </div>
  );
};

export default NotificationBadge;
