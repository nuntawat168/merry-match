// LoginPage.js

import {React, useState, useEffect} from "react";
import manImage from "../../src/assets/image/manOnLoginPage.svg";
import dotImage from "../../src/assets/image/dotOnLoginPage.svg";

function LoginPage() {
  // Define state variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Handle changes in the input fields
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  return (
    <div className="mt-10 flex w-full">
      <div className="w-1/2 flex justify-center relative">
        <img src={manImage} className="" alt="manImage" />
        <img src={dotImage} className="absolute top-0 left-0 " alt="dotImage" />
      </div>
      <div className="w-1/2 flex flex-col justify-around items-start pl-10 mt-10 mb-10">
        <p className="text-purple-500 font-nunito text-[14px] font-semibold uppercase">
          LOGIN
        </p>
        <p className="font-nunito text-[46px] font-extrabold  text-purple-500">
          Welcome back to
        </p>
        <p className="font-nunito text-[46px] font-extrabold  text-purple-500">
          Merry Match
        </p>
        <div className="mt-10 mb-4 flex flex-col items-start">
          <label
            htmlFor="usernameOrEmail"
            className="font-nunito text-[16px] font-normal text-black inline-block"
          >
            Username or Email
          </label>
          <input
            type="text"
            id="usernameOrEmail"
            placeholder="Enter Username or Email"
            value={username} // Bind the input value to the username state
            onChange={handleUsernameChange} // Handle changes in the input field
            className="w-[453px] h-[48px] border border-[#D6D9E4] rounded-lg mt-2 p-4"
          />
        </div>
        <div className="mb-4 flex flex-col items-start">
          <label
            htmlFor="password"
            className="font-nunito text-[16px] font-normal text-black inline-block"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password} // Bind the input value to the password state
            onChange={handlePasswordChange} // Handle changes in the input field
            className="w-[453px] h-[48px] border border-[#D6D9E4] rounded-lg mt-2 p-4"
          />
        </div>
        <button class="w-[453px] h-[48px] rounded-full bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-md text-white">
          Login
        </button>
        <div className="flex mt-10">
          <p class="font-nunito text-base font-normal text-black">
            Don't have an account?
          </p>
          <a
            href=""
            className="text-red-500 font-nunito text-base font-bold leading-[24px] ml-2"
            onClick={() => navigate("")}
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
