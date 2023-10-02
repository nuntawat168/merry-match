import React, { useRef } from "react";
import {
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Divider,
} from "@chakra-ui/react";
import merrySelected from "../assets/icon/merrySelected.png";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useMatchLists } from "../contexts/matchListsContext";
import { Tooltip } from "@chakra-ui/react";

function UnmatchButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const { setMatchLists } = useMatchLists();

  const handleUnmatchConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = jwtDecode(token);
      const user_id = user.id;
      const unmatchResult = await axios.delete(
        `https://merry-match.onrender.com/matchlist/unmatch?user_interest=${user_id}&user_response_id=${props.user_response_id}`
      );

      setMatchLists((prev) =>
        prev.filter((user) => user.user_response !== props.user_response_id)
      );
      onClose();
    } catch (error) {
      alert("Unmatch Failed");
    }
  };
  return (
    <Tooltip
      bg="gray.400"
      label="Unmatch"
      aria-label="A tooltip"
      borderRadius="md"
    >
      <div
        className="w-[48px] h-[48px] bg-red-500 flex justify-center items-center rounded-2xl ml-[16px] hover:cursor-pointer"
        onClick={onOpen}
      >
        <img src={merrySelected} alt="merry icon" />
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
          <AlertDialogContent borderRadius="3xl" maxW="528px">
            <AlertDialogHeader fontSize={20}>
              Unmatch Confirmation
            </AlertDialogHeader>
            <AlertDialogCloseButton color="gray.500" marginX={2} marginY={2} />
            <Divider marginBottom={5} borderColor="gray.300"></Divider>
            <AlertDialogBody fontSize={16} color="gray.600" marginBottom="10px">
              Do you want to unmatch this person?
            </AlertDialogBody>
            <AlertDialogFooter justifyContent="flex-start">
              <button
                className="py-[12px] mb-[15px] px-[24px] text-[16px] font-semibold rounded-[99px] bg-red-100 text-red-600 shadow-btn"
                ref={cancelRef}
                onClick={handleUnmatchConfirm}
              >
                Yes, I want to unmatch
              </button>
              <button
                className="ml-4 mb-[15px] py-[12px] px-[24px] text-[16px] font-semibold rounded-[99px] bg-red-500 text-white shadow-login"
                ref={cancelRef}
                onClick={onClose}
              >
                No, I don't
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Tooltip>
  );
}
export default UnmatchButton;
