import { Routes, Route } from "react-router-dom";
import "../App.css";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import MatchPages from "./MatchPages";
import MerryListPage from "./MerryListPage";
import AdminAddPackage from "./AdminAddPackage";
import AdminEditPackage from "./AdminEditPackage";
import PackagePage from "./packagepage";
import Adminpackage from "./Adminpackage";
import LogoutTestPage from "./logoutTest";
import UserComplaintPage from "./userComplaint";
import { useAuth } from "../contexts/authentication";
import UserProfilePage from "./UserProfilePage";
import AdminComplaintListPage from "./AdminComplaintListPage";
import Chat from "./Chat";

function AuthenticatedApp() {
  const { userRole } = useAuth();
  // console.log(userRole);

  return (
    <div className="App">
      <Routes>
        {/* Common routes for both user and admin */}
        <Route path="*" element={<MerryListPage />} />

        {/* Routes for user */}
        {userRole === "user" && (
          <>
            <Route path="/user-profile" element={<UserProfilePage />} />
            <Route path="/packages" element={<PackagePage />} />
            <Route path="/match" element={<MatchPages />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<MatchPages />} />
            <Route path="/logout" element={<LogoutTestPage />} />
            <Route path="/complaint" element={<UserComplaintPage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat" element={<Chat />} />
          </>
        )}

        {/* Routes for admin */}
        {userRole === "admin" && (
          <>
            <Route path="/package/add" element={<AdminAddPackage />} />
            <Route path="/package/edit/:id" element={<AdminEditPackage />} />
            <Route path="/package" element={<Adminpackage />} />
            <Route path="/match" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutTestPage />} />
            <Route path="/complaint" element={<AdminComplaintListPage />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
