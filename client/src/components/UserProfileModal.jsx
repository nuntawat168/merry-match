import React, { useEffect, useState } from "react";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { useUserProfile } from "../contexts/userProfileContext";

function UserProfileModal(props) {
  const formik = useFormikContext();
  const { capitalize, calculateAge } = useUserProfile();
  const [pictureToRender, setPictureToRender] = useState([]);
  const [numberPicturesProfile, setNumberPicturesProfile] = useState(1);
  const [pictureToRenderIndex, setPictureToRenderIndex] = useState(1);

  useEffect(() => {
    setPictureToRender(
      formik.values.profilePictures.filter((picture) => picture !== null)
    );

    setNumberPicturesProfile(
      formik.values.profilePictures.filter((picture) => picture !== null).length
    );
    setPictureToRenderIndex(1);
  }, [formik.values.profilePictures]);

  function renderPicturesProfile(picture) {
    if (!picture) {
      return (
        <img
          className="w-[478px] h-[478px] object-cover rounded-4xl"
          src=""
          alt=""
        />
      );
    } else if (picture.url !== undefined) {
      return (
        <img
          className="w-[478px] h-[478px] object-cover rounded-4xl"
          src={picture.url}
          alt=""
        />
      );
    } else if (Object.keys(picture).length > 0) {
      const firstKey = Object.keys(picture)[0];
      return (
        <img
          className="w-[478px] h-[478px] object-cover rounded-4xl"
          src={URL.createObjectURL(picture[firstKey])}
          alt=""
        />
      );
    } else {
      return (
        <img
          className="w-[478px] h-[478px] object-cover rounded-4xl"
          src=""
          alt=""
        />
      );
    }
  }

  function handleNextPicture() {
    if (pictureToRenderIndex < numberPicturesProfile) {
      setPictureToRenderIndex((prev) => prev + 1);
    }
  }

  function handlePreviousPicture() {
    if (pictureToRenderIndex > 1) {
      setPictureToRenderIndex((prev) => prev - 1);
    }
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent display="flex" alignItems="center" justifyContent="center">
        <div className="w-[1140px] bg-white rounded-4xl pb-[95px] flex flex-col justify-start items-center">
          <button className="self-end" onClick={props.onClose}>
            <svg
              className="stroke-gray-500 hover:stroke-gray-600 active:stroke-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              width="66"
              height="65"
              viewBox="0 0 66 65"
            >
              <path
                d="M25 40.1854L41 24.5033M25 24.5033L41 40.1854"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="w-[980px] flex flex-row space-x-6 justify-center">
            <div className="w-1/2  flex flex-col">
              {renderPicturesProfile(pictureToRender[pictureToRenderIndex - 1])}
              <div className="flex flex-row justify-between items-center">
                <p className="px-6 py-3 text-base font-normal">
                  <span className="text-gray-700 ">{pictureToRenderIndex}</span>
                  <span className="text-gray-600 ">
                    /{numberPicturesProfile}
                  </span>
                </p>
                <div className="flex flex-row justify-center items-center">
                  <button onClick={handlePreviousPicture}>
                    <svg
                      className="fill-gray-600 hover:fill-red-400 active:fill-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                    >
                      <path d="M30.9732 22.9509H19.5039L24.5147 17.8056C24.9151 17.3944 24.9151 16.7196 24.5147 16.3084C24.1142 15.8972 23.4674 15.8972 23.0669 16.3084L16.3003 23.2567C15.8999 23.6679 15.8999 24.3321 16.3003 24.7433L23.0669 31.6916C23.4674 32.1028 24.1142 32.1028 24.5147 31.6916C24.9151 31.2804 24.9151 30.6161 24.5147 30.2049L19.5039 25.0596H30.9732C31.5379 25.0596 32 24.5852 32 24.0053C32 23.4254 31.5379 22.9509 30.9732 22.9509Z" />
                    </svg>
                  </button>
                  <button onClick={handleNextPicture}>
                    <svg
                      className="fill-gray-600 hover:fill-red-400 active:fill-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                    >
                      <path d="M17.0268 25.0491L28.4961 25.0491L23.4853 30.1944C23.0849 30.6056 23.0849 31.2804 23.4853 31.6916C23.8858 32.1028 24.5326 32.1028 24.9331 31.6916L31.6997 24.7433C32.1001 24.3321 32.1001 23.6679 31.6997 23.2567L24.9331 16.3084C24.5326 15.8972 23.8858 15.8972 23.4853 16.3084C23.0849 16.7196 23.0849 17.3839 23.4853 17.7951L28.4961 22.9404L17.0268 22.9404C16.4621 22.9404 16 23.4148 16 23.9947C16 24.5746 16.4621 25.0491 17.0268 25.0491Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-1/2 pl-[60px] pt-6 flex flex-col space-y-10">
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row space-x-4 justify-start items-center">
                  <p className="text-gray-900 text-5xl font-extrabold">
                    {formik.values.name || ""}
                  </p>
                  <p className="text-gray-700 text-[46px] font-extrabold">
                    {calculateAge(formik.values.dateOfBirth) || ""}
                  </p>
                </div>
                <div className="flex flex-row space-x-4 justify-start items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.6276 22.7196L11.6312 22.7208C11.8676 22.824 11.9996 22.8 11.9996 22.8C11.9996 22.8 12.1316 22.824 12.3692 22.7208L12.3716 22.7196L12.3788 22.716L12.4004 22.7064C12.5143 22.6535 12.6268 22.5975 12.7376 22.5384C12.9608 22.4232 13.2728 22.2504 13.646 22.0188C14.39 21.558 15.38 20.8596 16.3748 19.9008C18.362 17.9856 20.3996 14.9916 20.3996 10.8C20.3996 9.69692 20.1823 8.60462 19.7602 7.58548C19.3381 6.56635 18.7193 5.64034 17.9393 4.86033C17.1593 4.08032 16.2333 3.46158 15.2141 3.03944C14.195 2.6173 13.1027 2.40002 11.9996 2.40002C10.8965 2.40002 9.8042 2.6173 8.78507 3.03944C7.76593 3.46158 6.83992 4.08032 6.05991 4.86033C5.2799 5.64034 4.66116 6.56635 4.23902 7.58548C3.81688 8.60462 3.59961 9.69692 3.59961 10.8C3.59961 14.9904 5.63721 17.9856 7.62561 19.9008C8.45811 20.7004 9.37233 21.4103 10.3532 22.0188C10.7331 22.2547 11.124 22.4726 11.5244 22.6716L11.5988 22.7064L11.6204 22.716L11.6276 22.7196ZM11.9996 13.5C12.7157 13.5 13.4024 13.2156 13.9088 12.7092C14.4151 12.2029 14.6996 11.5161 14.6996 10.8C14.6996 10.0839 14.4151 9.39718 13.9088 8.89084C13.4024 8.38449 12.7157 8.10002 11.9996 8.10002C11.2835 8.10002 10.5968 8.38449 10.0904 8.89084C9.58407 9.39718 9.29961 10.0839 9.29961 10.8C9.29961 11.5161 9.58407 12.2029 10.0904 12.7092C10.5968 13.2156 11.2835 13.5 11.9996 13.5Z"
                      fill="#FFB1C8"
                    />
                  </svg>
                  <p className="text-gray-700 text-xl font-semibold">
                    <span>{formik.values.location || ""}, </span>
                    <span>{formik.values.city || ""}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-row items-center py-2">
                  <p className="w-[191px] text-gray-900 text-base font-normal">
                    Sexual identities
                  </p>
                  <p className="text-gray-700 text-xl font-semibold">
                    {capitalize(formik.values.sexualIdentites) || ""}
                  </p>
                </div>
                <div className="flex flex-row items-center py-2">
                  <p className="w-[191px] text-gray-900 text-base font-normal">
                    Sexual preferences
                  </p>
                  <p className="text-gray-700 text-xl font-semibold">
                    {capitalize(formik.values.sexualPreferences) || ""}
                  </p>
                </div>
                <div className="flex flex-row items-center py-2">
                  <p className="w-[191px] text-gray-900 text-base font-normal">
                    Racial preferences
                  </p>
                  <p className="text-gray-700 text-xl font-semibold">
                    {capitalize(formik.values.racialPreferences) || ""}
                  </p>
                </div>
                <div className="flex flex-row items-center py-2">
                  <p className="w-[191px] text-gray-900 text-base font-normal">
                    Meeting interests
                  </p>
                  <p className="text-gray-700 text-xl font-semibold">
                    {capitalize(formik.values.meetingInterests) || ""}
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <p className="text-gray-900 text-2xl font-bold">About me</p>
                <p className="text-gray-900 text-base font-normal">
                  {formik.values.aboutMe === ""
                    ? "-"
                    : formik.values.aboutMe || ""}
                </p>
              </div>
              <div className="flex flex-col space-y-6">
                <p className="text-gray-900 text-2xl font-bold">
                  Hobbies and Interests
                </p>
                <div className="w-full flex flex-wrap flex-row gap-3">
                  {formik.values.hobbiesInterests.map((tag, index) => {
                    return (
                      <div
                        key={index}
                        className="px-4 py-2 border border-purple-300 rounded-xl text-purple-600 text-base font-normal"
                      >
                        {tag}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}

export default UserProfileModal;
