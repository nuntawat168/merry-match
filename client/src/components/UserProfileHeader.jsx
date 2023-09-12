function UserProfileHeader() {
  return (
    <div className="flex flex-row justify-between items-end ">
      <div className="w-[453px] flex flex-col justify-start space-y-2">
        <p className="text-beige-700 text-sm font-semibold">PROFILE</p>
        <p className="text-purple-500 text-4/5xl font-extrabold">
          Let's make profile to let other know you
        </p>
      </div>
      <div className="flex space-x-4 font-nunito">
        <button
          className="bg-red-100 text-red-600 text-base font-bold space-x-2 px-6 py-3 rounded-full"
          type="button"
        >
          Preview Profile
        </button>
        <button
          className="bg-red-500 text-white text-base font-bold space-x-2 px-6 py-3 rounded-full"
          type="button"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default UserProfileHeader;
