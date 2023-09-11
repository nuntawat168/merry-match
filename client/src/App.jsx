import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/authentication";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MatchPages from "./pages/MatchPages";
import MerryListPage from "./pages/MerryListPage";
import AdminAddPackage from "./pages/AdminAddPackage";
import PackagePage from "./pages/packagepage";
import Adminpackage from "../src/pages/Adminpackage";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/match" element={<MatchPages />} />
//         <Route path="/merry-list" element={<MerryListPage />} />
//         <Route path="/addPackage" element={<AdminAddPackage />} />
//         <Route path="/packages" element={<PackagePage />} />
//         <Route path="/admin" element={<Adminpackage />} />
//         {/* <Route path="/payment" element={<PaymentPage1 />} /> */}
//       </Routes>
//     </>
//   );
// }
// export default App;

function App() {
  const auth = useAuth();
  return auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;