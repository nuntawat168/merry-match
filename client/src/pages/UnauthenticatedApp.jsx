import { Routes, Route } from "react-router-dom";
import "../App.css";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MatchPages from "./MatchPages";
import MerryListPage from "./MerryListPage";
import AdminAddPackage from "./AdminAddPackage";
import PackagePage from "./packagepage";
import Adminpackage from "./Adminpackage";
import { useEffect } from "react";

function UnauthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;
