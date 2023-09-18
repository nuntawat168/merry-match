import React, { useEffect } from "react";
import { useUserProfile } from "../contexts/userProfileContext";
function UserProfileLoading() {
  const { isSubmit, setIsSubmit } = useUserProfile();
  useEffect(() => {
    if (isSubmit) {
      // Disable scroll
      document.body.style.overflow = "hidden";
    } else {
      // Enable scroll
      document.body.style.overflow = "auto";
    }
  }, [isSubmit]);
  return (
    <>
      {isSubmit && (
        <div className="w-screen h-screen backdrop-blur-sm z-50 flex justify-center items-center absolute top-0 left-0">
          <svg
            className="animate-spin"
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
      )}
    </>
  );
}

export default UserProfileLoading;
