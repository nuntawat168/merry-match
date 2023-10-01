import { Routes, Route } from "react-router-dom";
import "../App.css";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import MatchPages from "./MatchPages";
import MerryListPage from "./MerryListPage";
import AdminAddPackage from "./AdminAddPackage";
import AdminEditPackage from "./AdminEditPackage";
import PackagePage from "./packagepage";
import AdminPackage from "./Adminpackage";
import LogoutTestPage from "./logoutTest";
import UserComplaintPage from "./userComplaint";
import { useAuth } from "../contexts/authentication";
import UserProfilePage from "./UserProfilePage";
import AdminComplaintListPage from "./AdminComplaintListPage";
import Chat from "./Chat";
import AdminComplaintSeeDetailPage from "./AdminComplaintSeeDetailPage";
import StripePayment from "../components/StripePayment";
import PaymentSuccess from "../components/PaymentSuccess";
import UserMerryCheck from "./UserMerryCheck";

// ยังเอาไหมแบมลองเลือกอีกที
// import PaymentPage1 from "../pages/PaymentPage1";

// import SuccessPage from "./SuccessPage";

function AuthenticatedApp() {
  const { userRole } = useAuth();

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
            <Route path="/merry-list" element={<MerryListPage />} />
            <Route path="/logout" element={<LogoutTestPage />} />
            <Route path="/complaint" element={<UserComplaintPage />} />
            <Route path="/payment" element={<StripePayment />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat" element={<Chat />} /> 
            <Route path="/membership" element={<UserMerryCheck />} />
            {/* <Route path="/payments" element={<PaymentPage1 />} />
            
            <Route path="/success" element={<SuccessPage />} /> */}
          </>
        )}

        {/* Routes for admin */}
        {userRole === "admin" && (
          <>
            <Route path="/package/add" element={<AdminAddPackage />} />
            <Route path="/package/edit/:id" element={<AdminEditPackage />} />
            <Route path="/package" element={<AdminPackage />} />
            <Route path="/match" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutTestPage />} />
            <Route path="/complaint" element={<AdminComplaintListPage />} />
            <Route
              path="/complaint/detail/:complaintId"
              element={<AdminComplaintSeeDetailPage />}
            />
          </>
        )}
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
