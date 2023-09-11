import React from "react";
import { useAuth } from "../contexts/authentication";

function LogoutTestPage() {
  const { logout } = useAuth();

  return (
    <>
      <h1 className="app-title">Logout test</h1>
      <button
            onClick={logout}
            className="w-[100%] h-[48px] rounded-full bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-md text-white"
          >
        Logout
      </button>
    </>
  );
}

export default LogoutTestPage; 
