import { useFormikContext } from "formik";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
function ProfilePicturesForm() {
  const formik = useFormikContext();

  const handleFileChange = (event, pictureId) => {
    const uniqueId = Date.now();
    const tmpProfilePictures = formik.values.profilePictures;
    const pictureIndex = tmpProfilePictures.findIndex(
      (profilePicture) => profilePicture.id === pictureId
    );
    tmpProfilePictures[pictureIndex].picture = {
      [uniqueId]: event.target.files[0],
    };
    formik.setFieldValue("profilePictures", tmpProfilePictures);
  };

  const handleDeletePictureProfile = (pictureId) => {
    console.log("Delete button clicked");
    const tmpProfilePictures = formik.values.profilePictures;
    const pictureIndex = tmpProfilePictures.findIndex(
      (profilePicture) => profilePicture.id === pictureId
    );
    tmpProfilePictures[pictureIndex].picture = null;
    formik.setFieldValue("profilePictures", tmpProfilePictures);
  };

  function RenderPicture({ profilePicture }) {
    const picture = profilePicture.picture;
    const pictureId = profilePicture.id;
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: pictureId });
    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };
    if (picture === null) {
      return (
        <label
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          key={pictureId}
          htmlFor={pictureId}
          className={`w-[167px] h-[167px] bg-gray-200 rounded-2xl flex flex-col justify-center items-center space-y-2 cursor-pointer ${
            isDragging && `z-50`
          }`}
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
            id={pictureId}
            name="avatar"
            type="file"
            onChange={(event) => {
              handleFileChange(event, pictureId);
            }}
            hidden
          />
        </label>
      );
    } else {
      return (
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          key={pictureId}
          className={`w-[167px] h-[167px] bg-gray-200 rounded-2xl flex flex-col justify-center items-center space-y-2  relative ${
            isDragging && `z-50`
          }`}
        >
          <img
            src={URL.createObjectURL(picture[Object.keys(picture)[0]])}
            className="w-full h-full object-cover rounded-2xl"
          />
          <button
            className="w-6 h-6 flex justify-center items-center bg-red rounded-full z-30 absolute left-[147px] bottom-[147px]"
            onMouseDown={() => handleDeletePictureProfile(pictureId)}
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
    }
  }

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const tmpProfilePictures = formik.values.profilePictures;

      const oldIndex = tmpProfilePictures.findIndex(
        (profilePicture) => profilePicture.id === active.id
      );
      const newIndex = tmpProfilePictures.findIndex(
        (profilePicture) => profilePicture.id === over.id
      );
      formik.setFieldValue(
        "profilePictures",
        arrayMove(tmpProfilePictures, oldIndex, newIndex)
      );
    }
  };

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
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext
            items={formik.values.profilePictures}
            strategy={horizontalListSortingStrategy}
          >
            {formik.values.profilePictures.map((profilePicture) => {
              return (
                <RenderPicture
                  key={profilePicture.id}
                  profilePicture={profilePicture}
                />
              );
            })}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default ProfilePicturesForm;
