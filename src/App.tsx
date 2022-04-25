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
            <Route element={<NoAuthRoutes />}>
              <Route path="/Login" element={<LoginPage />} />
            </Route>
            <Route path="/Register" element={<RegisterPage />} />
            <Route path="/Post" element={<PostPage />} />
            <Route path="/Profile" element={<ProfilePage />} />
            {/* /:id */}

            <Route element={<AuthRoutes />}>
              <Route path="/DetailAccount" element={<DetailAccountPage />} />
              {/* Admin Only */}
              <Route element={<AuthAdminRoutes />}>
                <Route path="/EditPost" element={<EditPostPage />} />
                <Route path="/ManageAccount" element={<ManageAccountPage />} />
                <Route path="/TagEdit" element={<TagEditPage />} />
                <Route
                  path="/AnnoucementForm"
                  element={<AnnoucementFormPage />}
                />
              </Route>{" "}
            </Route>

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

const NoAuthRoutes = () => {
  const { isAuth } = useAuth();
  let location = useLocation();

  return isAuth === false ? (
    <>
      <Outlet />
    </>
  ) : (
    <>
      <Navigate to="/" state={{ from: location }} replace />
    </>
  );
};

const AuthRoutes = () => {
  const { isAuth } = useAuth();
  let location = useLocation();

  return isAuth === true ? (
    <>
      {/* <div className="h-28 w-screen bg-green-500">xx{role}xx</div> */}
      <Outlet />
    </>
  ) : (
    <>
      {/* <div className="h-28 w-screen bg-green-500">xx{role}xx</div> */}
      <Navigate to="/login" state={{ from: location }} replace />
    </>
  );
};

const AuthAdminRoutes = () => {
  const { role } = useAuth();
  let location = useLocation();

  return role === 1 ? (
    <>
      {/* <div className="h-28 w-screen bg-red-500">yy{role}yy</div> */}
      <Outlet />
    </>
  ) : (
    <>
      {/* <div className="h-28 w-screen bg-red-500">yy{role}yy</div> */}
      <Navigate to="/" state={{ from: location }} replace />
    </>
  );
};
