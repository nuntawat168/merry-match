function AdminNavBar() {
  return (
    <nav className="w-full flex justify-between h-[10%] px-[60px] py-[16px] ">
      <div className="flex flex-col justify-center font-bold text-2xl ">
        Add Package
      </div>
      <div className="flex">
        <button className="flex flex-col justify-center px-[24px] py-[12px] mr-4 rounded-full bg-red-100 text-red-600 drop-shadow-md hover:bg-red-600 hover:text-white">
          Cancel
        </button>
        <button className="flex flex-col justify-center px-[24px] py-[12px] rounded-full bg-red-500 text-white drop-shadow-md hover:bg-red-600 hover:text-white">
          Create
        </button>
      </div>
    </nav>
  );
}

export default AdminNavBar;
