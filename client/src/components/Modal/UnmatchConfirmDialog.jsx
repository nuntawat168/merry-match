import { useRef } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Divider,
} from "@chakra-ui/react";

function UnmatchConfirmationDialog({ isOpen, onClose, onConfirm }) {
  const cancelRef = useRef();

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
        <AlertDialogOverlay />
            <AlertDialogContent borderRadius="3xl" maxW="528px">
                <AlertDialogHeader fontSize={20}>Unmatch Confirmation</AlertDialogHeader>
                <AlertDialogCloseButton color="gray.500" marginX={2} marginY={2}/>
                <Divider marginBottom={5} borderColor="gray.300"></Divider>
                <AlertDialogBody fontSize={16} color="gray.600" marginBottom="10px" >Do you want to unmatch this person?</AlertDialogBody>
                <AlertDialogFooter justifyContent="flex-start">
                    <button
                        className="py-[12px] mb-[15px] px-[24px] text-[16px] font-semibold rounded-[99px] bg-red-100 text-red-600 shadow-btn"
                        ref={cancelRef}
                        onClick={onConfirm}
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
  );
}

export default UnmatchConfirmationDialog;