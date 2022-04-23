import { Result } from "postcss";
import React, { ReactChild, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { config } from "../api/axios";
import {
  saveTokenLocalStorage,
  loadTokenLocalStorage,
  removeTokenLocalStorage,
} from "../api/localStorage";
import { LOGIN_URL, REGISTER_URL, USER_GETMY_URL } from "../api/routes";

interface IAuthContext {
  isAuth: boolean;
  token: string;
  user: any;
  // setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  createUser: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    nickName: string
  ) => Promise<void>;
  getUser: () => Promise<null>;
}
const AuthContext = React.createContext<IAuthContext>({
  isAuth: false,
  token: "",
  user: {},
  login: () => new Promise((resolve) => resolve()),
  logout: () => new Promise((resolve) => resolve()),
  createUser: () => new Promise((resolve) => resolve()),
  getUser: () => Promise.reject(),
});
export const useAuth = () => useContext<IAuthContext>(AuthContext);

type Children = {
  children: ReactChild[];
};

export const AuthProvider = ({ children }: Children) => {
  const [isAuth, setIsAuth] = useState<boolean>(() => {
    let tk = loadTokenLocalStorage();
    return tk === "" ? false : true;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>();
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();

  // visit page first time
  useEffect(() => {
    console.log("beginfirst");
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
            throw Object.assign(new Error(`${err.response.status}:` + err));
          }
        );
    } catch (err) {
      console.error("Auth login(): " + err);
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    nickName: string
  ) => {
    try {
      await axios
        .post(REGISTER_URL, {
          email,
          password,
          firstName,
          lastName,
          nickName,
          role: 0,
        })
        .then(
          (res) => {
            alert("ลงทะเบียน สำเร็จ");
            console.log(res.data);
            navigate("/Login");
          },
          (err) => {
            alert("ชื่อผู้ใช้นี้ถูกใช้แล้ว");
            throw Object.assign(
              new Error(`${err.response.status}: Found same user`)
            );
          }
        );
    } catch (err) {
      console.error("Auth createUser(): " + err);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    console.log("begin");
    setIsAuth(false);
    removeTokenLocalStorage();
    alert("ออกจากระบบเรียบร้อย");
    console.log("end");
    setIsLoading(false);
  };

  const getUser = async () => {
    setIsLoading(true);
    let response = null;
    let loadToken = loadTokenLocalStorage();
    try {
      await axios
        .get(USER_GETMY_URL, config(loadToken))
        .then((res) => {
          response = res.data[0];
          setUser(response);
          setIsAuth(true);
        })
        .catch((err) => {
          setIsAuth(false);
          if (err.response.status === 401)
            throw Object.assign(
              new Error(`${err.response.status}: No user found log-in`)
            );
          else throw err;
        });
    } catch (err) {
      console.warn("Auth getUser(): " + err);
    } finally {
      setToken(loadToken);
      setIsLoading(false);
      return response;
    }
  };

  // const passValue = useMemo(
  //   () => ({
  //     isAuth,
  //     isLoading,
  //     setIsLoading,
  //     token,
  //     login,
  //     createUser,
  //     logout,
  //     user,
  //   }),
  //   [createUser, isAuth, isLoading, login, token, user]
  // );

  const passValue = {
    isAuth,
    token,
    user,
    login,
    createUser,
    logout,
    getUser,
  };

  return (
    <AuthContext.Provider value={passValue}>
      {isLoading ? (
        <>
          <div className="flex flex-row items-center justify-center w-screen h-screen">
            loading...
          </div>
        </>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;
