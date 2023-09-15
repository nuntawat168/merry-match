import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/authentication.jsx";
import { BrowserRouter } from "react-router-dom";
import jwtInterceptor from "./utils/jwtInterceptor";
import { ChakraProvider } from "@chakra-ui/react";
import { ContextProvider } from "./contexts/usecontexts.jsx";

jwtInterceptor();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContextProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </ContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
