import React, { ReactChild, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { config } from "../api/axios";
import {
  saveTokenLocalStorage,
  loadTokenLocalStorage,
  removeTokenLocalStorage,
} from "../api/localStorage";
import {
  LOGIN_URL,
  REGISTER_URL,
  USER_GETMYEMAIL_URL,
  USER_GET_URL,
  USER_GETALL_URL,
} from "../api/routes";

interface IAuthContext {
  isAuth: boolean;
  role: number;
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
  getUserEmail: () => Promise<null>;
}
const AuthContext = React.createContext<IAuthContext>({
  isAuth: false,
  role: 0, // 0 user, 1 admin
  token: "",
  user: {},
  login: () => new Promise((resolve) => resolve()),
  logout: () => new Promise((resolve) => resolve()),
  createUser: () => new Promise((resolve) => resolve()),
  getUserEmail: () => Promise.reject(),
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
  const [role, setRole] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>();
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();

  // visit page first time
  useEffect(() => {
    console.log("beginfirst");
    getUserEmail();
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
          async (res) => {
            saveTokenLocalStorage(res.data);
            setIsAuth(true);
            await getUserEmail();
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
        })
        .then(
          (res) => {
            alert("ลงทะเบียน สำเร็จ");
            console.log("ลงทะเบียน สำเร็จ");
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

    setIsAuth(false);
    setUser(null);
    removeTokenLocalStorage();
    alert("ออกจากระบบเรียบร้อย");

    navigate("/login");
    setIsLoading(false);
  };

  const getUserEmail = async () => {
    setIsLoading(true);
    let response = null;
    let loadToken = loadTokenLocalStorage();
    try {
      await axios
        .get(USER_GETMYEMAIL_URL, config(loadToken))
        .then(async (res) => {
          let email_response = res.data;
          await getUser(email_response)
            .then((res2) => {
              response = res2;
              console.log("getUser()");
              console.log(response);
              setUser(response);
              setIsAuth(true);
            })
            .catch((err) => {
              throw err;
            });
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
      console.warn("Auth getUserEmail(): " + err);
    } finally {
      setToken(loadToken);
      setIsLoading(false);
      return response;
    }
  };

  // chain function 2nd
  const getUser = async (email: string) => {
    let response = null;
    try {
      await axios
        .get(USER_GET_URL.replace(":email", email))
        .then((res) => {
          response = res.data;
          setRole(response.role);
        })
        .catch((err) => {
          throw Object.assign(
            new Error(`${err.response.status}: No user in Database`)
          );
        });
    } catch (err) {
      console.warn("Auth getUser(): " + err);
    } finally {
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
    role,
    token,
    user,
    login,
    createUser,
    logout,
    getUserEmail,
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
