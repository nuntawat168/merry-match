import "./App.css";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import MatchPages from "./pages/MatchPages";
import MerryListPage from "./pages/MerryListPage";
import AdminAddPackage from "./pages/AdminAddPackage";

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
      </Routes>
    </>
  );
}

export default App;
