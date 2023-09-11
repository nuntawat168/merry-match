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
import LogoutTestPage from "./logoutTest";
import { useEffect } from "react";
import { useAuth } from "../contexts/authentication";

// user test  email: user1@example.com  pw: password1
// admin test email: admin1@example.com pw: admin1password

function AuthenticatedApp() {
  const { userRole } = useAuth();
  console.log(userRole)

  return (
    <div className="App">
      <Routes>
        {/* Common routes for both user and admin */}
        <Route path="*" element={<MerryListPage />} />

        {/* Routes for user */}
        {userRole === "user" && (
          <>
            <Route path="/packages" element={<PackagePage />} />
            <Route path="/match" element={<MatchPages />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<MatchPages />} />
            <Route path="/logout" element={<LogoutTestPage />} />
            <Route path="/" element={<LandingPage />} />
          </>
        )}

        {/* Routes for admin */}
        {userRole === "admin" && (
          <>
            <Route path="/addPackage" element={<AdminAddPackage />} />
            <Route path="/admin" element={<Adminpackage />} />
            <Route path="/match" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutTestPage />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
