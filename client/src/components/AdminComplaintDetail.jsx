import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import arrow_back from "../assets/icon/arrow_back_gray_500.svg";
import { Link } from "react-router-dom";
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
  useToast,
} from "@chakra-ui/react";

const AdminComplaintDetail = () => {
  const [complaint, setComplaint] = useState({});
  const { complaintId } = useParams();
  const [statusUpdated, setStatusUpdated] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/complaint/${complaintId}`)
      .then((response) => {
        const data = response.data;
        setComplaint(data);
      })
      .catch((error) => {
        console.error("Error fetching complaint details:", error);
      });
  }, [complaintId]);

  const markComplaintAsCancel = async (complaintId) => {
    try {
      const timestamp = new Date().toISOString();

      const requestData = {
        status: "Cancel",
        updated_at: timestamp,
      };

      await axios.put(
        `http://localhost:4000/complaint/${complaintId}/status`,
        requestData
      );

      setStatusUpdated(true);
    } catch (error) {
      console.error("Error updating complaint status:", error);
    }
  };

  const markComplaintAsResolved = async (complaintId) => {
    try {
      const timestamp = new Date().toISOString();
      const requestData = {
        status: "Resolved",
        updated_at: timestamp,
      };

      await axios.put(
        `http://localhost:4000/complaint/${complaintId}/status`,
        requestData
      );

      setStatusUpdated(true);
    } catch (error) {
      console.error("Error updating complaint status:", error);
    }
  };

  const handleCancel = async (complaintId) => {

    setDialogType("Cancel");
    onOpen();
  };

  const handleResolved = async (complaintId) => {
    setDialogType("Resolve");
    onOpen();
  };

  useEffect(() => {
    if (statusUpdated) {
      window.location.reload();
    }
  }, [statusUpdated]);

  return (
    <div>
      <section className="w-full flex justify-between h-[10%] px-[60px] py-[16px] ">
        <div className="flex justify-center items-center font-bold text-2xl ">
          <Link to="/complaint">
            <img
              src={arrow_back}
              alt="arrow_back"
              className="mr-[16px] w-[24px] h-[24px]"
            />
          </Link>
          {complaint.issue}
          <span
            className={` ml-[16px] font-normal ${
              complaint.status === "New"
                ? "text-[12px] border rounded-lg bg-beige-100 text-beige-700 w-[46px] h-[26px] pl-2.5 pb-1 "
                : complaint.status === "Pending"
                ? "text-[12px] border rounded-xl bg-yellow-100 text-yellow-500 w-[65px] h-[30px] pl-2.5 pb-1"
                : complaint.status === "Cancel"
                ? "text-[12px] border rounded-xl bg-gray-200 text-gray-700 w-[57px] h-[30px] pl-2.5 pb-1"
                : complaint.status === "Resolved"
                ? "text-[12px] border rounded-xl bg-[#E7FFE7] text-[#197418] w-[70px] h-[30px] pl-2.5 pb-1"
                : ""
            }`}
          >
            {complaint.status}
          </span>
        </div>

        <div className="relative flex gap-1.5 ">
          {complaint.status === "New" || complaint.status === "Pending" ? (
            <button
              type="button"
              className="flex flex-col justify-center px-[24px] py-[12px] mr-4 rounded-full bg-red-100 text-red-500 drop-shadow-md hover:bg-red-600 hover:text-white"
              onClick={() => handleCancel()}
            >
              Cancel Complaint
            </button>
          ) : null}

          {complaint.status === "New" || complaint.status === "Pending" ? (
            <button
              type="submit"
              className="flex flex-col justify-center px-[24px] py-[12px] rounded-full bg-red-500 text-white drop-shadow-md hover:bg-red-600 hover:text-white"
              onClick={() => handleResolved()}
            >
              Resolve Complaint
            </button>
          ) : null}
        </div>
      </section>
      <section className="bg-gray-100 h-screen flex">
        <div className="w-[1080px] h-[642px] bg-white mt-[40px] ml-[60px] text-[20px] text-gray-700 flex items-center justify-center rounded-xl">
          <div className="flex flex-col w-[880px]">
            <span>
              Complaint by:{" "}
              <span className="text-[16px] text-black">{complaint.name}</span>
            </span>
            <hr className="h-px my-8 bg-gray-300 border-0 dark:bg-gray-700 w-[100%]"></hr>
            <span className="mb-[8px]">Issue</span>
            <div className="text-[16px] text-black mb-[40px]">
              {complaint.issue}
            </div>
            <span className="mb-[8px]">Description</span>
            <div className="text-[16px] text-black mb-[40px]">
              {complaint.description}
            </div>
            <span className="mb-[8px]">Date Submitted</span>
            <div className="text-[16px] text-black">
              {complaint.date_submitted
                ? new Date(complaint.date_submitted)
                .toLocaleDateString("en-GB")
                .split(",")[0]
                : ""}
            </div>
            {complaint.status === "Cancel" ||
            complaint.status === "Resolved" ? (
              <div>
                <hr className="h-px my-8 bg-gray-300 border-0 dark:bg-gray-700 w-[100%]" />
                <span className="mb-[8px]">{complaint.status} date</span>
                <div className="text-[16px] text-black">
                  {complaint.updated_at
                    ? new Date(complaint.updated_at).toLocaleString("en-GB", {hour12: true})
                    : ""}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
      {dialogType === "Cancel" && (
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
              Cancel Complaint
            </AlertDialogHeader>
            <AlertDialogCloseButton color="gray.500" marginX={2} marginY={2} />
            <Divider marginBottom={5} borderColor="gray.300"></Divider>
            <AlertDialogBody fontSize={16} color="gray.600" marginBottom="10px">
              Do you sure to cancel this complaint?
            </AlertDialogBody>
            <AlertDialogFooter justifyContent="flex-start">
              <button
                type="submit"
                className="py-[12px] mb-[15px] px-[24px] text-[16px] font-semibold rounded-[99px] bg-red-100 text-red-600 shadow-btn"
                ref={cancelRef}
                onClick={() => {
                  markComplaintAsCancel(complaint.complaint_id);
                  onClose();
                }}
              >
                Yes, cancel this complaint
              </button>

              <button
                className="ml-4 mb-[15px] py-[12px] px-[24px] text-[16px] font-semibold rounded-[99px] bg-red-500 text-white shadow-login"
                ref={cancelRef}
                onClick={() => {
                  onClose();
                }}
              >
                No, give me more time
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {dialogType === "Resolve" && (
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
              Resolve Complaint
            </AlertDialogHeader>
            <AlertDialogCloseButton color="gray.500" marginX={2} marginY={2} />
            <Divider marginBottom={5} borderColor="gray.300"></Divider>
            <AlertDialogBody fontSize={16} color="gray.600" marginBottom="10px">
              This complaint is resolved?
            </AlertDialogBody>
            <AlertDialogFooter justifyContent="flex-start">
              <button
                type="submit"
                className="py-[12px] mb-[15px] px-[24px] text-[16px] font-semibold rounded-[99px] bg-red-100 text-red-600 shadow-btn"
                ref={cancelRef}
                onClick={() => {
                  markComplaintAsResolved(complaint.complaint_id);
                  onClose();
                }}
              >
                Yes, it has been resolved
              </button>

              <button
                className="ml-4 mb-[15px] py-[12px] px-[24px] text-[16px] font-semibold rounded-[99px] bg-red-500 text-white shadow-login"
                ref={cancelRef}
                onClick={() => {
                  onClose();
                }}
              >
                No, it's not
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default AdminComplaintDetail;
