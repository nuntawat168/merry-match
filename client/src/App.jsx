import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import MatchPages from "./pages/MatchPages";
import MerryListPage from "./pages/MerryListPage";
import AdminAddPackage from "./pages/AdminAddPackage";
import Content from "./components/Content";
import Admindetail from "./components/admindetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/match" element={<MatchPages />} />
          <Route path="/merry-list" element={<MerryListPage />} />
          <Route path="/addPackage" element={<AdminAddPackage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
