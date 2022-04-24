// import { FaBeer } from 'react-icons/fa';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import {
  HomePage,
  ManageAccountPage,
  ProfilePage,
  PostPage,
  EditPostPage,
  DetailAccountPage,
  AnnoucementFormPage,
  TagEditPage,
} from "./pages";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
//React Router v6 -> change "Switch" to "Routes"

import { AuthProvider, useAuth } from "./contexts/AuthContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          {/* Navbar */}
          <Navbar />

          {/* Main */}
          <Routes>
            {/* General */}
            <Route path="/" element={<HomePage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Register" element={<RegisterPage />} />
            <Route path="/Post" element={<PostPage />} />
            {/* /:id */}

            {/* <Route element={<AuthRoutes />}> */}
            <Route path="/Profile" element={<ProfilePage />} />
            <Route path="/DetailAccount" element={<DetailAccountPage />} />

            {/* Admin Only */}
            {/* <Route element={<AuthAdminRoutes />}> */}
            <Route path="/EditPost" element={<EditPostPage />} />
            <Route path="/ManageAccount" element={<ManageAccountPage />} />
            <Route path="/TagEdit" element={<TagEditPage />} />
            <Route path="/AnnoucementForm" element={<AnnoucementFormPage />} />
            {/* </Route>
            </Route> */}

            {/* redirect if path not found */}
            {/* "replace" prop for history clean -> This will avoid extra redirects after the user click back */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
        {/* Footer */}
      </BrowserRouter>
    </>
  );
}

export default App;

const AuthRoutes = () => {
  const { isAuth } = useAuth();
  let location = useLocation();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/Login" state={{ from: location }} replace />
  );
};

const AuthAdminRoutes = () => {
  const { role } = useAuth();
  let location = useLocation();

  return role === 1 ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
