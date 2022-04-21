import { Result } from "postcss";
import React, { ReactChild, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { config } from "../api/axios";
import {
  saveTokenLocalStorage,
  loadTokenLocalStorage,
  removeTokenLocalStorage,
} from "../api/localStorage";

interface IAuthContext {
  isAuth: boolean;
  isLoading: boolean;
  login?: (email: string, password: string) => Promise<void>;
  getUser?: () => Promise<any>;
}

const initAuthContext = {
  isAuth: false,
  isLoading: false,
};

const AuthContext = React.createContext<IAuthContext>(initAuthContext);
export const useAuth = () => useContext(AuthContext);

type Children = {
  children: ReactChild[];
};

const LOGIN_URL = "api/Auth/login";
const USER_POST_URL = "api/Auth/register";
const USER_GETMY_URL = "api/Blogger"; // get my info
const USER_GET_URL = "api/Blogger/:id"; // get
const USER_PUT_URL = "api/Blogger/:id"; // put
const USER_DELETE_URL = "api/Auth/:id"; // delete

export const AuthProvider = ({ children }: Children) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  // auth function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await axios
        .post(LOGIN_URL, {
          email,
          password,
        })
        .then(
          (res) => {
            saveTokenLocalStorage(res.data);
            setIsAuth(true);
            alert("เข้าสู่ระบบ สำเร็จ");
            navigate("/");
          },
          (err) => {
            setIsAuth(false);
            alert("ชื่อผู้ใช้งาน/รหัสผ่าน ไม่ถูกต้อง");
            throw Object.assign(new Error(err));
          }
        );
    } catch (err) {
      console.error("Auth login(): " + err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    //   wait api logout
    setIsAuth(false);
    removeTokenLocalStorage();

    setIsLoading(false);
    return;
  };

  const getUser = async () => {
    setIsLoading(true);
    let response = null;
    try {
      let loadToken = loadTokenLocalStorage();
      await axios
        .get(USER_GETMY_URL, config(loadToken))
        .then((res) => {
          response = res.data;
          setIsAuth(true);
        })
        .catch((err) => {
          setIsAuth(false);
          if (err.response.status === 401)
            throw Object.assign(new Error("401: No user found log-in"));
          else throw err;
        });
    } catch (err) {
      console.warn("Auth getUser(): " + err);
    } finally {
      setIsLoading(false);
      return response;
    }
  };

  const passValue = {
    isAuth,
    isLoading,
    login,
    logout,
    getUser,
  };

  return (
    <AuthContext.Provider value={passValue}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
