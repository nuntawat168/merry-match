import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
const AdminPackageLoading = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (props.openStatus) {
      onOpen();
    } else {
      onClose();
    }
  }, [props]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent
        display="flex"
        alignItems="center"
        justifyContent="center"
        background="none"
        boxShadow="none"
      >
        <div className="w-screen h-screen backdrop-blur-sm z-50 flex justify-center items-center ">
          <svg
            className="z-50 animate-spin"
            fill="none"
            height="48"
            viewBox="0 0 48 48"
            width="48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4"
              stroke="#C70039"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />
          </svg>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default AdminPackageLoading;
