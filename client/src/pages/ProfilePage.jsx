import React from 'react';
import UserProfile from '../components/UserProfile';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const ProfilePage = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/profile/:user_id" element={<UserProfile />} />
            </Routes>
        </BrowserRouter>
    )
}

export default ProfilePage;

