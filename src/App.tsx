// import { FaBeer } from 'react-icons/fa';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  HomePage,
  ManageAccountPage,
  ProfilePage,
  DetailAccountPage,
  AnnoucementFormPage,
} from "./pages";
import { useState } from "react";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
//React Router v6 -> change "Switch" to "Routes"

function App() {
  const [isAuth, setIsAuth] = useState(false); // set later by api for config route

  return (
    <>
      <BrowserRouter>
        {/* Navbar */}
        <Navbar />

        {/* Main */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Profile/:id" element={<ProfilePage />} />
          <Route path="/ManageAccount" element={<ManageAccountPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          {/* insert path here */}
          <Route path="/DetailAccount" element={<DetailAccountPage />} />
          <Route path="/AnnoucementForm" element={<AnnoucementFormPage />} />
          {/* redirect if path not found */}
          {/* "replace" prop for history clean -> This will avoid extra redirects after the user click back */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Footer */}
      </BrowserRouter>
    </>
  );
}

export default App;
