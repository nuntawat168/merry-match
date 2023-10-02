import React, { useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();
const getState = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const userDataFromToken = jwtDecode(token);
    return userDataFromToken;
  } else {
    return null;
  }
};

function AuthProvider(props) {
  const [state, setState] = useState(getState());

  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const result = await axios.post("http://localhost:4000/auth/login", data);

      const token = result.data.token;
      localStorage.setItem("token", token);
      setState(getState());
      navigate("/match");
    } catch (error) {
      console.log("error", error);
      setState({ ...state, error, loading: false });
      throw error;
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
