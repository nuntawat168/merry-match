import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useAuth } from "../contexts/authentication";

function UserDeleteAccount() {
  const { logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  async function handleDeleteAccount() {
    try {
      const token = localStorage.getItem("token");
      const user = jwtDecode(token);
      const result = axios.delete(
        `http://localhost:4000/user-profile/${user.id}`
      );
      console.log("handleDeleteAccount");
      onClose();
      logout();
    } catch (error) {
      console.log("Delete user profile failed");
      console.log(error);
      alert("Delete user profile failed");
    }
  }

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
        isCentered={true}
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <div className="w-[528px] h-[200px] bg-white rounded-3xl flex flex-col shadow-btn">
              <div className="w-full border-b border-gray-300 flex flex-row justify-between items-center px-6 py-2">
                <h1 className="text-black text-xl font-semibold">
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
              </div>
              <div className="p-6 flex flex-col space-y-6">
                <p className="text-gray-700 text-base font-normal">
                  Do you sure to delete account?
                </p>
                <div className="w-full flex space-x-4">
                  <button
                    onClick={handleDeleteAccount}
                    className="bg-red-100 px-6 py-3 shadow-btn rounded-full text-red-600 text-base font-bold hover:bg-red-200  focus:bg-red-300"
                  >
                    Yes, I want to delete
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-red-500 px-6 py-3 shadow-btn rounded-full text-white text-base font-bold hover:bg-red-400 focus:bg-red-600"
                  >
                    No, I don't
                  </button>
                </div>
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default UserDeleteAccount;
