import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MatchPages from "./pages/MatchPages";
import MerryListPage from "./pages/MerryListPage";
import AdminAddPackage from "./pages/AdminAddPackage";
import PackagePage from "./pages/packagepage";
import Adminpackage from "../src/pages/Adminpackage";
import PaymentPage1 from "./pages/PaymentPage1";
import Chat from "./pages/Chat";
import Test1 from "./pages/Test1";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/match" element={<MatchPages />} />
        <Route path="/merry-list" element={<MerryListPage />} />
        <Route path="/addPackage" element={<AdminAddPackage />} />
        <Route path="/packages" element={<PackagePage />} />
        <Route path="/admin" element={<Adminpackage />} />
        <Route path="/payment" element={<PaymentPage1 />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/test" element={<Test1 />} />
      </Routes>
    </>
  );
}
export default App;

// import AuthenticatedApp from "./pages/AuthenticatedApp";
// import UnauthenticatedApp from "./pages/UnauthenticatedApp";
// import { useAuth } from "./contexts/authentication";

// function App() {
//   const auth = useAuth();
//   return auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
// }
// export default App;
