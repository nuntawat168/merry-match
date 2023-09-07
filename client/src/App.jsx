import "./App.css";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import MatchPages from "./pages/MatchPages";
import MerryListPage from "./pages/MerryListPage";

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
          {/* merry-list ต้องเพิ่ม merry-list/:user_id เพื่อให้แสดงข้อมูล user แต่ละคนได้ */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;