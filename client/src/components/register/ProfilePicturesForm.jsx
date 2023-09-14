import { useEffect, useContext } from "react";
import { useFormikContext } from "formik";
import { useRegister } from "../../contexts/registerContext";
import { useUserProfile } from "../../contexts/userProfileContext";
function ProfilePicturesForm() {
  function importModule() {
    try {
      const { picturesProfile, setPicturesProfile } = useRegister();
      return { picturesProfile, setPicturesProfile };
    } catch {
      const { picturesProfile, setPicturesProfile } = useUserProfile();
      return { picturesProfile, setPicturesProfile };
    }
  }
  const { picturesProfile, setPicturesProfile } = importModule();
  const formik = useFormikContext();

  const handleFileChange = (event, index) => {
    const uniqueId = Date.now();
    const tmpPicturesProfile = [...picturesProfile];
    tmpPicturesProfile.splice(index, 1, { [uniqueId]: event.target.files[0] });

    setPicturesProfile([...tmpPicturesProfile]);
  };

  const handleDeletePictureProfile = (index) => {
    const tmpPicturesProfile = [...picturesProfile];
    tmpPicturesProfile.splice(index, 1, null);
    setPicturesProfile([...tmpPicturesProfile]);
  };

  useEffect(() => {
    const tmpPicturesProfile = [...picturesProfile].filter(
      (picture) => picture !== null
    );
    const objProfilePictures = tmpPicturesProfile.reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});
    formik.setFieldValue("profilePictures", objProfilePictures);
  }, [picturesProfile]);

  function renderPicture(isPicture, index, url) {
    if (isPicture) {
      return (
        <div
          key={index}
          className="w-[167px] h-[167px] bg-gray-200 rounded-2xl flex flex-col justify-center items-center space-y-2  relative"
        >
          <img src={url} className="w-full h-full object-cover rounded-2xl" />
          <button
            className="w-6 h-6 flex justify-center items-center bg-red rounded-full z-30 absolute left-[147px] bottom-[147px]"
            onClick={() => handleDeletePictureProfile(index)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4.11768 11.8824L11.8824 4.11768M4.11768 4.11768L11.8824 11.8824"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      );
    } else {
      const inputId = `upload-${index}`;
      return (
        <label
          key={index}
          htmlFor={inputId}
          className="w-[167px] h-[167px] bg-gray-200 rounded-2xl flex flex-col justify-center items-center space-y-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M12.5 4.5V19.5M20 12H5"
              stroke="#7D2262"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p className="text-purple-600 text-sm font-medium">Upload photo</p>
          <input
            id={inputId}
            name="avatar"
            type="file"
            onChange={(event) => handleFileChange(event, index)}
            hidden
          />
        </label>
      );
    }
  }

  return (
    <div className="w-[930px] flex flex-col justify-start items-start font-nunito">
      <p className="text-purple-500 text-2xl font-bold">Profile Pictures</p>
      <p
        className={`${
          formik.submitCount !== 0 && formik.errors.profilePictures
            ? "text-red-300"
            : "text-gray-800"
        }    text-base font-normal mt-1`}
      >
        Upload at least 2 photos
      </p>
      <div
        className={`${
          formik.submitCount !== 0 && formik.errors.profilePictures
            ? "border-2 border-red-300 rounded-2xl"
            : null
        } w-full flex flex-row mt-6 justify-center space-x-6 `}
      >
        {picturesProfile.map((element, index) => {
          if (element !== null) {
            return renderPicture(
              true,
              index,
              URL.createObjectURL(element[Object.keys(element)[0]])
            );
          } else {
            return renderPicture(false, index);
          }
        })}
      </div>
    </div>
  );
}

export default ProfilePicturesForm;
