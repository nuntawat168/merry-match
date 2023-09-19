import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

function UserDeleteAccount() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const dialogContentStyles = {
    borderRadius: "24px", // Set the border radius to 24px
    padding: "20px", // Add some padding for better aesthetics
  };
  return (
    <>
      <div className="flex justify-end">
        <button
          className="px-2 py-1 text-gray-700 text-base font-bold"
          onClick={onOpen}
        >
          Delete account
        </button>
      </div>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius="24px" w={500} h="200px">
            <AlertDialogHeader
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px="24px"
              py="8px"
            >
              <h1 className="text-xl text-black font-semibold">
                Delete Confirmation
              </h1>
              <button onClick={onClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                >
                  <path
                    d="M15.5312 24.8485L25.4706 15.1515M15.5312 15.1515L25.4706 24.8485"
                    stroke="#C8CCDB"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </AlertDialogHeader>
            <hr />
            <div className="p-6 flex flex-col  ">
              <AlertDialogBody>Do you sure to delete account?</AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={onClose}>Yes, I want to delete</Button>
                <Button
                  ref={cancelRef}
                  colorScheme="red"
                  onClick={onClose}
                  ml={3}
                >
                  No, I don't
                </Button>
              </AlertDialogFooter>
            </div>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default UserDeleteAccount;
