import React, { useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();
const getState = () => {
  const data = JSON.parse(localStorage.getItem("state"));
  return data;
};

function AuthProvider(props) {
  // const [state, setState] = useState({
  //   loading: null,
  //   error: null,
  //   user: null,
  // });
  const [state, setState] = useState(getState());

  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const result = await axios.post("http://localhost:4000/auth/login", data);

      const token = result.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      localStorage.setItem("state", JSON.stringify(userDataFromToken));
      setState(getState());
      navigate("/match");
    } catch (error) {
      console.log("error", error);
      setState({ ...state, error, loading: false });
      window.alert(`Login Error: ${error.response.data.message}`);
      // setState({ ...state, error: error.message, loading: false });
    }
  };

  // register the user
  const register = async (data) => {
    try {
      const respone = await axios.post(
        "http://localhost:4000/auth/register",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      navigate("/login");
    } catch (error) {
      console.log(`Register Error: ${error}`);
      alert(`Register Error: ${error}`);
    }
  };

  // clear the token in localStorage and the user data
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("state");
    setState({ ...state, user: null, error: null });
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));
  const userRole = state && state.role;

  return (
    <AuthContext.Provider
      value={{ state, login, logout, register, isAuthenticated, userRole }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
